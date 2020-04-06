import React from "react";

import {
  Card,
  CardHeader,
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
            var data = res.data
            var length = data.length;
            var i = 0;
            while(i<length){
                data[i].transactionTimestamp = new Date(data[i].transactionTimestamp)                
                data[i].participantInvoking = String(data[i].participantInvoking).slice(54)
                i+=1
            }
            data = data.sort((a, b) => b.transactionTimestamp - a.transactionTimestamp)
            var j=0;
            while(j<data.length){
                data[j].transactionTimestamp = String(data[j].transactionTimestamp).slice(0,25);
                j+=1;
            }                    
            this.setState({ apiData: data })
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
                      <th className="text-center" scope="col">Participant Invoking</th>
                      <th className="text-center" scope="col">Transaction TimeStamp</th>                                                          
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(apiData) && apiData.map(object => (
                            <>
                              <tr>
                                <td>{object.transactionType}</td>
                                <td className="text-center">{object.participantInvoking}</td>
                                <td className="text-center">{object.transactionTimestamp}</td>
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
