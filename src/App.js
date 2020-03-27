//import React, { Component } from 'react';
//import Home from './Home';
import React from 'react';
import './App.css';
import { Layout,Menu} from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
const { Content, Sider,Header } = Layout;
class App extends React.Component {
  render() {
    return (
      <div>
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

                    </Menu>
                </Sider>
                <Layout>
                    <Header>
                        <h2 style={{color:'white',textAlign:'center'}}>Numerical Method</h2>
                        </Header>
                    <Content style={{ background: 'white', padding: '0px' }}>
                        
                    </Content>
                </Layout>
            </Layout>
      </div>
    );
  }
}
export default App;
//<Home/>
