<?php

// TODO: cleanup this trash code
namespace App\Console\Commands;

use App\Models\Courses;
use App\Models\Last_activitie;
use App\Models\SearchList;
use App\Models\Terms;
use Illuminate\Console\Command;
use Goutte\Client;
use GuzzleHttp\Client as GuzzleClient;
use Illuminate\Database\Eloquent\Factories\Relationship;
use Illuminate\Support\Facades\Log;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpClient\HttpClient;
use Rogervila\ArrayDiffMultidimensional;


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
    private $term;
    private $NO_LECTURES_MESSAGE = "لم يتم العثور على فصول تتوافق مع معايير البحث المحددة";
    private $maxAttempts = 5;
    private $timeout = 8;
    /**
     * Execute the console command.
     *
     * @return int
     */

    public function handle()
    {
        
        Last_activitie::create(['title'=>'Updating!!','activity'=>'Start updating schedule']);
        $this->setTerm();
        foreach (SearchList::where('allow', 1)->get(['id', 'course']) as $list) {
            $subject = [];

            for ($i = 0; $i < $this->maxAttempts; $i++) {
                try {
                    $client  = new Client(HttpClient::create(["timeout" => $this->timeout]));
                    $url     = "https://odusplus-ss.kau.edu.sa/PROD/xwckctlg.p_display_courses2?sel_subj=&sel_crse_strt=&sel_crse_end=&sel_levl=&sel_schd=&sel_divs=&sel_coll=&sel_dept=&sel_attr=&term_in=" . $this->term['number'] . "&one_subj=" . strtoupper($list->course);
                    $crawler = $client->request('GET', $url);
                    $titles  = $crawler->filter(".plaintable")->each(function ($node, $i) {
                        return $node->text();
                    });
                    $tables  = $crawler->filter("#summary_tab")->each(function ($node) {
                        return $node;
                    });
                } catch (\Symfony\Component\HttpClient\Exception\TimeoutException $th) {
                    Log::error($th->getMessage());
                    if ($i == $this->maxAttempts)
                        exit();
                    sleep(15);
                    continue;
                }
                break;
            }


            if (count($tables) == 0)
                continue;

            $foundSubjects = 0;
            for ($i = 0; $i < count($titles); $i++) {
                if (!$this->has_lectures($titles[$i], @$titles[$i + 1]))
                    continue;

                $titleDetails = $this->getTitleDetails($titles[$i]);
                $subject      = [
                    "course" => $titleDetails[0],
                    "number" => $titleDetails[1],
                    "name" => $titleDetails[2],
                    "term_id" => $this->term['id'],
                    "lectures" => $this->tableToArray($tables[$foundSubjects]->filter("tr"))
                ];

                $this->updateLectures($subject);

                $foundSubjects++;
            }

            sleep(30);
        }

        Last_activitie::create(['title'=>'End!!','activity'=>'End updating schedule']);
    }

    function updateLectures($subject)
    {
        try {
            $course = Courses::updateOrCreate([
                'term_id' => $this->term['id'],
                'course'  => $subject['course'],
                'number'  => $subject['number'],
            ], $subject);
    
            foreach ($subject["lectures"] as $lecture) {
                $l = $course->lectures()->updateOrCreate(['course_id' => $course->id, 'number' => $lecture['number']], $lecture);
                foreach ($lecture["classes"] as $class) {
                    $l->classes()->updateOrCreate(['lecture_id' => $l->id, 'number' => $class['number']], $class);
                }
            }
        } catch (\Throwable $th) {
            Log::error('something went wrong!!');
            Log::error($subject);
        }
    }


    function tableToArray(Crawler $raw_table)
    {
        $course    = [];

        // remove first row
        $raw_table = $raw_table->slice(1, $raw_table->count());

        $raw_table->each(function (Crawler $node) use (&$course) { // for each row in table (lecture)
            if ($node->filter("td")->eq(0)->text() == " ") {
                $last                            = $course[array_key_last($course)];
                $last["days"] .= $this->remove(["P", "TBA"], $node->filter("td")->eq(4)->text());
                $last["days"]                    = count_chars($last["days"], 3); // remove duplicated letters
                $course[array_key_last($course)] = $last;
            } else {
                $lecture           = [];
                $lecture["number"] = $this->remove([], $node->filter("td")->eq(0)->text());
                $lecture["name"]   = $this->remove(["P", "TBA"], $node->filter("td")->eq(1)->text());;
                $lecture["type"]    = $this->remove([], $node->filter("td")->eq(2)->text());
                $lecture["days"]    = $this->remove([], $node->filter("td")->eq(4)->text());
                $lecture["classes"] = [];
                array_push($course, $lecture);
            }

            foreach (str_split($this->remove(["P", "TBA"], $node->filter("td")->eq(4)->text())) as $day) {
                $class               = [];
                $class["number"]     = count($course[array_key_last($course)]["classes"]) + 1;
                $class["time_start"] = $this->split_time($this->remove(["P", "TBA"], $node->filter("td")->eq(3)->text()), "start");
                $class["time_end"]   = $this->split_time($this->remove(["P", "TBA"], $node->filter("td")->eq(3)->text()), "end");
                $class["day"]        = $this->remove([], $day);
                $class["building"]   = $this->remove(["P", "TBA"], $node->filter("td")->eq(5)->text());;
                $class["room"]     = $this->remove(["P", "TBA"], $node->filter("td")->eq(6)->text());
                $class["lecturer"] = $this->remove(["P", "TBA"], $node->filter("td")->eq(7)->text());
                array_push($course[array_key_last($course)]["classes"], $class);
            }
        });
        return $course;
    }

    function split_time(string $time, string $type)
    {
        if ($time == "")
            return "";
        $time = explode("-", $time);

        return ["start" => trim($time[0]), "end" => trim($time[1])][$type];
    }

    function has_lectures($title, $nextTitle)
    {
        return !(str_contains($nextTitle, $this->NO_LECTURES_MESSAGE) || str_contains($title, $this->NO_LECTURES_MESSAGE));
    }

    function getTitleDetails(string $title)
    {
        $title   = explode("-", $title, 2);
        $subject = explode(" ", $title[0]);
        return [$subject[0], $subject[1], trim($title[1])];
    }

    function remove($rules, string $string)
    {

        if (in_array("P", $rules))
            $string = str_replace("(P)", "", $string);
        if (in_array("TBA", $rules))
            $string = str_replace("TBA", "", $string);
        if (in_array("spaces", $rules))
            $string = str_replace(" ", "", $string);
        if (in_array("asciiOnly", $rules))
            $string = preg_replace('/[^\x20-\x7E]/', '', $string);
        $string = str_replace(" ", "", $string);
        return trim($string);
    }

    function setTerm()
    {
        $this->term = Terms::where('active', 1)->first();
    }
}
