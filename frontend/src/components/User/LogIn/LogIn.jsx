import "./login.css";
import { Form, FormGroup, Label, Input, Button, InputGroup } from "reactstrap";
import { useContext } from "react";
import { UserDate } from "../../../DateUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LogIn = () => {
  const {
    userName,
    email,
    password,
    error,
    dispatch,
    showPassword,
    setShowPassword,
  } = useContext(UserDate);

  async function logInHandeler(e) {
    e.preventDefault();
    dispatch({ type: "login" });
  }
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
          <InputGroup>
            <Input
              className="position-relative rounded-end "
              id="examplePassword"
              name="password"
              placeholder="password placeholder"
              type={showPassword ? "text" : "password"}
              innerRef={password}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="position-absolute top-50 end-0 translate-middle-y pe-2 psw-vs"
              style={{ cursor: "pointer", zIndex: "10" }}
              aria-label="Toggle password visibility"
            />
          </InputGroup>
        </FormGroup>

        <Button color="primary" tag="input" type="submit" value="Log In" />
        {error && <Label className="error">{error} </Label>}
      </Form>
    </div>
  );
};

export default LogIn;
