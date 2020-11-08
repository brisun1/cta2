@component('mail::message')
# From contact us 
{{$topic}}

The *body* of **your message** pls _plses dfdf_ af feedb.
name:{{$ename}}
sender:{{$sender}}


@component('mail::button', ['url' => '127.0.0.4'])

@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent