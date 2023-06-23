import "./orders.css";
import { useEffect, useState } from "react";
import { numberFormat } from "../../utils/numberFormat";
import { getOrdersData } from "../../utils/appwriteConfig";

const Orders = () => {
  const [product, setProduc] = useState([]);
  const getOrders = async () => {
    const response = await getOrdersData();
    if (response) setProduc(response.documents);
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="wrapper fadeInDown">
      <section className="orders-container">
        <h1>Tus pedidos</h1>
        {product.length === 0 ? (
          <>
            <h3 className="text-body-tertiary">Vacio</h3>
          </>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">cliente</th>
                <th scope="col">price</th>
                <th scope="col">cantidad</th>
                <th scope="col">total</th>
              </tr>
            </thead>
            <tbody>
              {product.map((product, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{product.username}</td>
                    <td>{numberFormat(product.price)}</td>
                    <td>{product.cantidad}</td>
                    <th>{numberFormat(product.price * product.cantidad)}</th>
                    <td>enviar</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default Orders;
