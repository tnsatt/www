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
class Item extends React.Component {
	constructor(props){
		super(props);
		this.state={
			index: this.props.index,
			showEdit: 1,
			item: {
				title: "",
				content: ""
			}
		}
	}	
	edit=()=>{
		this.setState({
			showEdit :!this.state.showEdit
		})
	}
	render(){
		return(
			<div>
				<td>{this.props.index+1}</td>
				<td style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap',overflow: 'hidden'}}>
					{this.props.item.title}
				</td>	
				<td style={{textOverflow: 'ellipsis'}}>{this.props.item.content}</td>	
				<td>
					<div className="btn-group">
						<button className="btn btn-warning" onClick={this.edit}>Edit</button>
						<button className="btn btn-danger" onClick={()=>{this.props.del(this.state.index)}}>Del</button>
					</div>
				</td>
			</div>
		)
	}
}
class Add extends React.Component {
	constructor(props){
		super(props);
		this.state={
			title: "",
			content: "",
			showWarning: "none"
		}
	}
	
	saveTitle=(a)=>{
		this.setState({
			title: a.target.value,
			showWarning: "none"
		})
	}
	saveContent=(a)=>{
		this.setState({
			content: a.target.value,
		})
	}
	add=(e)=>{
		e.preventDefault();
		if(this.state.title==""){
			this.setState({
				showWarning: "block"
			})
			return false
		}
		this.props.addList({
			title: this.state.title,
			content: this.state.content,
		})
		this.setState({
			title: "",
			content: "",
		})
	}
	render(){
		return(
			<form className="container" style={{display:this.props.disp, marginBottom:"20px"}}>
				<div className="form-group row">
					<label className="col-md-3" style={{textAlign:'right'}}><b>Note Title</b></label>
					<input required value={this.state.title} onChange={this.saveTitle} type="text" className="form-control col-md-9" placeholder="Title..."/>
				</div>
				<div className="form-group row">
					<label className="col-md-3" style={{textAlign:'right'}}><b>Note Content</b></label>
					<textarea value={this.state.content} onChange={this.saveContent} className="form-control col-md-9" placeholder="Content..."/>
				</div>
				<div className="form-group row float-right">
					<button className="btn btn-success" onClick={this.add}>Add Note</button>
				</div>
				<div className="alert alert-warning" style={{position:'absolute', display:this.state.showWarning}}>Title cannot be blank!</div>
			</form>
		)
	}	
}
class Search extends React.Component {
	constructor(props){
		super(props);
		this.state={
			
		}
	}	
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
class List extends React.Component {
	createElm=(list)=>{
		return list.map((item,index)=>{
			return <li 
                key={index}
                className='list-group-item'
				onClick={()=>{this.props.show(index)}}
				style={{}}
				>
				{item.title==''?'...'+item.content:item.title}
			</li>
		})
	}
	sortElm=(elm)=>{
		switch(this.props.sort){
			case "newest": 
				return elm.reverse()
				break;
			case "oldest": 
				return elm
				break;
			case "az": 
				return elm.sort((a,b)=>{return a.props.children.localeCompare(b.props.children)})
				break;
			case "za": 
				return elm.sort((a,b)=>{return b.props.children.localeCompare(a.props.children)})
				break;
		}
	}
	searchFilter=(elm)=>{
		const list=(this.props.showRecycle)?this.props.recycle:this.props.list 
        const index=this.props.index
		if(this.props.search!=''){
			return elm.filter((item,index)=>{
						return list[index].title.indexOf(this.props.search)>-1
					 			||list[index].content.indexOf(this.props.search)>-1
					})
		}
		return elm
	}
	render(){
		const list=(this.props.showRecycle)?this.props.recycle:this.props.list
		const len=list.length
		const index=this.props.index
		const elm=this.createElm(list)
		if(len>0&&index>=0) elmSearch[this.props.index].props.className+=' bg-primary text-white'
		const elmSearch=this.searchFilter(elm)
		const elmSort=this.sortElm(elmSearch)
		return(
			<ul className="col-3 list-group" style={{overflow:'auto'}}>
				{elmSort}
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
		};
		this.show=this.show.bind(this)
	}
	componentWillMount(){
		const localList = JSON.parse(localStorage.getItem('list'))
		const localRecycle = JSON.parse(localStorage.getItem('recycle'))
		if(localRecycle!==null&&localRecycle.length>0){
			this.state.recycle=localRecycle
		}
		if(localList!==null&&localList.length>0){
			const lenList=localList.length
			this.state.list=localList
			this.setState({
				index: lenList-1,
			})
		}
	}
    componentWillUpdate(){
        localStorage.list=JSON.stringify(this.state.list)
		localStorage.recycle=JSON.stringify(this.state.recycle)
    }
	toggleRecycle=()=>{
        const list=this.state.showRecycle?this.state.list:this.state.recycle//bi nguoc do chua set showRecycle
		const len=list.length
		this.setState({
			sort: 'newest',
			index: len==0?0:len-1,
			showRecycle: !this.state.showRecycle
		})
	}
	addItem=()=>{
		if(!this.state.showRecycle){
			const len=this.state.list.length
			const list=this.state.list
			if(len==0||list[len-1].title!==''||list[len-1].content!==''){
                const blankItem={title: '',content: ''}
				this.setState({
					list: [...this.state.list,blankItem],
                    index: len,
				})
			}
		}
	}
	setSort=(a)=>{
		if(a=="az"||a=="za"||a=="newest"||a=="oldest"){
			this.setState({
				sort: a,
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
				this.state.recycle.push(recycleItem[0])
			}
			if(len>1&&index==len-1){
				index--
			}
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
            this.state.list.push(recoverItem[0])
			if(len>1&&index==len-1){
				index--
			}
			this.setState({
				index: index
			})
		}
	}
	edit=(e)=>{
		const len=this.state.list.length
		if(len==0){
			this.state.list[this.state.index]={title:'',content:''}
		}
		this.state.list[this.state.index][e.target.name]= e.target.value
		this.setState({
			index: this.state.index,
		})
	}
	search=(list)=>{
		if(list!=''||list==''&&this.state.search!=''){
			this.setState({
				search: list,
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
//        console.log(this.state.list)
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
					/>
					<Main
						list={this.state.list}
						index={this.state.index}
						del={this.del} 
						edit={this.edit}
						recycle={this.state.recycle}
						showRecycle={this.state.showRecycle}
						recover={this.recover}
					/>
				</div>
			</div>
		)
	}
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);