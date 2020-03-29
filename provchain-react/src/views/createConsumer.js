
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
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

// To per form POST request to nodeJS url 
import {nodeURL} from "components/variables"
import axios from "axios"


class CreateConsumer extends React.Component {
  state = {
    customerName: '',
    customerPassword: ''
  }
  // componentDidMount(){
  //   this.state.customerName = "null";
  //   this.state.customerPassword = "null"
  // }
  nameHandleChange = event => {
    console.log("name change called")
    this.setState({ customerName: event.target.value });
  }
  passwordHandleChange = event => {
    console.log("password change called")
    this.setState({ customerPassword: event.target.value });
  }
  
  handleSubmit = event => {
    event.preventDefault();
    console.log("submit called")
  
    const customer = {
      customerName: this.state.customerName,
      password: this.state.customerPassword 
    }
    console.log("name"+customer.customerName)
    axios.get(nodeURL+"/createCustomer?customerName="+customer.customerName+"&password="+customer.password);
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
        <Header />
        {/* Page content */}
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
                  <Form onSubmit = {this.handleSubmit}>
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
                              Customer Name
                            </label>
                            <Input
                              className="form-control-alternative"                
                              id="input-username"
                              placeholder="Username"
                              type="text"
                              name = "customerName"
                              onChange = {this.nameHandleChange}
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
                              name="password"
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="*********"
                              type="password"
                              onChange = {this.passwordHandleChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <hr className="my-4" />
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
