import React, { Component } from 'react';
import { Card, Input, Button, Col, Row, Tabs } from 'antd';
import axios from 'axios';
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}
var A = [],
    B = [],
    X,
    matrixA = [],
    matrixB = [],
    output = []
class Gauss extends Component {
    constructor() {
        super();
        this.state = {
            row: 0,
            column: 0,
            data: [],
            loading: true,
            error: false,
            inputForm: true,
            showMatrixForm: false,
            showMatrixFormdb: true,
            Output: false,
            Outputdb: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.gauss = this.gauss.bind(this);
    }
    gauss(n) {
        console.log(this.state.row);
        if (this.state.row === 0) {
            console.log("ddddddddddddddddddddddddddd");
            this.initMatrixdb();
        }
        else {
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
            this.initMatrix();
        }
        /*
        if (A[0][0] === 0) {
            var tempRow = JSON.parse(JSON.stringify(A[0])); //JSON.parse() to convert text into a JavaScript object:
            var tempColumn = B[0];     //The JSON.stringify() method converts JavaScript objects into strings.
            A[0] = A[1];
            A[1] = tempRow;
            B[0] = B[1];
            B[1] = tempColumn;
        }
*/
        //https://www.codewithc.com/c-program-for-gauss-elimination-method/
        for (var k = 0; k < n; k++) {
            for (var i = k + 1; i < n; i++) {
                var c = A[i][k] / A[k][k];
                for (var j = k; j < n; j++) {
                    A[i][j] = A[i][j] - c * A[k][j];
                }
                B[i] = B[i] - c * B[k];

            }
        }
        X = new Array(n);
        X[n - 1] = B[n - 1] / A[n - 1][n - 1];
        for (i = n - 2; i >= 0; i--) {
            var sum = B[i];
            for (j = i + 1; j < n; j++) {
                sum = sum - A[i][j] * X[j];
            }
            X[i] = (sum / A[i][i]);
        }
        for (i = 0; i < n; i++) {
            output.push("x" + (i + 1) + " = " + X[i].toFixed(6));
            output.push(<br />)
        }
        if (this.state.row === 0) {
            this.setState({
                Outputdb: true,
                showMatrixBotton: false
                // showMatrixBottondb: false
            });
        }
        else {
            this.setState({
                Output: true,
                showMatrixBottondb: false
                //showMatrixBotton: false
            });
        }


    }
    createMatrix(row, column) {
        matrixA = []
        matrixB = []
        output = []
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(<Input style={{
                    width: 50,
                    height: "50%",
                    margin: "1%",
                    fontSize: "18px",
                    fontWeight: "bold"
                }}
                    id={"a" + i + "" + j}
                />)
            }
            matrixA.push(<br />)
        }

        for (i = 1; i <= row; i++) {
            matrixB.push(<Input style={{
                width: 50,
                height: "50%",
                margin: "1%",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"b" + i}
            />)
            matrixB.push(<br />)
        }

        this.setState({
            inputForm: false,
            showMatrixForm: true,
            showMatrixBotton: true
        })

    }


    //https://books.google.co.th/books?id=Ap0QAwAAQBAJ&pg=PA19&lpg=PA19&dq=parseFloat(document.getElementById&source=bl&ots=dyALC74eAw&sig=ACfU3U0qGesfOyE9YLUOS9qknGYl43b8UQ&hl=th&sa=X&ved=2ahUKEwixz8PQ96HoAhUSxTgGHf64Bf4Q6AEwBXoECAoQAQ#v=onepage&q=parseFloat(document.getElementById&f=false
    initMatrix() { //อ่านค่าที่กรอก ใส่ใน array
        for (var i = 0; i < this.state.row; i++) {
            A[i] = []
            for (var j = 0; j < this.state.column; j++) {
                A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
                // alert(A[i][j]);
            }
            B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
        }
    }


