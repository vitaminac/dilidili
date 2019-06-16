import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TITLE, BANNER } from './Config';
import { Header } from './Header';
import { Footer } from './Footer';
import IndexPage from './page/IndexPage';

import $ from 'jquery';
window.$ = $;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test: "Soy Test"
        };
    }

    componentDidMount() {
        document.title = TITLE;
        // TODO remove testing code
        fetch("/api/")
            .then(response => response.text())
            .then(text => this.setState({ test: text }));
    }

    render() {
        return (
            <div className="App">
                <div className="main-header-image" style={{ backgroundImage: `url('${BANNER}')` }}></div>
                <Header banner={BANNER} />
                <div id="main-container" className="concat">
                    {this.props.children || <IndexPage />}
                </div>
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
