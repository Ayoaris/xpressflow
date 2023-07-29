// import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { secretKey, decryptToken } from "../utils";
import PropTypes from "prop-types";

const RouteGuard = ({ component: Component }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;
  const decryptedToken = decryptToken(token, secretKey);

  return decryptedToken ? <Component /> : <Navigate to="/" />;
};

RouteGuard.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default RouteGuard;
