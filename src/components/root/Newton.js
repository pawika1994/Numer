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
class Newton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            a: "",
            data: "",
            value: "",
            x: [],
            error: [],
            fx: [],
            fxd:[],
            movie: ""
        };

        this.NT = this.NT.bind(this);
        this.x = this.x.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.plot = this.plot.bind(this);
    }

    componentDidMount = async () => {
        await api.getMovieById("5e7b3cf28be3f900121a11e4").then(db => {
            this.setState({
                data: db.data.data.name
            });
            this.state.x[0] = parseFloat(db.data.data.time);
        });
    };



    handleChange({ target: { value } }) {
        this.setState({ data: value });
    }

    x({ target: { value } }) {
        this.state.x[0] = parseFloat(value);
    }
    

    NT_API = e => {
        var value = this.state.data;
        var x = parseFloat(this.state.x);
        var x_old = 0,
            error = 0,
            xi=0,
            fx = 0;
        var i,
            j = 0,
            fxd = '',
            cal;

        if (value != "" ) {
            do {
                let scp = {
                    x: x
                };
                fx = evaluate(value, scp);
                console.log("this is fxl:", cal);
                fxd = derivative(value, 'x').evaluate({ x: x });
                //fx = "";
                this.state.fx[j] = parseFloat(fx);
                this.state.fxd[j] = parseFloat(fxd);
                //console.log(fxl);
                //cal = 0;
                x_old=x;
                xi = x - (fx / fxd);
                error = Math.abs((xi - x_old) / xi);
                //console.log(value);
                //console.log(cal);
                //fx = "";
                x=xi;
                //console.log(value);
                //console.log(cal);
                //fx = '';
                //error = Math.abs((x - x_old) / x);
                this.state.error[j] = error;
                //console.log("error = ", error);
                //console.log("fxl = ", fxl, "fxm = ", fxm, "fxr = ", fxr);
                //console.log(fxm * fxr);
                j++;

                if (j >= 15) {
                    break;
                }
                if (error >= 0.00001) {
                    this.state.x[j] = x;
                }

                console.log(
                    "thi is x =",
                    this.state.x[j],
                );
            } while (error >= 0.00001);
            this.setState({ data: "" });
        }

        e.preventDefault();
    };

    NT = e => {
        var value = this.state.data;
        var x = parseFloat(this.state.x);
        var x_old = 0,
            error = 0,
            xi=0,
            fx = 0;
        var i,
            j = 0,
            fxd = '',
            cal;

        if (value != "" ) {
            do {
                let scp = {
                    x: x
                };
                fx = evaluate(value, scp);
                console.log("this is fxl:", cal);
                fxd = derivative(value, 'x').evaluate({ x: x });
                //fx = "";
                this.state.fx[j] = parseFloat(fx);
                this.state.fxd[j] = parseFloat(fxd);
                //console.log(fxl);
                //cal = 0;
                x_old=x;
                xi = x - (fx / fxd);
                error = Math.abs((xi - x_old) / xi);
                //console.log(value);
                //console.log(cal);
                //fx = "";
                x=xi;
                //console.log(value);
                //console.log(cal);
                //fx = '';
                //error = Math.abs((x - x_old) / x);
                this.state.error[j] = error;
                //console.log("error = ", error);
                //console.log("fxl = ", fxl, "fxm = ", fxm, "fxr = ", fxr);
                //console.log(fxm * fxr);
                j++;

                if (j >= 15) {
                    break;
                }
                if (error >= 0.00001) {
                    this.state.x[j] = x;
                }

                console.log(
                    "thi is x =",
                    this.state.x[j],
                );
            } while (error >= 0.00001);
            this.setState({ data: "" });
        }

        e.preventDefault();
    };

    plot() {
        const xl_plot = this.state.x;
        const yl_plot = this.state.fx;

        var data = [
            {
                type: "scatter",
                x: xl_plot,
                y: yl_plot,
                marker: {
                    color: "#000000"
                },
                name: "X"
            }
        ];

        return data;
    }

    render() {
        var i = 0;
        let data = this.plot();
        var x = this.state.x;
        var fx = this.state.fx;
        var fxd = this.state.fxd;
        var error = this.state.error;
        var movie = this.state.data;
        return (

            <div className="Newton">
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
                            <h1 style={{ color: 'white', textAlign: 'center' }}>Newton</h1>
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
                                           <h6>X</h6>
                                            </label>
                                        <Input
                                            size="large"
                                            onChange={this.x}
                                            type="text"
                                            class="form-control"
                                            id=""
                                            placeholder="Input X"
                                        />
                                    </div>

                                    
                                    <br />

                                    <Button type="submit" onClick={this.NT}>
                                        Submit</Button>

                                    <Button type="submit" onClick={this.NT_API}>
                                        API</Button>
                                </form>
                                <br />
                                <table style={{ width: "100%", border: "solid black" ,textAlign:'center'}}>
                                    <tr >
                                        <th style={{ border: "solid black",color: "#000000" }}>Iteration</th>
                                        <th style={{ border: "solid black",color: "#000000" }}>Xi</th>
                                        <th style={{ border: "solid black",color: "#000000" }}>f(X)</th>
                                        <th style={{ border: "solid black",color: "#000000" }}>f'(X)</th>
                                        <th style={{ border: "solid black",color: "#ff0000" }}>Error</th>
                                    </tr>

                                    <tr>
                                        <td style={{ border: "solid black" }}>
                                            {x.map(
                                                x => (
                                                    <div>{++i}</div>
                                                ),
                                                this
                                            )}
                                        </td>
                                        <td style={{ border: "solid black" }}>
                                            {x.map(x => (
                                                <div>{x.toFixed(6)}</div>
                                            ),this)}
                                        </td>
                                        <td style={{ border: "solid black" }}>
                                            {fx.map(
                                                fx => (
                                                    <div>{fx.toFixed(6)}</div>
                                                ),
                                                this
                                            )}
                                        </td>
                                        <td>
                                        {fxd.map(fxd => (
                                            <div>{fxd.toFixed(6)}</div>
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

export default Newton;
