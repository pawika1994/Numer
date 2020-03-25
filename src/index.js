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
import Eulermethod from './components/OrdinaryDiff/Eulermethod';
import Heunmethid from './components/OrdinaryDiff/Heunmethod';
import ModifiedEuler from './components/OrdinaryDiff/ModifiedEuler';
import FirstBackward from './components/NumericalDiff/FirstBackward';
import FirstCentral from './components/NumericalDiff/FirstCentral';
import FirstForward from './components/NumericalDiff/FirstForward';
import SecondBackward from './components/NumericalDiff/SecondBackward';
import SecondCentral from './components/NumericalDiff/SecondCentral';
import SecondForward from './components/NumericalDiff/SecondForward';
import LinearRegression from './components/LSR/LinearRegression';
import MultipleRegression from './components/LSR/MultipleRegression';
import PolynormialRegression from './components/LSR/PolynormialRegression';
import Cholesky from './components/LinearAlgebraic/Cholesky';
import ConjugateGradient from './components/LinearAlgebraic/ConjugateGradient';
import CramerRule from './components/LinearAlgebraic/CramerRule';
import GaussianElimination from './components/LinearAlgebraic/GaussianElimination';
import GaussJordanMethod from './components/LinearAlgebraic/GaussJordanMethod';
import GaussSeidel from './components/LinearAlgebraic/GaussSeidel';
import Jacobi from './components/LinearAlgebraic/Jacobi';
import LU from './components/LinearAlgebraic/LU';
import MatrixInversionMethod from './components/LinearAlgebraic/MatrixInversionMethod';
import LagrangeLinear from './components/interpolation/LagrangeLinear';
import LagrangeQuadratic from './components/interpolation/LagrangeQuadratic';
import LinearSpline from './components/interpolation/LinearSpline';
import NewtonsLinear from './components/interpolation/NewtonsLinear';
import NewtonsPolynomial from './components/interpolation/NewtonsPolynomial';
import NewtonsQuadratic from './components/interpolation/NewtonsQuadratic';
import QuadraticSpline from './components/interpolation/QuadraticSpline';
import CompositeSimpson from './components/IntegrationandDiff/CompositeSimpson';
import CompositeTrapezoidal from './components/IntegrationandDiff/CompositeTrapezoidal';
import SimpsonRule from './components/IntegrationandDiff/SimpsonRule';
import TrapezoidalRule from './components/IntegrationandDiff/TrapezoidalRule';


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/Bisection" component={Bisection} />
        <Route path="/Falseposition" component={Falseposition} />
        <Route path="/Newton" component={Newton} />
        <Route path="/Onepoint" component={Onepoint} />
        <Route path="/Secant" component={Secant} />
        <Route path="/Eulermethod" component={Eulermethod}/>
        <Route path="/Heunmethid" component={Heunmethid} />
        <Route path="/ModifiedEuler" component={ModifiedEuler} />
        <Route path="/FirstBackward" component={FirstBackward} />
        <Route path="/FirstCentral" component={FirstCentral} />
        <Route path="/FirstForward" component={FirstForward} />
        
        <Route path="/SecondBackward" component={SecondBackward} />
        <Route path="/SecondCentral" component={SecondCentral} />
        <Route path="/SecondForward" component={SecondForward} />
        <Route path="/LinearRegression" component={LinearRegression} />
        <Route path="/MultipleRegression" component={MultipleRegression} />
        <Route path="/PolynormialRegression" component={PolynormialRegression} />
        <Route path="/Cholesky" component={Cholesky} />
        <Route path="/ConjugateGradient" component={ConjugateGradient} />
        <Route path="/CramerRule" component={CramerRule} />
        <Route path="/GaussianElimination" component={GaussianElimination} />
        <Route path="/GaussJordanMethod" component={GaussJordanMethod} />
        <Route path="/GaussSeidel" component={GaussSeidel} />
        <Route path="/Jacobi" component={Jacobi} />
        <Route path="/LU" component={LU} />
        <Route path="/MatrixInversionMethod" component={MatrixInversionMethod} />
        <Route path="/LagrangeLinear" component={LagrangeLinear} />
        <Route path="/LagrangeQuadratic" component={LagrangeQuadratic} />
        <Route path="/LinearSpline" component={LinearSpline} />
        <Route path="/NewtonsLinear" component={NewtonsLinear} />
        <Route path="/NewtonsPolynomial" component={NewtonsPolynomial} />
        <Route path="/NewtonsQuadratic" component={NewtonsQuadratic} />
        <Route path="/QuadraticSpline" component={QuadraticSpline} />
        <Route path="/CompositeSimpson" component={CompositeSimpson} />
        <Route path="/CompositeTrapezoidal" component={CompositeTrapezoidal} />
        <Route path="/SimpsonRule" component={SimpsonRule} />
        <Route path="/TrapezoidalRule" component={TrapezoidalRule} />

    </Router>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//<App />, document.getElementById('root')