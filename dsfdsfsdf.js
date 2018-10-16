class Title extends React.Component {
	render(){
		return(
			<div className="title">
				<h1>{this.props.name}</h1>
			</div>
		)
	}
}
class Sort extends React.Component {
	setSort=(e)=>{
		this.props.sort(e.target.value)
	}
	render(){
		return(
			<form className="form-group col-md-3">
				<select className="form-control" onChange={this.setSort}>
					<option>Sort...</option>
					<optgroup label="Sort by Alphabet">
						<option value="az">A-Z</option>
						<option value="za">Z-A</option>
					</optgroup>
					<optgroup label="Sort by Date">
						<option value="newest">Newest</option>
						<option value="oldest">Oldest</option>
					</optgroup>
				</select>
			</form>
		)
	}
}
class Search extends React.Component {
	search=(e)=>{
		e.preventDefault()
		this.props.search(this.refs.input.value)
	}
	clear=(e)=>{
		e.preventDefault()
		this.props.search('')
		this.refs.input.value=''
	}
	render(){
		return(
			<form className="form-group col-md-5">
				<div className="input-group">
					<input ref="input" className="form-control" 
						placeholder="Search for..." 
						onChange={(e)=>{this.props.search(e.target.value)}}
					/>
					<div className="input-group-append">
						<button className="btn btn-danger" onClick={this.clear}>
							<span className="fa fa-window-close"></span>
						</button>
					</div>
					<div className="input-group-append">
						<button className="btn btn-primary" onClick={this.search}>
							<span className="fa fa-search"></span>
						</button>
					</div>
				</div>
			</form>
		)
	}
}
class Menu extends React.Component {
	addNew=(e)=>{
		e.preventDefault()
		this.props.addList()
	}
	toggleRecycle=(e)=>{
		e.preventDefault()
		this.props.toggleRecycle()
	}
	render(){
		return(
			<div className="row">
				<Search search={this.props.search} />
				<Sort sort={this.props.sort} />
                {!this.props.showRecycle?
                <form className="form-group col-md-2">
					<button className="btn btn-success btn-block" onClick={this.toggleRecycle}>Recycle</button>
				</form>
                :<form className="form-group col-md-2">
					<button className="btn btn-primary btn-block" onClick={this.toggleRecycle}>Note</button>
				</form>}
				<form className="form-group col-md-2">
					<button 
                        className="btn btn-primary btn-block" 
                        onClick={this.addNew}
                        disabled={this.props.showRecycle}
                    >New note</button>
				</form>
			</div>
		)
	}
}
class Item extends React.Component {
	render(){
		const item=this.props.item
		return(
			<li 
                key={item.id}
                className={this.props.className}
                onClick={()=>{this.props.show(this.props.index)}}
                style={{}}
                >
                {item.title==''?'...'+item.content:item.title}
            </li>
		)
	}
}
class List extends React.Component {
	createElm=(list,search,len,index)=>{
		let elm=[]
        if(search!=''){
			list.forEach((item,index)=>{
				if(item.title.indexOf(search)>-1
				    ||item.content.indexOf(search)>-1)
				{
                    elm.push(<Item item={item} index={index} show={this.props.show} className='list-group-item'/>)
                }
            })
		}
        else{
             elm= list.map((item,index)=>{
                return <Item item={item} index={index} show={this.props.show} className='list-group-item'/>
            })  
			if(len>0) elm[index].props.className+=' bg-primary text-white'
        }
        return elm
	}
	render(){
		const list=(this.props.showRecycle)?this.props.recycle:this.props.list
		const len=list.length
        const index=this.props.index
        const search=this.props.search
        const elm=this.createElm(list,search,len,index)
        console.log(elm)
        const lenElm=elm.length
		
		return(
			<ul className="col-3 list-group" style={{overflow:'auto'}}>
				{elm}
			</ul>
		)
	}
}
class Main extends React.Component {
	render(){
		const showRecycle=this.props.showRecycle
		const list=showRecycle?this.props.recycle:this.props.list
        const len=list.length
		const index=this.props.index
		return(
			<div className="col-9" style={{display:'grid',gridTemplateRows:'auto 1fr'}}>
				<div className="row form-group">
					<div className="input-group">
						<input type="text" 
						name="title"
						className="form-control"
						value={len>0?list[index].title:''}
						onChange={(e)=>{this.props.edit(e)}}
						disabled={showRecycle}
						/>
						{showRecycle?
						<div className="input-group-append">
							<button className="btn btn-success"
							onClick={this.props.recover}>Recover</button>
						</div>
						:<div className="input-group-append">
							<button className="btn btn-danger"
							onClick={this.props.del}>Del</button>
						</div>}
					</div>
				</div>
				<div className="row" style={{}}>
					<textarea type="text" 
					name="content"
					style={{}}
					className="form-control"
					value={len>0?list[index].content:''}
					onChange={(e)=>{this.props.edit(e)}}
					disabled={showRecycle}
					/>
				</div>
			</div>
		)
	}
}
class App extends React.Component {
	constructor(props){
		super(props);
		this.state={
			index: 0,
            counter: 0,
			sort: "newest",
			list: [],
				// {
				// 	title: 'Borem ipsum d',
				// 	content: "borem ao ipsum dolor sit amet, consectetur adipisicing elit. Ipsum inventore repellat omn",
				// },
				// {
				// 	title: 'Corem ipsum d',
				// 	content: "corem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum inventore repellat omn",
				// },
				// {	
				// 	title: 'Aorem ipsum dolor sit amet, c',
				// 	content: "aorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum inventore repellat omn",
				// },
			search: '',
			recycle: [],
			showRecycle: false,
			newNote: false	
		};
		this.show=this.show.bind(this)
	}
	componentWillMount(){
		const localList = JSON.parse(localStorage.getItem('list'))
		const localRecycle = JSON.parse(localStorage.getItem('recycle'))
        const localCounter = JSON.parse(localStorage.getItem('counter'))
		if(localRecycle!==null&&localRecycle.length>0){
			this.state.recycle=localRecycle
		}
        if(localCounter!==null){
            this.state.counter=localCounter
        }
		if(localList!==null&&localList.length>0){
			const lenList=localList.length
			this.state.list=localList
            this.state.counter=lenList
			this.setState({
				index: 0,
			})
		}
	}

