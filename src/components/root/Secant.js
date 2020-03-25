import React from 'react';
//import './App.css';
import { Layout, Menu, Input,Button,Table} from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { derivative,evaluate, parse } from "mathjs";
import api from "../../api";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";

const { Content, Sider, Header } = Layout;
const PlotlyComponent = createPlotlyComponent(Plotly);
class Secant extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            a: "",
            data: "",
            value: "",
            x0: [],
            x1:[],
            error: [],
            fx0: [],
            fx1:[],
            movie: ""
        };

        this.SC = this.SC.bind(this);
        this.x0 = this.x0.bind(this);
        this.x1 = this.x1.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.plot = this.plot.bind(this);
    }

    componentDidMount = async () => {
        await api.getMovieById("5e7b3d198be3f900121a11e5").then(db => {
            this.setState({
                data: db.data.data.name
            });
            this.state.x0[0] = parseFloat(db.data.data.time);
            this.state.x1[0] = parseFloat(db.data.data.rating);
        });
        
    };



    handleChange({ target: { value } }) {
        this.setState({ data: value });
    }

    x0({ target: { value } }) {
        this.state.x0[0] = parseFloat(value);
    }
    x1({ target: { value } }) {
        this.state.x1[0] = parseFloat(value);
    }
    

    SC_API = e => {
        var value = this.state.data;
        var x0 = parseFloat(this.state.x0);
        var x1 = parseFloat(this.state.x1);
        console.log("fx = ", value, "x0 = ", x0, "x1 = ", x1);
        var x_old = 0, error = 0, xi = 0;
        var i, j = 0, fx1 = '', fx0 = '', fxi = '';
        if (value != '') {
            do {
                let scp = {
                    x: x0,
                }
                //console.log(value);
                fx0 = evaluate(value, scp);
                this.state.fx0[j] = fx0;

                let scp1 = {
                    x: x1,
                }
                //console.log(value);
                fx1 = evaluate(value, scp1);
                this.state.fx1[j] = fx1;

                fxi = (fx0 - fx1) / (x0 - x1);

                x1 = x0;
                x0 = x0 - (fx0 / fxi);
                console.log("x0 = ", x0, "x1 = ", x1);

                error = Math.abs((x0 - x1) / x0);

                this.state.error[j] = error;
                j++;
                if (j >= 15) {
                    break;
                }
                if (error >= 0.00001) {
                    this.state.x0[j] = x0;
                    this.state.x1[j] = x1;
                }

            } while (error >= 0.00001);
            this.setState({ data: "" });
        }


        e.preventDefault();
    };

    SC = e => {
        var value = this.state.data;
        var x0 = parseFloat(this.state.x0);
        var x1 = parseFloat(this.state.x1);
        console.log("fx = ", value, "x0 = ", x0, "x1 = ", x1);
        var x_old = 0, error = 0, xi = 0;
        var i, j = 0, fx1 = '', fx0 = '', fxi = '';
        if (value != '') {
            do {
                let scp = {
                    x: x0,
                }
                //console.log(value);
                fx0 = evaluate(value, scp);
                this.state.fx0[j] = fx0;

                let scp1 = {
                    x: x1,
                }
                //console.log(value);
                fx1 = evaluate(value, scp1);
                this.state.fx1[j] = fx1;

                fxi = (fx0 - fx1) / (x0 - x1);

                x1 = x0;
                x0 = x0 - (fx0 / fxi);
                console.log("x0 = ", x0, "x1 = ", x1);

                error = Math.abs((x0 - x1) / x0);

                this.state.error[j] = error;
                j++;
                if (j >= 15) {
                    break;
                }
                if (error >= 0.00001) {
                    this.state.x0[j] = x0;
                    this.state.x1[j] = x1;
                }

            } while (error >= 0.00001);
            this.setState({ data: "" });
        }

        e.preventDefault();
    };

    plot() {
        const x0_plot = this.state.x0;
        const y0_plot = this.state.fx0;
        const x1_plot = this.state.x1;
        const y1_plot = this.state.fx1;

        var data = [
            {
                type: "scatter",
                x: x0_plot,
                y: y0_plot,
                marker: {
                    color: "#000000"
                },
                name: "X0"
            },
            {
                type: 'scatter',
                x: x1_plot,
                y: y1_plot,
                marker: {
                    color: '#ffab00'
                },
                name: 'X1'
            },
        ];

        return data;
    }

    render() {
        var i = 0;
        let data = this.plot();
        var x0 = this.state.x0;
        var x1 = this.state.x1;
        var fx0 = this.state.fx0;
        var fx1 = this.state.fx1;
        var error = this.state.error;
        var movie = this.state.data;
        return (

            <div className="Secant">
                <Layout>
                    <Sider width={300} className="site-layout-background">
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '200%', borderRight: 0 }}
                        >
                            <Menu.Item key="Home">
                                <a href="/">Home</a>
                            </Menu.Item>
                            <SubMenu
                                title={
                                    <span>
                                        <span>Roots of Equations</span>
                                    </span>
                                }
                            >

                                <Menu.Item key='Bisection'>
                                    <a href="/Bisection">Bisection</a>
                                </Menu.Item>
                                <Menu.Item key='FalsePosition'>
                                    <a href="/Falseposition">False Position</a>
                                </Menu.Item>
                                <Menu.Item key='OnepointIterationMethod'>
                                    <a href="/Onepoint">One-point Iteration Method</a>
                                </Menu.Item>
                                <Menu.Item key='Newton'>
                                    <a href="/Newton">Newton</a>
                                </Menu.Item>
                                <Menu.Item key='SecantMethod'>
                                    <a href="/Secant">SecantMethod</a>
                                </Menu.Item>

                            </SubMenu>

                            <SubMenu title={
                                <span>
                                    <span>Linear Algebraic Equations</span>
                                </span>
                            }
                            >
                                <Menu.Item key='CramerRule'>
                                    <a href="/CramerRule">Cramer’s Rule</a>
                                </Menu.Item>
                                <Menu.Item key='GaussianElimination'>
                                    <a href="/GaussianElimination">Gaussian Elimination</a>
                                </Menu.Item>
                                <Menu.Item key='GaussJordanMethod'>
                                    <a href="/GaussJordanMethod">Gauss Jordan Method</a>
                                </Menu.Item>
                                <Menu.Item key='MatrixInversionMethod'>
                                    <a href="/MatrixInversionMethod">Matrix Inversion Method</a>
                                </Menu.Item>
                                <Menu.Item key='LU'>
                                    <a href="/LU">LU Decomposition Method</a>
                                </Menu.Item>
                                <Menu.Item key='Cholesky'>
                                    <a href="/Cholesky">Cholesky Method</a>
                                </Menu.Item>
                                <Menu.Item key='Jacobi'>
                                    <a href="/Jacobi">Jacobi Iteration Method</a>
                                </Menu.Item>
                                <Menu.Item key='GaussSeidel'>
                                    <a href="/GaussSeidel">Gauss-Seidel Iteration Method</a>
                                </Menu.Item>
                                <Menu.Item key='ConjugateGradient'>
                                    <a href="/ConjugateGradient">Conjugate Gradient Method</a>
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu
                                title={
                                    <span>
                                        <span>Interpolation and Extrapolation</span>
                                    </span>
                                }
                            >
                                <Menu.ItemGroup key='Newtons divided-differences' title='Newtons divided-differences'>
                                    <Menu.Item key='NewtonsLinear'>
                                        <a href="/NewtonsLinear">Linear Interpolation</a>
                                    </Menu.Item>
                                    <Menu.Item key='NewtonsQuadratic'>
                                        <a href="/NewtonsQuadratic">Quadratic Newton</a>
                                    </Menu.Item>
                                    <Menu.Item key='NewtonsPolynomial'>
                                        <a href="/NewtonsPolynomial">Polynomial Newton</a>
                                    </Menu.Item>
                                </Menu.ItemGroup>

                                <Menu.ItemGroup key='Lagrange polynomials' title='Lagrange polynomials'>
                                    <Menu.Item key='LagrangeLinear'>
                                        <a href="/LagrangeLinear">Linear Interpolation</a>
                                    </Menu.Item>
                                    <Menu.Item key='LagrangeQuadratic'>
                                        <a href="/LagrangeQuadratic">Quadratic Newton</a>
                                    </Menu.Item>
                                </Menu.ItemGroup>

                                <Menu.ItemGroup key='Spline interpolation' title='Spline interpolation'>
                                    <Menu.Item key='LinearSpline'>
                                        <a href="/LinearSpline">Linear Spline</a>
                                    </Menu.Item>
                                    <Menu.Item key='QuadraticSpline'>
                                        <a href="/QuadraticSpline">Quadratic Spline</a>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>

                            <SubMenu title={
                                <span>
                                    <span>Least Squares Regression</span>
                                </span>
                            }>
                                <Menu.Item key='LinearRegression'>
                                    <a href="/LinearRegression">Linear Regression</a>
                                </Menu.Item>
                                <Menu.Item key='PolynormialRegression'>
                                    <a href="/PolynormialRegression">Polynormial Regression</a>
                                </Menu.Item>
                                <Menu.Item key='MultipleRegression'>
                                    <a href="/MultipleRegression">Multiple Regression</a>
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu title={
                                <span>
                                    <span>Integration and Differentiation</span>
                                </span>
                            }>
                                <Menu.ItemGroup>
                                    <Menu.Item key='TrapezoidalRule'>
                                        <a href="/TrapezoidalRule">Trapezoidal Rule</a>
                                    </Menu.Item>
                                    <Menu.Item key='CompositeTrapezoidal'>
                                        <a href="/CompositeTrapezoidal">Composite Trapezoidal</a>
                                    </Menu.Item>
                                    <Menu.Item key='SimpsonRule'>
                                        <a href="/SimpsonRule">Simpson Rule</a>
                                    </Menu.Item>
                                    <Menu.Item key='CompositeSimpson'>
                                        <a href="/CompositeSimpson">Composite Simpson</a>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>

                            <SubMenu title={
                                <span>
                                    <span>Numerical Differentiation</span>
                                </span>
                            }>
                                <Menu.ItemGroup key='First Divided Difference' title='First Divided Difference'>
                                    <Menu.Item key='FirstForward'>
                                        <a href="/FirstForward">Forward Divided Difference</a>
                                    </Menu.Item>
                                    <Menu.Item key='FirstBackward'>
                                        <a href="/FirstBackward">Backward Divided Difference</a>
                                    </Menu.Item>
                                    <Menu.Item key='FirstCentral'>
                                        <a href="/FirstCentral">Central Divided Difference</a>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup key='Second Divided Difference' title='Second Divided Difference'>
                                    <Menu.Item key='SecondForward'>
                                        <a href="/SecondForward">Forward Divided Difference</a>
                                    </Menu.Item>
                                    <Menu.Item key='SecondBackward'>
                                        <a href="/SecondBackward">Backward Divided Difference</a>
                                    </Menu.Item>
                                    <Menu.Item key='SecondCentral'>
                                        <a href="/SecondCentral">Central Divided Difference</a>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>

                            <SubMenu title={
                                <span>
                                    <span>Ordinary Differential Equation</span>
                                </span>
                            }>
                                <Menu.Item key='Eulermethod'>
                                    <a href="/Eulermethod">Euler's method</a>
                                </Menu.Item>
                                <Menu.Item key='Heunmethod'>
                                    <a href="/Heunmethod">Heun's method</a>
                                </Menu.Item>
                                <Menu.Item key='ModifiedEuler'>
                                    <a href="/ModifiedEuler">Modified Euler's method</a>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header>
                            <h1 style={{ color: 'white', textAlign: 'center' }}>SecantMethod</h1>
                        </Header>
                        <Content style={{ background: 'white', padding: '0px' }}>
                            <div style={{ background: 'white', padding: 30, minHeight: 100}}>
                                <form action="">

                                    <div>
                                        <label for="">
                                            <h6>Fx</h6>
                                        </label>
                                        <Input
                                            size="large"
                                            onChange={this.handleChange}
                                            type="text"
                                            class="form-control"
                                            id=""
                                            placeholder="Input fx"
                                        />
                                    </div>

                                    <div>
                                        <label for="">
                                           <h6>X0</h6>
                                            </label>
                                        <Input
                                            size="large"
                                            onChange={this.x0}
                                            type="text"
                                            class="form-control"
                                            id=""
                                            placeholder="Input X0"
                                        />
                                    </div>
                                    <div>
                                        <label for="">
                                           <h6>X1</h6>
                                            </label>
                                        <Input
                                            size="large"
                                            onChange={this.x1}
                                            type="text"
                                            class="form-control"
                                            id=""
                                            placeholder="Input X1"
                                        />
                                    </div>

                                    
                                    <br />

                                    <Button type="submit" onClick={this.SC}>
                                        Submit</Button>

                                    <Button type="submit" onClick={this.SC_API}>
                                        API</Button>
                                </form>
                                <br />
                                <table style={{ width: "100%", border: "solid black" ,textAlign:'center'}}>
                                    <tr >
                                        <th style={{ border: "solid black",color: "#000000" }}>Iteration</th>
                                        <th style={{ border: "solid black",color: "#000000" }}>X0</th>
                                        <th style={{ border: "solid black",color: "#000000" }}>X1</th>
                                        <th style={{ border: "solid black",color: "#000000" }}>f(X0)</th>
                                        <th style={{ border: "solid black",color: "#000000" }}>f(X1)</th>
                                        <th style={{ border: "solid black",color: "#ff0000" }}>Error</th>
                                    </tr>

                                    <tr>
                                        <td style={{ border: "solid black" }}>
                                            {x0.map(
                                                x0 => (
                                                    <div>{++i}</div>
                                                ),
                                                this
                                            )}
                                        </td>
                                        <td style={{ border: "solid black" }}>
                                            {x0.map(x => (
                                                <div>{x.toFixed(6)}</div>
                                            ),this)}
                                        </td>
                                        <td style={{ border: "solid black" }}>
                                            {x1.map(x => (
                                                <div>{x.toFixed(6)}</div>
                                            ),this)}
                                        </td>
                                        <td style={{ border: "solid black" }}>
                                            {fx0.map(
                                                fx => (
                                                    <div>{fx.toFixed(6)}</div>
                                                ),
                                                this
                                            )}
                                        </td>
                                        <td>
                                        {fx1.map(fx => (
                                            <div>{fx.toFixed(6)}</div>
                                        ), this)}
                                    </td>
                                        <td style={{ border: "solid black" }}>
                                            {error.map(
                                                er => (
                                                    <div>{er.toFixed(6)}</div>
                                                ),
                                                this
                                            )}
                                        </td>
                                    </tr>
                                </table>
                                <div
                                    style={{ width: "100%", height: "550px", float: "middle" }}
                                >
                                    <PlotlyComponent className="whatever" data={data} />
                                </div>

                            </div>


                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }

}

export default Secant;
