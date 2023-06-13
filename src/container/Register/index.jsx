import { useState } from "react";
import { LoginSession, createUser } from "../../utils/appwriteConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
    const { email, password, name } = form;
    const response = await createUser(email, password, name);
    const createSession = await LoginSession(email, password);
    if (response.status && createSession.userId) {
      setssucces("Registro exitoso");
      return navigate("/", { replace: false });
    }
    setError(response.message || createSession.message);
  };

  return (
    <div className="wrapper fadeInDown">
      <h1>Registrate</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={(event) => handleForm(event)}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={(event) => handleForm(event)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(event) => handleForm(event)}
        />
        <button type="submit" className="btn btn-outline-success">
          Registrate
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
    </div>
  );
};

export default Register;
