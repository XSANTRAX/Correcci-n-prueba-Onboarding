import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./survey.css";

function SurveySkeleton() {
  return (
    <div className="survey">
      <Skeleton
        height={60}
        width={60}
        style={{ borderRadius: "50%", marginBottom: "20px" }}
      />

      <div className="diseño">
        <form>
          <Skeleton height={32} width={180} style={{ marginBottom: "20px" }} />

          <Skeleton height={20} width={100} style={{ marginBottom: "8px" }} />
          <Skeleton height={32} width={200} style={{ marginBottom: "20px" }} />

          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton height={20} width={120} style={{ marginBottom: "10px" }} />
              <div className="opciones" style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Skeleton circle height={16} width={16} />
                    <Skeleton height={12} width={20} style={{ marginTop: "4px" }} />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Botón */}
          <div className="btm-contenedor">
            <Skeleton height={40} width={160} style={{ borderRadius: "8px" }} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SurveySkeleton;
