
import React from "react";

import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
} from "reactstrap";
import Header from "components/Headers/Header.js";

import {nodeURL} from "components/variables"

class ListManufacturer extends React.Component {
  constructor(){
    super();
    this.state = {
      apiData : {}
    }
  }
  // use after POST or while fetch by ID
  fetchData(){
    fetch(nodeURL+'/listManufacturers')
    .then(res => res.json())
    .then((data) => {
      this.setState({apiData: data })
      // console.log(data);
    })
    .catch(console.log)
  }
  componentDidMount() {
    // console.log("hi");
    fetch(nodeURL+'/listManufacturers')
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
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">List All Customers</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Manufacturer ID</th>
                      <th scope="col">Type</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(apiData) && apiData.map(object => (
                            <>
                              <tr>
                                <td>{object.manufacturerName}</td>
                                <td>{object.participantId}</td>
                                <td>{object.particpantType}</td>
                              </tr>
                            </>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>

        </Container>
      </>
    );
  }
}

export default ListManufacturer;
