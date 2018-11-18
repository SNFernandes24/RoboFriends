import React, { Component } from 'react';
import './App.css';
import CardList from '../components/CardList';
import ErrorBoundary from '../components/ErrorBoundary';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

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
        const {robots, searchfield} = this.state;
        const filteredbots = robots.filter((robot) => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        });
        return !robots.length ?
            <h1>Loading</h1> :
            (
                <div className="tc">
                    <h1 className="f1">Robo Friends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredbots} />
                        </ErrorBoundary>
                    </Scroll>
                </div>
                
            ); 
    }
}

export default App;