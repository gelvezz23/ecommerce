import { useRecoilValue } from "recoil";
import { productsState } from "../../recoil/products";
import { numberFormat } from "../../utils/numberFormat";
import { totalAmountState } from "../../recoil/totalAmount";
import { useState } from "react";
import { crearPredido } from "../../utils/appwriteConfig";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
  const product = useRecoilValue(productsState);
  const navigate = useNavigate();
  const total = useRecoilValue(totalAmountState);
  const [form, setForm] = useState({ paymentMethod: "contra entrega" });
  const [error, setError] = useState();
  const [success, setssucces] = useState();

  const handlerOnchange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    product.forEach(async (product) => {
      const response = await crearPredido({
        ...form,
        productName: product.name,
        price: product.price,
        description: product.description,
        quantity: product.quantity,
      });
      if (!response.message) {
        setssucces("Registro exitoso");
        setTimeout(() => {
          navigate("/", { replace: false });
        }, 3000);
      }
      setError(response.message);
    });
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="wrapper fadeInDown">
        <div className="accordion" id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                Datos
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
            >
              <div className="accordion-body">
                <input
                  type="text"
                  name="username"
                  placeholder="Nombre completo"
                  className="form-control"
                  onChange={(event) => handlerOnchange(event)}
                />
                <input
                  type="text"
                  name="direccion"
                  placeholder="Direccion de envio"
                  className="form-control"
                  onChange={(event) => handlerOnchange(event)}
                />
                <input
                  type="text"
                  placeholder="Telefono"
                  name="telefono"
                  className="form-control"
                  onChange={(event) => handlerOnchange(event)}
                />
                <div className="">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="contra-entrega"
                      value="contra entrega"
                      onChange={(event) => handlerOnchange(event)}
                      checked={form.paymentMethod === "contra entrega"}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="contra-entrega"
                    >
                      Contra entrega
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      value="pse"
                      onChange={(event) => handlerOnchange(event)}
                      checked={form.paymentMethod === "pse"}
                      id="pse"
                    />
                    <label className="form-check-label" htmlFor="pse">
                      PSE
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      checked={form.paymentMethod === "tc"}
                      value="tc"
                      onChange={(event) => handlerOnchange(event)}
                      id="tc"
                    />
                    <label className="form-check-label" htmlFor="tc">
                      Tarjeta de credito - debito
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                Productos
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body ">
                <div className="flex-start">
                  {product.map((item) => {
                    return (
                      <p key={item.$id}>{`nombre:${
                        item.name
                      } - price:${numberFormat(item.price)} x ${
                        item.quantity
                      }`}</p>
                    );
                  })}
                  <h4>total: {numberFormat(total)}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        <button type="submit" className="btn btn-primary btn-lg">
          enviar
        </button>
        <a href="/" type="button" className="btn btn-secondary btn-lg">
          seguir comprando
        </a>
      </div>
    </form>
  );
};
