import "./orders.css";
import { useEffect, useState } from "react";
import { getOrdersData, updateStatePedido } from "../../utils/appwriteConfig";
import { Accordion, Badge, Button } from "react-bootstrap";
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

  const printDiv = async (nombreDiv, documentId) => {
    const ficha = document.getElementById(nombreDiv);
    const ventanaImpresion = window.open(" ", "popUp");
    ventanaImpresion.document.write(ficha.innerHTML);
    ventanaImpresion.document.close();

    ventanaImpresion.onafterprint = async function () {
      console.log(ventanaImpresion.self !== ventanaImpresion.top);
      if (ventanaImpresion.self !== ventanaImpresion.top) {
        const pedidoUp = await updateStatePedido("impreso", documentId);
        console.log(pedidoUp);
      } else {
        console.log("Impresión cancelada, no se actualizan datos");
      }

      // Verifica si la ventana de impresión está cerrada antes de recargar la página
      if (ventanaImpresion.closed) {
        window.location.reload();
      }
    };

    ventanaImpresion.print();

    const pedidoUp = await updateStatePedido("impreso", documentId);
    console.log(pedidoUp);
  };

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
                <Accordion.Item
                  eventKey={index}
                  key={index}
                  id={`areaImprimir-${index}`}
                >
                  <Accordion.Header>
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        width: "70%",
                        justifyContent: "space-between",
                      }}
                    >
                      <span scope="row">
                        # {index + 1}{" "}
                        <Badge
                          bg={
                            product.estado === "impreso" ? "success" : "danger"
                          }
                        >
                          {product.estado}
                        </Badge>
                      </span>
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
                    <Button
                      onClick={() =>
                        printDiv(`areaImprimir-${index}`, product.$id)
                      }
                    >
                      imprimir
                    </Button>
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
