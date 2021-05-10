
import React from 'react';
import ReactDOM from 'react-dom';
import Bisection from './Root/Bisection'
import FalsePosition from './Root/FalsePosition'
import OnepointI from './Root/One-Point-Iteration'
import Newton from './Root/Newton-Raphson'
import Secant from './Root/SecantMethod'

import Cramer from './Linear/Cramer'
import Congradient from './Linear/Conjugate Gradient Method'
import Gauss from './Linear/Gausss Elimination'
import Jordan from './Linear/Gauss Jordan Method'
import Jacobi from './Linear/Jacobi Iteration Method'
import Lu from './Linear/LU'
import Seidel from './Linear/Gauss Seidel Iteration'


import NewtonInterpolate from './Interpolation/Newton';
import Lagrange from './Interpolation/Lagrange';
import Spline from './Interpolation/Spline';

import LeastSquare from './Regression/LeastSquare';

import Trapezoidal from './Integration/Trapzoidal';
import Simpson from './Integration/Simpson';
import CompositeTrapezoidal from './Integration/CompositeTrapzoidal';
import CompositeSimpson from './Integration/CompositeSimpson';

import ForwardH from './Differentiation/Forwardh';
import ForwardH2 from './Differentiation/ForwardH2';
import BackwardH from './Differentiation/Backwardh';
import BackwardH2 from './Differentiation/Backwardh2';
import CentralH2 from './Differentiation/Centralh2';
import CentralH4 from './Differentiation/Centralh4';

import Logos from "./photo/bst1.png";
import linears from "./photo/linear.png";
import inters from "./photo/inter.png";
import lsrs from "./photo/lsr.png";
import integrats from "./photo/Itegrat.png";
import diffs from "./photo/Diff.png";

//import rooteqn from '.\src\photo\bst.png';

