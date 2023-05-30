import { LogOutSession, getAvatar } from "../../utils/appwriteConfig";
import { useRecoilState } from "recoil";
import { userDetailsState } from "../../recoil/storeUserDetails";

const Navbar = () => {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
  console.log(userDetails);
  const loggout = () => {
    setUserDetails(null);
    LogOutSession();
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
          </ul>
          {!userDetails && (
            <>
              <a href="register" className="btn btn-outline-success">
                Registrate
              </a>
              <a href="login" className="btn btn-outline-success">
                Login
              </a>
            </>
          )}
          {userDetails && (
            <>
              <h2 className=" badge bg-secondary btn ">
                <img src={getAvatar()} /> {userDetails.name}
              </h2>
              <h1 className=" badge bg-danger btn " onClick={() => loggout()}>
                cerrar sesion
              </h1>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
