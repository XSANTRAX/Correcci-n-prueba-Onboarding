import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./validacion.css";

function ValidationSkeleton() {
  return (
    <div className="estado-encuesta">
      <h2 className="skeleton-title">
        <Skeleton height={28} width={120} />
      </h2>

      <div className="skeleton-card">
        <Skeleton height={28} width={140} style={{ marginBottom: "12px" }} />
        <Skeleton height={20} width={200} style={{ marginBottom: "24px" }} />

        <Skeleton height={40} width={160} style={{ borderRadius: "8px", marginBottom: "12px" }} />
        <Skeleton height={40} width={160} style={{ borderRadius: "8px" }} />
      </div>
    </div>
  );
}

export default ValidationSkeleton;