import { Card, Layout, Menu, Icon, Row, Col, Typography } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
const { Text } = Typography;
/*const gridStyle = {
  width: '25%',
  textAlign: 'center',
  background: '#d3adf7',
  fontSize: '16px',
  fontWeight: "bold",
};*/
class Index extends React.Component {
  state = {
    openKeys: [''],
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  rootSubmenuKeys = ['subroot', 'subalgebra', 'subinterpolate', 'subregression', 'subintegrate', 'subNDD', 'Ode'];
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  //https://github.com/ant-design/ant-design/blob/master/components/menu/demo/sider-current.md

  //ให้เปลี่ยนแปลงแค่ส่วนของcontent
  // https://books.google.co.th/books?id=cgKwDwAAQBAJ&pg=PT306&lpg=PT306&dq=ReactDOM.render(%3C%3E,+document.getElementById(%22content%22));&source=bl&ots=G7QQpIpEf7&sig=ACfU3U1yOS1yoH1ti64wwGuRb3vMTimXsw&hl=th&sa=X&ved=2ahUKEwi_h63Pj5XoAhVWVH0KHYPEDD4Q6AEwC3oECAwQAQ#v=onepage&q&f=false
  onChangePage = (props) => {
    if (props.key.localeCompare("bisection") === 0) {
      ReactDOM.render(<Bisection />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("falseP") === 0) {
      ReactDOM.render(<FalsePosition />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("onepointI") === 0) {
      ReactDOM.render(<OnepointI />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("newtonR") === 0) {
      ReactDOM.render(<Newton />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Secant") === 0) {
      ReactDOM.render(<Secant />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("cramerR") === 0) {
      ReactDOM.render(<Cramer />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("gaussE") === 0) {
      ReactDOM.render(<Gauss />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("gaussjordan") === 0) {
      ReactDOM.render(<Jordan />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("lu") === 0) {
      ReactDOM.render(<Lu />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("jacobi") === 0) {
      ReactDOM.render(<Jacobi />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("seidel") === 0) {
      ReactDOM.render(<Seidel />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("congradient") === 0) {
      ReactDOM.render(<Congradient />, document.getElementById("content"));

    }
    else if (props.key.localeCompare("divide") === 0) {
      ReactDOM.render(<NewtonInterpolate />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("lagrange") === 0) {
      ReactDOM.render(<Lagrange />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("spline") === 0) {
      ReactDOM.render(<Spline />, document.getElementById("content"));
    }

    else if (props.key.localeCompare("lse") === 0) {
      ReactDOM.render(<LeastSquare />, document.getElementById("content"));
    }

    else if (props.key.localeCompare("Trapzoidal") === 0) {
      ReactDOM.render(<Trapezoidal />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("Simpsons") === 0) {
      ReactDOM.render(<Simpson />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("comTrapzoidal") === 0) {
      ReactDOM.render(<CompositeTrapezoidal />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("comSimpson") === 0) {
      ReactDOM.render(<CompositeSimpson />, document.getElementById("content"));
    }

    else if (props.key.localeCompare("forward1") === 0) {
      ReactDOM.render(<ForwardH />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("backward1") === 0) {
      ReactDOM.render(<BackwardH />, document.getElementById("content"))
    }
    else if (props.key.localeCompare("central2") === 0) {
      ReactDOM.render(<CentralH2 />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("forward2") === 0) {
      ReactDOM.render(<ForwardH2 />, document.getElementById("content"));
    }
    else if (props.key.localeCompare("backward2") === 0) {
      ReactDOM.render(<BackwardH2 />, document.getElementById("content"))
    }
    else if (props.key.localeCompare("central4") === 0) {
      ReactDOM.render(<CentralH4 />, document.getElementById("content"));
    }

  }

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Header className="header" style={{ height: "60px", color: '#12406A', background: '#EB8F90', level: 1 }}>
          <div>

            <Row type="flex">
              <Col span={6} order={5}>

              </Col>
              <Col span={6} order={4}>

              </Col>
              <Col span={6} order={3}>

              </Col>
              <Col span={6} order={2}>

              </Col>
              <Col span={6} order={1}>

                <Icon type="loading" style={{ margin: "5px", color: "#12406A", fontSize: "120%", marginTop: "5%" }} />
            &nbsp;&nbsp;&nbsp;<Text style={{ color: "#12406A", fontSize: "16px" }} strong>Numerical Method</Text>
              </Col>
            </Row>
          </div>
        </Header>
        <Layout  >
          <Sider width={300} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}  >
            <Menu
              mode="inline"
              style={{ height: '92.5vh', borderRight: 0, backgroundColor: "#12406A", color: '#D5D2C1', overflowY: "scroll" }}
              theme='@link-color'
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              onClick={this.onChangePage}
              defaultSelectedKeys={['1']}
            >

              <SubMenu key="subroot" title={<span><Icon style={{ color: "white", fontSize: "20px" }} type="pie-chart" /><span><Text style={{ color: "white", fontSize: "14px" }} strong>Root of Equation</Text> </span></span>}>
                <Menu.Item key="bisection" ><Text style={{ color: "#EB8F90" }} strong>Bisection</Text></Menu.Item>
                <Menu.Item key="falseP"><Text style={{ color: "#EB8F90" }} strong>False Position</Text></Menu.Item>
                <Menu.Item key="onepointI"><Text style={{ color: "#EB8F90" }} strong>One-Point Iteration</Text></Menu.Item>
                <Menu.Item key="newtonR"><Text style={{ color: "#EB8F90" }} strong>Newton-Raphson</Text></Menu.Item>
                <Menu.Item key="Secant"><Text style={{ color: "#EB8F90" }} strong>Secant Method</Text></Menu.Item>
              </SubMenu>
              <SubMenu key="Subalgebra" title={<span><Icon style={{ color: "white", fontSize: "20px" }} type="pie-chart" /> <span><Text style={{ color: "white", fontSize: "14px" }} strong>Linear Algebra</Text> </span></span>}>
                <Menu.Item key="cramerR">Cramer's Rule</Menu.Item>
                <Menu.Item key="gaussE"><Text style={{ color: "#b37feb" }} strong>Gauss's Elimination</Text></Menu.Item>
                <Menu.Item key="gaussjordan"><Text style={{ color: "#b37feb" }} strong>Gauss Jordan Method</Text></Menu.Item>
                <Menu.Item key="lu">LU Decomposition</Menu.Item>
                <Menu.Item key="jacobi">Jacobi Iteration Method</Menu.Item>
                <Menu.Item key="seidel">Gauss Seidel Iteration</Menu.Item>
                <Menu.Item key="gradient">Conjugate Gradient Method</Menu.Item>
              </SubMenu>
              <SubMenu key="subinterpolate" title={<span><Icon style={{ color: "white", fontSize: "20px" }} type="deployment-unit" /> <span><Text style={{ color: "white", fontSize: "14px" }} strong>Interpolation</Text> </span></span>}>
                <Menu.Item key="divide"><Text style={{ color: "#fa541c" }} strong>Newton Divide Difference</Text></Menu.Item>
                <Menu.Item key="lagrange"><Text style={{ color: "#fa541c" }} strong>Lagrange</Text></Menu.Item>
                <Menu.Item key="spline">Spline</Menu.Item>
              </SubMenu>

              <SubMenu key="subregression" title={<span><Icon style={{ color: "white", fontSize: "20px" }} type="deployment-unit" /> <span><Text style={{ color: "white", fontSize: "14px" }} strong>Least Square Regression</Text> </span></span>}>
                <Menu.Item key="linear">Linear Regression</Menu.Item>
                <Menu.Item key="poly">Polynomial Regression</Menu.Item>
                <Menu.Item key="multiple">Multiple Linear Regression</Menu.Item>
              </SubMenu>
              <SubMenu key="subintegrate" title={<span><Icon style={{ color: "white", fontSize: "20px" }} type="deployment-unit" /> <span><Text style={{ color: "white", fontSize: "14px" }} strong>Integration</Text> </span></span>}>
                <Menu.Item key="Trapzoidal"><Text style={{ color: "#7cb305" }} strong>Trapzoidal Rule</Text></Menu.Item>
                <Menu.Item key="Simpsons"><Text style={{ color: "#7cb305" }} strong>Simpson's Rule</Text></Menu.Item>
                <Menu.Item key="comTrapzoidal"><Text style={{ color: "#7cb305" }} strong>Composite Trapezoidal Rule</Text></Menu.Item>
                <Menu.Item key="comSimpson"><Text style={{ color: "#7cb305" }} strong>Composite Simpson's Rule</Text></Menu.Item>
              </SubMenu>

              <SubMenu key="subNDD" title={<span><Icon style={{ color: "white", fontSize: "20px" }} type="deployment-unit" /> <span><Text style={{ color: "white", fontSize: "14px" }} strong>Differentiation</Text> </span></span>}>
                <Menu.Item key="forward1"><Text style={{ color: "#ad6800" }} strong>Forward Divided-Differences O(h)</Text></Menu.Item>
                <Menu.Item key="backward1"><Text style={{ color: "#ad6800" }} strong>Backward Divided-Differences O(h)</Text></Menu.Item>
                <Menu.Item key="forward2"><Text style={{ color: "#ad6800" }} strong>Forward Divided-Differences O(h{<sup>2</sup>})</Text></Menu.Item>
                <Menu.Item key="backward2"><Text style={{ color: "#ad6800" }} strong>Backward Divided-Differences O(h{<sup>2</sup>})</Text></Menu.Item>
                <Menu.Item key="central2"><Text style={{ color: "#ad6800" }} strong>Central Divided-Differences O(h{<sup>2</sup>})</Text></Menu.Item>
                <Menu.Item key="central4"><Text style={{ color: "#ad6800" }} strong>Central Divided-Differences O(h{<sup>4</sup>})</Text></Menu.Item>
              </SubMenu>

            </Menu>
          </Sider>
          <Layout>
            <Content style={{ height: "100%", padding: 24, backgroundColor: '#fff1b8' }}>
              <div id="content">
                <div style={{marginLeft:20 /*background: '#ECECEC' */ }}>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Card style={{ width: 300 }} title="LESSON ONE" bordered={false}>
                        <img style={{/* background: '#ECECEC',*/ width: 250 }}
                          alt="example"
                          src={Logos}
                        />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card style={{ width: 300, padding: "3px" }} title="LESSON TWO" bordered={false}>
                        <img style={{/* background: '#ECECEC',*/ width: 250 }}
                          alt="example"
                          src={linears}
                        />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card style={{ width: 300, padding: "3px" }} title="LESSON THREE" bordered={false}>
                        <img style={{/* background: '#ECECEC',*/ width: 250 }}
                          alt="example"
                          src={inters}
                        />
                      </Card>
                    </Col>
                  </Row>
                </div>,
                <div style={{ marginLeft:20/*background: '#ECECEC' */ }}>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Card style={{ width: 300 }} title="LESSON FOUR" bordered={false}>
                        <img style={{/* background: '#ECECEC',*/ width: 250 }}
                          alt="example"
                          src={lsrs}
                        />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card style={{ width: 300, padding: "3px" }} title="LESSON FIVE" bordered={false}>
                        <img style={{/* background: '#ECECEC',*/ width: 250 }}
                          alt="example"
                          src={integrats}
                        />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card style={{ width: 300, padding: "3px" }} title="LESSON SIX" bordered={false}>
                        <img style={{/* background: '#ECECEC',*/ width: 250 }}
                          alt="example"
                          src={diffs}
                        />
                      </Card>
                    </Col>
                  </Row>
                </div>,

              </div>

            </Content>
          </Layout>
        </Layout>
        <Footer style={{ backgroundColor: "#FFB471", minHeight: 48 }}>
        </Footer>
      </Layout>
    );
  }
}
ReactDOM.render(<Index />, document.getElementById("root"));
/*    <Card style={{ backgroundColor: '#fff1b8' }} title="NUMERICAL METHOD">
                  <Card.Grid style={gridStyle}>Root of Equation</Card.Grid>
                  <Card.Grid style={gridStyle}>Linear Equation</Card.Grid>
                  <Card.Grid style={gridStyle}>Lease of Square Regression</Card.Grid>
                  <Card.Grid style={gridStyle}>Interpolation</Card.Grid>
                  <Card.Grid style={gridStyle}>Integration</Card.Grid>
                  <Card.Grid style={gridStyle}>Differentiation</Card.Grid>

                </Card>,*/