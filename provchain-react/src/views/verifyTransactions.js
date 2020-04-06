
//TODO call /listUnverifiedVehicles to get list
//TO verify call /ownerChange with params chassisNumber and newOwnerId

import React from "react";

import {
  Card,
  CardHeader,
  Spinner,
  Form,
  FormGroup,
  Input,
  Button,
  Col,
  Modal,
  Table,
  Container,
  Row,
} from "reactstrap";
import Header from "components/Headers/Header.js";

import {nodeURL} from "components/variables";
import axios from "axios";
class VerifyTransactions extends React.Component {
  constructor(){
    super();
    this.state = {
      apiData : {},
      exampleModal: false,
      successModal: false,
      failModal: false,
      vehicleIdDetails: '',
      fetchId: '',
      chassisNumber: '',
      newOwnerId: '',
      loading:false
    }
  }
  toggleModal(id){ 
      if(id=="exampleModal"){
        this.setState({
            exampleModal: !this.state.exampleModal
        });
      }
      if(id=="successModal"){
          this.setState({
              successModal: !this.state.successModal
          })
      }
      else{
          this.setState({
              failModal: !this.state.failModal
          })
      }

  };
  componentDidMount(){
    axios.get(nodeURL+'/listUnverifiedVehicles', {
    })
        .then(res => {
            this.setState({apiData: res.data});            
        })
  }
  fetchData(){
    axios.get(nodeURL+'/listUnverifiedVehicles', {
    })
        .then(res => {
            this.setState({apiData: res.data});            
        })
  }
  handleChange = event => {
    console.log(JSON.parse(event.target.value))
    this.setState({
            chassisNumber: JSON.parse(event.target.value).chassisNumber, newOwnerId: JSON.parse(event.target.value).ownerId
    }, () => {
        console.log("state: "+this.state.chassisNumber+" "+this.state.newOwnerId)
    })
    this.toggleModal("exampleModal")
  }
  handleSubmit = event => {
      event.pereventDefault();
      this.setState({loading: true})
      axios.get(nodeURL+'/ownerChange', {
          params : {
              chassisNumber : this.state.chassisNumber,
              newOwnerId: this.state.newOwnerId
          }
      })
      .then (res => {
          console.log(res)
          if(res.data.status=="success"){
              this.successModal("successModal")
          }
          else{
              this.failModal("failModal")
          }
      })
      this.fetchData()
  }
  render() {
    const {apiData} = this.state;
    return (
      <>
        <Header />
            <Modal
            className="modal-dialog-centered"
            isOpen={this.state.exampleModal}
            size="lg"
            toggle={() => this.toggleModal("exampleModal")            }
            >
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                Vehicle Details
                </h5>
                <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("exampleModal")}
                >
                <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
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
                                        Chassis Number
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-username"
                                        disabled
                                        placeholder={this.state.chassisNumber}
                                        type="text"
                                        name="customerName"
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
                                        New Owner Id
                                    </label>
                                    <Input
                                        name="customerPassword"
                                        disabled
                                        className="form-control-alternative"
                                        id="input-email"
                                        placeholder={this.state.newOwnerId}
                                        type="text"
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
                                    Verify
                                </Button>
                            </Col>
                        </Row>
                    </div>

                </Form>
            </div>         
            </Modal>
            {/* success modal */}
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
                                <i class="ri-heart-line ri-3x text-danger"></i>
                                <h4 class="text-danger">Fail</h4>                    
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
              <Col xs={12} md={12}>
            <div className="col mt-2">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Verify Transactions</h3>
                </CardHeader>

                {/* Conditional Rendering for spinner or table */}

                { this.state.loading ? <Spinner color="dark"/> :
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Chassis Number</th>
                      <th scope="col">Plate Number</th>
                      <th scope="col">Dealer Name</th>                      
                      <th scope="col">Dealer ID</th>                                       
                      <th scope="col">Future Owner</th>                                       
                      <th scope="col">Owner ID</th>                                       
                      <th scope="col">Status</th>                                       
                      <th scope="col" className="text-center">Verify</th>                                       
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(apiData) && apiData.map(object => (
                            <>
                              <tr>
                                <td>{object.chassisNumber}</td>
                                <td>{object.plateNumber}</td>
                                <td>{object.dealerName}</td>
                                <td>{object.dealerId}</td>
                                <td>{object.futureOwner}</td>
                                <td>{object.ownerId}</td>
                                <td onClick={this.verifyChange}>{object.verified}</td>
                                <td className="text-center"><Button
                                            color="success"
                                            data-dismiss="modal"
                                            type="button"
                                            size="sm"
                                            value={JSON.stringify({chassisNumber : object.chassisNumber,ownerId: object.futureOwner})}
                                            onClick={this.handleChange}
                                        >
                                            Verify
                                        </Button></td>
                              </tr>
                            </>
                    ))}
                  </tbody>
                </Table>
                }
              </Card>
        </div>
        </Col>
        </Row>

        </Container>
      </>
    );
  }
}

export default VerifyTransactions;
