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

// через рефс можно отримувати силку на компоненти і також через неї можна викликати методи цього компонента
// тобіш якщо ми передаєм на теги то це силка на узєл дом дерева а коли на компонент то на екземпляр цього компонента


const Note = React.createClass({
	deleteNote(){
    this.props.handleOnDelete(this.props.id);
	},
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
              <div className="card-footer-item" onClick={this.deleteNote}>Delete</div>
            </footer>
          </div>
          </div>
        )
    }
});

const NoteGrid = React.createClass({
    render(){
				const { notes, onDeleteNote } = this.props;
				console.log(this.props)
        return (
            <div className="columns" ref={el => this.el = el}>
            {
                notes.map(element =>
                    <Note
                       key={element.id}
                       id={element.id}
											 color={element.color}
											 handleOnDelete={onDeleteNote}
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
          notes : []
      }
		},

	componentDidMount() {
			this.getFromLocalStorage();
	},

	componentDidUpdate(prevProps, prevState){  // метод проверки состояния и нужно ли его обновлять

		if(prevState.notes !== this.state.notes){
      this.updateLocalStorage()
		}

	},

  addNewNote(note){
      this.setState({
          notes : [note, ...this.state.notes]
			})
		},

		handleDeleteNote(id){
      let filteredNotes = this.state.notes.filter( item => {
				return item.id !== id
			})

			this.setState({
				notes : filteredNotes
			})
		},

		updateLocalStorage(){
			const jsonNotes = JSON.stringify(this.state.notes);
			localStorage.setItem('notes' , jsonNotes)
		},

		getFromLocalStorage(){
			const items = localStorage.getItem('notes');
			this.setState({
				notes : JSON.parse(items)
			})
		},
    render(){
        return(
            <div className="note-app">
                <h1 className="title"> Note App </h1>
                <NoteEditor addNewNote={this.addNewNote}></NoteEditor>
               <NoteGrid notes={this.state.notes} onDeleteNote={this.handleDeleteNote}></NoteGrid>
            </div>
        )
    }
})

ReactDOM.render(
    <NoteApp></NoteApp>,
    document.getElementById('app')
)