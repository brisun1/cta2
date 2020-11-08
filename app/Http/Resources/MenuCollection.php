<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class MenuCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return[
            'data'=>$this->collection
            // 'cat'=>$this->cat,
            // 'fid'=>$this->fid,
            // 'fname'=>$this->fname,
            // 'price'=>$this->price,
            // 'note'=>$this->note
        ];
        //return parent::toArray($request);
    }
}
