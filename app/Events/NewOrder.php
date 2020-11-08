<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Http\Resources\OrderMenuCollection;
use App\Http\Resources\OrderCollection;
class NewOrder implements ShouldBroadcast

{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    
    /**
     * Create a new event instance.
     *
     * @return void
     */
   // public $data=['asas'];
    public $order;
    public $food;
    public $user_id;
    //public $order;
    public function __construct($order, $food, $user_id)
    {
         $this->order=$order;
         $this->food=$food;
         $this->user_id=$user_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    // public function broadcastOn()
    // {
    //     return new PrivateChannel('channel-name');
    // }
    public function broadcastOn()
    {
        //return new Channel('order.15');
        return new PrivateChannel('order.'.$this->user_id);
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'UserEvent';
    }
    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastWith()
    {
        // $a=$this->food;
        // $i=0;
        // $fname=[];
//         foreach($this->food as $fooda){
// $fname[$i]=$fooda->fname;
//         }
        // fid,fname main_attach,qty,price
        //return ['customer'=>$this->order,'food'=>$this->food];
        return ['food'=>$this->food,'customer'=>$this->order];
    }

}
