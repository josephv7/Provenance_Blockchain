
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


class OwnerChange extends React.Component {
  state = {
    customerName: '',
    customerPassword: ''
  }
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
      password: this.state.password 
    }
    
    axios.post(nodeURL+`/ownerChange`, 
      { headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',}},
      { data: customer})
      .then(res => {
        console.log(res);
      })
      .catch(function (error) {
        console.log("error from catch"+error);
      })    
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
                      <h3 className="mb-0">Owner Change</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Owner
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit = {this.handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      Invoke Owner Chagne Event on a Vehicle
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
                              placeholder="Chassis Number"
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
                              Owner ID 
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="New Owner ID"
                              type="text"
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
                          onClick={e => e.preventDefault()}
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

export default OwnerChange;
