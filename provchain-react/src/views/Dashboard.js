
import React from "react";

// node.js library that concatenates classes (strings)
import classnames from "classnames";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";


import Header from "components/Headers/Header.js";

class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
        
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="10">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">ProvChain</h3>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div>
                    <h5>Details about ProvChain</h5>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Dashboard;
