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
        // $menu=new Menu();

        // $menu->setTable("menu_".$str_table);
        $tbl_name="menu_".$str_table;
        //validation goes here
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
            $menu->catNum=max($catNum)+1;
            $menu->isMain=0;
            $menu->save();
       }
            
        return "menu success";
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
    public function update(Request $request, $string_tbl)
    {
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
        DB::table($tbl_name)->delete();
             foreach($foods as $food){
                $menu=new Menu();
                $menu->setTable($tbl_name);
                if($food["fname"]){
                 $menu->fid=$food["fid"];
                 $menu->fname=$food["fname"];
                 $menu->price=$food["price"];
                 $menu->note=$food["note"];
                 $menu->catNum=$food["catNum"];
                 $menu->cat=$cats[$food["catNum"]];
                 $menu->isMain=$isMains[$food["catNum"]];
                 $menu->save();
             }}

             $menu=new Menu();
             $menu->setTable($tbl_name);
             $menu->fid="---";
             $menu->fname="Fried rice with main food";
             $menu->price=$request->frice;
             $menu->cat="addition";
             $menu->catNum=99;
             $menu->isMain=0;
             $menu->save();
            
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
