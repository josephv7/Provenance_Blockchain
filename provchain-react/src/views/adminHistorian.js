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
class AdminHistorian extends React.Component {
  constructor(){
    super();
    this.state = {
      apiData : {}
    }
  }
  componentDidMount(){
    axios.get(nodeURL+'/listAllTransactions', {
    })
        .then(res => {
            this.setState({apiData: res.data});            
        })
  }

  fetchData(){
    axios.get(nodeURL+'/listAllTransactions', {
    })
        .then(res => {
            this.setState({apiData: res.data});            
        })
  }
  render() {
    const {apiData} = this.state;
    return (
      <>
        <Header />           
        <Container className="mt--7" fluid>
        <Row>
              <Col xs={12} md={12}>
            <div className="col mt-2">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">All Transactions</h3>
                </CardHeader>                            
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Transaction Type</th>
                      <th scope="col">Participant Invoking</th>
                      <th scope="col">Transaction TimeStamp</th>                                                          
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(apiData) && apiData.map(object => (
                            <>
                              <tr>
                                <td>{object.transactionType}</td>
                                <td>{object.participantInvoking}</td>
                                <td>{object.transactionTimestamp}</td>
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

export default AdminHistorian;
