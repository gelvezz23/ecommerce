import { useRecoilState, useRecoilValue } from "recoil";
import { productsState } from "../../recoil/products";
import { numberFormat } from "../../utils/numberFormat";
import { totalAmountState } from "../../recoil/totalAmount";
import { userDetailsState } from "../../recoil/storeUserDetails";

const Basket = () => {
  const [product, setProduct] = useRecoilState(productsState);
  const [totalAmount, setTotalAmount] = useRecoilState(totalAmountState);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const userDetails = useRecoilValue(userDetailsState);

  const total = () => {
    let total = 0;
    product.forEach(
      (item) => (total += Number(item.price) * Number(item.quantity))
    );
    setTotalAmount(total);
  };
  total();

  const handleDelete = (id) => {
    const newData = product.filter((item) => item.$id !== id);
    setProduct(newData);
  };

  return (
    <div className="wrapper fadeInDown">
      <h1>Tus compras</h1>
      {product.length === 0 ? (
        <>
          <h3 className="text-body-tertiary">Vacio</h3>
        </>
      ) : (
        <table className="table" style={{ background: "white" }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">nombre</th>
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
                  <td>{product.name}</td>
                  <td>{numberFormat(product.price)}</td>
                  <td>{product.quantity}</td>
                  <th>{numberFormat(product.price * product.quantity)}</th>
                  <td onClick={() => handleDelete(product.$id)}>eliminar</td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <th>total</th>
              <th>{numberFormat(totalAmount)}</th>
              <td></td>
            </tr>
          </tbody>
        </table>
      )}
      <div
        className=""
        style={{ background: "white", width: "100%", padding: "1rem" }}
      >
        <a href="/" className="btn btn-outline-primary m-1">
          Seguir comprando - volver a la tienda
        </a>
        {userInfo && userDetails ? (
          <a href="/checkout" className="btn btn-outline-success m-1">
            Siguiente - Hacer pedido
          </a>
        ) : (
          <a href="/login" className="btn btn-outline-success m-1">
            Login
          </a>
        )}
      </div>
    </div>
  );
};

export default Basket;
