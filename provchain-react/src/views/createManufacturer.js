import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Modal,
    Container,
    Spinner,
    Row,
    Col
} from "reactstrap";


import Header from "components/Headers/Header.js";

// To per form POST request to nodeJS url 
import {nodeURL} from "components/variables"
import axios from "axios"
import 'remixicon/fonts/remixicon.css'


class CreateManufacturer extends React.Component {
    state = {
        manufacturerName: '',
        manufacturerPassword: '',
        mainAddress: '',
        locations: '',
        successModal: false,
        loading: false
    }

    toggleModal() {
        this.setState({
            successModal: !this.state.successModal
        });
    };


    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("submit called")

        const manufacturer = {
            manufacturerName: this.state.manufacturerName,
            password: this.state.manufacturerPassword,
            mainAddress: this.state.mainAddress,
            locations: this.state.locations
        }


        var copyData = this.state.locations
        var occurences = copyData.split(',').length - 1
        var data = String(this.state.locations);
        console.log(data)
        var i = 0;
        var array = []
        var newIndex = data.indexOf(",")
        var lastIndex = 0;
        while (i < occurences) {
            array.push(String(data.slice(lastIndex, newIndex)))
            lastIndex = newIndex + 1;
            data = data.slice(lastIndex)
            console.log(data)
            console.log("lastIndex: " + lastIndex)
            newIndex = data.indexOf(",")
            console.log("newIndex: " + newIndex)
            lastIndex = 0;
            if (i == occurences - 1) {
                array.push(data);
                break;
            }
            i += 1;
        }
        console.log(array);


        this.setState({loading: true})
        axios.get(nodeURL + "/createManufacturer", {
            params: {
                manufacturerName: manufacturer.manufacturerName,
                password: manufacturer.password,
                mainAddress: manufacturer.mainAddress,
                locations: array
            }
        })
            .then(res => {
                console.log(res.status)
                console.log(res.data.status)
                if (res.data.status == "ok") {
                    this.toggleModal();
                    this.setState({loading: false})
                }
            })
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
                        <h4 class="text-muted">Manufacturer <span
                            class="text-success">{this.state.manufacturerName}</span> was added successfully !</h4>
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
                                            <h3 className="mb-0">Create Manufacturers</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                size="sm"
                                            >
                                                Manufacturer
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>

                                    {this.state.loading ? <Spinner color="dark"/> :

                                        <Form onSubmit={this.handleSubmit}>
                                            <h6 className="heading-small text-muted mb-4">
                                                Add Manufacturer Information
                                            </h6>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Manufacturer Name
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-username"
                                                                placeholder="Username"
                                                                type="text"
                                                                name="manufacturerName"
                                                                onChange={this.handleChange}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-email"
                                                            >
                                                                Password
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-email"
                                                                placeholder="*********"
                                                                type="password"
                                                                name="manufacturerPassword"
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
                                                                htmlFor="input-username"
                                                            >
                                                                Address
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-username"
                                                                placeholder="Address"
                                                                name="mainAddress"
                                                                type="text"
                                                                onChange={this.handleChange}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-email"
                                                            >
                                                                Locations
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-email"
                                                                placeholder="Locations"
                                                                type="text"
                                                                name="locations"
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

export default CreateManufacturer;
