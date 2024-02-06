import { useState, useEffect } from "react";
import ApiServices from "../../utils/services";
import HelperMethod from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import WebHeader from "../../components/webTheme/header";
import SocialIcons from "../../components/ui/socialIcons";

const Home = () => {
  const navigate = useNavigate();
  const [isActive, setIsActve] = useState({
    isLogedIn: false,
    username: "",
    email: "",
  });
  const [switchModel, setSwitchModel] = useState({
    signin: false,
    signup: true,
  });
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    state: "",
    otp: ""
  });
  const [isPaid, setisPaid] = useState({
    isPaid: false,
    numbers: 1,
  });
  const [listedNumber, setListedNumber] = useState([]);
  const [holdNumbers, setHoldNumbers] = useState([]);
  const [chooseNumber, setChooseNumber] = useState([]);
  const [isgame, setIsgame] = useState(false);
  const [gameLoad, setGameLoad] = useState(false);
  const [addNumber, setAddNumber] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const formHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const signUpHandler = async () => {
    if (user.email && user.password && user.username) {
      const data = await ApiServices.webUserSignUp({
        email: user.email,
        password: user.password,
        username: user.username,
        country: user.country,
        state: user.state
      });
      if (data.status === 201) {
        alert("User created successfully!");
        localStorage.setItem("wtk", data.token);
        setIsActve({
          isLogedIn: true,
          email: user.email,
          username: user.username,
        });
        setisPaid({
          ...isPaid,
          numbers: 1,
        });
      } else if (data.status === 200) {
        alert(data.message);
      }
      console.log(data);
    } else {
      alert("Please fill all fields");
    }
  };
  const signInHandler = async () => {
    if (user.email && user.password) {
      const data = await ApiServices.webUserSignIn({
        email: user.email,
        password: user.password,
      });
      if (data.status === 200) {
        localStorage.setItem("wtk", data.token);
        setIsActve({
          isLogedIn: true,
          email: user.email,
          password: user.password,
        });
        const isUser = HelperMethod.jwtVerify(localStorage.getItem("wtk"));
        if (isUser) {
          setisPaid({
            ...isPaid,
            numbers: isUser.data.totalnumbers,
          });
        }
        fetchIsGamePlayed(true, user.email);
      } else {
        alert(data.message);
      }
      console.log(data);
    } else {
      alert("please fill both the fields");
    }
  };

  const checkUser = async () => {
    const isUser = HelperMethod.jwtVerify(localStorage.getItem("wtk"));
    if (isUser) {
      setIsActve({
        isLogedIn: true,
        username: isUser.data.username,
        email: isUser.data.email,
      });
      setisPaid({
        ...isPaid,
        numbers: isUser.data.totalnumbers,
      });
      fetchIsGamePlayed(true);
      const { data } = await ApiServices.getUpdatedNumbers(isUser.data.email);
      console.log("ddd", data[0].totalnumbers);
      setisPaid({ ...isPaid, numbers: data[0].totalnumbers });
    }
    console.log(isUser);
  };
  const totalNumbers = [...Array(1000).keys()];
  useEffect(() => {
    checkUser();
    setHoldNumbers(chunk(totalNumbers, 10));
    setListedNumber(chunk(totalNumbers, 10).slice(0, 10));
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("pp");
    console.log("myParam", myParam);
    if (myParam === "success") {
      document.getElementById("freeplay").click();
    }
  }, []);
  function chunk(arr, size) {
    let result = arr.reduce(
      (rows, key, index) =>
        (index % size == 0
          ? rows.push([key])
          : rows[rows.length - 1].push(key)) && rows,
      []
    );
    return result;
  }
  console.log(listedNumber);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [next, setNext] = useState(10);
  const [prev, setPrev] = useState(0);
  const [btnStatus, setBtnStatus] = useState(1);
  const nextHandler = () => {
    setCurrentIndex(currentIndex + 1);
    setNext(next + 10);
    setPrev(prev + 10);
    const currentNumbers = holdNumbers.slice(prev + 10, next + 10);
    setListedNumber(currentNumbers);
  };
  const prevHandler = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
      setNext(next - 10);
      setPrev(prev - 10);
      const currentNumbers = holdNumbers.slice(prev - 10, next - 10);
      setListedNumber(currentNumbers);
    }
  };
  const pickNumber = (num) => {
    if (chooseNumber.length < isPaid.numbers) {
      if (num <= 1000000) {
        if (chooseNumber.includes(num)) {
          alert("This number is already selected !");
        } else {
          setChooseNumber([...chooseNumber, num]);
        }
      } else {
        alert("You cannot choose a number greater than one million");
      }
    } else {
      alert("You have already selected your maximum allowed numbers");
    }
  };
  const deleteChooseNumber = (it) => {
    setChooseNumber(chooseNumber.filter((item) => item !== it));
  };
  const [amt, setAmt] = useState(1);
  const gameNumbersHandler = async () => {
    console.log(isActive);
    const data = await ApiServices.saveGameNumbers({
      username: isActive.username,
      email: isActive.email,
      numbers: chooseNumber,
    });
    console.log(data);
    alert("Numbers saved successfully !");
    setIsgame(true);
  };
  async function fetchIsGamePlayed(isAc, email) {
    if (isAc) {
      setGameLoad(true);
      const data = await ApiServices.isGamePlayed({
        email: email ? email : isActive.email,
      });
      setIsgame(Boolean(data.isGamePlayed));
      console.log("is", data);
      setGameLoad(false);
    }
  }
  const signOutHandler = () => {
    localStorage.removeItem("wtk");
    window.location.reload();
  };
  const addhandler = () => {
    if (chooseNumber.length < isPaid.numbers) {
      if (addNumber <= 1000000) {
        if (chooseNumber.includes(addNumber)) {
          alert("This number is already selected !");
        } else {
          setChooseNumber([...chooseNumber, addNumber]);
        }
      } else {
        alert("You cannot choose a number greater than one million");
      }
    } else {
      alert("You have already selected your maximum allowed numbers");
    }
  };
  const sendOtp = async ()=>{
    setOtpSent(true);
    setBtnStatus(2);
    const data = await ApiServices.sendOtp({
      email: user.email,
      otp: user.otp
    });
    if(data.status === 200){
      alert("OTP Sent Successfully !");
    }else{
      alert("Internal Server error !");
    }
    console.log(data, "sass");
  }
  const verifyOtp = async ()=>{
      const data = await ApiServices.verifyOtp({
        email: user.email,
        otp: user.otp 
      });
      if(data.status === 200){
        setOtpSent(false);
        setBtnStatus(3);
      }else if(data.status === 403){
        alert("You have entered Incorrect OTP");
      }else{
        alert("Internal Server error !")
      }
      console.log("ise", data);
  }

  return (
    <>
      {/* <header id="header" class="fixed-top d-flex align-items-center">
        <div class="container d-flex align-items-center justify-content-between">
          <div class="logo">
            <h1 class="text-light">
              <a href="/winners">
                <span>Winner</span>
              </a>
            </h1>
          </div>

          <nav id="navbar" class="navbar">
            <ul>
              <li>
                <a class="getstarted scrollto" href="#about">
                  Chooser Language
                </a>
              </li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header> */}
      <WebHeader />
      <section id="hero" class="d-flex align-items-center">
        <div class="container">
          <div class="row">
            <div class="d-flex justify-content-center">
              <button
                href="#about"
                class="btn-get-started"
                data-toggle="modal"
                data-target=".bd-example-modal-lg"
                onClick={() => fetchIsGamePlayed(isActive.isLogedIn)}
                id="freeplay"
              >
                Play Free
              </button>
              {/* {isActive.isLogedIn ? (
                  <button
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg-1"
                    class="btn-get-started ml-4"
                  >
                    Paid play
                  </button>
                ) : (
                  ""
                )} */}
            </div>
          </div>
          <div
            class="modal fade bd-example-modal-lg-1"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div className="row">
                    <div class="form-group">
                      <span> Select amount </span>
                      <input
                        type="number"
                        class="form-control form-control-user mt-2"
                        id=""
                        aria-describedby=""
                        placeholder="Enter Username"
                        name="amt"
                        onChange={(e) => setAmt(e.target.value)}
                        value={amt}
                      />
                    </div>
                    <div class="form-group">
                      <a
                        href={`https://adolphustable.com/web/pay?email=${isActive.email}&amt=${amt}`}
                        className="btn btn-primary sysbtn"
                      >
                        Pay
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade bd-example-modal-lg"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  {/* {isActive.isLogedIn ? (
                    isPaid ? (
                      <p> Free play choose any 1 number </p>
                    ) : (
                      <p> Paid play choose 4 number </p>
                    )
                  ) : (
                    ""
                  )} */}
                  {isActive.isLogedIn && !isgame ? (
                    <p> Choose any {isPaid.numbers} number </p>
                  ) : (
                    ""
                  )}
                  {!isActive.isLogedIn ? (
                    <div className="d-flex">
                      <p
                        className="signinmodel-text"
                        onClick={() => setSwitchModel({ signin: true })}
                      >
                        Log In
                      </p>
                      <p
                        className="signinmodel-text ml-3"
                        onClick={() => setSwitchModel({ signup: true })}
                      >
                        Register
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  {!isActive.isLogedIn && switchModel.signin ? (
                    <div class="row justify-content-center">
                      <div class="col-lg-6">
                        <div class="p-5">
                          <div class="" style={{marginTop: "-30px"}} >
                              <h3 className="text-center" > Login </h3>
                              <p className="text-center">
                              If you don't have an account yet, click on the "Register" button and fill out the information to create an account. If you do have an account, click on the "Log In" button to log in to your account to play the game.
                              </p>
                          </div>
                          <div class="text-center"></div>
                          <div class="form-group">
                            <input
                              type="email"
                              class="form-control form-control-user"
                              id="exampleInputEmail"
                              placeholder="Enter Email Address..."
                              name="email"
                              onChange={(e) => formHandler(e)}
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
                              onChange={(e) => formHandler(e)}
                              value={user.password}
                            />
                          </div>

                          <button
                            class="btn btn-primary btn-user btn-block sysbtn"
                            onClick={signInHandler}
                          >
                            Login
                          </button>
                          <hr />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {!isActive.isLogedIn && switchModel.signup ? (
                    <div class="row justify-content-center">
                      <div class="col-lg-6">
                        <div class="p-5">
                          <div class="text-center"></div>
                          {
                              !otpSent ? 
                          <>
                           <div class="" style={{marginTop: "-30px"}} >
                          <h3 className="text-center" > Register </h3>
                          <p className="text-center" >
                          One time verification code will be sent to your email complete your registration.  After registering you can use the same account to play each day.  
                          </p>
                        </div>
                        <div class="pl-5"></div>
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control form-control-user"
                              id=""
                              aria-describedby=""
                              placeholder="Enter Username"
                              name="username"
                              onChange={(e) => formHandler(e)}
                              value={user.username}
                            />
                          </div>
                          <div class="form-group">
                            <input
                              type="email"
                              class="form-control form-control-user"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                              name="email"
                              onChange={(e) => formHandler(e)}
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
                              onChange={(e) => formHandler(e)}
                              value={user.password}
                            />
                          </div>
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control form-control-user"
                              id="009"
                              aria-describedby="country"
                              placeholder="Country"
                              name="country"
                              onChange={(e) => formHandler(e)}
                              value={user.country}
                            />
                          </div>
                          <div class="form-group">
                            <input
                              type="state"
                              class="form-control form-control-user"
                              id="state"
                              aria-describedby="State"
                              placeholder="State"
                              name="state"
                              onChange={(e) => formHandler(e)}
                              value={user.state}
                            />
                          </div>
                          </> : 
                          <>
                            <div class="" style={{marginTop: "-30px"}} >
                              <p> Please enter the OTP sent to your email! </p>
                            </div>
                            <div class="form-group">
                              <input
                                type="number"
                                class="form-control form-control-user"
                                id="otp"
                                aria-describedby="otp"
                                placeholder="Enter OTP"
                                name="otp"
                                onChange={(e) => formHandler(e)}
                                value={user.otp}
                                />
                            </div>
                          </>
                          }

                          <div class="form-group">
                            {
                              btnStatus === 1 ? 
                              <button
                              class="btn btn-primary btn-user btn-block sysbtn"
                              onClick={sendOtp}
                            >
                              Register
                            </button> : ""
                            }
                           {
                            btnStatus === 2 ? 
                            <button
                              class="btn btn-primary btn-user btn-block sysbtn"
                              onClick={verifyOtp}
                            >
                              Submit
                            </button> : ""
                           }
                           {
                            btnStatus === 3 ? 
                              <button
                              class="btn btn-primary btn-user btn-block sysbtn"
                              onClick={signUpHandler}
                             >
                            Register
                             </button>: ""
                           }
                            
                          </div>
                         
                          <hr />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {isActive.isLogedIn && !isgame ? (
                    <>
                      <div style={{ display: "flex" }}>
                        <input
                          type="number"
                          value={addNumber}
                          onChange={(e) => setAddNumber(e.target.value)}
                          className="form-control col-md-3 mb-3"
                        />
                        <button
                          className="btn btn-primary ml-3 sysbtn"
                          style={{ height: "40px" }}
                          onClick={addhandler}
                        >
                          {" "}
                          Add{" "}
                        </button>
                      </div>
                      <table class="table table-bordered table-dark">
                        <tbody className="gametable">
                          {listedNumber.map((item) => {
                            return (
                              <tr>
                                {item.map((_item) => {
                                  return (
                                    <td onClick={() => pickNumber(_item)}>
                                      {_item}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className="col-md-12 d-flex justify-content-end">
                        {currentIndex !== 0 ? (
                          <button
                            className="btn btn-primary sysbtn"
                            onClick={prevHandler}
                          >
                            <i class="bi bi-arrow-left-circle-fill"></i>
                          </button>
                        ) : (
                          ""
                        )}
                        <button
                          className="btn btn-primary ml-2 sysbtn"
                          onClick={nextHandler}
                        >
                          <i class="bi bi-arrow-right-circle-fill"></i>
                        </button>
                      </div>
                      <div className="col-md-12">
                        {chooseNumber.map((item) => {
                          return (
                            <button
                              type="button"
                              class="btn btn-primary ml-2 sysbtn"
                              onClick={() => deleteChooseNumber(item)}
                            >
                              <span class="badge badge-dark">{item}</span>
                              <span className="ml-2">x</span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {isActive.isLogedIn && isgame ? (
                    <h3>
                      {" "}
                      You have selected your numbers for today. If you win, around 12 AM EST you will be notified via email. You may also view past winners to check if the number you picked was a winner.
                      Winners in the continental US will be asked for a shipping address to send the prize to.
                      Winners outside the continental US will be asked for a phone number so a representative can contact them about receiving their prize.{" "}
                    </h3>
                  ) : (
                    ""
                  )}
                </div>
                <div class="modal-footer">
                  {isPaid.numbers === chooseNumber.length &&
                  isActive.isLogedIn &&
                  !isgame ? (
                    <button
                      type="button"
                      class="btn btn-primary sysbtn"
                      onClick={gameNumbersHandler}
                    >
                      Submit
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer id="footer">
        <div class="container py-4 justify-content-center">
          <ul className="d-flex list-unstyled justify-content-center ">
            <li className="pl-3">
              <span>
                <Link to="/">Home</Link>
              </span>
            </li>

            <li className="pl-3">
              <span>
                {" "}
                <a href="/about">About Adolphus</a>
              </span>
            </li>

            <li className="pl-3">
              <span>
                {" "}
                <a href="/privacy">Privacy Policy</a>
              </span>
            </li>

            <li className="pl-3">
              <span>
                {" "}
                <a href="/termsconditions">Terms & Conditions</a>
              </span>
            </li>

            <li className="pl-3">
              <span>
                {" "}
                <a href="/rules">How To Play</a>
              </span>
            </li>

            <li className="pl-3">
              <span>
                <a href="/contact">Contact Us</a>
              </span>
            </li>
            {isActive.isLogedIn ? (
              <li className="pl-3">
                <a href="#" onClick={signOutHandler}>
                  Log Out
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <SocialIcons />
        <div className="container text-center pb-2">
          <p className="">&copy; Copyright . All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
