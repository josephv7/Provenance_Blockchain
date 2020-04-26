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


class CreateVehicle extends React.Component {
    state = {
        chassisNumber: '',
        manufacturerLocation: '',
        manufacturerId: localStorage.getItem('userId'),
        manufacturerName: 'manufacturer1',
        fetchLocations: ''
        //    TODO need to store name in local storage after login
    }
    // componentDidMount(){
    //   this.state.customerName = "null";
    //   this.state.customerPassword = "null"
    // }
    toggleModal(id) {
        if(id=="failModal"){
            this.setState({
                failModal: !this.state.failModal
            })
        }else{
            this.setState({
                successModal: !this.state.successModal
            });
        }
    };

    handleChange = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        },()=>{console.log("callback value: "+value)})
        // console.log("change: "+event.target.value)
        // console.log(this.state.manufacturerLocation)
        
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


        this.setState({loading: true})
        axios.get(nodeURL + '/createVehicle', {
            params: {
                chassisNumber: this.state.chassisNumber,
                manufacturerLocation: this.state.manufacturerLocation,
                manufacturerId: this.state.manufacturerId,
                manufacturerName: this.state.manufacturerName
            }
        })
            .then(res => {
                console.log(res)
                console.log(res.data.status)
                if (res.data.status == "ok") {
                    this.toggleModal();
                    this.setState({loading: false})
                }
                else{
                    console.log("fail")
                    this.toggleModal("failModal")
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
    componentDidMount(){
        const localManufacturerId = localStorage.getItem('userId');
        axios.get(nodeURL+'/getManufacturerLocations', {
            params : {
                manufacturerId : localManufacturerId
            }
        })
            .then(res => {
                const locationDetails = res.data;
                this.setState({
                    fetchLocations : locationDetails
                })
                console.log(locationDetails.locations)
                // this.setState({ vehicleIdDetails: res.data });                
            })
    }
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
                        <h4 class="text-muted">Vehicle <span class="text-success">{this.state.chassisNumber}</span> was
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
                {/* Failure modal */}
                <Modal
                            className="modal-dialog-centered"
                            isOpen={this.state.failModal}
                            toggle={() => this.toggleModal("failModal")}
                        >
                            <div className="modal-header">
                                <h2 className="modal-title" id="failModalLabel">
                                    Failed
                                </h2>
                                <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("failModal")}
                                >
                                    <span aria-hidden={true}>×</span>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <i className="ri-heart-line ri-3x text-danger"></i>
                                <h4 className="text-danger">Fail</h4>                    
                            </div>
                            <div className="modal-footer">
                                <Button
                                    color="secondary"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("failModal")}
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
                                            <h3 className="mb-0">Create Vehicles</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                size="sm"
                                            >
                                                Vehicle
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {this.state.loading ? <Spinner color="dark"/> :
                                        <Form onSubmit={this.handleSubmit}>
                                            <h6 className="heading-small text-muted mb-4">
                                                Add Vehicle Information
                                            </h6>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"                                            
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
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"                                                            
                                                            >
                                                                Manufacturer Location
                                                            </label>
                                             
                                                            
                                                            <Input type="select" name="manufacturerLocation" onChange={this.handleChange}>                                
                                                                <option value="" disabled selected>Choose Location</option>                                
                                                                {Array.isArray(this.state.fetchLocations.locations) && this.state.fetchLocations.locations.map(object => (                                                                    
                                                                    <option value={object} >{object}</option>
                                                                ))}
                                                            </Input>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>


                                                {/*<Row>*/}
                                                {/*    <Col lg="6">*/}
                                                {/*        <FormGroup>*/}
                                                {/*            <label*/}
                                                {/*                className="form-control-label"*/}
                                                {/*                htmlFor="input-username"*/}
                                                {/*            >*/}
                                                {/*                Manufacturer Location*/}
                                                {/*            </label>*/}
                                                {/*            <Input*/}
                                                {/*                className="form-control-alternative"*/}
                                                {/*                id="input-username"*/}
                                                {/*                placeholder="Manufacturer Location"*/}
                                                {/*                type="text"*/}
                                                {/*                name="manufacturerLocation"*/}
                                                {/*                onChange={this.handleChange}*/}
                                                {/*            />*/}
                                                {/*        </FormGroup>*/}
                                                {/*    </Col>*/}
                                                {/*    <Col lg="6">*/}
                                                {/*        <FormGroup>*/}
                                                {/*            <label*/}
                                                {/*                className="form-control-label"*/}
                                                {/*                htmlFor="input-email"*/}
                                                {/*            >*/}
                                                {/*                Plate Number*/}
                                                {/*            </label>*/}
                                                {/*            <Input*/}
                                                {/*                name="plateNumber"*/}
                                                {/*                className="form-control-alternative"*/}
                                                {/*                id="input-username"*/}
                                                {/*                placeholder="Plate Number"*/}
                                                {/*                type="text"*/}
                                                {/*                onChange={this.handleChange}*/}
                                                {/*            />*/}
                                                {/*        </FormGroup>*/}
                                                {/*    </Col>*/}
                                                {/*</Row>*/}


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

export default CreateVehicle;
