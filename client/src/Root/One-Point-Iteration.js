import React, { Component } from 'react'
import { Card, Input, Button, Table, Row, Col, Tabs } from 'antd';
import Plot from 'react-plotly.js';
import axios from 'axios';
const { TabPane } = Tabs;
var math = require('mathjs')
var dataT = []
var curvexl = [];
var curveerror = [];
var x = [];
var error = [];
var iteration = [];
var curvex0 = [];
var funcx0 = []
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
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

const xingraph = math.range(-5, 5, 0.5).toArray();
var fx = " ";
function callback(key) {
    console.log(key);
}
class onepointI extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            loading: true,
            error: false,
            data: [],
            Output: false,
            Graph: false,
            Outputdb: false,
            Graphdb: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.onepoint = this.onepoint.bind(this);
    }
    onepoint(x0) {
        if (this.state.fx !== "") {
            fx = this.state.fx;
        }
        else {
            fx = this.state.data[2].fx;
        }
        var sum = parseFloat(0.000000);
        var i = 0;
        var xnew = 0;
        do {
            iteration[i] = i;
            xnew = this.func(x0);
            sum = Math.abs((xnew - x0) / xnew);

            funcx0[i] = this.func(x0).toFixed(6);
            // funcxr[i] = this.func(xr).toFixed(6);
            //funcxm[i] = this.func(xm).toFixed(6);

            x[i] = x0.toFixed(6);
            error[i] = Math.abs(sum).toFixed(6);
            error[0] = 0
            i++;
            x0 = xnew;

        } while (Math.abs(sum) > 0.000001);
        console.log(x)
        console.log(funcx0)
        this.createTable(x, error);
        curvexl = {
            name: 'X',
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

    func(X) {

        if (this.state.fx !== "") {
            var variable = math.compile(this.state.fx);
            let scope = { x: parseFloat(X) }; //แปลงค่า string หรือตัวแปรให้เป็น Number
            return variable.eval(scope); //eval compile 'String'
        }
        else {
            var variables = math.compile(this.state.data[2].fx);
            let scope = { x: parseFloat(X) }; //แปลงค่า string หรือตัวแปรให้เป็น Number
            return variables.eval(scope); //eval compile 'String'
        }
    }
    createTable(x, error) {
        dataT = []
        for (var i = 0; i < x.length; i++) {
            dataT.push({
                iteration: i,
                x: x[i],
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
                //fx = this.state.data[0];
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
        if (this.state.error || !this.state.data[2]) { // if request failed or data is empty don't try to access it either
            return (
                <div>
                    <p> An error occured </p>
                </div>
            )
        }
        return (
            <div >
                <h2 style={{ color: "black", fontWeight: "bold" }}>Onepoint Iteration</h2>
                <div style={{ marginLeft:'20px', backgroundColor: '#fff1b8' }}
                    onChange={this.handleChange}
                >
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Insert by Yourself" key="1">
                            <Row>
                                <Col style={{ width: 400 }} span={12}>
                                    <Card style={{ width: 350, padding: '3px' }} title="Insert Eqation" bordered={false}>
                                        <h2 style={{ fontWeight: "bold" }} >Equation</h2><Input size="large" name="fx" style={{ width: 300, fontSize: "18px", fontWeight: "bold" }}></Input>

                                        <h2 style={{ fontWeight: "bold" }}>X<sub>0</sub></h2><Input size="large" name="x0" style={{ width: 300, fontSize: "18px", fontWeight: "bold" }}></Input><br /><br />

                                        <Button onClick={() => this.onepoint(parseFloat(this.state.x0))}

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
                                                        y: xingraph.map(function (x) {
                                                            return math.compile(fx).eval({ x: x })
                                                        }),
                                                        type: 'scatter',
                                                        marker: { color: 'green' },
                                                    },
                                                    {
                                                        curvex0
                                                    },
                                                    curvex0 = {
                                                        name: 'Xl',
                                                        x: x,
                                                        y: funcx0,
                                                        marker: { color: 'red' },
                                                    },

                                                ]}
                                                layout={{ title: 'Plotfx' }}
                                                style={{ width: "50%", float: "left", height: "360px" }}
                                            />
                                            <Plot
                                                data={[curveerror, curvexl]}
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
                                    <Card style={{ width: 350, padding: '3px', background: '#0050b3' }} title="Eqation from Database" bordered={false}>

                                        <h2 style={{ color: 'white', fontWeight: "bold" }}>Equation</h2>
                                        <Input name="fx" size="large" style={{ width: 300, background: 'black', color: 'white', fontWeight: "bold" }} value={this.state.data[2].fx}
                                        />
                                        <h2 style={{ color: 'white', fontWeight: "bold" }}>X<sub>0</sub></h2>
                                        <Input name="x0" size="large" style={{ width: 300, background: 'black', color: 'white', fontWeight: "bold" }} value={this.state.data[2].x0}
                                        />
                                        <br /><br />
                                        <Button
                                            onClick={() => this.onepoint(parseFloat(this.state.data[2].x0))}
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
                                                        y: xingraph.map(function (x) {
                                                            return math.compile(fx).eval({ x: x })
                                                        }),
                                                        type: 'scatter',
                                                        marker: { color: 'green' },
                                                    },

                                                    curvex0 = {
                                                        name: 'Xl',
                                                        x: x,
                                                        y: funcx0,
                                                        marker: { color: 'pink' },
                                                    },
                                                ]}
                                                layout={{ title: 'Plotfx' }}
                                                style={{ width: "50%", float: "left", height: "360px" }}
                                            />
                                            <Plot
                                                data={[curveerror, curvexl]}
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
export default onepointI;