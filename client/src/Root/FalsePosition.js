import React, { Component } from 'react'
import { Card, Input, Button, Table,Row, Col ,Tabs  } from 'antd';
import Plot from 'react-plotly.js';
import axios from 'axios';
const { TabPane } = Tabs;
var math = require('mathjs')
var datainTable = []
var curvexl = [];
var curvexr = [];
var curvexm = [];
var curveerror = [];
var curvexl1 = [];
var curvexr1 = [];
var curvexm1 = [];
var funcxl=[]  
var funcxr=[]
var funcxm=[]
var fxl = [];
var fxr = [];
var x = [];
var error = [];
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
function callback(key) {
    console.log(key);
}
const  xingraph = math.range(-5, 5, 0.5).toArray();
var fx = " ";
class FalseP extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            showOutput: false,
            showGraph: false,
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
        var sum = parseFloat(0.000000);
        var i = 0;
        
        do {
            xm = ((xl * this.func(xr)) - (this.func(xl) * xr)) / (this.func(xr) - this.func(xl));
            if (this.func(xm) * this.func(xr) < 0) {
                sum = Math.abs((xm - xr) / xm);     
                    xl = xm;
            }
            else {
                sum = Math.abs((xm - xl) / xm);             
                    xr = xm;
            }
            funcxl[i] = this.func(xl);
            funcxr[i] = this.func(xr);
            funcxm[i] = this.func(xm).toFixed(6);

            iteration[i] = i;
            fxl[i] = xl.toFixed(6);
            fxr[i] = xr.toFixed(6);
            x[i] = xm.toFixed(6);
            error[i] = Math.abs(sum).toFixed(6);
            i++;
        } while (Math.abs(sum) > 0.000001);
        this.createTable(fxl, fxr, x, error);
        console.log(funcxl)
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
            y: error

        };

        
        if (this.state.fx !== "") {
            this.setState({
                showOutput: true,
                showGraph: true

            })
        }
        else {
            this.setState({
                showOutput2: true,
                showGraph2: true

            })
        }
    }
  
    func(X) {
        if (this.state.fx !== "") {
            var variable = math.compile(this.state.fx);
            let scope = { x: parseFloat(X) }; //แปลงค่า string หรือตัวแปรให้เป็น Number
            return variable.eval(scope); //eval compile 'String'
        }
        else {
            var variables = math.compile(this.state.data[1].fx);
            let scope = { x: parseFloat(X) }; //แปลงค่า string หรือตัวแปรให้เป็น Number
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
                // fx = this.state.data[1];

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
        if (this.state.error || !this.state.data[1]) { // if request failed or data is empty don't try to access it either
            return (
                <div>
                    <p> An error occured </p>
                </div>
            )
        }
        return (
                <div >

                    <h2 style={{ color: "black", fontWeight: "bold" }}>False Position</h2>
                    <div style={{ padding: 20, backgroundColor: '#fff1b8' }}
                        onChange={this.handleChange}
                    >
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Insert by Yourself" key="1">
                                <Row>
                                    <Col style={{ width: 400 }} span={12}>
                                        <Card style={{  width: 350, padding: '3px' }} title="Insert Eqation" bordered={false}>
                                            <h2 style={{ fontWeight: "bold" }}>Equation</h2><Input size="large" name="fx" style={{ width: 300,fontSize: "18px", fontWeight: "bold"}}></Input>
                                            <h2 style={{ fontWeight: "bold" }}>X<sub>L</sub></h2>
                                            <Input size="large" name="xl" style={{ width: 300,fontSize: "18px", fontWeight: "bold" }}></Input>
                                            <h2 style={{ fontWeight: "bold" }}>X<sub>R</sub></h2><Input size="large" name="xr" style={{ width: 300,fontSize: "18px", fontWeight: "bold" }}></Input><br /><br />

                                            <Button onClick={() => this.bisection(parseFloat(this.state.xl), parseFloat(this.state.xr))}

                                                style={{ fontSize: "20px", marginLeft: 90, color: '#ffffff', background: '#12406A' }}>Submit</Button><br /><br />

                                        </Card>


                                    </Col>
                                    <Col span={12}>
                                        {this.state.showGraph &&
                                            //https://stackoverflow.com/questions/52605304/show-hide-a-component-in-react-using-state/52605495
                                            <Card
                                                bordered={true}
                                                style={{ marginBottom: 20, width: 700, height: 400, border: "2px solid black",/* background: "#0000000",*/ color: '#ffffff', float: "left" }}
                                            >
                                                <Plot
                                                    data={[
                                                        {
                                                            x: math.range(-5, 5, 0.5).toArray(),
                                                            y: xingraph.map(function (x) {
                                                                return math.compile(fx).eval({ x: x })
                                                            }),
                                                            type: 'scatter',
                                                            marker: { color: 'green' },
                                                        },
                                                        {
                                                            curvexl1 , curvexr1, curvexm1
                                                         },
                                                        curvexl1 = {
                                                            name: 'Xl',
                                                            x: fxl,
                                                            y: funcxl
                                                        },
                                                        curvexr1 = {
                                                            name: 'xr',
                                                            x: fxr,
                                                            y: funcxr,
                                                        },
                                                        curvexm1 = {
                                                            name: 'xm',
                                                            x: x,
                                                            y: funcxm
                                                
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
                                {this.state.showOutput &&
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
                                        <Card style={{ width: 350, padding: '3px',background: '#0050b3' }} title="Eqation from Database" bordered={false}>

                                            <h2 style={{ color: 'white',fontWeight: "bold" }}>Equation</h2>
                                            <Input name="fx" size="large" style={{ width: 300, background: 'black', color: 'white', fontWeight: "bold" }} value={this.state.data[1].fx}
                                            />
                                            <h2 style={{ color: 'white',fontWeight: "bold" }}>X<sub>L</sub></h2>
                                            <Input name="xl" size="large" style={{ width: 300, background: 'black', color: 'white' , fontWeight: "bold"}} value={this.state.data[1].xl}
                                            />
                                            <h2 style={{ color: 'white',fontWeight: "bold" }}>X<sub>R</sub></h2>
                                            <Input name="xr" size="large" style={{ width: 300, background: 'black', color: 'white' , fontWeight: "bold"}} value={this.state.data[1].xr}
                                            />
                                            <br /><br />
                                            <Button
                                                onClick={() => this.bisection(parseFloat(this.state.data[1].xl), parseFloat(this.state.data[1].xr))}
                                                style={{ fontSize: "20px", marginLeft: 90, color: '#ffffff', background: '#12406A' }}>Request
 </Button><br /><br />
                                        </Card>


                                    </Col>
                                    <Col span={12}>
                                        {this.state.showGraph2 &&
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
                                                            name:'fx'
                                                        },
                                                        curvexl1 = {
                                                            name: 'Xl',
                                                            x: fxl,
                                                            y: funcxl,
                                                            marker: { color: 'orange' },
                                                        },
                                                        curvexr1 = {
                                                            name: 'xr',
                                                            x: fxr,
                                                            y: funcxr,
                                                            marker: { color: 'red' },
                                                        },
                                                        curvexm1 = {
                                                            name: 'xm',
                                                            x: x,
                                                            y: funcxm,
                                                            marker: { color: 'blue' },
                                                
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

                                {this.state.showOutput2 &&
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

                        </Tabs>
                    </div>

                    <br />
                </div>
           
        );
    }
}
export default FalseP;