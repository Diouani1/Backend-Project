import "./navbar.css";
import { DataCenter } from "../../DataFile";
import { useContext, useState } from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Label, Form, FormGroup, Input } from "reactstrap";

import { UserDate } from "../../DateUser";

const NavBar = () => {
  const [onOff, setOnOff] = useState(false);
  const {
    navigate,
    user,
    setUser,
    hover,
    setHover,
    fotoProfile,
    click,
    setClick,
    dispatch,
    error,
    setError,
    
    
    
  } = useContext(UserDate);
  const hoverData = "Click to update picture ";
  const {
    setSum,
    counter,
    setCounter,
    setSumOfChange,
    setSumOfPaid,
    setSumOfPrice,
  } = useContext(DataCenter);
  const cashierName = `${user.firstName} ${user.lastName}`;
  const cashierBox = 1;
  function toggleOffOn() {
    setOnOff(!onOff);
  }
  function handleLogOut() {
    localStorage.removeItem("user");
    fetch("http://localhost:5000/api/user/login/logout", {withCredntials: true,
    credentials: 'include'})
    .then(response=>response.json())
    .then(result=>setError(result.message))
    .catch(err=>setError(err))

    
    setUser(null);
  }
  function handleUpdate(e) {
    e.preventDefault();
    dispatch({ type: "updateImg" });
  }

  return (
    <div className="navbar">
      <Navbar
        expand={false}
        className="p-2 mb-1 bg-secondary bg-info  "
        style={{ width: "100%", margin: "0" }}
      >
        <Container fluid>
          <div className="userinfo">
            <div>
              {hover && <p>{hoverData}</p>}
              {user.imgProfile ? (
                <img
                  onMouseEnter={(e) => setHover(true)}
                  onMouseLeave={(e) => setHover(false)}
                  onClick={(e) => setClick(true)}
                  width={"100px"}
                  height={"100px"}
                  src={`http://localhost:5000/api/user/login/${user._id}`}
                  alt=""
                />
              ) : null}
            </div>
            <div 
                  onClick={(e) => {
                    setError(null)
                    setClick(true)
                  }}
            
            >
              <h6>Cashier Name</h6>
              <span> {cashierName} </span>
            </div>
            {click && (
              <Form onSubmit={handleUpdate}>
                <FormGroup>
                  <Input
                    innerRef={fotoProfile}
                    id="examplePassword"
                    name="file"
                    placeholder="update your foto"
                    type="file"
                  />
                </FormGroup>
                <Button onClick={(e) => setClick(false)}>Cancel</Button>
                <Button color="primary" tag="input" type="submit" value="Register" >Submit</Button>
                {error && <Label className="error">{error} </Label>}
              </Form>
            )}
          </div>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-false`}
            onClick={toggleOffOn}
            style={{ color: "black", backgroundColor: "white" }}
          />

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-false`}
            aria-labelledby={`offcanvasNavbarLabel-expand-false`}
            placement="end"
            show={onOff}
            onHide={toggleOffOn}
            style={{ backgroundColor: "black", color: "white" }}
          >
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <div className="menu">
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSum([]);
                      navigate("/");
                      toggleOffOn();
                    }}
                  >
                    Shoping List
                  </Button>

                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate("erned");
                      toggleOffOn();
                    }}
                  >
                    How mach Erned
                  </Button>

                  <Button
                    variant="success"
                    onClick={() => {
                      navigate("incoming");
                      toggleOffOn();
                    }}
                  >
                    How much Incoming
                  </Button>

                  <Button
                    variant="info"
                    onClick={() => {
                      navigate("outcoming");
                      toggleOffOn();
                    }}
                  >
                    How much Outcoming
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => {
                      navigate("addproducts");
                      toggleOffOn();
                    }}
                  >
                    Add new Products
                  </Button>
                 
                  <Button
                    variant="danger"
                    onClick={() => {
                      navigate("totalcashbox");
                      toggleOffOn();
                    }}
                  >
                    Delete product from System
                  </Button>
                  <Button variant="secondary" onClick={handleLogOut}>
                    Log Out
                  </Button>
                </div>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
