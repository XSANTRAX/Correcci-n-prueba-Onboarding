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
  const [sunmitting, setSubmitting] = useState(false);

  useEffect(() => {
    const userr = sessionStorage.getItem("user");
    if (!userr) return;
    const usersApi = fetch(
      `https://7wmbjxblzi.execute-api.us-east-1.amazonaws.com/user/${userr}`,
      {
        method: "GET",
      }
    );

    usersApi
      .then((resp) => {
        return resp.json().then((data) => {
          console.log(data);
          if (resp.status === 200) {
            setName(data.data.user);
            setEmail(data.data.mail);
            setPhone(data.data.phone);
            setSurvey(data.data.survey);
          } else {
            alert("No se pudo cargar la información del usuario");
            console.log(name, email, phone, survey);
          }
        });
      })
      .catch((error) => {
        console.error("Error al consultar la API:", error);
        alert("No se pudo cargar la información del usuario");
      });
  }, [email, name, phone, survey]);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  if (loading) {
    return InfoSkeleton();
  } else {
    return (
      <div className="info-survey">
        <img src={compensar} alt="Icono_de_compensar" className="icono_info" />
        <div className="style-info">
          <h1>Información</h1>
          <div>
            <label htmlFor="name">Nombre: {name}</label>
            <label htmlFor="email">Email: {email}</label>
            <label htmlFor="phone">Teléfono: {phone}</label>
            <label htmlFor="survey">Encuesta: {survey}</label>
          </div>
          <div className="btm-container">
            <button
              className="btm-info"
              onClick={() => {
                setSubmitting(true);
                setTimeout(() => {
                  sessionStorage.clear();
                  navigate("/login");
                }, 500);
              }}
              disabled={sunmitting}
            >
              {sunmitting ? <div className="spinner" /> : "Terminar"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoSurvey;
