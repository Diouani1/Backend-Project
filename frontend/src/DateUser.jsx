import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserDate = createContext();

const existUser = JSON.parse(localStorage.getItem("user")) || null;

const DateUser = ({ children }) => {
  const firstName = useRef();
  const lastName = useRef();
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const fotoProfile = useRef();

  const navigate = useNavigate();
  const [error, setError] = useState();
  const [user, setUser] = useState(existUser);
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);
  const [state, dispatch] = useReducer(reducer, {});
  async function reducer(prev, action) {
    if (action.type === "register") {
      const formUser = new FormData();
      formUser.append("firstName", firstName.current.value);
      formUser.append("lastName", lastName.current.value);
      formUser.append("userName", userName.current.value);
      formUser.append("email", email.current.value);
      formUser.append("password", password.current.value);
      formUser.append("fotoProfile", fotoProfile.current.files[0]);
      try {
        const addUser = await fetch("/api/user/register", {
          method: "POST",
          body: formUser,
        });
        const userData = await addUser.json();
        console.log("first", userData);
        if (!userData._id) {
          if (!userData.message) {
            const key = Object.entries(userData.keyValue)[0][0];

            throw new Error(`The ${key} is already exist`);
          }
          throw new Error(userData.errors[0].msg);
        }
        navigate("login");
      } catch (error) {
        console.log("second", error);
        setError(error.message);
      }
    } else if (action.type === "login") {
      try {
        const data = {
          userName: userName.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        const loginUser = await fetch("/api/user/login/login", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
          },
        });
        const loginData = await loginUser.json();
        if (!loginData._id) throw new Error(loginData.message);
        localStorage.setItem("user", JSON.stringify(loginData));
        navigate("/");
        setUser(loginData);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    }
    if (action.type === "updateImg") {
      try {
        const id = JSON.parse(localStorage.getItem("user"))._id;
        const formImgUser = new FormData();
        formImgUser.append("fotoProfile", fotoProfile.current.files[0]);
        formImgUser.append("id", id);
        const updateImgUser = await fetch("/api/user/register", {
          method: "PUT",
          body: formImgUser,
        });
        const userData = await updateImgUser.json();

        if (userData.message) throw new Error(userData.message);
        localStorage.setItem("user", JSON.stringify(userData));
        window.location.reload();
        setClick(false);
      } catch (error) {
        setError(error.message);
      }
    } else {
      return prev;
    }
  }
  useEffect(() => {
    const updateUser = JSON.parse(localStorage.getItem("user"));
    setUser(updateUser);
  }, [click]);

  return (
    <UserDate.Provider
      value={{
        firstName,
        lastName,
        userName,
        email,
        password,
        fotoProfile,
        state,
        dispatch,
        error,
        setError,
        navigate,
        user,
        setUser,
        hover,
        setHover,
        click,
        setClick,
      }}
    >
      {children}
    </UserDate.Provider>
  );
};

export default DateUser;
