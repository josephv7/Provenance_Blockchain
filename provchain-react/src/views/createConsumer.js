import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Modal,
    Input,
    Spinner,
    Container,
    Row,
    Col
} from "reactstrap";


import Header from "components/Headers/Header.js";

// To per form POST request to nodeJS url 
import {nodeURL} from "components/variables"
import axios from "axios"

import 'remixicon/fonts/remixicon.css'


class CreateConsumer extends React.Component {
    state = {
        customerName: '',
        customerPassword: '',
        address: '',
        successModal: false,
        loading: false
    }
    // componentDidMount(){
    //   this.state.customerName = "null";
    //   this.state.customerPassword = "null"
    // }
    toggleModal() {
        this.setState({
            successModal: !this.state.successModal
        });
    };

    handleChange = event => {
        console.log('handle change called')
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    nameHandleChange = event => {
        console.log("name change called")
        this.setState({customerName: event.target.value});
    }
    passwordHandleChange = event => {
        console.log("password change called")
        this.setState({customerPassword: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("submit called")

        const customer = {
            customerName: this.state.customerName,
            password: this.state.customerPassword,
            location: this.state.address
        }
        console.log("name" + customer.customerName)
        this.setState({loading: true})
        axios.get(nodeURL + "/createCustomer",{
            params : {
                customerName : customer.customerName,
                password : customer.password,
                address : customer.location
            }
        })
            .then(res => {
                console.log(res)
                console.log(res.data.status)
                if (res.data.status == "ok") {
                    this.toggleModal();
                    this.setState({loading: false})
                }
            })
        // axios.post(nodeURL+`/createConsumer`,
        //   { headers: {
        //             "Content-Type": "application/json",
        //             "Access-Control-Allow-Origin": "*",
        //             'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',}},
        //   { data: customer})
        //   .then(res => {
        //     console.log(res);
        //   })
        //   .catch(function (error) {
        //     console.log("error from catch"+error);
        //   })
    };

    render() {
        return (
            <>

                <Header/>
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.successModal}
                    toggle={() => this.toggleModal("successModal")}
                >
                    <div className="modal-header">
                        <h2 className="modal-title" id="successModalLabel">
                            Success
                        </h2>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("successModal")}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body text-center">
                        <i class="ri-heart-line ri-3x text-success"></i>
                        <h4 class="text-success">Success</h4>
                        <h4 class="text-muted">Customer <span class="text-success">{this.state.customerName}</span> was
                            added successfully !</h4>
                    </div>
                    <div className="modal-footer">
                        <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("successModal")}
                        >
                            Close
                        </Button>
                    </div>
                </Modal>
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="order-xl-1" xl="10">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Create Customers</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                size="sm"
                                            >
                                                Customer
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {this.state.loading ? <Spinner color="dark"/> :
                                        <Form onSubmit={this.handleSubmit}>
                                            <h6 className="heading-small text-muted mb-4">
                                                Add Customer Information
                                            </h6>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                User Id
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"                                                                
                                                                name="userId"
                                                                placeholder={localStorage.getItem('userId')}
                                                                type="text"
                                                                disabled
                                                            />
                                                        </FormGroup>
                                                    </Col> 
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Customer Name
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-username"
                                                                placeholder="Username"
                                                                type="text"
                                                                name="customerName"
                                                                onChange={this.handleChange}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-email"
                                                            >
                                                                Password
                                                            </label>
                                                            <Input
                                                                name="customerPassword"
                                                                className="form-control-alternative"
                                                                id="input-email"
                                                                placeholder="*********"
                                                                type="password"
                                                                onChange={this.handleChange}
                                                            />
                                                        </FormGroup>
                                                    </Col>                                                    
                                                    <Col lg="6">                                                        
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Address
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-username"
                                                                placeholder="Address"
                                                                type="text"
                                                                name="address"
                                                                onChange={this.handleChange}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>

                                                <hr className="my-4"/>
                                                <Row>
                                                    <Col className="text-right" xs="12">
                                                        <Button
                                                            color="success"
                                                            type="submit"
                                                            size="lg"
                                                        >
                                                            Submit
                                                        </Button>
                                                    </Col>
                                                </Row>
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

export default CreateConsumer;
