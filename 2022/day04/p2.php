<?php
// 2022 - Day 4 - P2
echo "<h2>day4 - p2</h2><br><br>";
$data = file("input.txt", FILE_IGNORE_NEW_LINES); // import file as array

$sum = 0;
foreach ($data as $line) {
    $pair = explode(",", $line);
    $pair1 = explode("-", $pair[0]);
    $pair2 = explode("-", $pair[1]);
    $p1_min = $pair1[0];
    $p1_max = $pair1[1];
    $p2_min = $pair2[0];
    $p2_max = $pair2[1];

    if (
        ($p1_min >= $p2_min AND $p1_max <= $p2_max) OR
        ($p2_min >= $p1_min AND $p2_max <= $p1_max) OR
        ($p1_min < $p2_min AND $p1_max >= $p2_min) OR
        ($p2_min < $p1_min AND $p2_max >= $p1_min)
    ) {
        $sum++;
    }
}

echo "<h1>SUM: $sum</h1>";