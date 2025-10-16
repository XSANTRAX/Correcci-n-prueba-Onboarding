import img1 from "../../assets/img-1.png";
import facebookIcon from "../../assets/Facebook.png";
import appleIcon from "../../assets/apple.png";
import googleIcon from "../../assets/google.png";
import compensar from "../../assets/Group 1.png";
import { useState, useEffect } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import RegisterSkeleton from "./Skeletor-register";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sunmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const acount = form.elements.namedItem("email") as HTMLInputElement;
    const name = form.elements.namedItem("name") as HTMLInputElement;
    const phone = form.elements.namedItem("phone") as HTMLInputElement;
    const password = form.elements.namedItem("password") as HTMLInputElement;
    setSubmitting(true);
    setError("");

    if (password.value !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setSubmitting(false);
      return;
    }

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
  };

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
    if (loading) {
      return RegisterSkeleton();
    } else {
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
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Nombre de usuario"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Número de celular"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="Confirmar contraseña"
                  className="confirm"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  required
                />
                <i
                  className={`fa-solid ${
                    showPasswordConfirm ? "fa-eye-slash" : "fa-eye"
                  } toggle-password`}
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                ></i>
              </div>
              <button
                className="btm-register"
                type="submit"
                disabled={sunmitting}
              >
                {sunmitting ? <div className="spinner" /> : "Registrarte"}
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
  };
export default Register;
