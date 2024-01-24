import "./orders.css";
import { useEffect, useState } from "react";
import { getOrdersData } from "../../utils/appwriteConfig";
import { Accordion } from "react-bootstrap";
import { numberFormat } from "../../utils/numberFormat";

const Orders = () => {
  const [pedido, setPedido] = useState([]);
  const getOrders = async () => {
    const response = await getOrdersData();
    if (response) setPedido(response.documents);
  };

  useEffect(() => {
    getOrders();
  }, []);

  /*function printDiv(nombreDiv) {
    var contenido = document.getElementById(nombreDiv).innerHTML;
    var contenidoOriginal = document.body.innerHTML;

    document.body.innerHTML = contenido;

    window.print();

    document.body.innerHTML = contenidoOriginal;
  }
*/
  return (
    <div className="wrapper fadeInDown col-12">
      <section className="orders-container">
        <h1>Tus pedidos</h1>
        {pedido.length === 0 ? (
          <>
            <h3 className="text-body-tertiary">Vacio</h3>
          </>
        ) : (
          <Accordion style={{ width: "100%" }}>
            {pedido.map((product, index) => {
              const items = JSON.parse(product.products);
              return (
                <Accordion.Item eventKey={index} key={index} id="areaImprimir">
                  <Accordion.Header>
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        width: "70%",
                        justifyContent: "space-between",
                      }}
                    >
                      <span scope="row"># {index + 1}</span>
                      <span scope="row">id: {product.cedula}</span>
                      <span scope="row">nombre: {product.username}</span>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">producto</th>
                          <th scope="col">precio</th>
                          <th scope="col">cantidad</th>
                          <th scope="col">total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{item.name}</td>
                              <td>{numberFormat(item.price)}</td>
                              <td>{item.quantity}</td>
                              <th>
                                {numberFormat(item.price * item.quantity)}
                              </th>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {/*<Button onClick={() => printDiv("areaImprimir")}>
                      imprimir
                      </Button>*/}
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        )}
      </section>
    </div>
  );
};

export default Orders;
