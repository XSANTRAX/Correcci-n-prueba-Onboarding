import img1 from "../../assets/img-1.png";
import facebookIcon from "../../assets/Facebook.png";
import appleIcon from "../../assets/apple.png";
import googleIcon from "../../assets/google.png";
import compensar from "../../assets/Group 1.png";
import { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";

function Register() {

    const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const acount = form.elements[0] as HTMLInputElement;
    const name = form.elements[1] as HTMLInputElement;
    const phone = form.elements[2] as HTMLInputElement;
    const password = form.elements[3] as HTMLInputElement;
    setLoading(true);
    setError("");

    const usersApi = fetch(
      `https://7wmbjxblzi.execute-api.us-east-1.amazonaws.com/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: acount.value,
          user: name.value,
          phone: phone.value,
          password: password.value,
        }),
      }
    );
    usersApi
      .then((resp) => {
        resp.json().then((data) => {
          console.log(data);

          navigate("/login");
        });
      })
      .catch((e) => console.log(e));

    event.preventDefault();
  };

  const navigate = useNavigate();

    return (
        <div className="register-container">
      <img
        src={compensar}
        alt="Icono de compensar"
        className="icono_register"
      />
      <div className="register-left">
        <h1>Registrate</h1>
        <p className="text">Te invitamos a registrar tu cuenta</p>
        <p className="info">
          Si ya tienes una cuenta <br /> puedes{" "}
          <a href="/login" className="links">
            Iniciar sesión aquí!
          </a>
        </p>
        <img src={img1} alt="Ilustración de bienvenida" className="img-1" />
      </div>

      <div className="register-right">
        <form onSubmit={handleSubmit}>
          <h2>Registro</h2>
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Nombre de usuario" required />
          <input type="tel" placeholder="Número de celular" required />
          <input
            type="password"
            placeholder="Contraseña"
            className="password"
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="confirm"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            required
          />
          <button className="btm-register" type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Registrarte"}
          </button>
          {error && <p className="error">{error}</p>}
          <div className="social-register">
            <p>o continua con</p>
            <a href="">
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="">
              <img src={appleIcon} alt="Apple" />
            </a>
            <a href="">
              <img src={googleIcon} alt="Google" />
            </a>
          </div>
        </form>
      </div>
    </div>
    );
}

export default Register;