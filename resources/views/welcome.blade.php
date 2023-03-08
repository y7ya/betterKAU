<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="بسطنا لطالب جامعة الملك عبدالعزيز تنظيم الجدول الدراسي الان بطريقة سهلة وفعالة">

    <title>betterKAU | جدول</title>
    <link rel="icon" type="image/png" href="{{ Vite::asset('resources/imgs/favicon-32x32.png') }}" sizes="32x32" />
    <link rel="icon" type="image/png" href="{{ Vite::asset('resources/imgs/favicon-16x16.png') }}" sizes="16x16" />

    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HM7QGWFJ21"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HM7QGWFJ21');
</script>

<body>
    <div id="app"></div>
</body>

</html>
