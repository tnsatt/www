class Monitor extends React.Component {
	render(){
		return(
			<div className="monitor" style={{height: '70px'}}>
				<p style={{whiteSpace:'nowrap'}}>{this.props.ques}</p>
				<p style={{whiteSpace:'nowrap'}}>{this.props.ans}</p>
			</div>
		)
	}
}
class ButtonList extends React.Component {
	constructor(props){
		super(props);
		
	}
	add=(a)=>{
		this.props.send(a)
	}
	render(){
		const chars=['(',')','ac','ec',
					'7','8','9','+',
					'4','5','6','-',
					'1','2','3','x',
					'.','0','=','/'
					]
		return(
			<ul className="buttonList">
				{chars.map((char,i)=>{
					return(
						<li className="button" onClick={()=>{this.add(char)}}>
							{char}
						</li>
						)	
				})}
			</ul>
		)
	}
}
class App extends React.Component {
	constructor(props){
		super(props);
		this.state={
			ques: "",
			fix: "",
			ans: ""
		};
	}
	isPt=(a)=>{
		if(a=="+"||a=="-"||a=="x"||a=="/")
			return 1;
		return 0;
	}
	send=(a)=>{
		let b=this.state.ques;
		let c=this.state.fix;
		let len=b.length;
		let l=b[len-1];
		let dot_flag=0;

		if(a=="ec"){
			b=b.substr(0,len-1),
			c=c.substr(0,len-1)
		}
		else if(a=="ac"){
			b=""
			c=""
		}
		else if (!isNaN(b[len-2])&&this.isPt(l)&&this.isPt(a)&&a!="-")
		{
			b=b.substr(0,len-1)
			b=b.concat(a)
			c=c.substr(0,len-1)
			c=c.concat(a)
		}
		else if ((b==""&&this.isPt(a)&&a!="-") || 
			(this.isPt(l)&&this.isPt(a)&&a!="-") || 
			(this.isPt(b[len-2])&&l=="-"&&this.isPt(a))||
			(l=="-"&&a=="-")||
			(a=="=")||
			(a=="(")||
			(a==")")||
			(a=="."&&dot_flag==1))
		{
			return false
		}
		else if(a=="x"){
			b=b.concat(a)
			c=c.concat("*")
		}
		else
		{
			if(a=="."){
				dot_flag=1;
			}
			b=b.concat(a)
			c=c.concat(a)
		}
		console.log(dot_flag)
		
		this.setState({
			ques: b,
			fix: c
		},()=>{
			if(c==""){
				this.setState({
					ans: ""
				})
			}
			else if(this.isPt(a)
				||(a=="ec"&&this.isPt(b[len-2]))
				||(c==".")
				||(a=="."&&this.isPt(l))
				||(a=="."&&l==".")){
				this.setState({
					ans: "..."
				})
			}
			else{
				this.calc(a)
			}
		})
	}
	calc=(a)=>{
		this.setState({
			ans: eval(this.state.fix)
		})
	}
	render(){
		console.log(this.state.fix)
		console.log(this.state.ans)

		return(
			<div className="app">
				<Monitor ques={this.state.ques} ans={this.state.ans}/>
				<ButtonList send={this.send}/>
			</div>
		)
	}
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);