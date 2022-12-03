<?php
// 2022 - Day 3 - P1
echo "day3 - p1";
$data = file("input.txt", FILE_IGNORE_NEW_LINES); // import file as array

foreach ($data as $line) {
    echo "<pre>";
    print_r($data);
    echo "</pre>";
}