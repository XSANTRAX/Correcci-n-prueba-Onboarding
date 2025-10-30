import "./validacion.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ValueSkeleton from "./Skeletor-validacion";

function Validación() {
  const userr = sessionStorage.getItem("user");
  const email = sessionStorage.getItem("email");
  const [mail, setMail] = useState("");
  const [fechaCompletado, setFechaCompletado] = useState("");
  const [surveyData, setSurveyData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email || !userr) return;
    const usersApi = fetch(
      `https://7wmbjxblzi.execute-api.us-east-1.amazonaws.com/user/${userr}`,
      {
        method: "GET",
      }
    );

    usersApi
      .then((resp) => {
        resp.json().then((data) => {
          console.log("Respuesta completa:", data);
          if (data && data.data) {
            const userData = data.data;
            setMail(userData.mail || "");
            if (userData.survey) {
              const texto = userData.survey;
              const match = texto.match(/fecha':([^,]+)/);
              if (match) {
                const fechaTexto = match[1].trim();
                setFechaCompletado(fechaTexto);
              }
              setSurveyData(userData.survey);
            }
            setIsError(false);
          } else {
            setIsError(true);
          }
        });
      })
      .catch((error) => {
        console.error("Error de conexión:", error);
        setIsError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, [email, userr]);

  const navigate = useNavigate();

  if (loading) {
    return ValueSkeleton();
  }
  if (isError) {
    return (
      <div className="estado-encuesta">
        <h2>⚠️ Problema con la encuesta</h2>
        <p>No pudimos verificar tu estado correctamente.</p>
        <p>Pero puedes:</p>
        <button className="btn-accion" onClick={() => window.location.reload()}>
          Reintentar
        </button>
        <br />
        <button
          className="btn-accion"
          onClick={() => {
            sessionStorage.clear();
            navigate("/login");
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }
  if (email === mail && surveyData) {
    return (
      <div className="estado-encuesta">
        <h2>✔ Encuesta Completada</h2>
        <div className="encuesta-completada">
          <span className="estado-label completada">COMPLETADA</span>
          <p>Fecha de completado: </p>
          <p>{fechaCompletado}</p>
          <button
            className="btn-accion"
            onClick={() => navigate("/info-survey")}
          >
            Ver mis respuestas
          </button>
          <br />
          <button
            className="btn-accion"
            onClick={() => {
              sessionStorage.clear();
              navigate("/login");
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="estado-encuesta">
      <h2>📝 Encuesta Pendiente</h2>
      <div className="encuesta-pendiente">
        <span className="estado-label pendiente">PENDIENTE</span>
        <p>Por favor completa la encuesta...</p>
        <button className="btn-accion" onClick={() => navigate("/survey")}>
          Realizar Encuesta
        </button>
        <br />
        <button
          className="btn-accion"
          onClick={() => {
            sessionStorage.clear();
            navigate("/login");
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Validación;
