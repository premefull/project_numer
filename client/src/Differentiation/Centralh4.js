import React, { Component } from 'react';
import { Card, Input, Button, Col, Row, Tabs } from 'antd';
import axios from 'axios';
import Plot from 'react-plotly.js';
const { TabPane } = Tabs
var math = require('mathjs')
var y1;
var y2;
var y3;
var y4;
const xingraph = math.range(-10, 10, 0.5).toArray();
var fx = " ";
function callback(key) {
    console.log(key);
}
class Centralh4 extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x: 0,
            h: 0,
            x1: 0,
            data: [],
            loading: true,
            error: false,
            Output: false,
            Outputdb: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    //x1 = จำนวนdiff
    Centralh4(x, h, x1) {
        if (this.state.fx !== "") {
            fx = this.state.fx;
        }
        else {
            fx = this.state.data[5].fx;
        }
        y1 = (-this.func(x + (2 * h)) + 8 * this.func(x + (1 * h)) - 8 * this.func(x - (1 * h)) + this.func(x - (2 * h))) / (12 * h)
        y1 = y1.toFixed(6);


        y2 = (-this.func(x + (2 * h)) + 16 * this.func(x + (1 * h)) - 30 * this.func(x) + 16 * this.func(x - (1 * h)) - this.func(x - (2 * h))) / (12 * Math.pow(h, 2))
        y2 = y2.toFixed(6);


        y3 = (-this.func(x + (3 * h)) + 8 * this.func(x + (2 * h)) - 13 * this.func(x + (1 * h)) + 13 * this.func(x - (1 * h)) - 8 * this.func(x - (2 * h)) + this.func(x - (3 * h))) / (8 * Math.pow(h, 3))
        y3 = y3.toFixed(6);

        y4 = (-this.func(x + (3 * h)) + 12 * this.func(x + (2 * h)) - 39 * this.func(x + (1 * h)) + 56 * this.func(x) - 39 * this.func(x - (1 * h)) + 12 * this.func(x - (2 * h)) + this.func(x - (3 * h))) / (6 * Math.pow(h, 4))
        y4 = y4.toFixed(6);

        if (this.state.fx !== "") {
            this.setState({
                Output: true,
            })
        }
        else {
            this.setState({
                Outputdb: true,
            })
        }
    }

    /*
        Centralh4(x, h, x1) {
    
            if (x1 === 1) {
                y = (-this.func(x+(2*h)) + 8*this.func(x+(1*h)) - 8*this.func(x-(1*h)) + this.func(x-(2*h))) / (12*h)
                y = y.toFixed(6);
            }
            else if (x1 === 2) {
                y = (-this.func(x+(2*h)) + 16*this.func(x+(1*h)) - 30*this.func(x) + 16*this.func(x-(1*h)) - this.func(x-(2*h))) / (12*Math.pow(h, 2))
                y = y.toFixed(6);
            }
            else if (x1 === 3) {
                y =  (-this.func(x+(3*h)) + 8*this.func(x+(2*h)) - 13*this.func(x+(1*h)) + 13*this.func(x-(1*h)) - 8*this.func(x-(2*h)) + this.func(x-(3*h))) / (8*Math.pow(h, 3))
                y = y.toFixed(6);
            }
            else {
                y =  (-this.func(x+(3*h)) + 12*this.func(x+(2*h)) - 39*this.func(x+(1*h)) + 56*this.func(x) - 39*this.func(x-(1*h)) + 12*this.func(x-(2*h)) + this.func(x-(3*h))) / (6*Math.pow(h, 4))
                y = y.toFixed(6);
            }
            this.setState({
                showOutputCard: true
            })
        }*/

    func(X) {
        if (this.state.fx !== "") {
            var variable = math.compile(this.state.fx);
            let scope = { x: parseFloat(X) }; //แปลงค่า string หรือตัวแปรให้เป็น Number
            return variable.eval(scope); //eval compile 'String'
        }
        else {
            var variables = math.compile(this.state.data[5].fx);
            let scope = { x: parseFloat(X) }; //แปลงค่า string หรือตัวแปรให้เป็น Number
            return variables.eval(scope); //eval compile 'String'
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/bisectionfxs')
            .then(res => {
                const data = res.data.data; // get the data array instead of object
                this.setState({ data, loading: false });
                console.log(data);


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
        if (this.state.error || !this.state.data[5]) { // if request failed or data is empty don't try to access it either
            return (
                <div>
                    <p> An error occured </p>
                </div>
            )
        }
        return (
            <div >
                <h2 style={{ color: "black", fontWeight: "bold" }}>Central Divided Differences Oh<sup>4</sup></h2>


                <div style={{ padding: 20, backgroundColor: '#fff1b8' }}
                    onChange={this.handleChange}
                >
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Insert by Yourself" key="1">
                            <Row>
                                <Col style={{ width: 400 }} span={12}>
                                    <Card style={{ width: 350, padding: '3px' }} title="Insert Eqation" bordered={false}>
                                        <h2>Equation</h2><Input size="large" name="fx" style={{ width: 300 }}></Input>
                                        <h2>Order derivative</h2>
                                        <Input size="large" name="x1" style={{ width: 300 }}></Input>
                                        <h2>x</h2><Input size="large" name="x" style={{ width: 300 }}></Input>
                                        <h2>h</h2><Input size="large" name="h" style={{ width: 300 }}></Input>
                                        <br /><br />

                                        <Button onClick={() => this.Centralh4(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(this.state.x1))}

                                            style={{ fontSize: "20px", marginLeft: 90, color: '#ffffff', background: '#12406A' }}>Submit</Button><br /><br />

                                    </Card>


                                </Col>
                                <Col span={12}>
                                    {this.state.Output &&
                                        //https://stackoverflow.com/questions/52605304/show-hide-a-component-in-react-using-state/52605495
                                        <Card
                                            bordered={true}
                                            style={{ marginBottom: 20, width: 700, height: 400, border: "2px solid black",/* background: "#0000000",*/ color: '#ffffff', float: "left" }}
                                        >
                                            <Plot
                                                data={[
                                                    {
                                                        x: math.range(-15, 15, 0.5).toArray(),
                                                        y: xingraph.map(function (x) {
                                                            return math.compile(fx).eval({ x: x })
                                                        }),
                                                        type: 'scatter',
                                                        marker: { color: 'green' },
                                                    },
                                                ]}
                                                layout={{ title: 'Plotfx' }}
                                                style={{ width: "50%", float: "left", height: "360px" }}
                                            />
                                            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                                                <h4>Answer <br /></h4>
                                                <h4>f<sup>1</sup>(x) = {y1} <br /></h4>
                                                <h4>f<sup>2</sup>(x) = {y2} <br /></h4>
                                                <h4>f<sup>3</sup>(x) = {y3} <br /></h4>
                                                <h4>f<sup>4</sup>(x) = {y4} <br /></h4>

                                            </p>

                                            <br /><br />
                                        </Card>

                                    }
                                </Col>
                            </Row>

                        </TabPane>
                        <TabPane tab="Insert By Database" key="2">
                            <Row>
                                <Col style={{ width: 400 }} span={12}>
                                    <Card style={{ width: 350, padding: '3px', background: '#91d5ff' }} title="Eqation from Database" bordered={false}>
                                        <h2>Equation</h2>
                                        <Input name="fx" size="large" style={{ width: 300, background: 'black', color: 'white' }} value={this.state.data[5].fx}
                                        />

                                        <h2>x</h2>
                                        <Input name="x" size="large" style={{ width: 300, background: 'black', color: 'white' }} value={this.state.data[5].x}
                                        />
                                        <h2>h</h2>
                                        <Input name="h" size="large" style={{ width: 300, background: 'black', color: 'white' }} value={this.state.data[5].h}
                                        />
                                        <br /><br />
                                        <Button

                                            onClick={() => this.Centralh4(parseFloat(this.state.data[5].x), parseFloat(this.state.data[5].h), parseFloat(this.state.data[5].x1))}
                                            style={{ fontSize: "20px", marginLeft: 90, color: '#ffffff', background: '#12406A' }}>Request
                                        </Button><br /><br />
                                    </Card>


                                </Col>
                                <Col span={12}>
                                    {this.state.Outputdb &&
                                        //https://stackoverflow.com/questions/52605304/show-hide-a-component-in-react-using-state/52605495
                                        <Card
                                            bordered={true}
                                            style={{ marginBottom: 20, width: 700, height: 400, border: "2px solid black",/* background: "#0000000",*/ color: '#ffffff', float: "left" }}
                                        >
                                            <Plot
                                                data={[
                                                    {
                                                        x: math.range(-15, 15, 0.5).toArray(),
                                                        y: xingraph.map(function (x) {
                                                            return math.compile(fx).eval({ x: x })
                                                        }),
                                                        type: 'scatter',
                                                        marker: { color: 'green' },
                                                    },
                                                ]}
                                                layout={{ title: 'Plotfx' }}
                                                style={{ width: "50%", float: "left", height: "360px" }}
                                            />
                                            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                                                <h4>Answer <br /></h4>
                                                <h4>f<sup>1</sup>(x) = {y1} <br /></h4>
                                                <h4>f<sup>2</sup>(x) = {y2} <br /></h4>
                                                <h4>f<sup>3</sup>(x) = {y3} <br /></h4>
                                                <h4>f<sup>4</sup>(x) = {y4} <br /></h4>

                                            </p>

                                            <br /><br />
                                        </Card>

                                    }
                                </Col>
                            </Row>
                        </TabPane>
                    </Tabs>
                </div>

                <br />
            </div>
        );


    }
}


export default Centralh4;

