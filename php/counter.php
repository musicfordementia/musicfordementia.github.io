<?php
$myfile = fopen("../count/total.txt", "r") or die("Unable to open file!");
echo fread($myfile,filesize("total.txt"));
fclose($myfile);
?>