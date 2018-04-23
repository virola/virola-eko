<?php
/**
GET 参数

encode
location
type=forcast/now
t=timestamp
*/

/**
 *
 * 付费用户 https://api.heweather.com/s6/weather/forecast?parameters
普通用户  https://free-api.heweather.com/s6/weather/forecast?parameters

请求方式一(数字签名 推荐)
参数  描述  选择  示例值
location  
1. 城市ID：城市列表
2. 经纬度格式：经度,纬度（经度在前，纬度在后英文,分隔，十进制格式，北纬东经为正，南纬西经为负
3. 城市名称，城市列表
4. 城市名称,上级城市 或 省 或 国家，英文逗号分隔，此方式可以在重名的情况下只获取想要的地区的天气数据，例如 西安,陕西
5. IP
6. 根据请求自动判断，根据用户的请求获取IP，通过 IP 定位并获取城市数据 
必选  
1. location=CN101010100
2. location=116.40,39.9
3. location=北京、 location=北京市、 location=beijing
4. location=朝阳,北京、 location=chaoyang,beijing
5. location=60.194.130.1
6. location=auto_ip

username  用户ID，登录控制台可查看 必选  username=HE161025121212039
t 时间戳，秒级  必选  t=1477455132
sign  数字签名，签名算法 必选  sign=kNWMNt1fGA/m2nIr54afBg==
lang  多语言，可以不使用该参数，默认为简体中文
详见多语言参数 可选  lang=en
unit  单位选择，公制（m）或英制（i），默认为公制单位
详见度量衡单位参数 可选  unit=i


请求方式二(普通方式)
参数  描述  选择  示例值
location  
key 用户认证key，登录控制台可查看  必选  key=xxxxxxxxxxxxxx
lang  多语言，可以不使用该参数，默认为简体中文
详见多语言参数 可选  lang=en
unit  单位选择，公制（m）或英制（i），默认为公制单位
详见度量衡单位参数 可选  unit=i
 */

$USERNAME = 'HE1803231802441153';
$KEY = '6f2d128637e64272975d7a106852e779';
$WEATHER_FORCAST = 'https://free-api.heweather.com/s6/weather/forecast';
$WEATHER_NOW = 'https://free-api.heweather.com/s6/weather/now';

$timestamp = time();
if ($_GET['t']) {
  $timestamp = $_GET['t'];
}

$location = $_GET['location'];
if (empty($location)) {
  $location = '116.40,39.9';
}
$params = array(
  'username' => $USERNAME,
  'location' => $location,
  'key' => $KEY,
  't' => $timestamp,
);

$is_encode = $_GET['encode'];
if ($_GET['type'] == 'forcast') {
  $url = $WEATHER_FORCAST;
}
else {
  $url = $WEATHER_NOW;
}

if ($is_encode) {
  $sign = getSignature($params, $KEY);
  $url = $url.'?username='.$USERNAME.'&location='.$location.'&sign='.$sign;
}
else {
  $url = $url.'?key='.$KEY.'&location='.$location; 
}

$url .= '&t='.$timestamp;
$html = file_get_contents($url);

// decode
$data = json_decode($html);
// var_dump($data);
$output = array(
  'status' => 'ok',
  'data' => array()
);
if (isset($data['HeWeather6']) && $data['HeWeather6']['status'] == 'ok') {
  $output['data'] = $data['HeWeather6'];
}
else {
  $output['status'] = 'error';
  $output['message'] = 'API请求错误';
}

// echo $html;

/**
  * 和风天气签名生成算法-PHP版本
  * @param array $params API调用的请求参数集合的关联数组（全部需要传递的参数组成的数组），不包含sign参数
  * @param $secret 用户的认证 key
  * @return string 返回参数签名值
  */
 function getSignature($params, $secret) {
    $str = '';  //待签名字符串
    //先将参数以其参数名的字典序升序进行排序
    array_filter($params);
    unset($params['sign']);
    unset($params['key']);
    ksort($params);
    //遍历排序后的参数数组中的每一个key/value对
    foreach($params as $k => $v){
        $str .= $k . '=' . $v . '&';
    }
    $str = substr($str,0,strlen($str)-1);
    //将签名密钥拼接到签名字符串最后面
    $str .= $secret;
    //通过md5算法为签名字符串生成一个md5签名，该签名就是我们要追加的sign参数值
    return base64_encode(md5($str, true));
 }