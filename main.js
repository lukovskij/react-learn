const Timer = React.createClass({
    getInitialState(){
       return{
           secondsElapsed : 0,
       }
    },
    componentDidMount(){
       this.timer =  setInterval( this.tick, 1000 )
    },
    componentWillUnmount(){
     clearInterval(this.timer)
    },
    tick(){
       this.setState({
           secondsElapsed : this.state.secondsElapsed + 1
       })
    },
    render(){
        return (
            <div>
               <h1>
               { this.state.secondsElapsed }
               </h1>
            </div>
        )
    }
})

const App = React.createClass({
    getInitialState(){
      return {
          mounted : false
      }
    },
    unmountComponent(){
        this.setState({
            mounted : !this.state.mounted
        })
    },

    render() {
        return(
            <div>
               {this.state.mounted ? <Timer></Timer> : false}

               <button onClick={this.unmountComponent}> {this.state.mounted ? 'unmount' : 'mount'} </button>
            </div>
        )
    }
})

ReactDOM.render(
    <App></App>,
    document.getElementById('app')
)