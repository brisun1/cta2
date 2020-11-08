
@extends('layouts.app')

@section('content')
<div class="container">
	<h5 class="mb-2 text-center">联系我们</h5>
	<hr>
	
	{{-- @if(session('message'))
	<div class='alert alert-success'>
		{{ session('message') }}
	</div>
	@endif --}}
	
	<div class="col-12 col-md-6">
		<form class="form-horizontal" method="POST" action="{{ action('HelpController@email') }}">
			{{ csrf_field() }} 
			<div class="form-group form-inline">
            <label for="Name">姓名： </label>
            <input type="text" class="form-control" id="ename" value="no name" placeholder="" name="name" required>
			{{-- <input type="text" class="form-control" id="ename" value="{{$ename}}" placeholder="{{$ename}}" name="name" required> --}}
		</div>

		<div class="form-group form-inline">
            <label for="sender">Email或电话: </label>
            <input type="text" class="form-control" id="sender" value="chinesedriver.com@gmail.com" placeholder="" name="sender" required>
			{{-- <input type="text" class="form-control" id="sender" value="{{$email}}" placeholder="{{$email}}" name="sender" required> --}}
		</div>

		<div class="form-group">
			<label for="message">内容: </label>
			<textarea type="text" rows="12" class="form-control luna-message" id="help_msg" placeholder="" name="message" required></textarea>
		</div>

			<div class="form-group">
				<button type="submit" class="btn btn-primary" value="Send">发送Email</button>
            </div>
            
		</form>
	</div>
	
 </div> <!-- /container -->
@endsection

