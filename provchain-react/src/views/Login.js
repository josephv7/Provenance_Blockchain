
import React from "react";

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

class Login extends React.Component {
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
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Username" type="text" autoComplete="new-email"/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Password" type="password" autoComplete="new-password"/>
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="button">
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
