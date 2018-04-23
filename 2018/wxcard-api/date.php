<?php
/**
 * 接受GET参数：
 * date = 2018-4-19
 */

include 'lib/nongli.php';

$target_date = time();
if ($_GET['date']) {
  $target_date = strtotime($_GET['date']);
  if (!$target_date) {
    $target_date = time();
  }
}

$datalist = array();

for ($i=0; $i < 7; $i++) {
  $theday = $target_date - 24 * 60 * 60 * $i;

  // that day
  $year = date('Y', $theday);
  $month = date('m', $theday);
  $date = date('d', $theday);

  $lunar = new Lunar();
  $yinli = $lunar->convertSolarToLunar($year, $month, $date);
  $jieqi = $lunar->getJieQi($year, $month, $date);

  // 是节气当天
  if ($jieqi['name1'] == $jieqi['name2']) {
    $jqdate = $jieqi['name1'];
  } else {
    $jqdate = '';
  }
  // that day
  $thisday = array(
    'date' => array(
      'format' => $month.'.'.$date
    ),
    'lunar' => array(
      'date' => $yinli[1].$yinli[2],
      'year' => $yinli[3].$yinli[6].'年'
    ),
    'solar_term' => array(
      'format' => $jqdate
    )
  );
  $datalist[] = $thisday;
}
echo json_encode(array(
  'status' => 'ok',
  'data' => $datalist
));
