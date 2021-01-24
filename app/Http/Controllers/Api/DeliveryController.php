<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Delivery as DeliveryResource;
use App\Delivery;
use Illuminate\Support\Facades\Auth;
use App\Shop;

class DeliveryController extends Controller
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
    public function store(Request $request,$shopId)
    {
        $this->validate($request, [
            'dist1'=>'required|numeric|min:1|max:10',
            'dist15'=>'required|numeric|min:1|max:30',
            'dist2'=>'required|numeric|min:1|max:30',
            'dist25'=>'required|numeric|min:1|max:30',
            'dist3'=>'required|numeric|min:1|max:30',
            'dist4'=>'required|numeric|min:1|max:30',
            //'dist5'=>'required|numeric|min:1|max:30',
            'servLimit'=>'required|numeric|min:1|max:30',
        ]);
        $deli=new Delivery();
        //validation goes here
        $dist1=$request->dist1;
        $dist15=$request->dist15;
        $dist2=$request->dist2;
        $dist25=$request->dist25;
        $dist3=$request->dist3;
        $dist4=$request->dist4;
        $servLimit=$request->servLimit;
        if($dist1 && $dist15 && $dist2 && $dist25 && $dist3 && $dist4 && $servLimit)
        {
        $deli->dist1=$dist1;
        $deli->dist15=$dist15;
        $deli->dist2=$dist2;
        $deli->dist25=$dist25;
        $deli->dist3=$dist3;
        $deli->dist4=$dist4;
        $deli->servLimit=$servLimit;
        $deli->shop_id=$shopId;
        }
                $deli->save();
            
                
           
       
            
        return "delivery success";
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function custShow($shopId)
    {
        $data=Delivery::where('shop_id',$shopId)->first();
        return (new DeliveryResource($data));
    }
    public function show()
    {
        
        if(Auth::check()){
            $shop=Auth::user()->shops->first();
            if($shop->delivery){
                $data=$shop->delivery;
                
                return (new DeliveryResource($data))
                ->additional(['meta' => [
                    'shop_id' => $shop->id,
                    
                ]])
                ;
            
            }else return "no deli";
        }
       // $data=Shop::find($shop_id)->delivery;
        
        
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
    public function update(Request $request)
    {
        $this->validate($request, [
            'dist1'=>'required|numeric|min:1|max:10',
            'dist15'=>'required|numeric|min:1|max:30',
            'dist2'=>'required|numeric|min:1|max:30',
            'dist25'=>'required|numeric|min:1|max:30',
            'dist3'=>'required|numeric|min:1|max:30',
            'dist4'=>'required|numeric|min:1|max:30',
            //'dist5'=>'required|numeric|min:1|max:30',
            'servLimit'=>'required|numeric|min:1|max:30',
            
            // 'ac_name' => 'required|string|min:5|max:30',
            
            // 'owner_name' => 'required|string|min:5|max:30',
            // //'tel' => 'required|string|max:40',
            // 'ownerPh' => 'required|string|min:10|max:40',
            // 'contactPh' => 'required|string|min:10|max:40',
            // 'sort_code'=>'required|string|min:6|max:8',
            // 'account'=>'required|numeric|digits_between:8,20',
            // 'licenseFile'=>'required|image|mimes:jpeg,jpg,bmp,png,pdf|max:10240',
            // 'statemtFile'=>'required|image|mimes:jpeg,jpg,bmp,png,pdf|max:10240',
                ]); 
        if(Auth::check()){
            $shop=Auth::user()->shops->first();
            if($shop->delivery){
                $deli=$shop->delivery;
            }
            if ($deli->id===$request->id){
        //         return 
        // $deli=new Delivery();
        //validation goes here
        $dist1=$request->dist1;
        $dist15=$request->dist15;
        $dist2=$request->dist2;
        $dist25=$request->dist25;
        $dist3=$request->dist3;
        $dist4=$request->dist4;
        $servLimit=$request->servLimit;
        $shop_id=$request->shop_id;
        if($dist1 && $dist15 && $dist2 && $dist25 && $dist3 && $dist4 && $servLimit)
        {
        $deli->dist1=$dist1;
        $deli->dist15=$dist15;
        $deli->dist2=$dist2;
        $deli->dist25=$dist25;
        $deli->dist3=$dist3;
        $deli->dist4=$dist4;
        $deli->servLimit=$servLimit;
        $deli->shop_id=$shop_id;
        }
                $deli->save();
            
                
           
       
            
        return "delivery update success";}
    }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
