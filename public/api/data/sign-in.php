<?php
session_start();

$postData = json_decode(file_get_contents('php://input'), true);

$_SESSION['user'] = $postData['email'];

$output = [
    'success'=> true,
    'message'=> 'signed_in',
    'email'=> $postData['email']
];

print(json_encode($output));