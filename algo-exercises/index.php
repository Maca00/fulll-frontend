<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Fulll Algo</title>
</head>
<body>
<?php
$n = 30;

for ($i = 1; $i <= $n; $i++) {
    if($i % 3 === 0 && $i % 5 === 0) {
        echo 'FizzBuzz<br>';
    } else if($i % 3 === 0) {
        echo 'Fizz<br>';
    } else if($i % 5 === 0) {
        echo 'Buzz<br>';
    } else {
        echo $i . '<br>';
    }
}

echo '<h2>Autre solution</h2>';

for ($i = 1; $i <= $n; $i++) {
    if($i % 3 !== 0 && $i % 5 !== 0) {
        echo $i . '<br>';
    } else {
        if($i % 3 === 0) {
            echo 'Fizz';
        }
        if($i % 5 === 0) {
            echo 'Buzz';
        }
        echo '<br>';
    }
}

?>
</body>
</html>