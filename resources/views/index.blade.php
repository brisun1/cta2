@extends('layouts.app')

    
@section('content')
<div class="content">
    <div class="container">
        {{-- <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Home</div>
    
                    <div class="card-body">
                        <div id="root"></div>
                   
                       
                    </div>
                </div>
            </div>
        </div> --}}
        <div id="root"></div>
        <div id="socket"></div>
    </div>
    
   
    
</div>
<script src="//{{ Request::getHost() }}:{{env('LARAVEL_ECHO_PORT')}}/socket.io/socket.io.js"></script>
{{-- 
<script>
    window.laravel_echo_port='{{env("LARAVEL_ECHO_PORT")}}';
</script>
<script src="//{{ Request::getHost() }}:{{env('LARAVEL_ECHO_PORT')}}/socket.io/socket.io.js"></script>
<script src="{{ url('/js/laravel-echo-setup.js') }}" type="text/javascript"></script>

<script type="text/javascript">
var i = 0;
window.Echo.channel('user-channel')
 .listen('.UserEvent', (e) => {
    i++;
    console.log(e);
    $("#notification").append('<div class="alert alert-success">'+i+'.'+data.title+'</div>');
});
</script> --}}
@endsection