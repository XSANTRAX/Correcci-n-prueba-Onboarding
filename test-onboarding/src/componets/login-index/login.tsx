import img1 from "../../assets/img-1.png";
import facebookIcon from "../../assets/Facebook.png";
import appleIcon from "../../assets/apple.png";
import googleIcon from "../../assets/google.png";
import compensar from "../../assets/Group 1.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginSkeleton from "./Skeletor-login";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sunmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const acount = form.elements[0] as HTMLInputElement;
    const password = form.elements[1] as HTMLInputElement;
    setSubmitting(true);
    setError("");

    const usersApi = fetch(
      `https://7wmbjxblzi.execute-api.us-east-1.amazonaws.com/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrUser: acount.value,
          password: password.value,
        }),
      }
    );
    usersApi.then((resp) => {
      resp.json().then((data) => {
        console.log(data);
        if (resp.status === 200) {
        setTimeout(() => {
          navigate("/validacion");
          sessionStorage.setItem("user", data.data.user);
          sessionStorage.setItem("email", data.data.mail);
        }, 1000);
        } else {
          setError("Usuario o contraseña incorrectos");
          setSubmitting(false);
        }
      });
    });

    event.preventDefault();
  };

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  if (loading) {
    return LoginSkeleton();
  } else {
    return (
      <div className="login-container">
        <img src={compensar} alt="Icono de compensar" className="icono_login" />
        <div className="login-left">
          <h1>Bienvenido</h1>
          <p className="text">Ingresa y disfruta</p>
          <p className="info">
            Si aún no tienes una cuenta <br /> puedes{" "}
            <a href="/register" className="links">
              Registrarte aquí!
            </a>
          </p>
          <img src={img1} alt="Ilustración de bienvenida" className="img-1" />
        </div>

        <div className="login-right">
          <form onSubmit={handleSubmit}>
            <h2>Iniciar sesión</h2>
            <input
              type="email"
              name="email"
              placeholder="Correo Electeronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } toggle-password`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
            <div className="login-options">
              <a href="" className="link_olvidar">
                Olvide mi contraseña
              </a>
            </div>
            <button className="btm-login" type="submit" disabled={sunmitting}>
              {sunmitting ? <div className="spinner" /> : "Iniciar sesión"}
            </button>
            {error && <p className="error">{error}</p>}
            <div className="social-login">
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
}

export default Login;
