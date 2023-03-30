import "./register.css";
import { Label, Form, FormGroup, Input, Button } from "reactstrap";
import { UserDate } from "../../../DateUser";
import { useContext } from "react";
const Register = () => {
  const {firstName, lastName, userName, email, password, dispatch, error,fotoProfile  } =
    useContext(UserDate);

  async function handelSubmit(e) {
    e.preventDefault();
    dispatch({ type: "register" });
  }

  return (
    <div className="register">
      <Form style={{ width: "60%", margin: "auto" }} onSubmit={handelSubmit}>
        <FormGroup>
          <Label for="exampleNumber">First Name</Label>
          <Input
            innerRef={firstName}
            id="exampleNumber"
            name="text"
            type="text"
            placeholder="write your first name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleNumber">Last Name</Label>
          <Input
            innerRef={lastName}
            id="exampleNumber"
            name="text"
            type="text"
            placeholder="write your  last name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleNumber">UserName</Label>
          <Input
            innerRef={userName}
            id="exampleNumber"
            name="text"
            type="text"
            placeholder="write your username"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            innerRef={email}
            id="exampleEmail"
            name="email"
            placeholder="with a placeholder"
            type="email"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            innerRef={password}
            id="examplePassword"
            name="password"
            placeholder="password placeholder"
            type="password"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">upload your Foto (Option)</Label>
          <Input
            innerRef={fotoProfile}
            id="examplePassword"
            name="file"
            placeholder="upload foto"
            type="file"
            
          />
        </FormGroup>
        <Button color="primary" tag="input" type="submit" value="Register" />
        {error && <Label className="error">{error} </Label>}
      </Form>
    </div>
  );
};

export default Register;
