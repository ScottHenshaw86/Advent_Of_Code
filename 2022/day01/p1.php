<?php
// 2022 - Day 1 - P1
$data = file("input.txt", FILE_IGNORE_NEW_LINES);

$highest_sum = 0; // total calories of the elf with the most calories
$current_sum = 0; // keep track of current elf's total calories during loop

foreach ($data as $i=>$calories) {
    $current_sum += (int)$calories; // add the item's calories to the current elf's total
    if (!$calories OR $i === count($data)-1) { // match an empty line or last line
        if ($current_sum > $highest_sum) {
            $highest_sum = $current_sum;
        }
        $current_sum = 0; // finished checking current elf's calories. Reset to 0 for next elf.
    }
}

echo "Highest Sum: $highest_sum";