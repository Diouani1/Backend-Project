import "./register.css";
import { Label, Form, FormGroup, Input, Button, InputGroup } from "reactstrap";
import { UserDate } from "../../../DateUser";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const Register = () => {
  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    repeatPassword,
    dispatch,
    error,
    setError,
    fotoProfile,
    showPassword,
    setShowPassword,
    showRepeatPassword,
    setShowRepeatPassword,
  } = useContext(UserDate);

  async function handelSubmit(e) {
    e.preventDefault();
    if (password.current.value !== repeatPassword.current.value) {
      setError("The password should be the same");
      return;
    }
    dispatch({ type: "register" });
  }
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRepeatPasswordVisibility = () =>
    setShowRepeatPassword(!showRepeatPassword);

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
          <InputGroup>
            <Input
              className="position-relative rounded-end "
              innerRef={password}
              id="examplePassword"
              name="password"
              placeholder="password placeholder"
              type={showPassword ? "text" : "password"}
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
        <FormGroup>
          <Label for="examplePassword">Repeat Password</Label>
          <InputGroup>
            <Input
              className="position-relative rounded-end "
              innerRef={repeatPassword}
              id="examplePassword"
              name="password"
              placeholder="repeat password placeholder"
              type={showRepeatPassword ? "text" : "password"}
              required
            />
            <FontAwesomeIcon
              icon={showRepeatPassword ? faEyeSlash : faEye}
              onClick={toggleRepeatPasswordVisibility}
              className="position-absolute top-50 end-0 translate-middle-y pe-2 psw-vs"
              style={{ cursor: "pointer", zIndex: "10" }}
              aria-label="Toggle password visibility"
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">upload your Foto (Option)</Label>
          <InputGroup>
            <Input
              innerRef={fotoProfile}
              id="examplePassword"
              name="file"
              placeholder="upload foto"
              type="file"
            />
          </InputGroup>
        </FormGroup>
        <Button color="primary" tag="input" type="submit" value="Register" />
        {error && <Label className="error">{error} </Label>}
      </Form>
    </div>
  );
};

export default Register;
