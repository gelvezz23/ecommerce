import { useState } from "react";
import {
  LoginSession,
  createUser,
  getUserInformation,
  registerUser,
} from "../../utils/appwriteConfig";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Importa un archivo CSS para estilos personalizados

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
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
    let register = {};
    const { email, password, name, phone, cedula } = form;
    const response = await createUser(email, password, name, phone);
    const createSession = await LoginSession(email, password);

    if (response.status && createSession.userId) {
      register = await registerUser(email, password, name, phone, cedula);

      if (register) {
        const userInfo = await getUserInformation(email);
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        setssucces("Registro exitoso");
        return navigate("/", { replace: false });
      }
    }
    const errorResponse = response.message ? `${response.message}` : "";
    const errorCreateSession = createSession.message
      ? `or ${createSession.message}`
      : "";
    const errorRegister = register.message ? `or ${register.message}` : "";

    setError(`${errorResponse} ${errorCreateSession} ${errorRegister}`);
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center vh-90">
      <div
        className="card shadow-lg p-4 rounded-3"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4 text-black">¡Únete!</h2>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-white">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Tu nombre completo"
              onChange={handleForm}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Tu correo electrónico"
              onChange={handleForm}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cedula" className="form-label text-white">
              Cédula
            </label>
            <input
              type="text"
              className="form-control"
              id="cedula"
              name="cedula"
              placeholder="Tu número de cédula"
              onChange={handleForm}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label text-white">
              Celular
            </label>
            <input
              type="phone"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Tu número de celular"
              onChange={handleForm}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Tu contraseña"
              onChange={handleForm}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-light btn-lg">
              Registrarse
            </button>
          </div>
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success mt-3" role="alert">
              {success}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
