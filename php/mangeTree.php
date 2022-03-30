<?php
  // check if isset request post for saving the tree
  if($_SERVER['REQUEST_METHOD'] == "POST"){
    $tree = json_decode($_POST["tree"]);
    $val = saveTree($tree);
    echo "Tree Is Saved Successfully with value = " . $val;
  }

  if($_SERVER['REQUEST_METHOD'] == "GET" && isset($_GET["getTree"])){
    echo readTree();
  }

  function saveTree ($tree) {
    $file = "./tree.json";
    $handel =  fopen($file , "w");
    $data = file_put_contents($file , json_encode($tree));
    fclose($handel);
    return $data; // check it > 0 or not
  }

  function readTree () {
    $file = "./tree.json";
    file_exists($file) ? null : touch($file);
    $handel = fopen($file , "r");
    $data = file_get_contents($file);
    fclose($handel);
    return $data ; // return all data from file
  }

