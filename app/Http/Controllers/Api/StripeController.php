<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Order;

class StripeController extends Controller
{
// 	public function calculateOrderAmount($items) {
	
// 	return 1400;
// }
    public function create_pay_intent(Request $request,$orderTblString){
      $order=Order::where("orderFoodTbl","order_".$orderTblString)->first();

      $amount=$order->amtToPay;


\Stripe\Stripe::setApiKey('sk_test_51GuqPBLx5fJpovNGfvSJT0ovDV5yHOMRjBlhNUb5r8KUc6nhUNZtZ65ZkT9iQ4Jy1NK29XFHRbM5VVylvcyvIxCk00guYk0ZiZ');

$paymentIntent = \Stripe\PaymentIntent::create([
  'amount' => $amount*100,
  'currency' => 'eur',
  // Verify your integration in this guide by including this parameter
  'metadata' => ['integration_check' => 'accept_a_payment'],
]);
///////



$output = [
	'publishableKey' => 'pk_live_t6WFawJhbcATbMxosytarjxj00iG9wamGk',
	'clientSecret' => $paymentIntent->client_secret,
];

return json_encode($output);
    }
}
