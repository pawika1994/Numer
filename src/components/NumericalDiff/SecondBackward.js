import React from 'react';
//import './App.css';
import { Layout,Menu} from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
const { Content, Sider,Header } = Layout;

function SecondBackward() {
    return (
        <div className="SecondBackward">
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
                        <h1 style={{color:'white',textAlign:'center'}}>Numerical Method</h1>
                        </Header>
                <Content style={{ background:'white' ,padding: '0px' }}>
                        <div style={{ background: 'white', padding: 70, minHeight:1000 , textAlign: 'right' }}>
                            <h1 style={{ color: 'black' }}>SecondBackward</h1>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default SecondBackward;
