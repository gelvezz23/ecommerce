import { useState } from "react";
import { LoginSession, getUserInformation } from "../../utils/appwriteConfig";
import "./styles.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState();
  const [error, setError] = useState();
  const [success, setssucces] = useState();

  const handleForm = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { email, password } = form;
    const response = await LoginSession(email, password);
    const userInfo = await getUserInformation(email);

    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    if (response.userId) {
      setssucces("Registro exitoso");

      navigate(email.toLowerCase() === "admin@admin.com" ? "/dashboard" : "/", {
        replace: false,
      });
      return;
    }
    setError(response.message);
  };

  return (
    <div className="wrapper fadeInDown">
      <h1>Bienvenido</h1>
      <div id="formContent">
        {/*<div className="fadeIn first">
          <img src="" id="icon" alt="User Icon" />
  </div>*/}

        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="email"
            placeholder="Correo de usuario"
            onChange={(event) => handleForm(event)}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="contrasena"
            onChange={(event) => handleForm(event)}
          />
          <button
            type="submit"
            className="adeIn fourth btn btn-outline-success"
          >
            Iniciar sesion
          </button>

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
        </form>

        <div id="formFooter" style={{ color: "white" }}>
          <a
            className="underlineHover"
            href="/register"
            style={{ color: "white" }}
          >
            Crear una cuenta
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
