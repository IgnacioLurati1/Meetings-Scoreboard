import Skeleton from "@mui/material/Skeleton";
import "./skeletonLabel.css";


export default function SkeletonLabel() {
  return (
    <div className="skeleton-label">
      <span className="logo-container">
        <Skeleton variant="circular" width={80} height={80} animation="wave"/>
      </span>
      <span className="name">
        <Skeleton variant="text" width={150} height={40} animation="wave"/>
      </span>
      <span className="score">
        <Skeleton variant="text" width={40} height={40} animation="wave"/>
      </span>
    </div>
  );
}