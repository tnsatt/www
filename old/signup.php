<!DOCTYPE html>
<html lang="vi">
<head>
	<title>Sign up</title>
	<meta charset="utf-8"/>
	<meta name="author" content="Thien Nguyen"/>
	<meta name="description" content="Website linh tinh"/>
	<meta name"keyword" content="Thien Nguyen"/>
	<meta name="viewport" content="width=max-width, initial=1.0">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href="signup.css"/>
	<script src="javas.js"></script>
</head>
<body>    
<div class="signup">
	<div class="avatar"></div>
	<div class="form">
		<div style="text-align: center; font-size:25px;">Signup</div>
	<form action="successsignup.php" method="post">
	<div  class="form-group">
		<label>Username</label>
		<input type="text" class="form-control" placeholder="Enter username" name="username" value="<?php echo $username;?>">
	</div>
	<div  class="form-group">
		<label>Fullname</label>
		<input type="text" class="form-control" value="<?php echo $fullname;?>" placeholder="Enter fullname" name="fullname">
	</div>
	<div  class="form-group">
		<label>Email</label>
		<input type="text" class="form-control" value="<?php echo $email;?>" placeholder="Enter email" name="email">
	</div>
	<div  class="form-group">
		<label>Password</label>
		<input type="password" class="form-control" value="<?php echo $password;?>" placeholder="Enter password" name="password">
	</div>
	<div  class="form-group">
		<label>Re-enter password</label>
		<input type="password" class="form-control" value="<?php echo $repwd;?>" placeholder="Enter repwd" name="repwd">
	</div>
	<div class="checkbox">
		<label><input type="checkbox"> I agree</label>
	</div>
	<input class="submit" type="submit" value="Submit" name="submit">
	</form>
	</div>
</div>
   



</body>    
</html>