import { createContext, useState, useEffect, useRef, useReducer } from "react";
import { useNavigate } from "react-router-dom";

export const DataCenter = createContext();

const DataFile = ({ children }) => {
  const productName = useRef();
  const productPrice = useRef();
  const productSize = useRef();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState();
  const [state, dispatchData] = useReducer(reducer, {});

  const [products, setProducts] = useState([]);
  const [add, setAdd] = useState(true);
  const [sum, setSum] = useState([]);
  const [sumOfPrice, setSumOfPrice] = useState(0);
  const [sumOfPaid, setSumOfPaid] = useState(0);
  const [sumOfChange, setSumOfChange] = useState(0);
  const [outPut, setOutput] = useState("");
  const [paid, setPaid] = useState();
  const [change, setChange] = useState();
  const [goBack, setGoBack] = useState(false);
  async function reducer(prev, action) {
    if (action.type === "addProduct") {
      try {
        const product = {
          name: productName.current.value,
          price: productPrice.current.value,
          size: productSize.current.value,
        };
        const newProduct = await fetch(
          "/api/add/product",
          {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const addedProduct = await newProduct.json();
        if (addedProduct._id) {
          setAdd(!add);
          navigate("/");
          return;
        }
        throw new Error(addedProduct.message);
      } catch (error) {
        setError(error.message);
      }
    } else if (action.type === "deleteProduct") {
      try {
        const deletProduct = await fetch(
          `/api/delete/${deleteId}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const deleteOne = await deletProduct.json();
        setAdd(!add);
        navigate("/");
      } catch (error) {
        setError(error.message);
      }
    }
  }

  useEffect(() => {
    fetch("/api/add/product")
      .then((response) => response.json())
      .then((result) => {
        if (!result.message) {
          setProducts(result);
          return;
        }
        throw new Error(result.message);
      })
      .catch((err) => setError(err.message));
  }, [add]);

  useEffect(() => {
    // localStorage.setItem("user", JSON.stringify());
  }, []);
  useEffect(() => {
    // localStorage.setItem("price", JSON.stringify(sumOfPrice));
  }, [sumOfPrice]);
  useEffect(() => {
    // localStorage.setItem("paid", JSON.stringify(sumOfPaid));
  }, [sumOfPaid]);
  useEffect(() => {
    // localStorage.setItem("change", JSON.stringify(sumOfChange));
  }, [sumOfChange]);
  return (
    <DataCenter.Provider
      value={{
        productName,
        productPrice,
        productSize,
        error,
        setDeleteId,
        dispatchData,
        sum,
        setSum,
        products,
        setProducts,
        sumOfPrice,
        setSumOfPrice,
        sumOfPaid,
        setSumOfPaid,
        sumOfChange,
        setSumOfChange,
        outPut,
        setOutput,
        paid,
        setPaid,
        change,
        setChange,
        goBack,
        setGoBack,
      }}
    >
      {children}
    </DataCenter.Provider>
  );
};

export default DataFile;
