
import React from "react";

import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
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
class ListVehicles extends React.Component {
  constructor(){
    super();
    this.state = {
      apiData : {},
      exampleModal: false,
      vehicleIdDetails: '',
      fetchId: ''
    }
  }
  toggleModal(id){
    if(this.state.exampleModal==false){
      console.log("fetch by id")
      axios.get(nodeURL+'/vehichleInfo?chassisNumber='+id)
      .then(res => {
        // const vehicleIdDetails = res.data;
        this.setState({ vehicleIdDetails: res.data });
        console.log("by id: "+this.state.vehicleIdDetails)
      })
    }
    this.setState({
      exampleModal: !this.state.exampleModal
    });
  };
  fetchById = event => {
    console.log("password change called")
    this.setState({ fetchId: event.target.value });
  }


  
  // TODO use after POST or while fetch by ID
  fetchData(){

    let userType = localStorage.getItem('userType')
    let userId = localStorage.getItem('userId')
    let fetchurl;
    if(userType == "customer"){
      fetchurl = nodeURL+'/listUserVehicles?userId='+userId
    }else if (userType == "manufacturer"){
      fetchurl = nodeURL+'/listManufacturerVehicles?userId='+userId
    }else if(userType == "admin"){
      fetchurl = nodeURL+'/listVehicles'
    }else if(userType =="dealer"){
      fetchurl = nodeURL+'/listDealerVehicles?userId='+userId
    }

    fetch(fetchurl)
    .then(res => res.json())
    .then((data) => {
      this.setState({apiData: data })
      // console.log(data);
    })
    .catch(console.log)
  }
  componentDidMount() {
    // console.log("hi");

    //TODO make seperate function later
    let userType = localStorage.getItem('userType')
    let userId = localStorage.getItem('userId')
    let fetchurl;
    if(userType == "customer"){
      fetchurl = nodeURL+'/listUserVehicles?userId='+userId
    }else if (userType == "manufacturer"){
      fetchurl = nodeURL+'/listManufacturerVehicles?manufacturerId='+userId
    }else if(userType == "admin"){
      fetchurl = nodeURL+'/listVehicles'
    }else if (userType == "dealer"){
  fetchurl = nodeURL+'/listDealerVehicles?dealerId='+userId
}

    fetch(fetchurl)
    .then(res => res.json())
    .then((data) => {
      this.setState({apiData: data })
      console.log(data);
    })
    .catch(console.log)
  }
  render() {
    const {apiData} = this.state;
    return (
      <>
        <Header />
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
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
             <h5>Plate Number: {JSON.stringify(this.state.vehicleIdDetails["plateNumber"])}</h5>
             <h5>Manufacturer Name : {JSON.stringify(this.state.vehicleIdDetails["manufacturerName"])}</h5>
             <h5>Owner ID : {JSON.stringify(this.state.vehicleIdDetails["ownerId"])}</h5>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("exampleModal")}
            >
              Close
            </Button>
          </div>
        </Modal>
        <Container className="mt--7" fluid>
        <Row>
            <Col md={8} xs={12}>
                    <div className="col">
                        <Card className="shadow">
                          <CardHeader>
                            <h3 className="mb-0">List Vehicle By Chassis Number</h3>
                          </CardHeader>
                          <CardBody>
                          <Form>
                              <h6 className="heading-small text-muted mb-4">
                                List Vehicle Details wrt Chassis Number
                              </h6>
                              <div className="pl-lg-1">
                                
                                  <Col lg="12">
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
                                        placeholder="Enter Chassis Number"
                                        type="text"
                                        name = "customerName"
                                        onChange = {this.fetchById}
                                      />
                                    </FormGroup>
                                  </Col>
                                
                                <hr className="my-4" />
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
              <Col xs={12} md={12}>
            <div className="col mt-2">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">List All Vehicles</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Chassis Number</th>
                      <th scope="col">Dealer Name</th>
                      <th scope="col">Manufacture Location</th>
                      <th scope="col">Owner ID</th>
                      {/*TODO show owner list only for dealer*/}
                      <th scope="col">Owner List</th>                                            
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(apiData) && apiData.map(object => (
                            <>
                              <tr>
                                <td>{object.chassisNumber}</td>
                                <td>{object.dealerName}</td>
                                <td>{object.manufactureLocation}</td>
                                <td>{object.ownerId}</td>
                                {/*TODO show owner list only for dealer*/}
                                <td>{object.ownerList +String(", ")}</td>
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

export default ListVehicles;
