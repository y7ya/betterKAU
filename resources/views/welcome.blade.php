<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>betterKAU | جدول</title>
    <link rel="icon" type="image/png" href="{{ Vite::asset('resources/imgs/favicon-32x32.png') }}" sizes="32x32" />
    <link rel="icon" type="image/png" href="{{ Vite::asset('resources/imgs/favicon-16x16.png') }}" sizes="16x16" />

    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>

<body>
    <div id="app"></div>
</body>

</html>