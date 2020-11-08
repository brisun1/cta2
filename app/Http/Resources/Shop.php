<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Shop extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
           
            'id' => $this->id,
            'shopName' => $this->name,
            'addr' => $this->addr,
            'shop_id' => $this->shop_id,
            'area' => $this->area,
            'phone' => $this->phone,
            'ownerName' => $this->owner_name,
            'ownerMobl' => $this->owner_mobl,
            'cterMobl' => $this->cter_mobl,
            'orderMobl' => $this->order_mobl,
            'weekOpen'=>$this->week_open,
            'weekClose'=>$this->week_close,
            'friOpen'=>$this->fri_open,
            'friClose'=>$this->fri_close,
            'satOpen'=>$this->sat_open,
            'satClose'=>$this->sat_close,
            'sunOpen'=>$this->sun_open,
            'sunClose'=>$this->sun_close,
           
            'img' => $this->img,
            'img1' => $this->img1,
            'promTxt1'=>$this->prom_txt1,
            'img2' => $this->img2,
            'promTxt2'=>$this->prom_txt2,
            'img3' => $this->img3,
            'promTxt3'=>$this->prom_txt3,
            'offer'=>$this->offer
            
        ];
    }
}
