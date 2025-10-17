import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./info.css";

function InfoSkeleton() {
  return (
    <div className="info-survey">
      <img src="" alt="Icono_de_compensar" className="icono_info" />
      <div className="style-info">
        <h1 className="skeleton-title">
          <Skeleton height={28} width={140} />
        </h1>

        <div className="skeleton-card">
          <Skeleton height={24} width={220} style={{ marginBottom: "12px" }} />
          <Skeleton height={24} width={220} style={{ marginBottom: "12px" }} />
          <Skeleton height={24} width={220} style={{ marginBottom: "12px" }} />
          <Skeleton height={60} width={240} style={{ marginBottom: "24px" }} />
        </div>

        <div className="btm-container">
          <Skeleton height={40} width={160} style={{ borderRadius: "8px" }} />
        </div>
      </div>
    </div>
  );
}

export default InfoSkeleton;
