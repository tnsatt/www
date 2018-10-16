<body>
	<form method="POST">
		<input type="text" name="username">
		<input type="password" name="password">
		<input type="submit" name="submit">
	</form>


</body>


<?php
	 $a=array(
	 	array(1,2,3),
	 	array(4,5,6),
	 	array(7,8,9),
	 );
	 $b=array('a','b','f','d','f');

	 $c="nguyen lam thien";
		
	class lop{
		private $a;
		private $b;
		public function __construct($m,$n){
			$this->a=$m;
			$this->b=$n;
		}
		public function cong(){
			return $this->a+$this->b;
		}
		public function tru(){
			return $this->a-$this->b;
		}

	}
	echo "<br>";
	$text=fopen("text.txt","r") or exit("Mo file loi!");
	
	$size=filesize("text.txt");
	$nd=fread($text,$size);
	fclose($text);
	echo "Size: ".$size; 
	echo $nd;

?>

