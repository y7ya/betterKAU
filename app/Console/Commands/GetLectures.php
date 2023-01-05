<?php


namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Goutte\Client;
use PDO;
use Symfony\Component\DomCrawler\Crawler;
use Vtiful\Kernel\Format;

class GetLectures extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'get:lectures';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    private $courses = [
        "CPIT",
        "CPIS",
        "CPCS"
    ];
    private $term;
    private $NO_LECTURES_MESSAGE = "لم يتم العثور على فصول تتوافق مع معايير البحث المحددة";


    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->setTrem();

        foreach ($this->courses as $course) {

            $client = new Client();
            $crawler = $client->request('GET', 'https://odusplus-ss.kau.edu.sa/PROD/xwckctlg.p_display_courses2?sel_subj=&sel_crse_strt=&sel_crse_end=&sel_levl=&sel_schd=&sel_divs=&sel_coll=&sel_dept=&sel_attr=&term_in=202320&one_subj=CPIS');

            $titles = $crawler->filter(".plaintable")->each(function ($node, $i) {
                return $node->text();
            });
            $tables = $crawler->filter("#summary_tab")->each(function ($node) {
                return $node;
            });
            $lectures = [];
            if (count($tables) == 0)
                continue;

            $foundSubjects = 0;
            for ($i = 0; $i < count($titles); $i++) {
                if (!$this->has_lectures($titles[$i], @$titles[$i + 1]))
                    continue;
                info("[" . trim($titles[$i]) . "]" . " Has Lectures" . "<br>");

                $titleDetails = $this->getTitleDetails($titles[$i]);
                $subject = [
                    "course" => $titleDetails[0],
                    "number" => $titleDetails[1],
                    "name" => $titleDetails[2],
                    "lectures" => $this->tableToArray($tables[$foundSubjects]->filter("tr"))
                ];

                info($subject);
                info("-------------------------------------------------------------------------------------------------");
                $foundSubjects++;
            }


            break;
        }
    }

    function tableToArray(Crawler $raw_table)
    {
        $course = [];

        $raw_table = $raw_table->slice(1, $raw_table->count());

        $raw_table->each(function (Crawler $node) use (&$course) { // for each row in table (lecture)
            if ($node->filter("td")->eq(0)->text() == " ") {
                $last = $course[array_key_last($course)];
                $last["days"] .= $this->remove(["P", "TBA"], $node->filter("td")->eq(4)->text());
                $last["days"] = count_chars($last["days"], 3); // remove duplicated letters
                $course[array_key_last($course)] = $last;
            } else {
                $lecture = [];
                $lecture["id"]    = $node->filter("td")->eq(0)->text();
                $lecture["name"]  = $this->remove(["P", "TBA"], $node->filter("td")->eq(1)->text());;
                $lecture["type"]  = $node->filter("td")->eq(2)->text();
                $lecture["days"]  = $this->remove([], $node->filter("td")->eq(4)->text());
                $lecture["term"] = $this->term;
                $lecture["details"] = "https://odusplus-ss.kau.edu.sa/PROD/xwckschd.p_disp_detail_sched?term_in=" . $this->term . "&crn_in=" . $lecture["id"];
                $lecture["classes"] = [];
                array_push($course, $lecture);
            }

            foreach (str_split($this->remove(["P", "TBA"], $node->filter("td")->eq(4)->text())) as $day) {
                $lecture = [];
                $lecture["time"] = $this->split_time($this->remove(["P", "TBA"], $node->filter("td")->eq(3)->text()));
                $lecture["day"] = $this->remove([], $day);
                $lecture["building"] = $this->remove(["P", "TBA"], $node->filter("td")->eq(5)->text());;
                $lecture["room"] = $this->remove(["P", "TBA"], $node->filter("td")->eq(6)->text());
                $lecture["lecturer"] = $this->remove(["P", "TBA"], $node->filter("td")->eq(7)->text());
                array_push($course[array_key_last($course)]["classes"], $lecture);
            }
        });
        return $course;
    }

    function split_time(String $time)
    {
        if ($time == "") return "";
        $time = explode("-", $time);
        return ["start" => $time[0], "end" => $time[1]];
    }

    function has_lectures($title, $nextTitle)
    {
        return !(str_contains($nextTitle, $this->NO_LECTURES_MESSAGE) || str_contains($title, $this->NO_LECTURES_MESSAGE));
    }

    function getTitleDetails(String $title)
    {
        $title = explode("-", $title, 2);
        $subject = explode(" ", $title[0]);
        return [$subject[0], $subject[1], trim($title[1])];
    }


    function remove($rules, String $string)
    {

        if (in_array("P", $rules)) $string = str_replace("(P)", "", $string);
        if (in_array("TBA", $rules)) $string = str_replace("TBA", "", $string);
        if (in_array("asciiOnly", $rules)) $string = preg_replace('/[^\x20-\x7E]/', '', $string);
        $string = str_replace(" ", "", $string);
        return trim($string);
    }
    function setTrem()
    {
        $this->term = "202320";
    }
}
