
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
class ListVehicles extends React.Component {
  constructor(){
    super();
    this.state = {
      apiData : {}
    }
  }
  // use after POST or while fetch by ID
  fetchData(){
    fetch(nodeURL+'/listVehicles')
    .then(res => res.json())
    .then((data) => {
      this.setState({apiData: data })
      // console.log(data);
    })
    .catch(console.log)
  }
  componentDidMount() {
    // console.log("hi");
    fetch(nodeURL+'/listVehicles')
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
                  <h3 className="mb-0">List All Vehicles</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Chassis Number</th>
                      <th scope="col">Plate Number</th>
                      <th scope="col">Manufacturer</th>
                      <th scope="col">Owner ID</th>                                            
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(apiData) && apiData.map(object => (
                            <>
                              <tr>
                                <td>{object.chassisNumber}</td>
                                <td>{object.plateNumber}</td>
                                <td>{object.manufacturer}</td>
                                <td>{object.ownerId}</td>
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

export default ListVehicles;
