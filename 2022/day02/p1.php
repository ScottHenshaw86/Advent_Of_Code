<?php
// 2022 - Day 2 - P1
$data = file("input.txt", FILE_IGNORE_NEW_LINES); // import file as array

$char_map = array( // map the characters to the shape
    "A" => "rock",
    "B" => "paper",
    "C" => "scissors",
    "X" => "rock",
    "Y" => "paper",
    "Z" => "scissors"
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
    $p1 = $rps[0];
    $p2 = $rps[2]; // data looks like "A X", so $rps[1] is " "
    
    if ($char_map[$p1] === $char_map[$p2]) { // draw
        $my_score += $pt_map["draw"] + $pt_map[$char_map[$p2]];
    } else if ( // I win
        ($char_map[$p1] === "rock" AND $char_map[$p2] === "paper") OR
        ($char_map[$p1] === "paper" AND $char_map[$p2] === "scissors") OR
        ($char_map[$p1] === "scissors" AND $char_map[$p2] === "rock")
    ) {
        $my_score += $pt_map["win"] + $pt_map[$char_map[$p2]];
    } else { // if I didn't draw or win, I must have lost
        $my_score += $pt_map[$char_map[$p2]];
    }
}

echo "My Score: $my_score";