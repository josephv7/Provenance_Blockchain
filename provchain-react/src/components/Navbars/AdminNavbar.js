
import React from "react";
import { Link } from "react-router-dom";
import {Redirect} from 'react-router-dom';
// reactstrap components
import {
  Navbar,
  Nav, 
  Container,
  Media
} from "reactstrap";
class AdminNavbar extends React.Component {    
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <Link to ="/" className="text-light">
                      Logout                  
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
