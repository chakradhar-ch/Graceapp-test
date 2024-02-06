import { useState, useEffect } from "react";
import ApiServices from "../../utils/services";
import { useNavigate } from "react-router-dom";
import HelperMethod from "../../utils/helper";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const loginhandler = async () => {
    const data = await ApiServices.adminLogin(user);
    if (data?.status === 200) {
      localStorage.setItem("tk", data.token);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials !");
    }
    // console.log(data);
  };

  useEffect(() => {
    (async () => {
      if (HelperMethod.jwtVerify(localStorage.getItem("tk"))) {
        navigate("/dashboard");
      }
    })();
  }, []);
  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <div class="row justify-content-center">
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Admin Login</h1>
                    </div>
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control form-control-user"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                        name="email"
                        onChange={(e) =>
                          setUser({ ...user, [e.target.name]: e.target.value })
                        }
                        value={user.email}
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                        name="password"
                        onChange={(e) =>
                          setUser({ ...user, [e.target.name]: e.target.value })
                        }
                        value={user.password}
                      />
                    </div>

                    <button
                      class="btn btn-primary btn-user btn-block"
                      onClick={loginhandler}
                    >
                      Login
                    </button>
                    <hr />

                    {/* <div class="text-center">
                      <a class="small" href="forgot-password.html">
                        Forgot Password?
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
