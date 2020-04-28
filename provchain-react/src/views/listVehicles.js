
import React from "react";

import {
  Badge,
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
  Spinner
} from "reactstrap";
import Header from "components/Headers/Header.js";
import {nodeURL} from "components/variables";
import axios from "axios";
var CryptoJS = require("crypto-js")
class ListVehicles extends React.Component {
  constructor(){
    super();
    this.state = {
      apiData : {},
      successModal: false,
      listModal : false,
      chassisNumber: '',
      customerId: '',
      hashValue:'',
      vehicleIdDetails: '',
      originalServiceRecord: '',
      fetchId: '',
      loading : false
    }
  }
  handeList = () => {
    console.log("inside list "+this.state.chassisNumber+" "+this.state.customerId+" "+this.state.hashValue)
    axios.get('https://ipfs.io/ipfs/'+this.state.hashValue)
          .then(res => {
            // const vehicleIdDetails = res.data;
            // this.setState({ vehicleIdDetails: res.data });
            console.log("IPFS: "+res.data)
            const ipfsData = res.data;
            this.setState({
              loading: true
            })
            axios.post(nodeURL+`/getVehicleKey`,
            { chassisNumber : this.state.chassisNumber,
              customerId : this.state.customerId},
            { headers: {
                      "Content-Type": "application/json",
                      "Access-Control-Allow-Origin": "*",
                      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',}})
            .then(response => {
              // console.log(response);
              // console.log(response.data);
              var bytes  = CryptoJS.AES.decrypt(ipfsData, response.data.aesKey);
              var originalText = bytes.toString(CryptoJS.enc.Utf8);
              originalText = {originalText}
              // console.log(originalText)
              // console.log(JSON.stringify(originalText)); 
              this.setState({
                originalServiceRecord : JSON.stringify(originalText.originalText), loading: false
              })
              this.toggleModal("listModal")
            })
            .catch(function (error) {
              console.log("error from catch"+error);
            })
      })        
  }
  toggleModal(id){
      if(id=="successModal"){
        if(this.state.successModal==false){
          console.log("fetch by id")
          axios.get(nodeURL+'/vehichleInfo?chassisNumber='+this.state.fetchId)
          .then(res => {
            // const vehicleIdDetails = res.data;
            this.setState({ vehicleIdDetails: res.data });
            console.log("by id: "+this.state.vehicleIdDetails)
          })
        }
        this.setState({
          successModal: !this.state.successModal
        });
    }
    else{
      this.setState({
        listModal: !this.state.listModal
      });
    }
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
          isOpen={this.state.successModal}
          toggle={() => this.toggleModal("successModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="successModalLabel">
              Vehicle Details
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
             <h5>Plate Number: {JSON.stringify(this.state.vehicleIdDetails["plateNumber"])}</h5>
             <h5>Manufacturer Name : {JSON.stringify(this.state.vehicleIdDetails["manufacturerName"])}</h5>
             <h5>Owner ID : {JSON.stringify(this.state.vehicleIdDetails["ownerId"])}</h5>
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
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.listModal}
          toggle={() => this.toggleModal("listModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="listModalLabel">
              Service Record Lists
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("listModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
              <h5>Service Record for Vehicle with Chassis Number <span className="text-primary">{this.state.chassisNumber}</span> and customer Id 
              <span className="text-primary"> {this.state.customerId}</span> is: <span className="text-primary">{this.state.originalServiceRecord}</span></h5>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("listModal")}
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
                                    onClick={() => this.toggleModal("successModal")}
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
                { this.state.loading ? <Spinner color="dark"/> :
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Chassis Number</th>
                      <th scope="col">Dealer Name</th>
                      <th scope="col">Manufacture Location</th>
                      <th scope="col">Owner ID</th>
                      {/*TODO show owner list only for dealer*/}
                      <th scope="col">Owner List</th>                                            
                      {/* <th scope="col" className="text-center">List Service Records</th>                                             */}
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
                              <tr>                                
                                <td className="text-center" colspan="5" style={{cursor:"pointer"}}>                                
                                {Array.isArray(object.serviceRecord) && object.serviceRecord.map(innerObj => (                                
                                  <>
                                  <Badge
                                          className="badge-default mx-1"
                                          value={String(object.chassisNumber)+','+String(object.ownerId)}                                                                                 
                                          onClick={() => {this.setState({
                                                chassisNumber : String(object.chassisNumber), customerId: String(object.ownerId), 
                                                hashValue : innerObj
                                          }, ()=> {console.log("callback");this.handeList()})}}
                                        >
                                          {innerObj}
                                        </Badge>
                                </>
                                ))}
                                </td>
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

export default ListVehicles;