    update=()=>{
    	localStorage.list=JSON.stringify(this.state.list)
		localStorage.recycle=JSON.stringify(this.state.recycle)
        localStorage.counter=JSON.stringify(this.state.counter)
    }
	toggleRecycle=()=>{
        const list=this.state.showRecycle?this.state.list:this.state.recycle//bi nguoc do chua set showRecycle
		const len=list.length
		this.setState({
			index: 0,
            search:'',
			showRecycle: !this.state.showRecycle
		})
	}
	addItem=()=>{
		if(!this.state.showRecycle){
			const len=this.state.list.length
			const list=this.state.list
			if(len==0||this.state.newNote==false){
                this.setState({newNote:true})
			}
		}
	}
	setSort=(sort)=>{
		if(sort=="az"||sort=="za"||sort=="newest"||sort=="oldest"){
            const list=this.state.list
            let sortList
			switch(sort){
                case "newest": 
                    sortList=list.sort((a,b)=>{return b.id-a.id})
                    break;
                case "oldest": 
                    sortList=list.sort((a,b)=>{return a.id-b.id})
                    break;
                case "az": 
                    sortList=list.sort((a,b)=>{return a.title.localeCompare(b.title)})
                    break;
                case "za":
                    sortList=list.sort((a,b)=>{return b.title.localeCompare(a.title)})
                    break;
		   }
            this.setState({list:sortList},()=>{
            	this.update()
            })
		}   
	}
	del=()=>{
		const list=this.state.list
		const len=list.length
		let index=this.state.index
		if(len>0){
            const isBlank=list[index].title==''&&list[index].content==''
            const recycleItem=list.splice(index,1)
			if(!isBlank){
				this.state.recycle.unshift(recycleItem[0])
			}
			if(len>1&&index==len-1){
				index--
			}
			this.update()
			this.setState({
				index: index
			})
		}
	}
	recover=()=>{
		const recycle=this.state.recycle
		const len=recycle.length
		let index=this.state.index
		if(len>0){
            const recoverItem=recycle.splice(index,1)
            this.state.list.unshift(recoverItem[0])
			if(len>1&&index==len-1){
				index--
			}
			this.update()
			this.setState({
				index: index
			})
		}
	}
	edit=(e)=>{
		const len=this.state.list.length
		if(len==0||this.state.newNote==true){
			this.state.list.push({id:this.state.counter+1,title:'',content:''})
            this.state.counter++
		}
		this.state.list[this.state.index][e.target.name]= e.target.value
		this.update()
		this.setState({
			index: this.state.index,
		})
	}
	search=(search)=>{
		if(search!=''||search==''&&this.state.search!=''){
			this.setState({
				search: search,
			})
		}
	}
	show=(index)=>{
		this.setState({
			index: index,
		})
	}
	render(){
//        console.log(this.state.index)
        //  console.log(this.state.list)
//        console.log(this.state.recycle)
		return(
			<div style={{minHeight:'100%' ,display:'flex',flexDirection:'column',padding:10}}>
				<Title name="Note List"/>
				<Menu 
					search={this.search} 
					addList={this.addItem} 
					sort={this.setSort} 
					toggleRecycle={this.toggleRecycle}
                    showRecycle={this.state.showRecycle}
				/>
				<div className="border" style={{display:'flex',flex:'1',padding:'5px'}}>
					<List 
						search={this.state.search} 
						show={this.show} 
						index={this.state.index} 
						list={this.state.list} 
						sort={this.state.sort} 
						recycle={this.state.recycle}
						showRecycle={this.state.showRecycle}
						newNote={this.state.newNote}
					/>
					<Main
						list={this.state.list}
						index={this.state.index}
						del={this.del} 
						edit={this.edit}
						recycle={this.state.recycle}
						showRecycle={this.state.showRecycle}
						recover={this.recover}
						newNote={this.state.newNote}
					/>
				</div>
			</div>
		)
	}
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);