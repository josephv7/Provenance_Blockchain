
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


class CreateManufacturer extends React.Component {
  state = {
    manufacturerName: '',
    manufacturerPassword: ''
  }
  nameHandleChange = event => {
    console.log("name change called")
    this.setState({ manufacturerName: event.target.value });
  }
  passwordHandleChange = event => {
    console.log("password change called")
    this.setState({ manufacturerPassword: event.target.value });
  }
  
  handleSubmit = event => {
    event.preventDefault();
    console.log("submit called")
  
    const manufacturer = {
      manufacturerName: this.state.manufacturerName,
      password: this.state.manufacturerPassword 
    }
    axios.get(nodeURL+"/createManufacturer?manufacturerName="+manufacturer.manufacturerName+"&password="+manufacturer.password);
    // axios.post(nodeURL+`/createManufacturer`, 
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
                  <Form onSubmit = {this.handleSubmit}>
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

export default CreateManufacturer;
