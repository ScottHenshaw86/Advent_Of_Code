<?php
// 2022 - Day 4 - P1
echo "day4 - p1<br><br>";
$data = file("input.txt", FILE_IGNORE_NEW_LINES); // import file as array

echo "DATA:<pre>";
print_r($data);
echo "</pre>";

$sum = 0;
foreach ($data as $line) {
    // echo $line, "<br>";
    
    // echo "<pre>";
    // print_r($line);
    // echo "</pre>";
}

echo "SUM: $sum";