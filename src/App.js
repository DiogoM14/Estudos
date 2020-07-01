import React, { Component } from 'react';

import './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      { id: 'gjnsui1', name: 'Max', age: 28 },
      { id: 'ffsef2', name: 'Manu', age: 29 },
      { id: 'drkdoph3', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  deletePersonHandler = (personIndex) => {  //personIndex => Posição do array em que se clicou
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];

    //Splice => primeiro parâmetro é o index de onde deve iniciar a remoção, o segundo a quantidade de valores removidos(se não informado, removerá todos os valores do index início até o final da array), e do terceiro em diante serão valores novos que entrarão no lugar dos valores removidos.
    persons.splice(personIndex, 1); 
    this.setState({persons: persons}) //Básicamente vai atualizar o array
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow  //Alterna entre True/False
    });
  }

  render() {

    let persons = null; //Como padrão, persons = não rederiza

    if (this.state.showPersons) { //Se o estado for true
      persons = ( //persons recebe todo o código

        <div>
          {this.state.persons.map((person, index) => {  
            return <ErrorBoundary  key={person.id} >
              <Person 
            click={() => this.deletePersonHandler(index)} //index => Aloca a posição do array que é clicado
            name={person.name} 
            age={person.age} 
            key={person.id} 
            changed={(event) => this.nameChangedHandler(event, person.id)} /> </ErrorBoundary>
          })}
          
        </div> 
      );
    }

    const classes = []; 
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>

        <p className={classes.join(' ')} >This is really working!</p>

        <button className="button"
        alt={this.state.showPersons}
        onClick={this.togglePersonsHandler}>Mostrar/Esconder Cards</button>

        {/* Imprime a variavel persons */}
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
