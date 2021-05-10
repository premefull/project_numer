import React, { Component } from 'react'
import { Card, Input, Button, Table, Row, Col  } from 'antd';
import 'antd/dist/antd.css';
import Plot from 'react-plotly.js';
import axios from 'axios';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
var math = require('mathjs')
var dataT = []
var curvexm = [];
var curveerror = [];
var yc = [];
var x = [];
var fError = [];
var iteration = [];
var curvex0 = [];
var funcx0=[]  

const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "Y",
        dataIndex: "y",
        key: "y"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];
function callback(key) {
    console.log(key);
}
const  xingraph = math.range(-5,5, 0.5).toArray();
var fx = " ";
class secant extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            x1: 0,
            loading: true,
            error: false,
            data: [],
            showOutput: false,
            showGraph: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.secant = this.secant.bind(this);
    }
    secant(x0, x1) {
        if (this.state.fx !== "") {
            fx = this.state.fx;
        }
        else {
            fx = this.state.data[4].fx;
        }
        var y = 0, sum = parseFloat(0.000000);
        var n = 1, i = 1;

        x.push(x0);
        x.push(x1);
        yc[0] = x0;
        iteration[0] = 0;
        fError[0] = "-";
        do {
            y = x[i] - (this.func(x[i]) * ((x[i] - x[i - 1]))) / (this.func(x[i]) - this.func(x[i - 1]));
            x.push(y);
            sum = this.error(y, x[i]);
            yc[n] = y.toFixed(6);
            
            funcx0[i] = this.func(y).toFixed(6);
            fError[n] = Math.abs(sum).toFixed(6);
            iteration[i] = i;
            n++;
            i++;

        } while (Math.abs(sum) > 0.000001);
        this.createTable(yc, fError);
        curvexm = {
            name: 'y',
            x: iteration,
            y: yc

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
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    func(X) {

        if (this.state.fx !== "") {
            var variable = math.compile(this.state.fx);
            let scope = { x: parseFloat(X) }; //แปลงค่า string หรือตัวแปรให้เป็น Number
            return variable.eval(scope); //eval compile 'String'
        }
        else {
            var variables = math.compile(this.state.data[4].fx);
            let scope = { x: parseFloat(X) }; //แปลงค่า string หรือตัวแปรให้เป็น Number
            return variables.eval(scope); //eval compile 'String'
        }
    }
    createTable(y, error) {
        dataT = []
        for (var i = 0; i < y.length; i++) {
            dataT.push({
                iteration: i + 1,
                y: y[i],
                error: error[i]
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
        if (this.state.error || !this.state.data[4]) { // if request failed or data is empty don't try to access it either
            return (
                <div>
                    <p> An error occured </p>
                </div>
            )
        }
        return (
                <div >
                    <h2 style={{ color: "black", fontWeight: "bold" }}>Secant</h2>
                    <div style={{ padding: 20, backgroundColor: '#fff1b8' }}
                        onChange={this.handleChange}
                    >
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Insert by Yourself" key="1">
                                <Row>
                                    <Col style={{ width: 400 }} span={12}>
                                        <Card style={{  width: 350, padding: '3px' }} title="Insert Eqation" bordered={false}>
                                            <h2  style={{ fontWeight: "bold" }}>Equation</h2><Input size="large" name="fx" style={{ width: 300,fontSize: "18px", fontWeight: "bold" }}></Input>
                                            <h2  style={{fontWeight: "bold" }}>X<sub>0</sub></h2>
                                            <Input size="large" name="x0" style={{ width: 300 }}></Input>
                                            <h2  style={{fontWeight: "bold" }}>X<sub>1</sub></h2><Input size="large" name="x1" style={{ width: 300,fontSize: "18px", fontWeight: "bold" }}></Input><br /><br />

                                            <Button onClick={() => this.secant(parseFloat(this.state.x0), parseFloat(this.state.x1))}

                                                style={{ fontSize: "20px", marginLeft: 90, color: '#ffffff', background: '#12406A' }}>Submit</Button><br /><br />

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
                                                            x: math.range(-5, 5, 0.5).toArray(),
                                                            y:  xingraph.map(function (x) {
                                                                return math.compile(fx).eval({ x: x })
                                                            }),
                                                            type: 'scatter',
                                                            marker: { color: 'green' },
                                                        },
                                                        {
                                                            curvex0
                                                         },
                                                        curvex0 = {
                                                            name: 'X',
                                                            x: yc,
                                                            y: funcx0,
                                                            marker: { color: 'green' },
                                                        },
                                                    ]}
                                                    layout={{ title: 'Plotfx' }}
                                                    style={{ width: "50%", float: "left", height: "360px" }}
                                                />
                                                <Plot
                                                    data={[curveerror, curvexm]}
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

                                                <Table style={{ width: 500 }} columns={columns} dataSource={dataT} pagination={{ pageSize: 10 }} > </Table>
                                            </div>

                                        </Card>
                                    </div>
                                }
                            </TabPane>
                            <TabPane tab="Insert By Database" key="2">
                                <Row>
                                    <Col style={{ width: 400 }} span={12}>
                                        <Card style={{  width: 350, padding: '3px', background: '#0050b3' }} title="Eqation from Database" bordered={false}>

                                            <h2  style={{ color: 'white',fontWeight: "bold" }}>Equation</h2>
                                            <Input name="fx" size="large" style={{ width: 300, background: 'black', color: 'white', fontWeight: "bold" }} value={this.state.data[4].fx}
                                            />
                                            <h2  style={{ color: 'white',fontWeight: "bold" }}>X<sub>0</sub></h2>
                                            <Input name="xl" size="large" style={{ width: 300, background: 'black', color: 'white' , fontWeight: "bold"}} value={this.state.data[4].x0}
                                            />
                                            <h2  style={{ color: 'white',fontWeight: "bold" }}>X<sub>1</sub></h2>
                                            <Input name="xr" size="large" style={{ width: 300, background: 'black', color: 'white' , fontWeight: "bold"}} value={this.state.data[4].x1}
                                            />
                                            <br /><br />
                                            <Button
                                                onClick={() => this.secant(parseFloat(this.state.data[4].x0), parseFloat(this.state.data[4].x1))}
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
                                                            x: math.range(-5, 5, 0.5).toArray(),
                                                            y:  xingraph.map(function (x) {
                                                                return math.compile(fx).eval({ x: x })
                                                            }),
                                                            type: 'scatter',
                                                            marker: { color: 'green' },
                                                        },
                                                        curvex0 = {
                                                            name: 'X',
                                                            x: yc,
                                                            y: funcx0,
                                                            marker: { color: 'red' },
                                                        },
                                                    ]}
                                                    layout={{ title: 'Plotfx' }}
                                                    style={{ width: "50%", float: "left", height: "360px" }}
                                                />
                                                <Plot
                                                    data={[curveerror, curvexm]}
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
                                            // style={{ width: "50%", float: "inline-start", marginBlockStart: "2%" }}
                                            >
                                                <Table style={{ width: 500 }} columns={columns} dataSource={dataT} pagination={{ pageSize: 10 }} > </Table>
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
export default secant;