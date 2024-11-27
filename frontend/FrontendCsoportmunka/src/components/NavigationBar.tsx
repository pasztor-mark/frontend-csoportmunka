import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';

export const NavigationBar = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Sajtok</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-between">
          <Navbar.Text>
            <Link to="/">Kezdőlap</Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link to="/cheeseList">Sajtok Listája</Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link to="/cheeseAdd">Sajt hozzáadása</Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link to="/cheeseDelete">Sajt törlése</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
};