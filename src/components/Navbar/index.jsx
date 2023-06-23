import { LogOutSession, getAvatar } from "../../utils/appwriteConfig";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDetailsState } from "../../recoil/storeUserDetails";
import { productsState } from "../../recoil/products";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
  const [quantityProducts, setQuantityProducts] = useState(0);
  const [imgAvatar, setAvatar] = useState();
  const products = useRecoilValue(productsState);
  const getImgAvatar = async () => {
    const avatar = await getAvatar();
    setAvatar(avatar);
  };
  useEffect(() => {
    setQuantityProducts(products.length);
    getImgAvatar();
  }, [products.length]);
  const loggout = () => {
    setUserDetails(null);
    LogOutSession();
    sessionStorage.removeItem("userDetails");
    setTimeout(() => (window.location.href = "/"), 1000);
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Funny
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse text-start"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            {!userDetails && (
              <>
                <li className="nav-item">
                  <a href="register" className="btn btn-outline-success m-1">
                    Registrate
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/login" className="btn btn-outline-success m-1">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/basket"
                    type="button"
                    className="btn btn-primary position-relative m-1"
                  >
                    cart
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {products ? products.length : 0}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </a>
                </li>
              </>
            )}
            {userDetails && (
              <>
                <li className="nav-item">
                  <a
                    href={userDetails.name === "admin" ? "/dashboard" : "#"}
                    className="btn btn-secondary m-1"
                  >
                    {imgAvatar && (
                      <img width={15} height={15} src={imgAvatar} />
                    )}{" "}
                    {userDetails.name}
                  </a>
                </li>
                <li className="nav-item">
                  <h1 className="btn btn-danger m-1" onClick={() => loggout()}>
                    cerrar sesion
                  </h1>
                </li>
                <li className="nav-item">
                  <a
                    href="/basket"
                    type="button"
                    className="btn btn-primary position-relative m-1"
                  >
                    cart
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {quantityProducts}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
