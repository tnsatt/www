const instanceLocator = "v1:us1:e532fdd1-9a06-4bb1-b78e-5558212e5ec8"
const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e532fdd1-9a06-4bb1-b78e-5558212e5ec8/token"
const username = "sony"
const roomId = 17383030
class Title extends React.Component {
	changeBackground=()=>{
		this.props.background()
	}
	render(){
    return(
        <div className="title" onClick={this.changeBackground}>
            <h1>Chat Box</h1>
        </div>
    );
    }
}
class Mess extends React.Component {
	render(){
    return(
        <div style={{margin:'10px'}}>
            <h6>{this.props.name}</h6> 
            <p className="mes">
            	{this.props.content}
            </p>
        </div>
    );
    }
}
class List extends React.Component {
	render(){
    return(
        <div className="mes-list" style={{background: this.props.bgcolor}}>
			<Mess name="John" content='Hello'/>
			<Mess name="Sony" content='Hi'/>
			<Mess name="Sony" content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur quasi aut, tempora unde eveniet nam nostrum obcaecati dicta soluta! Maxime, a. Aperiam quis tempore animi dignissimos magnam labore, porro fugit.'/>
 			{this.props.messages.map((message,i)=>{
        		return <Mess name="Me" content={message}/>
        	})}
        </div>
    );
    }
}
class Input extends React.Component {
	constructor(props){
		super(props);
	}
	send=(e)=>{
		e.preventDefault()
		//if(this.refs.message.value != ""){
			this.props.message(this.refs.message.value);
		//}
		this.refs.message.value="";
	}
	render(){
    return(	
        <form className="text-box">
            <input ref="message" className="text-input" type="text" placeholder="Enter..." autofocus></input>
            <button className="btn-send" onClick={this.send}>></button>
        </form>
    );
    }
}

class App extends React.Component {
	constructor(props){
		super(props);
		this.state={
			background: 'white',
			messages: ["a","b"],
		};
	}
	addMessage=(message)=>{
		this.setState({
			messages: [...this.state.messages,message],
		})
		console.log(this.state.messages)
		this.currentUser.addMessage({
   			message,
	  		roomId: roomId
		 })
		
	}
	changeBackground=()=>{
		this.setState({
			background: (this.state.background=='white')?'black':'white'
		});
		console.log(this.state.background)
	}
	componentDidMount() {
		const chatManager = new Chatkit.ChatManager({
			instanceLocator: instanceLocator,
			userId: username,
			tokenProvider: new Chatkit.TokenProvider({
			  url: testToken
		})
	}) 
		chatManager.connect().then(currentUser => {
			currentUser.subscribeToRoom({
				roomId: roomId,
				hooks: {
				onNewMessage: message => {
				this.setState({
				messages: [...this.state.messages, message]
				})
				}
				}
			})
		})
	}
	render(){
	return (
	<div className="App">
		<Title background={this.changeBackground}/>
		<List bgcolor={this.state.background} messages={this.state.messages}/>
		<Input ref="input" message={this.addMessage} />
	</div>
	);
	}
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);