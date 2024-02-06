import jwt_decode from "jwt-decode";

class HelperMethod {
   jwtVerify(token) {
    try {
      const decoded = jwt_decode(token);
      return decoded;
    } catch (error) {
      return false;
    }
  }
}

export default new HelperMethod();
