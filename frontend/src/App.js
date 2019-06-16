import $ from 'jquery';
import React from 'react';
import './App.css';
import Banner from './assets/images/bg1.jpg';
import { BANNER, TITLE } from './Config';
import { Footer } from './Footer';
import { Header } from './Header';
import IndexPage from './page/IndexPage';

window.$ = $;

class App extends React.Component {
    componentDidMount() {
        document.title = TITLE;
    }

    render() {
        return (
            <div className="App">
                <div className="main-header-image" style={{ backgroundImage: `url(${Banner})` }}></div>
                <Header banner={BANNER} />
                <div id="main-container" className="concat">
                    {this.props.children || <IndexPage />}
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
