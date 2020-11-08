<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
//use App\Mail\NewUserWelcome;
use App\Mail\EmailClass;
use Auth;

class HelpController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth');
    }
    public function contact(){
        return view('help');
    }
    public function email(Request $request){
        $subject=$request->input('subject');
        $topic=$request->input('message');
        $sender="eatchinese.ie@gmail.com";
        // $sender=$request->input('sender');
        $from="highlevelstructures@gmail.com";
        $ename='eat Chin';
        // $from=auth()->user()->email;
        // $ename=auth()->user()->name;
        
        Mail::to('+35387146903@gmail.com')->send(new EmailClass('contactus',$topic,$ename,$sender));
        //Mail::to(Auth::user()->email)->send(new EmailClass('contactus',auth()->user()->username));
        return redirect('/');

    }
}

