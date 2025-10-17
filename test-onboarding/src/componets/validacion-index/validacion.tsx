import "./validacion.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ValueSkeleton from "./Skeletor-validacion";

function Validación() {
  const userr = sessionStorage.getItem("user");
  const email = sessionStorage.getItem("email");
  const [mail, setMail] = useState("");
  const [fechaCompletado, setFechaCompletado] = useState("");
  const [sunmittingSurvey, setSubmittingSurvey] = useState(false);
  const [sunmittingLogin, setSubmittingLogin] = useState(false);
  const [sunmittingInfo, setSubmittingInfo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email || !userr) return;
    const usersApi = fetch(
      `https://7wmbjxblzi.execute-api.us-east-1.amazonaws.com/user/${userr}`,
      {
        method: "GET",
      }
    );

    usersApi.then((resp) => {
      resp.json().then((data) => {
        console.log(data);
        if (resp.status === 200 && data.data.survey) {
          setMail(data.data.mail);
          const texto = data.data.survey;
          const match = texto.match(/fecha':(\d{4}-\d{2}-\d{2})/);
          if (match) {
            const fecha = match[1];
            setFechaCompletado(fecha);
          }
        } else {
          alert("Error en el servidor");
        }
      });
    });
  }, [email, userr]);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  if (loading) {
    return ValueSkeleton();
  } else {
    if (email === mail) {
      return (
        <div className="estado-encuesta">
          <h2>Encuesta</h2>
          <div className="encuesta-completada">
            <span className="estado-label completada">COMPLETADA</span>
            <p>Fecha de completado: {fechaCompletado}</p>
            <button
              className="btn-accion"
              onClick={() => {
                setSubmittingInfo(true);
                setTimeout(() => {
                  navigate("/info-survey");
                }, 500);
              }}
              disabled={sunmittingInfo}
            >
              {sunmittingInfo ? (
                <div className="spinner" />
              ) : (
                "Ver mis respuestas"
              )}
            </button>
            <br />
            <button
              className="btn-accion"
              onClick={() => {
                setSubmittingLogin(true);
                setTimeout(() => {
                  sessionStorage.clear();
                  navigate("/login");
                }, 500);
              }}
              disabled={sunmittingLogin}
            >
              {sunmittingLogin ? <div className="spinner" /> : "Cerrar Sesión"}
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="estado-encuesta">
          <h2>Encuesta</h2>

          <div className="encuesta-pendiente">
            <span className="estado-label pendiente">PENDIENTE</span>
            <p>Por favor completa la encuesta...</p>
            <button
              className="btn-accion"
              onClick={() => {
                setSubmittingSurvey(true);
                setTimeout(() => {
                  navigate("/survey");
                }, 500);
              }}
              disabled={sunmittingSurvey}
            >
              {sunmittingSurvey ? (
                <div className="spinner" />
              ) : (
                "Realizar Encuesta"
              )}
            </button>
            <br />
            <button
              className="btn-accion"
              onClick={() => {
                setSubmittingLogin(true);
                setTimeout(() => {
                  sessionStorage.clear();
                  navigate("/login");
                }, 500);
              }}
              disabled={sunmittingLogin}
            >
              {sunmittingLogin ? <div className="spinner" /> : "Cerrar Sesión"}
            </button>
          </div>
        </div>
      );
    }
  }
}

export default Validación;
