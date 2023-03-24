import "./login.css";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useContext} from "react";
import { UserDate } from "../../../DateUser";


const LogIn = () => {
  
  
  const {userName, email, password, error, dispatch } = useContext(UserDate);

  
  async function logInHandeler(e) {
    e.preventDefault();
    dispatch({ type: "login" });
   
  }

  return (
    <div className="login">
      <Form style={{ width: "60%", margin: "auto" }} onSubmit={logInHandeler}>
        <FormGroup>
          <Label for="exampleNumber">UserName</Label>
          <Input
            id="exampleNumber"
            name="number"
            type="text"
            placeholder="write your name"
            innerRef={userName}
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
            id="examplePassword"
            name="password"
            placeholder="password placeholder"
            type="password"
            innerRef={password}
            required
          />
        </FormGroup>
       
        <Button color="primary" tag="input" type="submit" value="Log In" />
        {error && <Label className="error">{error} </Label>}
      </Form>
    </div>
  );
};

export default LogIn;
