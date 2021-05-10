import React, { Component } from 'react'
import { Card, Input, Button, Table, Row, Col, Tabs } from 'antd';
import Plot from 'react-plotly.js';
import axios from 'axios';
const { TabPane } = Tabs;
var math = require('mathjs')
var datainTable = []
var curvexl = [];
var curvexr = [];
var curvexm = [];
var curvexl1 = [];
var curvexr1 = [];
var curvexm1 = [];
var funcxl=[]  
var funcxr=[]
var funcxm=[]
var curveerror = [];
var fxl = [];
var fxr = [];
var x = [];
var fError = [];
var iteration = [];
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "Xl",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "Xr",
        dataIndex: "xr",
        key: "xr"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];

const xingraph = math.range(1, 3, 0.5).toArray();
var fx = " ";
function callback(key) {
    console.log(key);
}
class Bisection extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            Output: false,
            Graph: false,
            Outputdb: false,
            Graphdb: false,
            data: [],
            loading: true,
            error: false,

        }
        this.handleChange = this.handleChange.bind(this);
        this.bisection = this.bisection.bind(this);
    }

    bisection(xl, xr) {
        if (this.state.fx !== "") {
            fx = this.state.fx;
        }
        else {
            fx = this.state.data[0].fx;
        }
        var xm = 0;
        var sumerror = parseFloat(0.000000);
        var i = 0;

        do {
            xm = (xl + xr) / 2;
            if (this.func(xm) * this.func(xr) < 0) {
                sumerror = Math.abs((xm - xr) / xm);
                xl = xm;
            }
            else {
                sumerror = Math.abs((xm - xl) / xm);
                xr = xm;
            }
            funcxl[i] = this.func(xl).toFixed(6);
            funcxr[i] = this.func(xr).toFixed(6);
            //funcxm[i] = this.func(xm).toFixed(6);
            iteration[i] = i;
            fxl[i] = xl.toFixed(6);
            fxr[i] = xr.toFixed(6);
            x[i] = xm.toFixed(6);
            fError[i] = Math.abs(sumerror).toFixed(6);
            i++;
        } while (Math.abs(sumerror) > 0.000001);

        this.createTable(fxl, fxr, x, fError);
      console.log(funcxl)
      console.log(fxl)
       
        curvexl = {
            name: 'Xl',
            x: iteration,
            y: fxl
        };
        curvexr = {
            name: 'xr',
            x: iteration,
            y: fxr,
        };
        curvexm = {
            name: 'xm',
            x: iteration,
            y: x

        };
        curveerror = {
            name: 'error',
            x: iteration,
            y: fError

        };
        if (this.state.fx !== "") {
            this.setState({
                Output: true,
                Graph: true
            })
        }
        else {
            this.setState({
                Outputdb: true,
                Graphdb: true
            })
        }
    }
    //https://books.google.co.th/books?id=Xuh1DwAAQBAJ&pg=PA39&lpg=PA39&dq=let+scope+%3D+%7Bx:parseFloat(X)+%7D;&source=bl&ots=a20KyuHXsa&sig=ACfU3U3S4dR87m5s53bx1-3XQD1NWzD0jw&hl=th&sa=X&ved=2ahUKEwjM9uCet67oAhW49nMBHQVADEwQ6AEwCnoECAoQAQ#v=onepage&q=let%20scope%20%3D%20%7Bx%3AparseFloat(X)%20%7D%3B&f=false
    func(X) {
        if (this.state.fx !== "") {
            var variable = math.compile(this.state.fx);
            let scope = { //x ใช้หลายที่เลยให้ let เพื่อกำหนด scope
                x:parseFloat(X) 
            }; //แปลงค่า string หรือตัวแปรให้เป็น Number
            return variable.eval(scope); //eval compile 'String'
        }
        else {
            var variables = math.compile(this.state.data[0].fx);
            let scope = { 
                x: parseFloat(X) 
            }; //แปลงค่า string หรือตัวแปรให้เป็น Number
            return variables.eval(scope); //eval compile 'String'
        }
    }
    createTable(xl, xr, x, error) {
        datainTable = []
        for (var i = 0; i < xl.length; i++) {
            datainTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
                x: x[i],
                error: error[i],
            });
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value //รันทุกครั้งเมื่อมีอินพุทใหม่เข้ามา 
        });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/bisectionfxs')
            .then(res => {
                const data = res.data.data; // get the data array instead of object
                this.setState({ data, loading: false });
                console.log(data);
                // fx = this.state.data[0];

            })
            .catch(err => { // log request error and prevent access to undefined state
                this.setState({ loading: false, error: true });
                console.error(err);
            })
    }
    render() {
         if (this.state.loading) {
               return (
                   <div>
                       <p> Loading... </p>
                   </div>
               )
           }
           if (this.state.error || !this.state.data[0]) { // if request failed or data is empty don't try to access it either
               return (
                   <div>
                       <p> An error occured </p>
                   </div>
               )
           }
        return (
            // <Content style={{ padding: 24, minHeight: 2000, backgroundColor: '#fff1b8' }}>
            <div >

                <h2 style={{ color: "black", fontWeight: "bold" }}>Bisection</h2>

                <div style={{ backgroundColor: '#fff1b8' }}
                    onChange={this.handleChange}
                >
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tabBarStyle={{ fontSize: "18px",fontWeight: "bold" }} tab="Insert by Yourself" key="1">
                            <Row>
                                <Col style={{ width: 400 }} span={12}>
                                    <Card headStyle={{ color: 'black', fontWeight: "bold" }} style={{ width: 350, padding: '3px' }} title="Insert Eqation" bordered={false}>
                                        <h2 style={{ fontWeight: "bold" }} >Equation</h2><Input size="large" name="fx" style={{ width: 300, fontSize: "18px", fontWeight: "bold" }}></Input>
                                        <h2 style={{ fontWeight: "bold" }}>X<sub>L</sub></h2>
                                        <Input size="large" name="xl" style={{ width: 300, fontSize: "18px", fontWeight: "bold" }}></Input>
                                        <h2 style={{ fontWeight: "bold" }}>X<sub>R</sub></h2><Input size="large" name="xr" style={{ width: 300, fontSize: "18px", fontWeight: "bold" }}></Input><br /><br />
                                        <Button onClick={() => this.bisection(parseFloat(this.state.xl), parseFloat(this.state.xr))}
                                            style={{ fontSize: "20px", marginLeft: 90, color: '#ffffff', background: '#12406A' }}>Submit</Button>
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    {this.state.Graph &&
                                        //https://stackoverflow.com/questions/52605304/show-hide-a-component-in-react-using-state/52605495
                                        <Card
                                            bordered={true}
                                            style={{ marginBottom: 20, width: 700, height: 400, border: "2px solid black",/* background: "#0000000",*/ color: '#ffffff', float: "left" }}
                                        >
                                            <Plot
                                                data={[
                                                    {
                                                        x: math.range(1, 3, 0.5).toArray(),
                                                        y: xingraph.map(function (x) {
                                                            return math.compile(fx).eval({ x: x })
                                                        }),
                                                        type: 'scatter',
                                                        marker: { color: 'yellow' },
                                                        name: 'fx'
                                                    },
                                                    {
                                                       curvexl1 , curvexr1, curvexm1
                                                    },
                                                    curvexl1 = {
                                                        name: 'Xl',
                                                        x: fxl,
                                                        y: funcxl,
                                                        marker: { color: 'purple' },
                                                    },
                                                    curvexr1 = {
                                                        name: 'xr',
                                                        x: fxr,
                                                        y: funcxr,
                                                        marker: { color: 'blue' },
                                                    },
                                                    curvexm1 = {
                                                        name: 'xm',
                                                        x: x,
                                                        y: funcxm,
                                                        marker: { color: 'orange' },
                                            
                                                    },
                                                ]}
                                                layout={{ title: 'Plotfx' }}
                                                style={{ width: "50%", float: "left", height: "360px" }}
                                            />
                                            <Plot
                                                data={[curvexl, curvexr, curveerror, curvexm]}
                                                layout={{ title: 'PlotX' }}
                                                style={{ width: "50%", float: "left", height: "360px" }}
                                            />
                                            <br /><br />
                                        </Card>
                                    }
                                </Col>
                            </Row>
                            {this.state.Output &&
                                <div style={{ width: 600, marginTop: 20, marginLeft: 300, background: '#ECECEC', padding: '30px' }}>
                                    <Card >

                                        <div
                                            bordered={true}
                                        // style={{ width: "50%", float: "inline-start", marginBlockStart: "2%" }}
                                        >
                                            <Table style={{ width: 500 }} columns={columns} dataSource={datainTable} pagination={{ pageSize: 10 }} > </Table>
                                        </div>

                                    </Card>
                                </div>
                            }
                        </TabPane>
                        <TabPane tab="Insert By Database" key="2">
                            <Row>
                                <Col style={{ width: 400 }} span={12}>
                                    <Card style={{ width: 350, padding: '3px', background: '#0050b3', color: 'white', fontWeight: "bold" }} headStyle={{ color: 'white', fontWeight: "bold" }} title="Eqation from Database">

                                        <h2 style={{ color: 'white', fontWeight: "bold" }}>Equation</h2>
                                        <Input name="fx" size="large" style={{ width: 300, background: 'black', color: 'white', fontWeight: "bold" }} value={this.state.data[0].fx}
                                        />
                                        <h2 style={{ color: 'white', fontWeight: "bold" }}>X<sub>L</sub></h2>
                                        <Input name="xl" size="large" style={{ width: 300, background: 'black', color: 'white', fontWeight: "bold" }} value={this.state.data[0].xl}
                                        />
                                        <h2 style={{ color: 'white', fontWeight: "bold" }}>X<sub>R</sub></h2>
                                        <Input name="xr" size="large" style={{ width: 300, background: 'black', color: 'white', fontWeight: "bold" }} value={this.state.data[0].xr} 
                                        />
                                        <br /><br />
                                        <Button
                                            onClick={() => this.bisection(parseFloat(this.state.data[0].xl), parseFloat(this.state.data[0].xr))}
                                            style={{ fontSize: "20px", marginLeft: 90, color: '#ffffff', background: '#12406A' }}>Request
                                            </Button><br /><br />
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    {this.state.Graphdb &&
                                        //https://stackoverflow.com/questions/52605304/show-hide-a-component-in-react-using-state/52605495
                                        <Card
                                            bordered={true}
                                            style={{ marginBottom: 20, width: 700, height: 400, border: "2px solid black",/* background: "#0000000",*/ color: '#ffffff', float: "left" }}
                                        >
                                            <Plot
                                                data={[
                                                    {
                                                        x: math.range(1, 3, 0.5).toArray(),
                                                        y: xingraph.map(function (x) {
                                                            return math.compile(fx).eval({ x: x })
                                                        }),
                                                        type: 'scatter',
                                                        marker: { color: 'yellow' },
                                                    },
                                                    curvexl1 = {
                                                        name: 'Xl',
                                                        x: fxl,
                                                        y: funcxl,
                                                        marker: { color: 'pink' },

                                                    },
                                                    curvexr1 = {
                                                        name: 'xr',
                                                        x: fxr,
                                                        y: funcxr,
                                                        marker: { color: 'purple' },
                                                    },
                                                    curvexm1 = {
                                                        name: 'xm',
                                                        x: x,
                                                        y: funcxm,
                                                        marker: { color: 'red' },
                                            
                                                    },
                                                ]}
                                                layout={{ title: 'Plotfx' }}
                                                style={{ width: "50%", float: "left", height: "360px" }}
                                            />
                                            <Plot
                                                data={[curvexl, curvexr, curveerror, curvexm]}
                                                layout={{ title: 'PlotX' }}
                                                style={{ width: "50%", float: "left", height: "360px" }}
                                            />
                                            <br /><br />
                                        </Card>
                                    }
                                </Col>
                            </Row>
                            {this.state.Outputdb &&
                                <div style={{ width: 600, marginTop: 20, marginLeft: 300, background: '#ECECEC', padding: '30px' }}>
                                    <Card >
                                        <div
                                            bordered={true}
                                        >
                                            <Table style={{ width: 500 }} columns={columns} dataSource={datainTable} pagination={{ pageSize: 10 }} > </Table>
                                        </div>

                                    </Card>
                                </div>
                            }
                        </TabPane>

                    </Tabs>
                </div>
                <br />
            </div>
        );
    }
}
export default Bisection;