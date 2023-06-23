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
const Card = ({ deleteProp, editProp, normalProp }) => {
  const [products, setProduct] = useRecoilState(productsState);
  const [information, setInformation] = useState();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const [success, setssucces] = useState();

  const getFiles = async () => {
    const files = await getInformation();
    setInformation(files.documents);
    setLoading(false);
  };
  const handleAddButton = (id, items) => {
    const index = products.findIndex((item) => item.$id === id);
    if (index !== -1) {
      const updatedProducts = [...products];
      const nuevoProducto = updatedProducts[index];
      const productoActualizado = {
        ...nuevoProducto,
        quantity: nuevoProducto.quantity + 1,
      };
      updatedProducts[index] = productoActualizado;
      setProduct(updatedProducts);
    } else {
      setProduct([...products, items]);
    }
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

  if (loading) {
    return <h1>loading ...</h1>;
  }
  return (
    <>
      {information.map((items, index) => {
        return (
          <div key={index} className="col py-4">
            <div className="card card-custome ">
              <img src={items.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{items.name}</h5>
                <p className="card-text">{items.description}</p>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target={`#exampleModal-${items.$id}`}
                  onClick={() => {
                    deleteProp && handleRemoveButton(items.$id);
                    normalProp &&
                      handleAddButton(items.$id, { ...items, quantity: 1 });
                  }}
                  className={`btn btn-${deleteProp ? "danger" : "primary"}`}
                  id="liveToastBtn"
                >
                  {normalProp && `add ${numberFormat(items.price)}`}
                  {editProp && "editar"}
                  {deleteProp && "eliminar"}
                </button>
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
