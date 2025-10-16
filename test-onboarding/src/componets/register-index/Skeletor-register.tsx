import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./register.css";

function RegisterSkeleton() {
  return (
    <div className="register-container">
      <img
        src="/src/assets/Group 1.png"
        alt="Icono de compensar"
        className="icono_register"
      />

      <div className="register-left">
        <Skeleton height={40} width={180} style={{ marginBottom: "10px" }} />
        <Skeleton height={30} width={300} style={{ marginBottom: "10px" }} />
        <Skeleton height={20} width={280} style={{ marginBottom: "10px" }} />
        <Skeleton height={20} width={180} style={{ marginBottom: "10px" }} />
        <Skeleton height={20} width={120} style={{ marginBottom: "10px" }} />
        <Skeleton height={260} width={260} style={{ marginTop: "20px" }} />
      </div>

      <div className="register-right">
        <form>
          <Skeleton height={40} width="100%" style={{ marginBottom: "10%" }} />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              height={40}
              width="100%"
              style={{transform: "scaleX(1.8)", marginBottom: "10%", borderRadius: "8px" }}
            />
          ))}
          <Skeleton
            height={45}
            width="100%"
            style={{ marginBottom: "20px", borderRadius: "8px" }}
          />
          <div className="social-register">
            <Skeleton height={20} width={100} style={{ marginBottom: "10px" }} />
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <Skeleton circle height={40} width={40} />
              <Skeleton circle height={40} width={40} />
              <Skeleton circle height={40} width={40} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterSkeleton;
