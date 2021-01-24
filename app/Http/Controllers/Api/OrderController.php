<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\OrderCollection;
use App\Http\Resources\OrderMenuCollection;
use App\Shop;
use App\User;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

use App\Order;
use App\OrderMenu;
use App\CreateTbl;
use Carbon\Carbon;
use App\Notifications\NewOrderNote;
use App\Notifications\ClientResNote;
class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeFood(Request $request,$tbl_string)
    {//return "storeFood1 success".$request->input('0.fname');
        $this->validate($request, [
            '*.fid' => ['distinct','string','max:30','nullable','regex:/(^[A-Za-z0-9 ]+$)+/'],
            '*.fname' => ['string','min:2','max:30','required','regex:/(^[A-Za-z0-9\s]+$)+/'],
            '*.price' => 'required|numeric|between:0,200|regex:/^\d+(\.\d{1,2})?+$/',
            '*.subTotal' => 'required|numeric|between:0,1000|regex:/^\d+(\.\d{1,2})?+$/',
            '*.orderQty' => 'required|numeric|between:1,80|regex:/^\d+(\.\d{1,2})?+$/',
            '*.mainAttach.*' => ['string','max:30','nullable','regex:/(^[A-Za-z0-9\s]+$)+/'],
           ]);
        $data=$request->input();
        foreach($data as $food){
            if($food['fname']){
                $orderFood=new OrderMenu();
                $tbl_name="order_".$tbl_string;
                $orderFood->setTable($tbl_name);
                $orderFood->fid=$food['fid'];
                $orderFood->fname=$food['fname'];
                $orderFood->price=$food['subTotal'];
                $orderFood->qty=$food['orderQty'];
                // $orderFood->catNum=$index;
                // $orderFood->cat=$cat[$index];
                
                // $orderFood->isMain=$isMain[$index];
                $attach='';
                foreach($food['mainAttach'] as $mainAttach){
                    if(isset($mainAttach)){
                        $attach=$attach.' '.$mainAttach;
                    }
                }
                $orderFood->main_attach=$attach;
                $orderFood->save();
                
            }
            
        }
        return "storeFood success";
    // if($data[0].fname){  
    //     // if($request->has('fname')){
    //         return "storeFood1 success".$request->input('0.fname');
    //     //$cat=$request->cat;
    //     //return "here in contrller";
    //     $fid=$request->fid;
    //     $fname=$request->fname;
    //     $price=$request->price;
        
    //     $note=$request->note;
    //     $qty=$request->qty;
        
    //     // $isMain=$request->isMain;
    //    }
        
    //    if(isset($fname)){
    //        for($i=0;$i<sizeof($fname);$i++){
    //         if(isset($fname[$i])){
    //             $orderFood=new OrderMenu();
    //             $tbl_name="order_".$tbl_string;
    //             $orderFood->setTable($tbl_name);
                
    //             $orderFood->fid=$fid[$i];
    //             $orderFood->fname=$fname[$i];
    //             $orderFood->price=$price[$i];
    //             $orderFood->qty=$qty[$i];
    //             // $orderFood->catNum=$index;
    //             // $orderFood->cat=$cat[$index];
                
    //             // $orderFood->isMain=$isMain[$index];
    //             if(isset($note[$i])){
    //                 $orderFood->note=$note[$i];
    //             }
                

    //             $orderFood->save();
    
            
        
        
    
    }
    public function store(Request $request,$tbl_string)
    {
        
        $this->validate($request, [
            'isDeli'=>'required|boolean',
            'custPhone' => 'required|string|min:10|max:40',
            'custAddr' => 'string|required_if:isDeli,true|min:5|max:60|nullable',
            'orderMobile' => 'string|max:40|nullable',
            'cardPay'=>'required|boolean',
            'orderMsg'=>'string|max:120|nullable',
            'deliPrice'=>'numeric|required_if:isDeli,true|between:0,30|nullable',
            // 'orderMobile' => 'string|max:40',
            //'frPrice'=>'numeric|between:0,10|
            // 'cterMobl' => 'required|string|min:10|max:40',
            
            
            ]);
    //    if($request->has('fname')){        
    //     $cat=$request->cat;
    
     $tblName="order_".$tbl_string;
    //  $order->orderFoodTbl=$tblName;
    $old= Order::where('orderFoodTbl', $tblName)->first();
    if($old)$old->delete();
    $order=new Order();
    $s=explode('_',$tbl_string,2);

    $order->shop_id=$s[0];
    $deliPrice=$request->deliPrice;
     if($deliPrice=="max"){$deliPrice=5;}
    $order->paidAmt=0;
    $order->amtToPay=$request->sum+$deliPrice;
    $order->cname=$request->cname;
     $order->deliAddr=$request->custAddr;
     $order->contactPhone=$request->custPhone;
    
     //$order->order_mobl=$request->orderMobile;
     $order->email="";
     $order->cardPay=$request->cardPay;
     $order->order_msg=$request->orderMsg;
     $order->deliPrice=$deliPrice;
     $order->isDeli=$request->isDeli;
     //$order->orderRef=$request->orderRef;
     $tblName="order_".$tbl_string;
     $order->orderFoodTbl=$tblName;
     
     $order->isComplete=0;
     $order->clientRes=0;
     $order->save();
        $createTbl=new CreateTbl();
        $createTbl->create_orderFoodTbl($tblName);
            
        return "order success";
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function matchPwd(Request $request,$tbl_string)
    {
        
        $this->validate($request, [
           
            'phonePwd' => 'required|string|min:5|max:5',
            
            ]);
        $foods=new OrderMenu();
        $tbl_name="order_".$tbl_string;
        $foods->setTable($tbl_name);
        if (Schema::hasTable($tbl_name))
        $food=new OrderMenuCollection($foods->get());
      
        $tblName="order_".$tbl_string;
       
        $order= Order::where('orderFoodTbl',$tblName)->first();
        $shop_id=$order->shop_id;
        $orderId=$order->id;
        $shop=Shop::find($shop_id);
        $user_id=$shop->user->id;
        if($shop->order_mobl){
            $clientph=$shop->order_mobl;}else{
                $clientph=$shop->cter_mobl;  
            }
        if($request->has("phonePwd")){
            if($order->order_pwd===$request->phonePwd){
          // { event(new \App\Events\SendMessage($order,$food));
            $order->isComplete=true;
            $order->save();
            { event(new \App\Events\NewOrder($order,$food,$user_id));
           
            $user=User::where("id",$user_id)->first();
            $user->notify(new NewOrderNote($order->id));
            
            //$this->sendSMS($order->order_mobl);
           
                return "pwd matched";}
        }else return "wrong password";
    }
    }
    public function sendSMS($orderMobl){
        // Account details
	$apiKey = urlencode('HzkpF5ghup4-nbc0VzgoqdDWDLv1fIziHgmdu4trc7');
	
	// Message details
	//$numbers = array($orderMobl, 447987654321);
	$sender = urlencode('Eat Chinese.ie');
	$message = rawurlencode('Your phone confirmation code is');
 
	//$numbers = implode(',', $numbers);
 
	// Prepare data for POST request
	$data = array('apikey' => $apiKey, 'numbers' => $orderMobl, "sender" => $sender, "message" => $message);
 
	// Send the POST request with cURL
	$ch = curl_init('https://api.txtlocal.com/send/');
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($ch);
	curl_close($ch);
	
	// Process your response here
	echo $response;
    }
    public function sendSMStoClient($clientph,$orderId){
        // Account details
	$apiKey = urlencode('HzkpF5ghup4-nbc0VzgoqdDWDLv1fIziHgmdu4trc7');
	
	// Message details
    //$numbers = array($orderMobl, 447987654321);
    //$order=Order::
	$sender = urlencode('Eat Chinese.ie');
	$message = rawurlencode('You have new order ID:'.$orderId);
 
	//$numbers = implode(',', $numbers);
 
	// Prepare data for POST request
	$data = array('apikey' => $apiKey, 'numbers' => $clientph, "sender" => $sender, "message" => $message);
 
	// Send the POST request with cURL
	$ch = curl_init('https://api.txtlocal.com/send/');
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($ch);
	curl_close($ch);
	
	// Process your response here
	echo $response;
    }
    public function getFood($tbl_string){
        
        $orderFood=new OrderMenu();
        $tbl_name="order_".$tbl_string;
        $orderFood->setTable($tbl_name);
         //return new OrderMenuCollection($orderFood->get());
        return $orderFood->get();
    }
    public function show()
    {
        if (Auth::check())
        {
            $shops=User::find(Auth::id())->shops;
        }
          
        $date = Carbon::now()->subWeeks(3);
        
        if(isset($shops)){
        foreach($shops as $shop){
            $data= Shop::find($shop->id)->orders->where('isComplete',1);
            
               
            $i=0;
            foreach ($data as $order) {
                if(!empty($order)){
                    
                    if($date<$order->updated_at){
                $orders[$i]=$order;
                $i++;
            }
                
                }
               
            }
        }}
         //$orders['user_id']=Auth::id();
         //$orders['user']=15;
        if(isSet($orders)){
        return (new OrderCollection($orders))
        // ->additional(...)
        //this data is attached in resource file
        
        ;}
        else return ;
//return response()->json($orders);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function custShow($tbl_string)
    {
        
        $food=new OrderMenu();
        $tbl_name="order_".$tbl_string;
        $food->setTable($tbl_name);
        if (Schema::hasTable($tbl_name))
        
          $data['food']= new OrderMenuCollection($food->get());
       

        $tblName="order_".$tbl_string;
        // $current = Carbon::now();
        // $date =$current->subWeeks(3);
        
        //$order= Order::where('orderFoodTbl',$tblName)->where('updated_at','>',$date)->get();
        $order= Order::where('orderFoodTbl',$tblName)->get();
            
        $data['order']=new OrderCollection($order);
                if(!empty($order) && !empty($data['food'])){
                    return $data;
                    
                }else return ;
            
      
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $tbl_string)
    {
        
        $tblName="order_".$tbl_string;
        
        $order= Order::where('orderFoodTbl',$tblName)->first();
    //  if($deliPrice=="max"){$deliPrice=5;}
    // $order->paidAmt=0;
    // $order->amtToPay=$request->sum+$deliPrice;
    // $order->cname=$request->cname;
    //  $order->deliAddr=$request->custAddr;
    //  $order->contactPhone=$request->custPhone;
    if($request->has("orderMobile")){
        $order->order_mobl=$request->orderMobile;
    }
    if($request->has("orderPwd")){
        $order->order_pwd=$request->orderPwd;
        $order->pwd_created = \Carbon::now();
    }
    if($request->has("paidAmt")){
        $order->paidAmt=$request->paidAmt;
    }
    if($request->has("isComplete")){
        $order->isComplete=$request->isComplete;
    }
    //  $order->email="";
    //  $order->cardPay=$request->cardPay;
     
    //  $order->deliPrice=$deliPrice;
    //  $order->delivery=$request->isDeli;
    //  //$order->orderRef=$request->orderRef;
    //  $tblName="order_".$tbl_string;
    //  $order->orderFoodTbl=$tblName;
     
    //  $order->isComplete=0;
    //  $order->cilentRes=0;
     $order->save();
        // $createTbl=new CreateTbl();
        // $createTbl->create_orderFoodTbl($tblName);
        if($request->isComplete===true){
            event(new \App\Events\SendMessage($order->get()));
        }
        return "order update success";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function clientUpdate(Request $request, $tblName)
    {
        $order= Order::where('orderFoodTbl',$tblName)->first();
    
    if($request->has("clientRes")){

        $order->clientRes=$request->clientRes;
    }
    
        $order->save();
       return "clientRes success";}
       public function clientUpdate2(Request $request, $tblName)
       {
           $order= Order::where('orderFoodTbl',$tblName)->first();
       
       if($request->has("clientRes")){
   
           $order->clientRes=$request->clientRes;
       }
       
           $order->save();
           $order_id=$order->id;
            event(new \App\Events\ClientRes($order_id));
           $user=$session($order_id);
            //$user=User::where("id",$user_id)->first();
            $user->notify(new ClientResNote($order_id));
          return "clientRes2 success";}
    public function destroy($id)
    {
        //
    }
}
