
import React from "react";

import {
  Card,
  CardHeader,
  Col,
  Button,
  CardBody,
  CardFooter,
  Modal,
  FormGroup,
  Form,
  Input,
  Table,
  Container,
  Row,
} from "reactstrap";
import Header from "components/Headers/Header.js";

import {nodeURL} from "components/variables";
import axios from "axios";

class ListCustomers extends React.Component {
  constructor(){
    super();
    this.state = {
      apiData : {},
      exampleModal: false,
      customerIdDetails: '',
      fetchId: ''
    }
  }
  toggleModal(id){
    if(this.state.exampleModal==false){
      console.log("fetch by id")
      axios.get("https://d5911af3.ngrok.io/api/Customer/"+id)
      .then(res => {
        // const customerIdDetails = res.data;
        this.setState({ customerIdDetails: res.data });
        console.log("by id: "+this.state.customerIdDetails)
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
  
  // use after POST or while fetch by ID
  fetchData(){
    fetch(nodeURL+'/listCustomers')
    .then(res => res.json())
    .then((data) => {
      this.setState({apiData: data })
      // console.log(data);
    })
    .catch(console.log)
  }
  componentDidMount() {
    // console.log("hi");
    fetch(nodeURL+'/listCustomers')
    .then(res => res.json())
    .then((data) => {
      this.setState({apiData: data })
      // console.log(data);
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
              Customer Details
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
             <h5>Customer Name : {JSON.stringify(this.state.customerIdDetails["customerName"])}</h5>
             <h5>Customer ID : {JSON.stringify(this.state.customerIdDetails["participantId"])}</h5>
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
            <Col md={5} xs={12}>
                <div className="col">
                    <Card className="shadow">
                      <CardHeader>
                        <h3 className="mb-0">List Customer By ID</h3>
                      </CardHeader>
                      <CardBody>
                      <Form>
                          <h6 className="heading-small text-muted mb-4">
                            List a Customer wrt Customer ID
                          </h6>
                          <div className="pl-lg-1">
                            
                              <Col lg="12">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    Customer ID
                                  </label>
                                  <Input
                                    className="form-control-alternative"                
                                    id="input-username"
                                    placeholder="Enter Customer ID"
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
          <Col xs={12} md={7}>
            <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">List All Customers</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Customer ID</th>
                        <th scope="col">Type</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(apiData) && apiData.map(object => (
                              <>
                                <tr>
                                  <td>{object.customerName}</td>
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

export default ListCustomers;
