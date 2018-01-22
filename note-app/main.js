const NOTES = [{
    id : 1,
    color : '',
    text : 'Hey i am first Note'
},
{
    id : 2,
    color : '',
    text : 'Hey i am first Note'
},
{
    id : 3,
    color : '',
    text : 'Hey i am first Note'
}]

const Note = React.createClass({
    render(){
        const { id, color, children } = this.props;
        return (
            <div className="column">
            <div className="card" style={{backgroundColor: color}}>
                <header className="card-header">
                <p className="card-header-title">
                    Note {id}
                </p>
                </header>
            <div className="card-content">
              <div className="content">
                {children}
              </div>
            </div>
            <footer className="card-footer">
              <div className="card-footer-item">Delete</div>
            </footer>
          </div>
          </div>
        )
    }
});

const NoteGrid = React.createClass({
    componentDidMount(){
       this.$el = $(this.el);

       this.$el.slick({})
    },
    render(){
        const { notes } = this.props;
        return (
            <div className="columns" ref={el => this.el = el}>
            {
                notes.map(element => 
                    <Note
                       key={element.id}
                       id={element.id}
                       color={element.color}
                    >
                       {element.text}
                    </Note>
                )
            }
            </div>
        )
    }
});

const NoteEditor = React.createClass({
    getInitialState(){
      return{
          text : ''
      }
    },
    handleTextChange(e){
       this.setState({
           text : e.target.value
       })
    },
    addNote(){
        const note = {
            id : Date.now(),
            color : '',
            text : this.state.text
        }
        this.props.addNewNote(note)

        this.clearState();
    },
    clearState(){
       this.setState({
           text : ''
       })
    },
    render(){
        return(
            <div className="text-editor">
              <textarea className="textarea" value={this.state.text} onChange={this.handleTextChange}></textarea>
              <button className="button is-link" disabled={!this.state.text} onClick={this.addNote}> Add </button>
            </div>
        )
    }
})

const NoteApp = React.createClass({
    getInitialState(){
      return {
          notes : NOTES
      }
    },
    addNewNote(note){
      this.setState({
          notes : [note, ...this.state.notes]
      })
    },
    render(){
        return(
            <div className="note-app">
                <h1 className="title"> Note App </h1>
                <NoteEditor addNewNote={this.addNewNote}></NoteEditor>
               <NoteGrid notes={this.state.notes}></NoteGrid>
            </div>
        )
    }
})

ReactDOM.render(
    <NoteApp></NoteApp>,
    document.getElementById('app')
)