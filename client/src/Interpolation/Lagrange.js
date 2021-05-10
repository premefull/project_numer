import React, { Component } from 'react'
import { Card, Input, Button, Col, Row, Tabs } from 'antd';
import axios from 'axios';
const { TabPane } = Tabs;
var fx = "";
function callback(key) {
    console.log(key);
}

var x, y, interpolatePoint, tempTag
class Lagrange extends Component {

    constructor() {
        super();
        x = []
        y = []
        interpolatePoint = []
        tempTag = []

        this.state = {
            nPoints: 0,
            X: 0,
            data: [],
            loading: true,
            error: false,
            interpolatePoint: 0,
            Input: true,
            InputButton: true,
            Inputdb: true,
            interpolatePButtondb: true,
            interpolatePInput: false,
            interpolatePButton: false,
            Output: false,
            Outputdb: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.lagrange = this.lagrange.bind(this);

    }
    createTableInput(n) {
        for (var i = 1; i <= n; i++) {
            x.push(<Input style={{
                width: 80,
                height: "50%",
                backgroundColor: "black",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"x" + i} key={"x" + i} />);
            if (i === 3) {
                x.push(<br />)
            }
            y.push(<Input style={{
                width: 80,
                height: "50%",
                backgroundColor: "black",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"y" + i} key={"y" + i} />);
        }
        this.setState({
            Input: false,
            InputButton: false,
            interpolatePInput: true,
            interpolatePButton: true
        })
    }
    createInterpolatePointInput() {
        for (var i = 1; i <= this.state.interpolatePoint; i++) {
            tempTag.push(<Input style={{
                width: "14%",
                height: "50%",
                backgroundColor: "black",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"p" + i} key={"p" + i} />)
        }
    }
    initialValue() {
        x = []
        y = []
        for (var i = 1; i <= this.state.nPoints; i++) {
            x[i] = parseFloat(document.getElementById("x" + i).value);
            y[i] = parseFloat(document.getElementById("y" + i).value);
        }
        for (i = 1; i <= this.state.interpolatePoint; i++) {
            interpolatePoint[i] = parseFloat(document.getElementById("p" + i).value);
        }
    }
    initialValuedb() {
        x = []
        y = []
        for (var i = 1; i <= this.state.data[9].a; i++) {
            x[i] = parseFloat(document.getElementById("x" + i).value);
            y[i] = parseFloat(document.getElementById("y" + i).value);
        }
        for (i = 1; i <= this.state.data[9].a; i++) {
            interpolatePoint[i] = parseInt(document.getElementById("p" + i).value);
        }
    }
    L(X, index, n) {
        var numerate = 1/*ตัวเศษ*/, denominate = 1/*ตัวส่วน*/;
        for (var i = 1; i <= n; i++) {
            if (i !== index) {
                numerate *= x[i] - X;
                denominate *= x[i] - x[index];
            }
        }
        console.log(numerate / denominate)
        return parseFloat(numerate / denominate);
    }

    lagrange(n, X) {
        fx = 0
        if (this.state.X === 0) {
            console.log("ddddddddddddddddddddddddddd");
            this.initialValuedb()
        }
        else {
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
            this.initialValue()
        }

        for (var i = 1; i <= n; i++) {
            fx += this.L(X, i, n) * y[i];
        }
        if (this.state.X === 0) {
            this.setState({
                Outputdb: true
                // showMatrixBottondb: false
            });
        }
        else {
            this.setState({
               Output: true
                //showMatrixBotton: false
            });
        }

    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
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
        if (this.state.error || !this.state.data[9]) { // if request failed or data is empty don't try to access it either
            return (
                <div>
                    <p> An error occured </p>
                </div>
            )
        }
        return (
            <div >
                <h2 style={{ color: "black", fontWeight: "bold" }}>Lagrange Interpolation</h2>
                <div
                    onChange={this.handleChange}
                >
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Insert by Yourself" key="1">
                            <Row>
                                <Col style={{ width: 400 }} span={12}>
                                    <Card style={{ width: 350, padding: '3px' }} title="Insert Eqation" bordered={false}>
                                        {this.state.interpolatePInput &&
                                            <div>
                                                <h2>X<br />{x}Y<br />{y}</h2>
                                                <br /><h2>interpolatePoint {parseInt(this.state.interpolatePoint)}</h2>{tempTag}
                                            </div>}


                                        {this.state.Input &&
                                            <div>
                                                <h2>Number of points(n)</h2><Input size="large" name="nPoints" style={{ backgroud: 'red' }}></Input>
                                                <h2>X</h2><Input size="large" name="X" style={{ color: '#000fff' }}></Input>
                                                <h2>interpolatePoint</h2><Input size="large" name="interpolatePoint" style={{ hight: 300 }}></Input>
                                            </div>
                                        }  <br></br>
                                        {this.state.InputButton &&
                                            <Button
                                                onClick={() => {
                                                    this.createTableInput(parseInt(this.state.nPoints));
                                                    this.createInterpolatePointInput()
                                                }
                                                }
                                                style={{ fontSize: "20px", marginLeft: 90, color: '#ffffff', background: '#12406A' }}>
                                                Submit<br></br>
                                            </Button>
                                        }


                                        {this.state.interpolatePButton &&
                                            <Button

                                                style={{ fontSize: "20px", marginLeft: 90, color: '#ffffff', background: '#12406A' }}
                                                onClick={() => this.lagrange(parseInt(this.state.interpolatePoint), parseFloat(this.state.X))}>
                                                Submit
                                                </Button>
                                        }

                                    </Card>
                                </Col>
                                <Col span={12}>
                                    {this.state.Output &&
                                        <Card
                                            title={"Output"}
                                            bordered={true}
                                            style={{ width: "50%", border: "2px solid black", background: "rgb(61, 104, 61) none repeat scroll 0% 0%", color: "white", float: "left", marginInlineStart: "4%" }}
                                        >
                                            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{fx}</p>
                                        </Card>
                                    }

                                </Col>
                            </Row>

                        </TabPane>
                        <TabPane tab="Insert By Database" key="2">
                            <Row>
                                <Col style={{ width: 400 }} span={12}>
                                    <Card style={{ width: 350, padding: '3px', background: '#d6e4ff' }} title="Eqation from Database" bordered={false}>

                                        {this.state.Inputdb &&
                                            <div><h2>X<br /></h2>
                                                <h2>
                                                    <Input style={{ width: 80, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"x" + 1} value={this.state.data[9].x11} />
                                                    <Input style={{ width: 80, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"x" + 2} value={this.state.data[9].x12} />
                                                    <Input style={{ width: 80, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"x" + 3} value={this.state.data[9].x13} />
                                                </h2> <h2>
                                                    <Input style={{ width: 80, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"x" + 4} value={this.state.data[9].x21} />
                                                    <Input style={{ width: 80, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"x" + 5} value={this.state.data[9].x22} />
                                                </h2>
                                                <h2> Y<br />
                                                    <Input style={{ width: 80, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"y" + 1} value={this.state.data[9].x23} />
                                                    <Input style={{ width: 80, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"y" + 2} value={this.state.data[9].x31} />
                                                    <Input style={{ width: 80, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"y" + 3} value={this.state.data[9].x32} />
                                                </h2> <h2> <Input style={{ width: 80, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                    id={"y" + 4} value={this.state.data[9].x33} />
                                                    <Input style={{ width: 80, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"y" + 5} value={this.state.data[9].y1} />
                                                </h2>

                                                <h2>
                                                    Point<br />
                                                    <h1>
                                                        <Input style={{ width: 80, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                            id={"p" + 1} value={this.state.data[9].y2} />

                                                        <Input style={{ width: 80, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                            id={"p" + 2} value={this.state.data[9].xl} />
                                                        <Input style={{ width: 80, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                            id={"p" + 3} value={this.state.data[9].xr} />
                                                        <Input style={{ width: 80, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                            id={"p" + 4} value={this.state.data[9].x0} />
                                                        <Input style={{ width: 80, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                            id={"p" + 5} value={this.state.data[9].n} />
                                                    </h1>
                                                </h2>
                                            </div>
                                        }
                                        <br></br>
                                        {this.state.interpolatePButtondb &&
                                            <Button

                                                style={{ fontSize: "20px", marginLeft: 90, color: '#030852', background: '#fff0f6' }}
                                                onClick={() => this.lagrange(parseInt(this.state.data[9].a), parseFloat(this.state.data[9].x))}>
                                                Submit
                                                </Button>
                                        }
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    {this.state.Outputdb &&
                                        <Card
                                            title={"Output"}
                                            bordered={true}
                                            style={{ width: 500, border: "2px solid black", background: "#9254de", color: "white", float: "left", marginInlineStart: "4%" }}
                                        >
                                            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{fx}</p>

                                        </Card>
                                    }
                                    <br /><br />
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
export default Lagrange;