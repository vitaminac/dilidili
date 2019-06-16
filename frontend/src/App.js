import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TITLE, BANNER } from './config';
import { Header } from './Header';
import { Footer } from './Footer';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test: "Soy Test"
        };
    }

    componentDidMount() {
        document.title = TITLE;
        fetch("/api/")
            .then(response => response.text())
            .then(text => this.setState({ test: text }));
    }

    render() {
        return (
            <div className="App">
                <div class="main-header-image" style={{ "background-image": `url('${BANNER}')` }}></div>
                <Header banner={BANNER} />
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Edit <code>src/App.js</code> and save to reload.</p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    {this.state.test}
                </header>
                <Footer />
            </div>
        );
    }
}

export default App;
