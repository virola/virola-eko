<?php

//URL是远程的完整图片地址，不能为空, $filename 是另存为的图片名字 
//默认把图片放在以此脚本相同的目录里 
function grabImage($url, $filename = ""){ 
  //$url 为空则返回 false; 
  if ($url == "") {
    return false;
  }

  $ext = strrchr($url, ".");//得到图片的扩展名 
  if ($ext != ".gif" && $ext != ".jpg" && $ext != ".bmp") {
    echo "格式不支持！";
    return false;
  }

  if ($filename == "") {
    $filename = date('Y-m-d')."$ext";
  }
  //以时间戳另起名 
  //开始捕捉 
  ob_start(); 
  readfile($url); 
  $img = ob_get_contents(); 
  ob_end_clean(); 

  $size = strlen($img); 
  $fp2 = fopen($filename , "a"); 
  fwrite($fp2, $img); 
  fclose($fp2);

  return $filename; 
} 