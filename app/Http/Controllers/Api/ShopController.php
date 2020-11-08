<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Shop as ShopResource;
use App\Shop;
use App\Menu;
//use App\Delivery;
use App\User;
use App\CreateTbl;
use Image;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
//use Auth;
class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $user = Auth::user();
        
        return ShopResource::collection(Shop::all());
         //return new ShopResource(Shop::all());
        // $data=Shop::all();
        //  return response()->json($data);
        //return view('client.forms');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function api()
    {
        //return ShopResource::collection(Shop::all());
        return new ShopResource(Shop::find(1));
    }
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
        $shop=new Shop;
       
        //$shop->user_id=Auth::id();auth('api')->user()
        //return "auth uer id ".Auth::id()."tttttttt";
        $shopName=$request->get('shopName');
        $area=$request->get('area');
        $shop->user_id=Auth::id();
        $shop->shop_id=$shopName.$area;
        $shop->name=$shopName;
        $shop->addr=$request->get('addr');
        $shop->area=$area;
        
        $shop->owner_name=$request->get('ownerName');
        $shop->owner_mobl=$request->get('ownerMobl');
        $shop->phone=$request->get('phone');
        $shop->cter_mobl=$request->get('cterMobl');
        $shop->order_mobl=$request->get('orderMobl');
        
        $shop->is_completed=false;
        $shop->week_open=$request->get('weekOpen');
        $shop->week_close=$request->get('weekClose');
        $shop->fri_open=$request->get('friOpen');
        $shop->fri_close=$request->get('friClose');
        $shop->sat_open=$request->get('satOpen');
        $shop->sat_close=$request->get('satClose');
        $shop->sun_open=$request->get('sunOpen');
        $shop->sun_close=$request->get('sunClose');
        $shop->prom_txt1=$request->get('promTxt1');
        $shop->prom_txt2=$request->get('promTxt2');
        $shop->prom_txt3=$request->get('promTxt3');
       
         // Handle File Upload
         if($request->hasFile('image')){
            
            $photo=$request->file('image');
            $filenameWithExt = $photo->getClientOriginalName();
        
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        
            $extension = $photo->getClientOriginalExtension();
        
            $fileNameToStore= $filename.'_'.time().'.'.$extension;
            
            Image::make($photo)->resize(1280,720)->save(public_path('storage/shop_img/'.$fileNameToStore));                
           
          
            //Image::make($imgF)->resize(null,300)->save(public_path('test_img/'.$fileNameToStore));
        
            }
            else{
                //$fileNameToStore = 'no-user.jpg';
                $fileNameToStore='no-user.jpg';
            } 
            $shop->img=$fileNameToStore;

        if($request->hasFile('promPic')){
                             
                $photo=$request->file('promPic');
              
                $filenameWithExt = $photo->getClientOriginalName();
            
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            
                $extension = $photo->getClientOriginalExtension();
            
                $fileNameToStore= $filename.'_'.time().'.'.$extension;
                
                Image::make($photo)->resize(null,200)->save(public_path('storage/shop_img/'.$fileNameToStore));                
                
                //$tbl_img='img'.$i;
                $shop->img1=$fileNameToStore;     
            }  
            // else{
                
           
            //     $shop->img1='no-user.jpg'; 
            // }    
              
        if($request->hasFile('promPic2')){
                 
            $photo=$request->file('promPic2');
            $filenameWithExt = $photo->getClientOriginalName();
        
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        
            $extension = $photo->getClientOriginalExtension();
        
            $fileNameToStore= $filename.'_'.time().'.'.$extension;
               
            Image::make($photo)->resize(null,200)->save(public_path('storage/shop_img/'.$fileNameToStore));                
            $shop->img2=$fileNameToStore;     
            
         }
        //else{
                
           
        //     $shop->img2='no-user.jpg'; 
        // } 
        if($request->hasFile('promPic3')){
                 
            $photo=$request->file('promPic3');
            $filenameWithExt = $photo->getClientOriginalName();
        
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        
            $extension = $photo->getClientOriginalExtension();
        
            $fileNameToStore= $filename.'_'.time().'.'.$extension;
               
            Image::make($photo)->resize(null,200)->save(public_path('storage/shop_img/'.$fileNameToStore));                
            $shop->img3=$fileNameToStore;     
            
        }
        // else{
                
           
        //     $shop->img3='no-user.jpg'; 
        // } 
         
        $shop->save();
        
        //create a menu tbl
        $newTbl=new CreateTbl();
        $newTbl->create_menu_tbl();
        $newTbl->create_menu_tbl();
        return "shop success";
        //return view('client.forms');
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        //check if menu create

        $shops=User::find(Auth::id())->shops;
        if($shops->count()>0){
        foreach ($shops as $shop) {
            $sid=$shop->id;
            $sname=$shop->name;
            $sarea=$shop->area;
            $tbl_name='menu_'.$sname.$sarea.$sid;
            //check if menu is set
            $menu=new Menu();
            $menu->setTable($tbl_name);
            $noMenu="";
            if($menu->count()<1){
                $noMenu=$sname.$sarea.$sid;
            }
            //check if delivery is set
            //$deli=new Delivery();
            $deli=$shop->delivery;
            
            $noDeli="";
            
            if(!$deli){
                $noDeli=$sname.$sarea.$sid;
            }
        }
                
        //return  ShopResource::collection($shops);
        return  ShopResource::collection($shops)->additional(['meta' => [
            'noMenu' => $noMenu,
            'noDeli' => $noDeli,
            'user_id'=>Auth::id(),
        ]]);
        }else return;
      
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
        // $this->validate($request, [
        //     'uname' => 'required|string|max:30',
        //     'city' => 'required|string|max:30',
        //     'tel' => 'required|string|max:40',
        //     'intro' => 'required|string|max:700',
        //     'addr1'=>'required|string|max:60',
        //     'addr2'=>'required|string|max:60',
        //     'age'=>'required|numeric|max:99',
        //     'national'=>'string|max:15|nullable',
        //     'shape'=>'string|max:8|nullable',
        //     'skin'=>'string|max:8|nullable',
        //     'height'=>'numeric|max:5|nullable',
        //     'chest'=>'numeric|max:100|nullable',
        //     'waist'=>'numeric|max:100|nullable',
        //     'weight'=>'numeric|max:300|nullable',
        //     'lan1'=>'string|max:15|nullable',
        //     'lan2'=>'string|max:15|nullable',
        //     'lan_des'=>'string|max:45|nullable',
        //     'price30'=>'numeric|max:99999|nullable',
        //     'price1h'=>'numeric|max:99999|nullable',
        //     'price_out'=>'numeric|max:9999999|nullable',
        //     'price_note'=>'string|max:45|nullable',
        //     'service_des'=>'string|max:100|nullable',
        //     'special_serv'=>'string|max:100|nullable',
        //     'western_serv'=>'in:1|nullable',
        //     'img0'=>'image|mimes:jpeg,bmp,png|size:10000|nullable',
        //     'img1'=>'image|mimes:jpeg,bmp,png|size:10000|nullable',
        //     'img2'=>'image|mimes:jpeg,bmp,png|size:10000|nullable',
        //     'img3'=>'image|mimes:jpeg,bmp,png|size:10000|nullable',
        //     'img4'=>'image|mimes:jpeg,bmp,png|size:10000|nullable',
        //     'img5'=>'image|mimes:jpeg,bmp,png|size:10000|nullable',
        //     'img6'=>'image|mimes:jpeg,bmp,png|size:10000|nullable',
        //     'img7'=>'image|mimes:jpeg,bmp,png|size:10000|nullable',
        //     'img8'=>'image|mimes:jpeg,bmp,png|size:10000|nullable',
        //     'img9'=>'image|mimes:jpeg,bmp,png|size:10000|nullable'
        // ]);
        ////
        
        $id=$request->get('id');
        
        if($request->get('id')){
        $id=$request->get('id');
        $shop=Shop::find($id);
       if($shop){
           $original_menu=$shop->name.$shop->area.$shop->id;
       }
        //$shop->user_id=Auth::id();auth('api')->user()
        //return "auth uer id ".Auth::id()."tttttttt";
       
        //$shop->user_id=$request->userId;
        $shop->shop_id=$request->id;
        $shop->name=$request->get('shopName');;
        $shop->addr=$request->get('addr');
        $shop->area=$request->get('area');
        
        $shop->owner_name=$request->get('ownerName');
        $shop->owner_mobl=$request->get('ownerMobl');
        $shop->phone=$request->get('phone');
        $shop->cter_mobl=$request->get('cterMobl');
        $shop->order_mobl=$request->get('orderMobl');
        
        $shop->is_completed=false;
        $shop->week_open=$request->get('weekOpen');
        $shop->week_close=$request->get('weekClose');
        $shop->fri_open=$request->get('friOpen');
        $shop->fri_close=$request->get('friClose');
        $shop->sat_open=$request->get('satOpen');
        $shop->sat_close=$request->get('satClose');
        $shop->sun_open=$request->get('sunOpen');
        $shop->sun_close=$request->get('sunClose');
        $shop->prom_txt1=$request->get('promTxt1');
        $shop->prom_txt2=$request->get('promTxt2');
        $shop->prom_txt3=$request->get('promTxt3');
       
         // Handle File Upload
         if($request->hasFile('image')){
            
            $photo=$request->file('image');
            $filenameWithExt = $photo->getClientOriginalName();
        
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        
            $extension = $photo->getClientOriginalExtension();
        
            $fileNameToStore= $filename.'_'.time().'.'.$extension;
           
            Image::make($photo)->resize(1280,720)->save(public_path('storage/shop_img/'.$fileNameToStore));                
            $shop->img=$fileNameToStore;
          
            //Image::make($imgF)->resize(null,300)->save(public_path('test_img/'.$fileNameToStore));
           
            }
            

        if($request->hasFile('promPic')){
                             
                $photo=$request->file('promPic');
              
                $filenameWithExt = $photo->getClientOriginalName();
            
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            
                $extension = $photo->getClientOriginalExtension();
            
                $fileNameToStore= $filename.'_'.time().'.'.$extension;
                
                Image::make($photo)->resize(null,200)->save(public_path('storage/shop_img/'.$fileNameToStore));                
                
                //$tbl_img='img'.$i;
                $shop->img1=$fileNameToStore;     
            }  
            // else{
                
           
            //     $shop->img1='no-user.jpg'; 
            // }    
              
        if($request->hasFile('promPic2')){
                 
            $photo=$request->file('promPic2');
            $filenameWithExt = $photo->getClientOriginalName();
        
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        
            $extension = $photo->getClientOriginalExtension();
        
            $fileNameToStore= $filename.'_'.time().'.'.$extension;
               
            Image::make($photo)->resize(null,200)->save(public_path('storage/shop_img/'.$fileNameToStore));                
            $shop->img2=$fileNameToStore;     
            
         }
        //else{
                
           
        //     $shop->img2='no-user.jpg'; 
        // } 
        if($request->hasFile('promPic3')){
                 
            $photo=$request->file('promPic3');
            $filenameWithExt = $photo->getClientOriginalName();
        
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        
            $extension = $photo->getClientOriginalExtension();
        
            $fileNameToStore= $filename.'_'.time().'.'.$extension;
               
            Image::make($photo)->resize(null,200)->save(public_path('storage/shop_img/'.$fileNameToStore));                
            $shop->img3=$fileNameToStore;     
            
        }
        // else{
                
           
        //     $shop->img3='no-user.jpg'; 
        // } 
         
        $shop->save();
        
            $new_menu=$request->get('shopName').$request->get('area').$request->get('id');
            //change menu tbl name
            if($original_menu!=$new_menu){
            
                Schema::rename('menu_'.$original_menu, 'menu_'.$new_menu);
            }
        
        return "shop update success";
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function minorUpdate(Request $request)
    {
       if($request->get('id')){
        $id=$request->get('id');
        $shop=Shop::find($id);
        
        if($shop){
            if($request->get('orderMobl'))
            
            $shop->order_mobl=$request->get('orderMobl');
    
    // $shop->is_completed=false;
    // $shop->week_open=$request->get('weekOpen');
    // $shop->week_close=$request->get('weekClose');
    // $shop->fri_open=$request->get('friOpen');
    // $shop->fri_close=$request->get('friClose');
    // $shop->sat_open=$request->get('satOpen');
    // $shop->sat_close=$request->get('satClose');
    // $shop->sun_open=$request->get('sunOpen');
    // $shop->sun_close=$request->get('sunClose');
            if($request->get('promTxt1')){
                $shop->prom_txt1=$request->get('promTxt1');
                $shop->prom_txt2=$request->get('promTxt2');
                $shop->prom_txt3=$request->get('promTxt3');
                }
     // Handle File Upload
     
     if($request->get('offer')){
        $shop->offer=$request->get('offer');
       
        }
     
            if($request->hasFile('promPic')){
                            
                $photo=$request->file('promPic');
            
                $filenameWithExt = $photo->getClientOriginalName();
            
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            
                $extension = $photo->getClientOriginalExtension();
            
                $fileNameToStore= $filename.'_'.time().'.'.$extension;
                
                Image::make($photo)->resize(null,200)->save(public_path('storage/shop_img/'.$fileNameToStore));                
               
                //$tbl_img='img'.$i;
                $shop->img1=$fileNameToStore;     
            }  
            // else{
                
        
            //     $shop->img1='no-user.jpg'; 
            // }    
            
            if($request->hasFile('promPic2')){
                        
                $photo=$request->file('promPic2');
                $filenameWithExt = $photo->getClientOriginalName();
            
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            
                $extension = $photo->getClientOriginalExtension();
            
                $fileNameToStore= $filename.'_'.time().'.'.$extension;
                
                Image::make($photo)->resize(null,200)->save(public_path('storage/shop_img/'.$fileNameToStore));                
                $shop->img2=$fileNameToStore;     
                
            }
    //else{
            
       
    //     $shop->img2='no-user.jpg'; 
    // } 
            if($request->hasFile('promPic3')){
                    
                $photo=$request->file('promPic3');
                $filenameWithExt = $photo->getClientOriginalName();
            
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            
                $extension = $photo->getClientOriginalExtension();
            
                $fileNameToStore= $filename.'_'.time().'.'.$extension;
                
                Image::make($photo)->resize(null,200)->save(public_path('storage/shop_img/'.$fileNameToStore));                
                $shop->img3=$fileNameToStore;     
                
            }
        // else{
                
        
        //     $shop->img3='no-user.jpg'; 
        // } 
        
            $shop->save();
            
            return "shop minorUpdate success";
        }
    
    }
}


    public function getUser(){
        if (Auth::check()){
        if(Auth::user()->role==="client")
        return ["id"=>Auth::id()];
    }
        else return "no user";
    }
    public function destroy($id)
    {
        //
    }
}
