import HelperMethod from "../utils/helper";
import { useNavigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const token = localStorage.getItem("tk");
  const isLogenIn = HelperMethod.jwtVerify(token);
  if (isLogenIn) {
    return <>{children}</>;
  } else {
    return (window.location.href = "/admin/login");
  }
};

export default AdminProtected;
 