<?php
// 2022 - Day 1 - P2
$data = file("input.txt", FILE_IGNORE_NEW_LINES);

$highest_sum1 = 0; // highest
$highest_sum2 = 0; // 2nd highest
$highest_sum3 = 0; // 3rd highest

foreach ($data as $i=>$calories) {
    $current_sum += (int)$calories;
    if (!$calories OR $i === count($data)-1) {
        if ($current_sum > $highest_sum1) {
            $highest_sum3 = $highest_sum2;
            $highest_sum2 = $highest_sum1;
            $highest_sum1 = $current_sum;
        } else if ($current_sum > $highest_sum2) {
            $highest_sum3 = $highest_sum2;
            $highest_sum2 = $current_sum;
        } else if ($current_sum > $highest_sum3) {
            $highest_sum3 = $current_sum;
        }
        $current_sum = 0;
    }
}

$top3_sum = $highest_sum1 + $highest_sum2 + $highest_sum3;
echo "Top 3 Sum: $top3_sum";