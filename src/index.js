import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, Route, browserHistory } from 'react-router';
import Bisection from './components/root/Bisection';
import Falseposition from './components/root/Falseposition';
import Newton from './components/root/Newton';
import Onepoint from './components/root/Onepoint';
import Secant from './components/root/Secant';
import FirstBackward from './components/NumericalDiff/FirstBackward';
import FirstCentral from './components/NumericalDiff/FirstCentral';
import FirstForward from './components/NumericalDiff/FirstForward';
import SecondBackward from './components/NumericalDiff/SecondBackward';
import SecondCentral from './components/NumericalDiff/SecondCentral';
import SecondForward from './components/NumericalDiff/SecondForward';



ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/Bisection" component={Bisection} />
        <Route path="/Falseposition" component={Falseposition} />
        <Route path="/Newton" component={Newton} />
        <Route path="/Onepoint" component={Onepoint} />
        <Route path="/Secant" component={Secant} />
        <Route path="/FirstBackward" component={FirstBackward} />
        <Route path="/FirstCentral" component={FirstCentral} />
        <Route path="/FirstForward" component={FirstForward} />
        
        <Route path="/SecondBackward" component={SecondBackward} />
        <Route path="/SecondCentral" component={SecondCentral} />
        <Route path="/SecondForward" component={SecondForward} />
        


    </Router>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//<App />, document.getElementById('root')
