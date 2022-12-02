<?php
// 2022 - Day 2 - P2
$data = file("input.txt", FILE_IGNORE_NEW_LINES); // import file as array

$shape_map = array( // to get p2 shape based on what p1 played
    "A" => array (
        "wins_to" => "scissors",
        "loses_to" => "paper",
        "draw" => "rock"
    ),
    "B" => array (
        "wins_to" => "rock",
        "loses_to" => "scissors",
        "draw" => "paper"
    ),
    "C" => array (
        "wins_to" => "paper",
        "loses_to" => "rock",
        "draw" => "scissors"
    ),
);

$pt_map = array( // points for each case. Loss is ignored since it gains 0 points
    "win" => 6,
    "draw" => 3,
    "rock" => 1,
    "paper" => 2,
    "scissors" => 3
);

$my_score = 0;
foreach ($data as $rps) { // $rps stands for rock paper scissors
    $p1 = $rps[0]; // [0] means 1st character of the string
    $p2 = $rps[2]; // [2] because data looks like "A X", so $rps[1] is " "
    
    if ($p2 === "X") {
        $my_score += $pt_map[$shape_map[$p1]["wins_to"]];
    } else if ($p2 === "Y") {
        $my_score += $pt_map[$shape_map[$p1]["draw"]] + $pt_map['draw'];
    } else {
        $my_score += $pt_map[$shape_map[$p1]["loses_to"]] + $pt_map['win'];
    }
}

echo "My Score: $my_score";