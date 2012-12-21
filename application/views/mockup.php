<?php include 'include/header.php';?>

<?php  if(!empty($step)) include 'include/header-benefits.php'; ?>

<?php 

if(empty($step)) $step = 'frontpage';

include "include/$step.php";

?>

<?php if(!empty($step)) include 'include/footer-benefits.php';?>

<?php include 'include/footer.php';?>