    initMatrixdb() { //อ่านค่าที่กรอก ใส่ใน array
        for (var i = 0; i < this.state.data[8].row; i++) {
            A[i] = []
            for (var j = 0; j < this.state.data[8].column; j++) {
                A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
                //alert(A[i][j]);

            }
            B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
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
        if (this.state.error || !this.state.data[8]) { // if request failed or data is empty don't try to access it either
            return (
                <div>
                    <p> An error occured </p>
                </div>
            )
        }
        return (
            <div >
                <h2 style={{ color: "black", fontWeight: "bold" }}>Gauss Elimination</h2>
                <div 
                    onChange={this.handleChange}
                >
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Insert by Yourself" key="1">
                            <Row>
                                <Col style={{ width: 400 }} span={12}>
                                    <Card style={{ width: 350, padding: '3px' }} title="Insert Eqation" bordered={false}>
                                        {
                                            //row-col
                                            this.state.inputForm &&
                                            <div>
                                                <h2>Row&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input size="large" name="row" style={{
                                                    marginLeft: 30, width: 100,/* background: "#ff0000",*/ color: "black", fontSize: "18px",
                                                    fontWeight: "bold"
                                                }}>

                                                </Input>
                                                </h2>
                                                <h2>
                                                    Column<Input size="large" name="column" style={{
                                                        marginLeft: 30, width: 100,/* background: "#ff0000",*/ color: "black",
                                                        fontSize: "18px", fontWeight: "bold"
                                                    }}></Input>

                                                    <br></br>
                                                    <br></br>
                                                    <Button onClick={() => this.createMatrix(this.state.row, this.state.column)}

                                                        style={{ fontSize: "20px", marginLeft: 90, color: '#ffffff', background: '#12406A' }}>
                                                        Submit<br></br>
                                                    </Button>
                                                </h2>
                                            </div>
                                        }
                                        {
                                            //ส่วนแสดงตอนกรอกmatrix
                                            this.state.showMatrixForm && <div><h2>Matrix<br />{matrixA}Vector<br />{matrixB}</h2>
                                                <Button
                                                    style={{ background: "red", color: "white", fontSize: "20px" }}
                                                    onClick={() => this.gauss(this.state.row)}>
                                                    Submit
                                             </Button></div>
                                        }
                                        {
                                            //ส่วนแสดงตอนกรอกmatrix
                                            // this.state.showMatrixBotton &&


                                        }
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    {this.state.Output &&
                                        <Card
                                            bordered={true}
                                            style={{ marginBottom: 20, width: 700, height: 400, border: "2px solid black",/* background: "#0000000",*/ color: '#ffffff', float: "left" }}
                                        >
                                            <div
                                                style={{ margin: 10, width: 300, color: 'blue', float: "left" }}
                                                onChange={this.handleChange}>
                                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{output}</p>
                                            </div>
                                            <br /><br />
                                        </Card>
                                    }
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Insert By Database" key="2">
                            <Row>
                                <Col style={{ width: 400 }} span={12}>
                                    <Card style={{ width: 350, padding: '3px', background: 'blue' }} title="Eqation from Database" bordered={false}>
                                        {
                                            //ส่วนแสดงตอนกรอกmatrix
                                            this.state.showMatrixFormdb && //<div><h2>Matrix<br />{matrixA}Vector<br />{matrixB}</h2></div>
                                            <div><h2>Matrix<br /></h2>
                                                <h2>
                                                    <Input style={{ width: 50, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"a" + 1 + "" + 1} value={this.state.data[8].x11} />
                                                    <Input style={{ width: 50, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"a" + 1 + "" + 2} value={this.state.data[8].x12} />
                                                    <Input style={{ width: 50, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"a" + 1 + "" + 3} value={this.state.data[8].x13} />
                                                </h2>
                                                <h2>
                                                    <Input style={{ width: 50, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"a" + 2 + "" + 1} value={this.state.data[8].x21} />
                                                    <Input style={{ width: 50, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"a" + 2 + "" + 2} value={this.state.data[8].x22} />
                                                    <Input style={{ width: 50, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"a" + 2 + "" + 3} value={this.state.data[8].x23} />
                                                </h2>
                                                <h2>
                                                    <Input style={{ width: 50, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"a" + 3 + "" + 1} value={this.state.data[8].x31} />
                                                    <Input style={{ width: 50, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"a" + 3 + "" + 2} value={this.state.data[8].x32} />
                                                    <Input style={{ width: 50, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                        id={"a" + 3 + "" + 3} value={this.state.data[8].x33} />
                                                </h2>
                                                <h2>
                                                    Vector<br />
                                                    <h1>
                                                        <Input style={{ width: 50, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                            id={"b" + 1} value={this.state.data[8].y1} />
                                                    </h1>
                                                    <h1>
                                                        <Input style={{ width: 50, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                            id={"b" + 2} value={this.state.data[8].y2} />
                                                    </h1>
                                                    <h1>
                                                        <Input style={{ width: 50, height: "50%", margin: "1%", fontSize: "18px", fontWeight: "bold" }}
                                                            id={"b" + 3} value={this.state.data[8].y3} />
                                                    </h1>
                                                </h2>
                                                <Button
                                                    style={{ background: "blue", color: "white", fontSize: "20px" }}
                                                    //onClick={() => this.initMatrixdb()}
                                                    onClick={() => this.gauss(this.state.data[8].row)}
                                                >
                                                    Submit
                                            </Button>
                                            </div>
                                        }
                                        {
                                            //ส่วนแสดงตอนกรอกmatrix
                                            //this.state.showMatrixBottondb &&

                                        }
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    {this.state.Outputdb &&
                                        <Card
                                            bordered={true}
                                            style={{ marginBottom: 20, width: 300, height: 300, border: "2px solid black",/* background: "#0000000",*/ color: '#ffffff', float: "left" }}
                                        >
                                            <div
                                                style={{ margin: 10, width: 300, color: 'red', float: "left" }}
                                                onChange={this.handleChange}>
                                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{output}</p>
                                            </div>


                                            <br /><br />
                                        </Card>
                                    }

                                    <br /><br />
                                        
                                    </Col>
                            </Row>

                        </TabPane>

                    </Tabs>
                </div >

                <br />

            </div >



        );


    }

}

export default Gauss;



