import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Menu from "./components/Menu/Menu";
import { useContext } from "react";
import { UserDate } from "./DateUser";
import User from "./components/User/User";

function App() {
  const { user } = useContext(UserDate);

  return (
    <div className="App">
      {user ? (
        <Menu />
      ) : (
       
          <User />
      
      )}
    </div>
  );
}

export default App;
