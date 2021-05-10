import React, { Component } from 'react';
import {  Card, Input, Button, Col, Row, Tabs } from 'antd';
import axios from 'axios';
import Plot from 'react-plotly.js';
const { TabPane } = Tabs;
var counterh=[]
var math = require('mathjs')
var Algebrite = require('algebrite')
var I, Integral, error;
function callback(key) {
    console.log(key);
}
var fx = "";
class Trapezoidal extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            a: 0,
            b: 0,
            n: 0,
            data: [],
            loading: true,
            error: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    trapezoidal(a, b) {
        if (this.state.fx !== "") {
            fx = this.state.fx;
        }
        else {
            fx = this.state.data[10].fx;
        }
        var h = (b - a)
        console.log("h", h)
        var ans = a;
        counterh[0]= ans;
        console.log("ans",ans);
        for(var i=1 ;i<2;i++){
            ans = ans + h;
            counterh[i] = ans; 
        }
        console.log(counterh)
        I = (h / 2) * (this.func(a) + this.func(b))
        I = I.toFixed(6);
        console.log("a", this.func(a))
        console.log("b", this.func(b))
        Integral = this.Integrate(a, b)
        Integral = Integral.toFixed(6);

        error = Math.abs((Integral - I) / Integral)
        error = error.toFixed(6);
        if (this.state.fx !== "") {
            this.setState({
               Graph: true
            })
        }
        else {
            this.setState({
               Graphdb: true

            })
        }
    }
    Integrate(a, b) {
        if (this.state.fx !== "") {
            var expr = math.compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
            return expr.eval({ x: b }) - expr.eval({ x: a })
        }
        else {
            expr = math.compile(Algebrite.integral(Algebrite.eval(this.state.data[10].fx)).toString())
            return expr.eval({ x: b }) - expr.eval({ x: a })
        }
        //https://www.npmjs.com/package/algebrite
    }

    func(X) {
        if (this.state.fx !== "") {
            var variable = math.compile(this.state.fx);
            let scope = { x: parseFloat(X) }; //แปลงค่า string หรือตัวแปรให้เป็น Number
            return variable.eval(scope); //eval compile 'String'
        }
        else {
            var variables = math.compile(this.state.data[6].fx);
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
        if (this.state.error || !this.state.data[10]) { // if request failed or data is empty don't try to access it either
            return (
                <div>
                    <p> An error occured </p>
                </div>
            )
        }
        return (
                <div >
                    <h2 style={{ color: "black", fontWeight: "bold" }}>Trapzoidal</h2>
                    <div style={{ padding: 20, backgroundColor: '#fff1b8' }}
                        onChange={this.handleChange}
                    >
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Insert by Yourself" key="1">
                                <Row>
                                    <Col style={{ width: 400 }} span={12}>
                                        <Card style={{ width: 350, padding: '3px' }} title="Insert Eqation" bordered={false}>
                                            <h2>Equation</h2><Input size="large" name="fx" style={{ width: 300, fontSize: "18px", fontWeight: "bold" }}></Input>
                                            <h2>lower</h2><Input size="large" name="a" style={{ width: 300, fontSize: "18px", fontWeight: "bold" }}></Input>
                                            <h2>Upper</h2><Input size="large" name="b" style={{ width: 300, fontSize: "18px", fontWeight: "bold" }}></Input>

                                            <br /><br />

                                            <Button onClick={() => this.trapezoidal(parseFloat(this.state.a), parseFloat(this.state.b))}

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
                                                            x: counterh,
                                                            y: counterh.map(function (x) {
                                                                return math.compile(fx).eval({ x: x })
                                                            }),
                                                            name: 'fx',
                                                            type: 'scatter',
                                                            marker: { color: 'green' },
                                                            fill: 'tozeroy',
                                                        },
                                                    ]}
                                                    layout={{ title: 'Plotfx' }}
                                                    style={{ width: "50%", float: "left", height: "360px" }}
                                                />
                                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                                                    <h4>I = {I} <br /></h4>
                                                    <h4>Integral = {Integral} <br /></h4>
                                                    <h4>error = {error} <br /></h4>


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
                                        <Card style={{ width: 350, padding: '3px', background: '#1d39c4' }} title="Eqation from Database" bordered={false}>

                                            <h2>Equation</h2>
                                            <Input name="fx" size="large" style={{ width: 300, background: 'black', color: 'white', fontSize: "18px", fontWeight: "bold" }}value={this.state.data[10].fx}
                                            />
                                            <h2>lower</h2>
                                            <Input name="a" size="large" style={{ width: 300, background: 'black', color: 'white', fontSize: "18px", fontWeight: "bold" }} value={this.state.data[10].a}
                                            />
                                            <h2>Upper</h2>
                                            <Input name="b" size="large" style={{ width: 300, background: 'black', color: 'white', fontSize: "18px", fontWeight: "bold" }} value={this.state.data[10].b}
                                            />

                                            <br /><br />
                                            <Button

                                                onClick={() => this.trapezoidal(parseFloat(this.state.data[10].a), parseFloat(this.state.data[10].b))}
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
                                                            x: counterh,
                                                            y: counterh.map(function (x) {
                                                                return math.compile(fx).eval({ x: x })
                                                            }),
                                                            name: 'fx',
                                                            type: 'scatter',
                                                            marker: { color: 'green' },
                                                            fill: 'tozeroy',
                                                        },
                                                    ]}
                                                    layout={{ title: 'Plotfx' }}
                                                    style={{ width: "50%", float: "left", height: "360px" }}
                                                />
                                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                                                    <h4>I = {I} <br /></h4>
                                                    <h4>Integral = {Integral} <br /></h4>
                                                    <h4>error = {error} <br /></h4>


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
export default Trapezoidal;
