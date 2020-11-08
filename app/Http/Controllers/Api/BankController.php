<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Bank as BankResource;
use Illuminate\Http\Request;
use Image;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Bank;
class BankController extends Controller
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
    public function store(Request $request)
    {
        $bank=new Bank;
        if (Auth::check()) {
            if(!Auth::user()->bank){
            $bank->user_id=Auth::id();
        $bank->ac_name=$request->get('acName');
        $bank->owner_name=$request->get('ownerName');
        $bank->ownerPh=$request->get('ownerPh');
        $bank->contactPh=$request->get('contactPh');
        $bank->sort_code=$request->get('sortCode');
        $bank->account=$request->get('account');
        $bank->iban=$request->get('iban');
        $bank->approved=0;
        //return "auth uer id ".Auth::id()."tttttttt";
        
        
        
        
         // Handle File Upload
         if($request->hasFile('licenseFile')){
            
            $photo=$request->file('licenseFile');
            $filenameWithExt = $photo->getClientOriginalName();
        
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        
            $extension = $photo->getClientOriginalExtension();
        
            $fileNameToStore= $filename.'_'.time().'.'.$extension;
            
            Image::make($photo)->resize(null,200)->save(public_path('storage/bank_img/'.$fileNameToStore));                
           
        
        
            }
            else{
                //$fileNameToStore = 'no-user.jpg';
                $fileNameToStore='no-license';
            } 
            $bank->license=$fileNameToStore;
// $bank->liscense="nopic";
// $bank->statemt="nopic";
if($request->hasFile('statemtFile')){
            
    $photo=$request->file('statemtFile');
    $filenameWithExt = $photo->getClientOriginalName();

    $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);

    $extension = $photo->getClientOriginalExtension();

    $fileNameToStore= $filename.'_'.time().'.'.$extension;
    
    Image::make($photo)->resize(null,200)->save(public_path('storage/bank_img/'.$fileNameToStore));                
   


    }
    else{
        //$fileNameToStore = 'no-user.jpg';
        $fileNameToStore='no-statemt';
    } 
    $bank->statemt=$fileNameToStore;
    $bank->approved=0;
        $bank->save();
        
        
        
        return "bank store success";
        //return view('client.forms');
        }return "you have registered already";}
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        if(Auth::check()){
            $id=Auth::id();
        $data=User::find($id)->bank;
        
        return new BankResource($data);
    }
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
        
           
            if (Auth::check()) {
                $bank=Auth::user()->bank;
            $bank->user_id=Auth::id();
            $bank->ac_name=$request->get('ac_name');
            $bank->owner_name=$request->get('owner_name');
            $bank->ownerPh=$request->get('ownerPh');
            $bank->contactPh=$request->get('contactPh');
            $bank->sort_code=$request->get('sort_code');
            $bank->account=$request->get('account');
            $bank->iban=$request->get('iban');
            $bank->approved=0;
           
            
             // Handle File Upload
             if($request->hasFile('licenseFile')){
                
                $photo=$request->file('licenseFile');
                $filenameWithExt = $photo->getClientOriginalName();
            
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            
                $extension = $photo->getClientOriginalExtension();
            
                $licenseNameToStore= $filename.'_'.time().'.'.$extension;
                
                Image::make($photo)->resize(null,200)->save(public_path('storage/bank_img/'.$fileNameToStore));                
               
                $bank->license=$licenseNameToStore;
            
                }
                // else{
                //     //$fileNameToStore = 'no-user.jpg';
                //     $fileNameToStore='no-license';
                // } 
                
    // $bank->liscense="nopic";
    // $bank->statemt="nopic";
    if($request->hasFile('statemtFile')){
                
        $photo=$request->file('statemtFile');
        $filenameWithExt = $photo->getClientOriginalName();
    
        $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
    
        $extension = $photo->getClientOriginalExtension();
    
        $statemtNameToStore= $filename.'_'.time().'.'.$extension;
        
        Image::make($photo)->resize(null,200)->save(public_path('storage/bank_img/'.$fileNameToStore));                
       
        $bank->statemt=$statemtNameToStore;
    
        }
        
        
        $bank->approved=0;
            $bank->save();
            
            
            
            return "bank update success";
            //return view('client.forms');
            //}return "you have registered already";}
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
