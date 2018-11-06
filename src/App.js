import React, { Component } from 'react';
import './App.css';
import CardList from './CardList';
import SearchBox from './SearchBox';

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }
    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value});
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}))
    }

    render() {
        const filteredbots = this.state.robots.filter((robot) => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        });
        return(
            <div className="tc">
                <h1 className="f1">Robo Friends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <CardList robots={filteredbots} />
            </div>
            
        );
    }
}

export default App;