import { useRecoilValue } from "recoil";
import { productsState } from "../../recoil/products";
import { numberFormat } from "../../utils/numberFormat";

export const Checkout = () => {
  const product = useRecoilValue(productsState);
  return (
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
                placeholder="Nombre completo"
                className="form-control"
              />
              <input
                type="text"
                placeholder="Direccion de envio"
                className="form-control"
              />
              <input
                type="text"
                placeholder="Telefono"
                className="form-control"
              />
              <div className="">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment-method"
                    id="contra-entrega"
                    checked
                  />
                  <label className="form-check-label" htmlFor="contra-entrega">
                    Contra entrega
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment-method"
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
                    name="payment-method"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
