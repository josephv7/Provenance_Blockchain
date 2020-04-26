import React from "react";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Table,
    Modal,
    Container,
    Button,
    Row,
    Col,
    Form,
    FormGroup,
    Input
} from "reactstrap";
import Header from "components/Headers/Header.js";

import {nodeURL} from "components/variables";
import axios from "axios";

class ListManufacturer extends React.Component {
    constructor() {
        super();
        this.state = {
            apiData: {},
            successModal: false,
            manufacturerIdDetails: '',
            fetchId: ''
        }
    }

    toggleModal(id) {
        if (this.state.successModal == false) {
            console.log("fetch by id")
            axios.get(nodeURL + '/getManufacturerInfo', {
                params: {
                    id: id
                }
            })
                .then(res => {
                    // const manufacturerIdDetails = res.data;
                    this.setState({manufacturerIdDetails: res.data});
                    console.log("by id: " + this.state.manufacturerIdDetails)
                })
        }
        this.setState({
            successModal: !this.state.successModal
        });
    };

    fetchById = event => {
        console.log("password change called")
        this.setState({fetchId: event.target.value});
    }

    // use after POST or while fetch by ID
    fetchData() {
        fetch(nodeURL + '/listManufacturers')
            .then(res => res.json())
            .then((data) => {
                this.setState({apiData: data})
                // console.log(data);
            })
            .catch(console.log)
    }

    componentDidMount() {
        // console.log("hi");
        fetch(nodeURL + '/listManufacturers')
            .then(res => res.json())
            .then((data) => {
                this.setState({apiData: data})
                // console.log(data);
            })
            .catch(console.log)
    }

    render() {
        const {apiData} = this.state;
        return (
            <>
                <Header/>
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.successModal}
                    toggle={() => this.toggleModal("successModal")}
                >
                    <div className="modal-header">
                        <h5 className="modal-title" id="successModalLabel">
                            Manufacturer Details
                        </h5>
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
                    <div className="modal-body">
                        <h5>Manufacturer Name
                            : {JSON.stringify(this.state.manufacturerIdDetails["manufacturerName"])}</h5>
                        <h5>Manufacturer ID : {JSON.stringify(this.state.manufacturerIdDetails["participantId"])}</h5>
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
                        <Col md={5} xs={12}>
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader>
                                        <h3 className="mb-0">List Manufacturer By ID</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <h6 className="heading-small text-muted mb-4">
                                                List a Manufacturer wrt Manufacturer ID
                                            </h6>
                                            <div className="pl-lg-1">

                                                <Col lg="12">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            Manufacturer ID
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-username"
                                                            placeholder="Enter Manufacturer ID"
                                                            type="text"
                                                            name="customerName"
                                                            onChange={this.fetchById}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <hr className="my-4"/>
                                                <Row>
                                                    <Col className="text-right" xs="12">
                                                        <Button
                                                            color="success"
                                                            // type="submit"
                                                            size="lg"
                                                            onClick={() => this.toggleModal(this.state.fetchId)}
                                                        >
                                                            Submit
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>

                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                        <Col xs={12} md={7}>
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <h3 className="mb-0">List All Manufacturers</h3>
                                    </CardHeader>
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Manufacturer ID</th>
                                            <th scope="col">Type</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {Array.isArray(apiData) && apiData.map(object => (
                                            <>
                                                <tr>
                                                    <td>{object.manufacturerName}</td>
                                                    <td>{object.participantId}</td>
                                                    <td>{object.participantType}</td>
                                                </tr>
                                            </>
                                        ))}
                                        </tbody>
                                    </Table>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default ListManufacturer;
