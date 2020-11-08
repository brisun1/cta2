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
        
        //validation goes here
    //    if($request->has('fname')){        
    //     $cat=$request->cat;
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
        $foods=new OrderMenu();
        $tbl_name="order_".$tbl_string;
        $foods->setTable($tbl_name);
        if (Schema::hasTable($tbl_name))
        $food=new OrderMenuCollection($foods->get());
      
        $tblName="order_".$tbl_string;
       
        $order= Order::where('orderFoodTbl',$tblName)->first();
        $shop_id=$order->shop_id;
        $user_id=Shop::find($shop_id)->user->id;

        if($request->has("phonePwd")){
            if($order->order_pwd===$request->phonePwd){
          // { event(new \App\Events\SendMessage($order,$food));
            $order->isComplete=true;
            $order->save();
            { event(new \App\Events\NewOrder($order,$food,$user_id));
            //$this.update()
            /////////////////////
            //$orderMsg="u have new order";
            $user=User::where("id",$user_id)->first();
            $user->notify(new NewOrderNote($order->id));
            ////////////////////
                return "pwd matched";}
        }else return "wrong password";
    }
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
    public function destroy($id)
    {
        //
    }
}
