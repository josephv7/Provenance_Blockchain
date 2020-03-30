import React from "react";
import ReactDOM from "react-dom";
import {Redirect} from 'react-router-dom';

// reactstrap components
import {
    Button,
    Container,
    Row,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
    UncontrolledAlert
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import {nodeURL} from "components/variables";
import 'remixicon/fonts/remixicon.css'

class Login extends React.Component {
    state = {
        userId: '',
        password: '',
        invalid: false
    }

    reloadForm() {
        this.setState({invalid: false})
    }

    nameHandleChange = event => {
        console.log("name change called")
        this.setState({userId: event.target.value});
    }
    passwordHandleChange = event => {
        console.log("password change called")
        this.setState({password: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("submit called")
        const {history} = this.props;
        const auth = {
            userId: this.state.userId,
            password: this.state.password,
            userType: this.state.userType
        }

        console.log("name" + auth.userId)

        // axios.get(nodeURL+"/api/userLogin?username="+auth.username+"&password="+auth.password+"&userType="+auth.userType);
        axios.post(nodeURL + `/api/userLogin`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            },
            {data: auth})
            .then(res => {
                // console.log(JSON.stringify(res.data));
                console.log(res.data);
                // console.log(JSON.stringify(res.data[0].status))
                // render dashboard for govt

                if (JSON.stringify(res.data[0].status) == "\"ok\"") {

                    localStorage.setItem('userId', this.state.userId)


                    if (JSON.stringify(res.data[0].userType) == "\"admin\"") {
                        console.log("admin");
                        this.setState({userType: 'admin'})
                        localStorage.setItem('userType', this.state.userType)
                        history.push('/admin/dashboard');
                    }
                    // render dashboard for Manufacturer
                    else if (JSON.stringify(res.data[0].userType) == "\"manufacturer\"") {
                        console.log("Manufacturer");
                      this.setState({userType: 'manufacturer'})
                        localStorage.setItem('userType', this.state.userType)
                        history.push('/admin/dashboard');
                    }
                    // render dashboard for Customer
                    else if (JSON.stringify(res.data[0].userType) == "\"customer\"") {
                        // else{
                        console.log("Customer");
                      this.setState({userType: 'customer'})
                        localStorage.setItem('userType', this.state.userType)
                        history.push('/customer/dashboard');
                    }

                }

            })
            .catch((error) => {
                // console.log("error from catch"+error);
                this.setState({invalid: true});
                console.log("state " + this.state.invalid)
            })
    };

    render() {
        return (
            <>
                <Header/>
                <Container fluid>
                    <Row>
                        <Col>
                            {/* add logo */}
                        </Col>
                        <Col className="order-xl-2" lg="5" md="7">
                            <Card className="bg-secondary shadow border-0">
                                <CardHeader className="bg-transparent pb-5">
                                    <h2 className="text-muted text-center">ProvChain Auth</h2>
                                </CardHeader>
                                <CardBody className="px-lg-5 py-lg-5">
                                    {this.state.invalid ?
                                        <UncontrolledAlert color="danger" fade={true}>
                    <span className="alert-inner--icon">
                      <i className="ri-thumb-down-fill text-white mr-2 ri-1x"/>
                    </span>{" "}
                                            <span className="alert-inner--text">
                      <strong>Invalid</strong> Login Credentials !
                    </span>
                                        </UncontrolledAlert> : <Form role="form" onSubmit={this.handleSubmit}>
                                            <FormGroup className="mb-3">
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-email-83"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="Username" type="text" autoComplete="new-email"
                                                           onChange={this.nameHandleChange}/>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-lock-circle-open"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="Password" type="password"
                                                           onChange={this.passwordHandleChange}/>
                                                </InputGroup>
                                            </FormGroup>
                                            <div className="text-center">
                                                <Button className="my-4" color="primary" type="submit">
                                                    Sign in
                                                </Button>
                                            </div>
                                        </Form>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Login;
