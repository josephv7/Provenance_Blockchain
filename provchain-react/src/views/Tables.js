
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

class Tables extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Title</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">lorem</th>
                      <th scope="col">ipsum</th>
                      <th scope="col">si</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">lorem</th>
                      <td>4,569</td>
                      <td>340</td>
                    
                    </tr>
                    <tr>
                      <th scope="row">lorem</th>
                      <td>3,985</td>
                      <td>319</td>
                
                    </tr>
                    <tr>
                      <th scope="row">lorem</th>
                      <td>3,513</td>
                      <td>294</td>
                
                    </tr>
                    <tr>
                      <th scope="row">lorem</th>
                      <td>2,050</td>
                      <td>147</td>
                    
                    </tr>
                    <tr>
                      <th scope="row">lorem</th>
                      <td>1,795</td>
                      <td>190</td>
                    </tr>
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

export default Tables;
