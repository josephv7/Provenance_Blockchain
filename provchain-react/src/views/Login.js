
import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import {nodeURL} from "components/variables";

class Login extends React.Component {
    state = {
      userId: '',
      password: '',
      userType: ''
    }
  nameHandleChange = event => {
    console.log("name change called")
    this.setState({ userId: event.target.value });
  }
  passwordHandleChange = event => {
    console.log("password change called")
    this.setState({ password: event.target.value });
  }
  typeHandleChange = event => {
    console.log("password change called")
    this.setState({ userType: event.target.value });
  }
  
  handleSubmit = event => {
    event.preventDefault();
    console.log("submit called")
    const { history } = this.props;
    const auth = {
      userId: this.state.userId,
      password: this.state.password,
      userType: this.state.userType
    }
    console.log("name"+auth.userId)
    
    // axios.get(nodeURL+"/api/userLogin?username="+auth.username+"&password="+auth.password+"&userType="+auth.userType);
    axios.post(nodeURL+`/api/userLogin`, 
      { headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',}},
      { data: auth})
      .then(res => {
        // console.log(JSON.stringify(res.data));
        console.log(res.data["status"]);
        console.log(JSON.stringify(res.data[0].status))
        if(JSON.stringify(res.data[0].status)=="\"ok\""){
          history.push('/admin/dashboard');
        }
        else{
            console.log("else")
        }
      })
      .catch(function (error) {
        console.log("error from catch"+error);
      })    
  };
  render() {
    return (
      <>
      <Header />
      <Container fluid>
        <Row >
          <Col>
            {/* add logo */}
          </Col>
          <Col className="order-xl-2" lg="5" md="7" >
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
                <h2 className="text-muted text-center">ProvChain Auth</h2>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form" onSubmit={this.handleSubmit}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Username" type="text" autoComplete="new-email" onChange={this.nameHandleChange}/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Password" type="password" onChange={this.passwordHandleChange}/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="User Type" type="text" onChange={this.typeHandleChange}/>
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                      Sign in
                    </Button>
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

export default Login;
