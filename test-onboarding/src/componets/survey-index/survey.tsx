import compensar from "../../assets/Group 1.png";
import confirm from "../../assets/Illustration.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SurveySkeleton from "./Skeletor-survey";
import "./survey.css";
import FechaEncuesta from "./calendario";

function Survey() {
  const [sunmitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fecha, setFecha] = useState<Date | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const opciones: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const fechaFormateada = fecha?.toLocaleDateString("es-ES", opciones);

    const user = sessionStorage.getItem("user");
    const form = event.currentTarget;
    const tipo1 = (form.tipo1 as RadioNodeList).value;
    const tipo2 = (form.tipo2 as RadioNodeList).value;
    const tipo3 = (form.tipo3 as RadioNodeList).value;
    const tipo4 = (form.tipo4 as RadioNodeList).value;
    setSubmitting(true);

    const usersApi = fetch(
      `https://7wmbjxblzi.execute-api.us-east-1.amazonaws.com/survey`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
          survey: `fecha':${fechaFormateada}, Pregunta 1: ${tipo1} ,'Pregunta 2':${tipo2},'Pregunta 3':${tipo3},'Pregunta 4':${tipo4}`,
        }),
      }
    );

    usersApi.then((resp) => {
      resp.json().then((data) => {
        console.log(data);
        if (resp.status === 202) {
          mostrarConfirmacion();
        } else {
          alert("Error al enviar encuesta");
          setSubmitting(false);
        }
      });
    });
  };
  const navigate = useNavigate();

  function mostrarConfirmacion() {
    const form = document.querySelector("form") as HTMLElement;
    const confirmacion = document.getElementById("confirmacion") as HTMLElement;

    if (form && confirmacion) {
      form.style.display = "none";
      confirmacion.style.display = "block";
      setTimeout(() => {
        cerrarConfirmacion();
        navigate("/info-survey");
      }, 2000);
    }
  }

  function cerrarConfirmacion() {
    const form = document.querySelector("form") as HTMLElement;
    const confirmacion = document.getElementById("confirmacion") as HTMLElement;

    if (form && confirmacion) {
      confirmacion.style.display = "none";
      form.style.display = "block";
      navigate("/info-survey");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return SurveySkeleton();
  } else {
    return (
      <div className="survey">
        <img
          src={compensar}
          alt="Icono_de_compensar"
          className="icono_survey"
        />
        <div className="diseño">
          <form onSubmit={handleSubmit}>
            <h1>Encuesta</h1>
            <div className="bloque-fecha">
              <label htmlFor="fecha">Fecha:</label>
              <FechaEncuesta onFechaChange={setFecha} obligatorio={true} />
            </div>
            <label htmlFor="pregunta1">Pregunta 1</label>
            <div className="opciones">
              <div>
                <input type="radio" name="tipo1" id="A1" value="A" required />
                <label htmlFor="A1">A</label>
              </div>
              <div>
                <input type="radio" name="tipo1" id="B1" value="B" required />
                <label htmlFor="B1">B</label>
              </div>
              <div>
                <input type="radio" name="tipo1" id="C1" value="C" required />
                <label htmlFor="C1">C</label>
              </div>
              <div>
                <input type="radio" name="tipo1" id="D1" value="D" required />
                <label htmlFor="D1">D</label>
              </div>
            </div>

            <label htmlFor="pregunta2">Pregunta 2</label>
            <div className="opciones">
              <div>
                <input type="radio" name="tipo2" id="A2" value="A" required />
                <label htmlFor="A2">A</label>
              </div>
              <div>
                <input type="radio" name="tipo2" id="B2" value="B" required />
                <label htmlFor="B2">B</label>
              </div>
              <div>
                <input type="radio" name="tipo2" id="C2" value="C" required />
                <label htmlFor="C2">C</label>
              </div>
              <div>
                <input type="radio" name="tipo2" id="D2" value="D" required />
                <label htmlFor="D2">D</label>
              </div>
            </div>

            <label htmlFor="pregunta3">Pregunta 3</label>
            <div className="opciones">
              <div>
                <input type="radio" name="tipo3" id="A3" value="A" required />
                <label htmlFor="A3">A</label>
              </div>
              <div>
                <input type="radio" name="tipo3" id="B3" value="B" required />
                <label htmlFor="B3">B</label>
              </div>
              <div>
                <input type="radio" name="tipo3" id="C3" value="C" required />
                <label htmlFor="C3">C</label>
              </div>
              <div>
                <input type="radio" name="tipo3" id="D3" value="D" required />
                <label htmlFor="D3">D</label>
              </div>
            </div>

            <label htmlFor="pregunta4">Pregunta 4</label>
            <div className="opciones">
              <div>
                <input type="radio" name="tipo4" id="A4" value="A" required />
                <label htmlFor="A4">A</label>
              </div>
              <div>
                <input type="radio" name="tipo4" id="B4" value="B" required />
                <label htmlFor="B4">B</label>
              </div>
              <div>
                <input type="radio" name="tipo4" id="C4" value="C" required />
                <label htmlFor="C4">C</label>
              </div>
              <div>
                <input type="radio" name="tipo4" id="D4" value="D" required />
                <label htmlFor="D4">D</label>
              </div>
            </div>

            <div className="btm-contenedor">
              <button
                className="btm-survey"
                type="submit"
                value="enviar"
                id="btnenviar"
                disabled={sunmitting}
              >
                {sunmitting ? <div className="spinner" /> : "Enviar Encuesta"}
              </button>
            </div>
          </form>
          <div className="confirmacion" id="confirmacion">
            <div className="icono">
              <img src={confirm} alt="Icono de confirmacion" />
            </div>
            <p>Tus respuestas se han guardado de forma correcta</p>
            <p>Redirigiendo...</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Survey;
