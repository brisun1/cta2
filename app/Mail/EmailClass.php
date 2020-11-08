<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailClass extends Mailable
{
    use Queueable, SerializesModels;
    public $content;
    public $ename;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($content,$topic,$ename,$sender)
    {
        $this->content=$content;
        $this->topic=$topic;
        $this->ename=$ename;
        $this->sender=$sender;
        //$this->sender=$sender;
        //subject is built-in property of email class i presume
        $this->subject('99 meimei.com');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('email.'.$this->content)->with('sender', $this->sender)

                    ->with('ename', $this->ename)->with('topic', $this->topic);
    }
}
