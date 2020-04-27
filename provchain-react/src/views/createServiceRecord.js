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


class ServiceRecord extends React.Component {
    state = {
        chassisNumber: '',
        serviceRecord: '',
        successModal: false,
        loading: false
    }
    // componentDidMount(){
    //   this.state.chassisNumber = "null";
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

    handleSubmit = event => {
        event.preventDefault();
        console.log("submit called")        
        this.setState({loading: true})
        axios.post(nodeURL + "/createServiceRecord",{
                chassisNumber : this.state.chassisNumber,
                dealerId : localStorage.getItem('userId'),
                content : this.state.serviceRecord            
        })
            .then(res => {
                console.log(res)
                console.log(res.data.status)
                if (res.data.status == "ok") {
                    this.toggleModal();
                    this.setState({loading: false})
                }
            })
        // axios.post(nodeURL+`/ServiceRecord`,
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
                        <h4 class="text-muted">Customer <span class="text-success">{this.state.chassisNumber}</span> was
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
                                            <h3 className="mb-0">Create Service Record</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="success"
                                                href="#"
                                                onClick={e => e.preventDefault()}
                                                size="sm"
                                            >
                                                Service Record
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {this.state.loading ? <Spinner color="dark"/> :
                                        <Form onSubmit={this.handleSubmit}>
                                            <h6 className="heading-small text-muted mb-4">
                                                Add Information For Service Record
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
                                                                Chassis Number
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-username"
                                                                placeholder="Chassis Number"
                                                                type="text"
                                                                name="chassisNumber"
                                                                onChange={this.handleChange}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>                                                  
                                                    <Col lg="12">                                                        
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Service Record Text
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-username"
                                                                placeholder="Service Record"
                                                                type="textarea"
                                                                name="serviceRecord"
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

export default ServiceRecord;
