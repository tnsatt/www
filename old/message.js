export default class mess extends React.Component(){
    const mes={
        background: 'lightblue',
        padding: '5px',
        display: 'block'
    }
    render(){
    return(
        <div>
            <h6>{this.pros.name}</h6> 
            <div style={mes}>{this.pros.mes}</div>
        </div> 
    
    );
    }
}