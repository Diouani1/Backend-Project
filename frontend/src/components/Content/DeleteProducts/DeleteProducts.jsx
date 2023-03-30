import "react-confirm-alert/src/react-confirm-alert.css";

import "./deleteproducts.css";
import { confirmAlert } from "react-confirm-alert";

import { Button } from "reactstrap";
import { DataCenter } from "../../../DataFile";
import { useContext } from "react";
const DeleteProducts = () => {
  const { products,setDeleteId, dispatchData } = useContext(DataCenter);

  function handelerDeleteProduct(product) {
    setDeleteId(product._id)

   dispatchData({ type: "deleteProduct" });
   
    

    
  }
  const confirmDelete = (item) => {

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirmdelete">
            <h1>Are you sure ?</h1>
            <p>
              You want to delete{" "}
              <span>
                {item.name} / {item.size}
              </span>{" "}
              ?
            </p>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => {

                handelerDeleteProduct(item);
                onClose();
              }}
            >
              Yes, Delete them !
            </Button>
          </div>
        );
      },
    });
  };

  return (
    <div className="deletproducts">
      {products &&
        products.map((item, index) => (
          <Button
            key={index}
            className="button"
            color="primary"
            onClick={() => confirmDelete(item)}
          >
            <h6>{item.name}</h6> <span>{item.size} </span>
          </Button>
        ))}
    </div>
  );
};

export default DeleteProducts;
