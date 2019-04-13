<?php

require_once('functions.php');

set_exception_handler('handleError');

require_once('config.php');

require_once('mysqlconnect.php');

$output = [
    'success'=> false,
];

$token =$_SESSION['user_data']['token'];


$delete_query = "DELETE FROM `user_connections` WHERE `token`='$token'";

$result = mysqli_query($conn,$delete_query);

if(empty($_SESSION['user_data']['token'])){
    $output['success']= true;
    $output['message']= 'you were not logged in';
    print(json_encode($output));
    exit();
}

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn) !== 1) {
    throw new Exception('unable to logout');
}

$output['success']= true;
$output['message']= 'log out successful';

unset($_SESSION['user_data']);

$json_output= json_encode($output);

print_r($json_output);

?>