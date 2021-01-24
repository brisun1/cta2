<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Shop;
use App\Menu;
use App\Http\Resources\MenuCollection;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    // function __construct(Request $request ,$shop_id)
    // {
        
    //     $shop=Shop::find($shop_id)->get();
    //     $sid=$shop->id;
    //     $sname=$shop->name;
    //     $sarea=$shop->area;
    //     $tbl_name='menu_'.$sname.$sarea.$sid;
    //     $this->setTable($tbl_name);
        
    // }
        
    public function index()
    {
       $menu=Menu::all();
        
        //  return response()->json($data);
        return view('client.menuForm')->with('menu',$menu);
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
    public function store(Request $request, $str_table)
    {
        //cat fid fname catNum price note
        // $f=$request->fname;
        // return $f[2];
        $this->validate($request, [
            'cat.*'=>['required','distinct','max:20','regex:/(^[A-Za-z0-9 ]+$)+/'],
            'fid.*' => ['distinct','string','max:30','required_with:fname.*','nullable','regex:/(^[A-Za-z0-9 ]+$)+/'],
            'fname.*' => ['string','max:30','required_with:fid.*','nullable','regex:/(^[A-Za-z0-9\s]+$)+/'],
            'price.*' => 'numeric|between:0,200|required_with:fname.*|nullable|regex:/^\d+(\.\d{1,2})?+$/',
            'note.*' => 'string|max:30|regex:/^[\w,:\s\-\.]+$/|nullable ',
            'isMains.*'=>'required|boolean',
            'frPrice'=>'numeric|between:0,10|regex:/^\d+(\.\d{1,2})?+$/|nullable',
            'catNum.*'=>'required|numeric|min:0|max:50'
            ]);
            // 'area' => 'bail|required|string|min:2|max:20',
            // 'addr' => 'required|string|min:5|max:60',
            // 'ownerName' => 'required|string|min:5|max:30',
            // //'tel' => 'required|string|max:40',
            // 'ownerMobl' => 'required|string|min:10|max:40',
            // 'phone' => 'required|string|min:10|max:40',
            // 'cterMobl' => 'required|string|min:10|max:40',
            // 'orderMobl' => 'string|max:40|nullable',
            // 'weekOpen'=>'required|date_format:H:i',
            // 'weekClose'=>'required|date_format:H:i',
            // 'friOpen'=>'required|date_format:H:i',
            // 'friClose'=>'required|date_format:H:i',
            // 'satOpen'=>'required|date_format:H:i',
            // 'satClose'=>'required|date_format:H:i',
            // 'sunOpen'=>'required|date_format:H:i',
            // 'sunClose'=>'required|date_format:H:i',
            // 'promTxt1'=>'string|max:120|nullable',
            // 'promTxt2'=>'string|max:120|nullable',
            // 'promTxt3'=>'string|max:120|nullable',
            // 'promPic'=>'image|mimes:jpeg,jpg,bmp,png,pdf|max:15000|nullable',
            // 'promPic2'=>'image|mimes:jpeg,jpg,bmp,png,pdf|max:10240|nullable',
            // 'promPic3'=>'image|mimes:jpeg,jpg,bmp,png,pdf|max:10240|nullable',
           
        $tbl_name="menu_".$str_table;
        $count = DB::table($tbl_name)->count();
    if($count===0){
       if($request->has('fname')){        
        $cat=$request->cat;
        //return "here in contrller";
        $fid=$request->fid;
        $fname=$request->fname;
        $price=$request->price;
        $catNum=$request->catNum;
        $note=$request->note;
        $isMain=$request->isMain;
       }
        //$msg=var_dump($data));
       // $cat=json_encode($data);
       if(isset($fname)){
           for($i=0;$i<sizeof($fname);$i++){
            if(isset($fname[$i])){
                $menu=new Menu();
                $menu->setTable($tbl_name);
                $index=$catNum[$i];
                $menu->fid=$fid[$i];
                $menu->fname=$fname[$i];
                $menu->price=$price[$i];
                $menu->catNum=$index;
                $menu->cat=$cat[$index];
                //if(!$isMain[$index]){$isMain[$index]=0;}
                //$menu->isMain=$fname[$i]->isMain[$index];
                $menu->isMain=$isMain[$index];
                if(isset($note[$i])){
                    $menu->note=$note[$i];
                }
                

                $menu->save();
            }
                
           }
            $menu=new Menu();
            $menu->setTable($tbl_name);
            $menu->fid="---";
            $menu->fname="Fried rice with main food";
            $menu->price=$request->frice;
            $menu->cat="addition";
            $menu->catNum=99;
            $menu->isMain=0;
            $menu->save();
       }
            
        return "menu success";
    }
        else return "menu register already";
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($str_table)
    {
        // $tbl_bool=checkTable($shop_id);
        // if($tbl_bool==false){return;}
        //return;
        // $menus=new Menu();
        // $i=0;
        // foreach($menus->get() as $menu){
        //     if(isset($menu->fname)){
        //         $data[$i]=$menu;
        //     }
        // }
        $menu=new Menu();
        $tbl_name="menu_".$str_table;
        $menu->setTable($tbl_name);
        if (Schema::hasTable($tbl_name))
        // return;
       //return response()->json($menu->get());
    
   
        
        //     $data=new MenuResource($food);
           
       return new MenuCollection($menu->get());
       else return;
       // return new MenuCollection($data);
      
    //   $data=Shop::find(1);
    //       return response()->json($data);
    
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
    // public function update(Request $request, $string_tbl)
    // {
    //     $this->validate($request, [
    //         'menu.*.fid' => 'distinct|string|max:30',]);
    //     //return "i am a return".json_decode($request->get('menu'));
    //     //$request->get('cats');
    //     $tbl_name="menu_".$string_tbl;
        
    //          $foods=$request->get('menu');
    //          $cats=$request->get('cats');
    //          $isMains=$request->get('isMains');
    //         //  for($i=1;$i<=$cats.length;$i++){
    //         //      $cat[$i]=
    //         //  }
    //     //     $menu=new Menu;
    //     //     $menu->setTable($tbl_name);
    //     //    $menu->delete();
    //     DB::table($tbl_name)->delete();
    //          foreach($foods as $food){
    //             $menu=new Menu();
    //             $menu->setTable($tbl_name);
    //             if($food["fname"]){
    //              $menu->fid=$food["fid"];
    //              $menu->fname=$food["fname"];
    //              $menu->price=$food["price"];
    //              $menu->note=$food["note"];
    //              $menu->catNum=$food["catNum"];
    //              $menu->cat=$cats[$food["catNum"]];
    //              $menu->isMain=$isMains[$food["catNum"]];
    //              $menu->save();
    //          }}

    //          $menu=new Menu();
    //          $menu->setTable($tbl_name);
    //          $menu->fid="---";
    //          $menu->fname="Fried rice with main food";
    //          $menu->price=$request->frice;
    //          $menu->cat="addition";
    //          $menu->catNum=99;
    //          $menu->isMain=0;
    //          $menu->save();
            
    //     return "menu update success";
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    public function update(Request $request, $string_tbl)
    {
        //use query builder
        $this->validate($request, [
            'cats.*'=>['required','distinct','max:20','regex:/(^[A-Za-z0-9 ]+$)+/'],
            'menu.*.fid' => ['distinct','string','max:30','required_with:menu.*.fname','nullable','regex:/(^[A-Za-z0-9 ]+$)+/'],
            'menu.*.fname' => 'string|max:30|required_with:menu.*.fid|regex:/(^[A-Za-z0-9\s]+$)+/',
            'menu.*.price' => 'numeric|between:0,200|required_with:menu.*.fname|regex:/^\d+(\.\d{1,2})?+$/',
            'menu.*.note' => 'string|max:30|regex:/^[\w,:\s\-\.]+$/|nullable ',
            'isMains.*'=>'required|boolean',
            'frPrice'=>'numeric|between:0,10|regex:/^\d+(\.\d{1,2})?+$/|nullable'
            ]);
        //return "i am a return".json_decode($request->get('menu'));
        //$request->get('cats');
        $tbl_name="menu_".$string_tbl;
        
        $foods=$request->get('menu');
        $cats=$request->get('cats');
        $isMains=$request->get('isMains');
            //  for($i=1;$i<=$cats.length;$i++){
            //      $cat[$i]=
            //  }
        //     $menu=new Menu;
        //     $menu->setTable($tbl_name);
        //    $menu->delete();
        //DB::table($tbl_name)->delete();
        
        if(count($foods)>4){
           // DB::table($tbl_name)->delete();
           $menus=DB::table($tbl_name)->get();
           $existFid=[];
           $m=0;
           foreach($menus as $menu){
               $existFid[$menu->fid]=true;
           }
           //$unusedFid=[];
            $i=0;
            
            foreach($foods as $food){
                if(!empty($food['fname'])){
                // for($j=0;$j<=count($cats);$j++){
                     //if($food['catNum']===$j)
                     DB::table($tbl_name)->updateOrInsert(
                 ['fid'=>$food['fid'],'fname'=>$food['fname'],
                'price'=>$food['price'],'note'=>$food['note'],
                'catNum'=>$food['catNum'],
                'cat'=>$cats[$food['catNum']],
                'isMain'=>$isMains[$food['catNum']]
                ]);
                unset($existFid[$food['fid']]);
        //    }
            }
                                     
        }
                     $i++;
                    
                    
            }
            //detete old data
            $unusedFids = array_keys($existFid);
            foreach ($unusedFids as $unusedFid) {
                if($unusedFid!='---')
                DB::table($tbl_name)->where('fid',$unusedFid)->delete();
            }
            $frPrice=$request->frPrice;
            //if($frPrice){
                DB::table($tbl_name)->where('fname',"Fried rice with main food")->update(['price'=>$frPrice]);
                //     ['fid'=>"---",'fname'=>"Fried rice with main food",'price'=>$food['price'],
                // 'note'=>"",'catNum'=>99,
                // 'cat'=>"addition",
                // 'isMain'=>0]);
            //}
            //  foreach($foods as $food){
            //     $menu=new Menu();
            //     $menu->setTable($tbl_name);
            //     if($food["fname"]){
            //      $menu->fid=$food["fid"];
            //      $menu->fname=$food["fname"];
            //      $menu->price=$food["price"];
            //      $menu->note=$food["note"];
            //      $menu->catNum=$food["catNum"];
            //      $menu->cat=$cats[$food["catNum"]];
            //      $menu->isMain=$isMains[$food["catNum"]];
            //      $menu->save();
            //  }}

            //  $menu=new Menu();
            //  $menu->setTable($tbl_name);
            //  $menu->fid="---";
            //  $menu->fname="Fried rice with main food";
            //  $menu->price=$request->frice;
            //  $menu->cat="addition";
            //  $menu->catNum=99;
            //  $menu->isMain=0;
            //  $menu->save();
            
        return "menu update success";
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
    // public function checkTable($shop_id){
    //     $shop=Shop::find($shop_id)->get();
    //     $sid=$shop->id;
    //     $sname=$shop->name;
    //     $sarea=$shop->area;
    //     $tbl_name='menu_'.$sname.$sarea.$sid;
    //     if (!Schema::hasTable($tbl_name)){
    //         $tbl_exist=false;
    //     }
    // }
}
