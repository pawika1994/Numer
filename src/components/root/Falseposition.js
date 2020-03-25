import React from 'react';
//import './App.css';
import { Layout, Menu, Input,Button,Table} from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { evaluate, parse } from "mathjs";
import api from "../../api";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";

const { Content, Sider, Header } = Layout;
const PlotlyComponent = createPlotlyComponent(Plotly);
class Falseposition extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            a: "",
            data: "",
            value: "",
            xl: [],
            xr: [],
            xm: [],
            error: [],
            fxr: [],
            fxl: [],
            fxm: [],
            movie: ""
        };

        this.FP = this.FP.bind(this);
        this.xl = this.xl.bind(this);
        this.xr = this.xr.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.plot = this.plot.bind(this);
    }

    componentDidMount = async () => {
        await api.getMovieById("5e7b3c3d8be3f900121a11e1").then(db => {
            this.setState({
                data: db.data.data.name
            });
            this.state.xl[0] = parseFloat(db.data.data.time);
            this.state.xr[0] = parseFloat(db.data.data.rating);
        });
    };



    handleChange({ target: { value } }) {
        this.setState({ data: value });
    }

    xl({ target: { value } }) {
        this.state.xl[0] = parseFloat(value);
    }
    xr({ target: { value } }) {
        this.state.xr[0] = parseFloat(value);
    }

    FP_API = e => {
        var value = this.state.data;
        var xl = parseFloat(this.state.xl);
        var xr = parseFloat(this.state.xr);
        var xm = 0,
            xm_old = 0,
            error = 0,
            fxl = 0,
            fxr = 0,
            fxm = 0;
        var i,
            j = 0,
            //fx = "",
            cal;

        if (value != "" ) {
            do {
                let scp = {
                    x: xl
                };
                cal = evaluate(value, scp);
                console.log("this is fxl:", cal);
                //fx = "";
                fxl = 0;
                fxl = parseFloat(cal);
                this.state.fxl[j] = fxl;
                //console.log(fxl);
                cal = 0;

                let scp1 = {
                    x: xr
                };
                //console.log(value);
                cal = evaluate(value, scp1);
                //console.log(cal);
                //fx = "";
                fxr = 0;
                fxr = parseFloat(cal);
                this.state.fxr[j] = fxr;
                cal = 0;

                xm = ((xr * fxl) - (xl * fxr)) / (fxl - fxr);

                let scp2 = {
                    x: xm
                };
                //console.log(value);
                cal = evaluate(value, scp2);
                //console.log(cal);
                //fx = "";
                fxm = 0;
                fxm = parseFloat(cal);
                this.state.fxm[j] = fxm;
                cal = 0;

                this.state.xm[j] = xm;
                error = Math.abs((xm - xm_old) / xm);
                this.state.error[j] = error;
                //console.log("error = ", error);
                xm_old = xm;
                //console.log("fxl = ", fxl, "fxm = ", fxm, "fxr = ", fxr);
                //console.log(fxm * fxr);
                j++;

                if (error >= 0.00001) {
                    if (fxm * fxr < 0) {
                        this.state.xl[j] = xm;
                        this.state.xr[j] = xr;
                        xl = xm;
                    } else if (fxm * fxr > 0) {
                        this.state.xr[j] = xm;
                        this.state.xl[j] = xl;
                        xr = xm;
                    }
                }

                console.log(
                    "thi is xl =",
                    this.state.xl[j],
                    "this is xm = ",
                    this.state.xm[j - 1],
                    "this is xr = ",
                    this.state.xr[j]
                );
            } while (error >= 0.00001);
            this.setState({ data: "" });
        }

        e.preventDefault();
    };

    FP = e => {
        var value = this.state.data;
        var xl = parseFloat(this.state.xl);
        var xr = parseFloat(this.state.xr);
        //console.log(xl, xr);
        //console.log("this is value",value);
        var xm = 0,
            xm_old = 0,
            error = 0,
            fxl = 0,
            fxr = 0,
            fxm = 0;
        var i,
            j = 0,
            //fx = "",
            cal;

        if (value != "" && xl != "" && xr != "") {
            do {
                let scp = {
                    x: xl
                };
                //console.log(value);
                cal = evaluate(value, scp);
                // console.log("this is fxl:",cal);
                //fx = "";
                fxl = 0;
                fxl = parseFloat(cal);
                this.state.fxl[j] = fxl;
                console.log(fxl);
                cal = 0;

                let scp1 = {
                    x: xr
                };
                //console.log(value);
                cal = evaluate(value, scp1);
                //console.log(cal);
                //fx = "";
                fxr = 0;
                fxr = parseFloat(cal);
                this.state.fxr[j] = fxr;
                cal = 0;

                xm = ((xr * fxl) - (xl * fxr)) / (fxl - fxr);

                let scp2 = {
                    x: xm
                };
                //console.log(value);
                cal = evaluate(value, scp2);
                //console.log(cal);
                //fx = "";
                fxm = 0;
                fxm = parseFloat(cal);
                this.state.fxm[j] = fxm;
                cal = 0;

                this.state.xm[j] = xm;
                error = Math.abs((xm - xm_old) / xm);
                this.state.error[j] = error;
                //console.log("error = ", error);
                xm_old = xm;
                //console.log("fxl = ", fxl, "fxm = ", fxm, "fxr = ", fxr);
                //console.log(fxm * fxr);
                j++;

                if (error >= 0.00001) {
                    if (fxm * fxr < 0) {
                        this.state.xl[j] = xm;
                        this.state.xr[j] = xr;
                        xl = xm;
                    } else if (fxm * fxr > 0) {
                        this.state.xr[j] = xm;
                        this.state.xl[j] = xl;
                        xr = xm;
                    }
                }

                console.log(
                    "xl =",
                    this.state.xl[j],
                    "xm = ",
                    this.state.xm[j - 1],
                    "xr = ",
                    this.state.xr[j]
                );
            } while (error >= 0.00001);
            this.setState({ data: "" });
        }
        this.plot();

        e.preventDefault();
    };

    plot() {
        const xl_plot = this.state.xl;
        const yl_plot = this.state.fxl;
        const xr_plot = this.state.xr;
        const yr_plot = this.state.fxr;

        var data = [
            {
                type: "scatter",
                x: xl_plot,
                y: yl_plot,
                marker: {
                    color: "#000000"
                },
                name: "XL"
            },
            {
                type: "scatter",
                x: xr_plot,
                y: yr_plot,
                marker: {
                    color: "#000000"
                },
                name: "XR"
            }
        ];

        return data;
    }

    render() {
        var i = 0;
        let data = this.plot();
        var xl = this.state.xl;
        var xr = this.state.xr;
        var xm = this.state.xm;
        var fxl = this.state.fxl;
        var fxr = this.state.fxr;
        var fxm = this.state.fxm;
        var error = this.state.error;
        var movie = this.state.data;
        return (

            <div className="Falseposition">
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
                            <h1 style={{ color: 'white', textAlign: 'center' }}>Falseposition</h1>
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
                                           <h6>X1</h6>
                                            </label>
                                        <Input
                                            size="large"
                                            onChange={this.xl}
                                            type="text"
                                            class="form-control"
                                            id=""
                                            placeholder="Input Xl"
                                        />
                                    </div>

                                    <div>
                                        <label for="">
                                        <h6>Xr</h6>
                                            </label>
                                        <Input
                                            size="large"
                                            onChange={this.xr}
                                            type="text"
                                            class="form-control"
                                            id=""
                                            placeholder="Input Xr"
                                        />
                                    </div>
                                    <br />

                                    <Button type="submit" onClick={this.FP}>
                                        Submit</Button>

                                    <Button type="submit" onClick={this.FP_API}>
                                        API</Button>
                                </form>
                                <br />
                                <table style={{ width: "100%", border: "solid black" ,textAlign:'center'}}>
                                    <tr >
                                        <th style={{ border: "solid black",color: "#000000" }}>Iteration</th>
                                        <th style={{ border: "solid black",color: "#000000" }}>XL</th>
                                        <th style={{ border: "solid black" ,color: "#000000"}}>XR</th>
                                        <th style={{ border: "solid black" ,color: "#000000"}}>XM</th>
                                        <th style={{ border: "solid black",color: "#000000" }}>f(XL)</th>
                                        <th style={{ border: "solid black",color: "#000000" }}>f(XR)</th>
                                        <th style={{ border: "solid black",color: "#000000" }}>f(XM)</th>
                                        <th style={{ border: "solid black",color: "#ff0000" }}>Error</th>
                                    </tr>

                                    <tr>
                                        <td style={{ border: "solid black" }}>
                                            {xr.map(
                                                x => (
                                                    <div>{++i}</div>
                                                ),
                                                this
                                            )}
                                        </td>
                                        <td style={{ border: "solid black" }}>
                                            {xl.map(xl => (
                                                <div>{xl.toFixed(6)}</div>
                                            ))}
                                        </td>
                                        <td style={{ border: "solid black" }}>
                                            {xr.map(
                                                xr => (
                                                    <div>{xr.toFixed(6)}</div>
                                                ),
                                                this
                                            )}
                                        </td>
                                        <td style={{ border: "solid black" }}>
                                            {xm.map(
                                                xm => (
                                                    <div>{xm.toFixed(6)}</div>
                                                ),
                                                this
                                            )}
                                        </td>
                                        <td style={{ border: "solid black" }}>
                                            {fxl.map(
                                                fxl => (
                                                    <div>{fxl.toFixed(6)}</div>
                                                ),
                                                this
                                            )}
                                        </td>
                                        <td style={{ border: "solid black" }}>
                                            {fxr.map(
                                                fxr => (
                                                    <div>{fxr.toFixed(6)}</div>
                                                ),
                                                this
                                            )}
                                        </td>
                                        <td style={{ border: "solid black" }}>
                                            {fxm.map(
                                                fxm => (
                                                    <div>{fxm.toFixed(6)}</div>
                                                ),
                                                this
                                            )}
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

export default Falseposition;
