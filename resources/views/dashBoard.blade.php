@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                        Dash Page
                    You are logged in!
                    {{-- <div id="client2">client2</div> --}}
                    {{-- <div id="client3">client 3</div> --}}
                    <div id="client">client for dash copn</div>
                    
                </div>
            </div>
        </div>
    </div>
</div>
{{-- <audio autoplay>
    <source src="storage/sound.mp3">
</audio> --}}
  
  {{-- <p>Click the buttons to play or pause the audio.</p> --}}
  {{-- <iframe src="storage/sound.mp3" allow="autoplay" style="display:none" id="iframeAudio">
  </iframe> --}}
  {{-- <button onclick="playAudio()" type="button">Play Audio</button>
  <button onclick="pauseAudio()" type="button">Pause Audio</button> 
  
  <script>
  var x = document.getElementById("myAudio"); 
  
  function playAudio() { 
    x.play(); 
  } 
  
  function pauseAudio() { 
    x.pause(); 
  } 
  </script> --}}
<script src="//{{ Request::getHost() }}:{{env('LARAVEL_ECHO_PORT')}}/socket.io/socket.io.js"></script>
@endsection

