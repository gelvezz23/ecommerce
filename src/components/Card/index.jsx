/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import "./styles.css";

import { getInformation } from "../../utils/appwriteConfig";
import { useState } from "react";
import { numberFormat } from "../../utils/numberFormat";
import { useRecoilState } from "recoil";
import { productsState } from "../../recoil/products";
const Card = () => {
  const [products, setProduct] = useRecoilState(productsState);
  const [information, setInformation] = useState();
  const [loading, setLoading] = useState(true);

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
                  onClick={() =>
                    handleAddButton(items.$id, { ...items, quantity: 1 })
                  }
                  className="btn btn-primary"
                  id="liveToastBtn"
                >
                  add {numberFormat(items.price)}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
