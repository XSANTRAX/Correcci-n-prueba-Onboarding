import compensar from "../../assets/Group 1.png";
import { useNavigate } from "react-router-dom";
import "./info.css";
import { useState, useEffect } from "react";
import InfoSkeleton from "./Skeletor-info";

function InfoSurvey() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [survey, setSurvey] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userr = sessionStorage.getItem("user");
    if (!userr) {
      setLoading(false);
      setError("Usuario no encontrado.");
      return;
    }

    setLoading(true);
    setError(null);

    const usersApi = fetch(
      `https://7wmbjxblzi.execute-api.us-east-1.amazonaws.com/user/${userr}`,
      {
        method: "GET",
      }
    );

    usersApi
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data && data.data) {
          setName(data.data.user || "");
          setEmail(data.data.mail || "");
          setPhone(data.data.phone || "");
          setSurvey(data.data.survey || "");
          console.log("Survey string:", data.data.survey);
        } else {
          throw new Error("Datos no disponibles");
        }
      })
      .catch((err) => {
        console.error("Error al cargar información:", err);
        setError(
          "No se pudo cargar tu información. Reinténtalo o cierra sesión."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const parseSurvey = (surveyStr: string) => {
  const result = {
    fecha: "",
    r1: "",
    r2: "",
    r3: "",
    r4: "",
  };

  if (!surveyStr) return result;

  const fechaMatch = surveyStr.match(/fecha':([^,]+)/);
  if (fechaMatch) {
    result.fecha = fechaMatch[1].trim();
  }


  const r1Match = surveyStr.match(/Pregunta\s+1[^A-D]*([A-D])/i);
const r2Match = surveyStr.match(/Pregunta\s+2[^A-D]*([A-D])/i);
const r3Match = surveyStr.match(/Pregunta\s+3[^A-D]*([A-D])/i);
const r4Match = surveyStr.match(/Pregunta\s+4[^A-D]*([A-D])/i);

result.r1 = r1Match ? r1Match[1].toUpperCase() : "";
result.r2 = r2Match ? r2Match[1].toUpperCase() : "";
result.r3 = r3Match ? r3Match[1].toUpperCase() : "";
result.r4 = r4Match ? r4Match[1].toUpperCase() : "";

  return result;
};

  const { fecha, r1, r2, r3, r4 } = parseSurvey(survey);

  if (loading) {
    return InfoSkeleton();
  }
  if (error) {
    return (
      <div className="info-survey">
        <img src={compensar} alt="Icono de Compensar" className="icono_info" />
        <div className="style-info">
          <h1>⚠️ Error</h1>
          <p>{error}</p>
          <div className="btm-container">
            <button
              className="btm-info"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </button>
            <button
              className="btm-info"
              style={{ marginTop: "0.5rem" }}
              onClick={() => {
                sessionStorage.clear();
                navigate("/login");
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="info-survey">
      <img src={compensar} alt="Icono_de_compensar" className="icono_info" />
      <div className="style-info">
        <h1>Información</h1>
        <div>
          <label htmlFor="name">
            <strong>Nombre:</strong> {name}
          </label>
          <label htmlFor="email">
            <strong>Email:</strong> {email}
          </label>
          <label htmlFor="phone">
            <strong>Teléfono:</strong> {phone}
          </label>
          <label>
            <strong>Fecha:</strong> {fecha}
          </label>
          <label>
            <strong>Pregunta 1:</strong> {r1}
          </label>
          <label>
            <strong>Pregunta 2:</strong> {r2}
          </label>
          <label>
            <strong>Pregunta 3:</strong> {r3}
          </label>
          <label>
            <strong>Pregunta 4:</strong> {r4}
          </label>
        </div>
        <div className="btm-container">
          <button
            className="btm-info"
            onClick={() => {
              sessionStorage.clear();
              navigate("/login");
            }}
          >
            Terminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoSurvey;
