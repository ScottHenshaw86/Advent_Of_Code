<?php
// 2022 - Day 3 - P2
echo "day3 - p2<br>";
$data = file("input.txt", FILE_IGNORE_NEW_LINES); // import file as array

$letters = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

$sum = 0;

for ($i = 0; $i < count($data); $i+=3) {
    $arr = str_split($data[$i]);
    foreach($arr as $letter) {
        if (strpos($data[$i + 1], $letter) > -1 AND strpos($data[$i + 2], $letter) > -1) {
            $sum += strpos($letters, $letter);
            break;
        }
    }
}

echo "SUM: $sum";