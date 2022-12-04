<?php
// 2022 - Day 3 - P1
echo "day3 - p1<br>";
$data = file("input.txt", FILE_IGNORE_NEW_LINES); // import file as array

$letters = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

$sum = 0;
foreach ($data as $line) {
    $half1 = substr($line, 0, strlen($line) / 2);
    $half2 = substr($line, strlen($line) / 2);
    $arr = str_split($half1);
    foreach ($arr as $letter) {
        if (strpos($half2, $letter) > -1) {
            $sum += strpos($letters, $letter);
            break;
        }
    }
}

echo "SUM: $sum";