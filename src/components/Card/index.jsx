/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import "./styles.css";

import {
  deleteProduct,
  getInformation,
  updateProduct,
} from "../../utils/appwriteConfig";
import { useState } from "react";
import { numberFormat } from "../../utils/numberFormat";
import { useRecoilState } from "recoil";
import { productsState } from "../../recoil/products";
import QuantityControl from "./QuantityControl";

const Card = ({ deleteProp, editProp, normalProp }) => {
  const [products, setProduct] = useRecoilState(productsState);
  const [information, setInformation] = useState();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const [success, setssucces] = useState();
  const [addedToCart, setAddedToCart] = useState({}); // Estado para controlar si el producto se agregó
  const [quantities, setQuantities] = useState({});

  const getFiles = async () => {
    const files = await getInformation();
    setInformation(files.documents);
    setLoading(false);
  };

  const handleRemoveButton = async (id) => {
    const response = await deleteProduct(id);
    if (response) {
      window.location.reload(false);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event, id) => {
    event.preventDefault();
    const response = await updateProduct(form, id);
    if (!response.message) {
      setssucces("Producto actualizado");
      window.location.reload(false);
    }
    setError(response.message);
  };

  useEffect(() => {
    getFiles();
  }, []);

  useEffect(() => {
    // Sincroniza el estado local 'quantities' con el estado global 'products'
    const initialQuantities = {};
    information?.forEach((item) => {
      const existingProduct = products.find((p) => p.$id === item.$id);
      if (existingProduct) {
        initialQuantities[item.$id] = existingProduct.quantity;
        setAddedToCart((prev) => ({ ...prev, [item.$id]: true })); // Asegura que el control de cantidad se muestre
      }
    });
    setQuantities(initialQuantities);
  }, [products, information]);

  if (loading) {
    return <h1>loading ...</h1>;
  }

  const handleAddToCart = (item) => {
    setAddedToCart((prev) => ({ ...prev, [item.$id]: true }));
    setQuantities((prev) => ({ ...prev, [item.$id]: 1 })); // Inicializa la cantidad en 1
    setProduct((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex(
        (p) => p.$id === item.$id
      );
      if (existingProductIndex !== -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity: (updatedProducts[existingProductIndex].quantity || 0) + 1,
        };
        return updatedProducts;
      } else {
        return [...prevProducts, { ...item, quantity: 1 }];
      }
    });
  };

  const handleIncrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setProduct((prevProducts) =>
      prevProducts.map((p) =>
        p.$id === id ? { ...p, quantity: (p.quantity || 0) + 1 } : p
      )
    );
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1), // Asegura que la cantidad no sea menor a 1
    }));
    setProduct((prevProducts) =>
      prevProducts.map((p) =>
        p.$id === id
          ? { ...p, quantity: Math.max(1, (p.quantity || 1) - 1) }
          : p
      )
    );
  };

  const handleQuantityChange = (id, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, newQuantity) }));
    setProduct((prevProducts) =>
      prevProducts.map((p) =>
        p.$id === id ? { ...p, quantity: Math.max(1, newQuantity) } : p
      )
    );
  };

  return (
    <>
      {information.map((items, index) => {
        const isAlreadyInCart = products.some((p) => p.$id === items.$id);
        return (
          <div key={index} className="col py-4">
            <div className="card card-custome ">
              <img src={items.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{items.name}</h5>
                <p className="card-text">{items.description}</p>
                {normalProp && !isAlreadyInCart && (
                  <button
                    type="button"
                    className={`btn btn-primary`}
                    onClick={() => handleAddToCart(items)}
                  >
                    Add {numberFormat(items.price)}
                  </button>
                )}
                {normalProp && isAlreadyInCart && (
                  <QuantityControl
                    id={items.$id}
                    quantity={
                      quantities[items.$id] ||
                      products.find((p) => p.$id === items.$id)?.quantity ||
                      1
                    }
                    onIncrement={() => handleIncrement(items.$id)}
                    onDecrement={() => handleDecrement(items.$id)}
                    onChange={(e) => handleQuantityChange(items.$id, e.target)}
                  />
                )}
                {editProp && (
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal-${items.$id}`}
                    className={`btn btn-warning`}
                  >
                    Editar
                  </button>
                )}
                {deleteProp && (
                  <button
                    type="button"
                    className={`btn btn-danger`}
                    onClick={() => handleRemoveButton(items.$id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
            {editProp && (
              <div
                className="modal fade"
                id={`exampleModal-${items.$id}`}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Editar
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form
                        onSubmit={(event) => handleSubmit(event, items.$id)}
                      >
                        <input
                          type="text"
                          className="fadeIn second"
                          name="name"
                          onChange={(event) => handleFormChange(event.target)}
                          placeholder={items.name}
                        />
                        <input
                          type="text"
                          className="fadeIn second"
                          name="price"
                          onChange={(event) => handleFormChange(event.target)}
                          placeholder={numberFormat(items.price)}
                        />
                        <input
                          type="text"
                          className="fadeIn second"
                          name="description"
                          onChange={(event) => handleFormChange(event.target)}
                          placeholder={items.description}
                        />
                        <button
                          type="submit"
                          className="fadeIn fourth btn btn-outline-success"
                        >
                          Editar producto
                        </button>
                        {loading ? <h5>loading ...</h5> : null}
                      </form>

                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}

                      {success && (
                        <div className="alert alert-success" role="alert">
                          {success}
                        </div>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Card;
