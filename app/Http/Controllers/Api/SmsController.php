<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SmsController extends Controller
{
    public function send(){
// Query args
$query = http_build_query(array(
    'token' => 'Go-Create-an-API-token',
    'sender' => 'ExampleSMS',
    'message' => 'Hello World',
    'recipients.0.msisdn' => +353874146903,
));
// Send it
$result = file_get_contents('https://gatewayapi.com/rest/mtsms?' . $query);
// Get SMS ids (optional)
return (json_decode($result)->ids);
}
}
