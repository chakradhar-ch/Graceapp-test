import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WebThemeProvider from "./WebThemeProvider";
import ApiServices from "../../utils/services";

const Contact = () => {
  const [conatctData, setContactData] = useState({
    name: "",
    email: "",
    number: "",
    hearabout: "",
    message: ""
  });
  const onChangeHandler = (e) =>{
    setContactData({...conatctData, [e.target.name]: e.target.value});
  }
  const sendMessage = async () => {
    console.log(conatctData);
    const data = await ApiServices.contactEmailSend(conatctData);
    console.log(data);
    if(data.status === 200){
      alert("Message sent !");
    }
  }
  return (
    <WebThemeProvider>
      <div>
        <section className="">
          <div class="container">
            <section class="mb-4">
              <h2 class="h1-responsive font-weight-bold text-center my-4">
                Contact us
              </h2>
              <p class="text-center w-responsive mx-auto mb-5">
                Do you have any questions? Please do not hesitate to contact us
                directly. Our team will come back to you within a matter of
                hours to help you.
              </p>

              <div class="row">
                <div class="col-md-12 mb-md-0 mb-5">
                  <form
                    id="contact-form"
                    name="contact-form"
                    action="mail.php"
                    method="POST"
                  >
                    <div class="row">
                      <div class="col-md-6">
                        <div class="md-form mb-0">
                          <label for="name" class="">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            class="form-control"
                            onChange={(e)=>onChangeHandler(e)}
                          />
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="md-form mb-0">
                          <label for="email" class="">
                            Email
                          </label>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            class="form-control"
                            onChange={(e)=>onChangeHandler(e)}
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="md-form mb-0">
                          <label for="email" class="">
                            Number
                          </label>
                          <input
                            type="number"
                            id="number"
                            name="number"
                            class="form-control"
                            onChange={(e)=>onChangeHandler(e)}
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="md-form mb-0">
                          <label for="subject" class="">
                            How do you hear about us?
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="hearabout"
                            class="form-control"
                            onChange={(e)=>onChangeHandler(e)}
                          />
                        </div>
                      </div>
                    </div>

                    <div class="row"></div>

                    <div class="row">
                      <div class="col-md-12">
                        <div class="md-form">
                          <label for="message">Message</label>
                          <textarea
                            type="text"
                            id="message"
                            name="message"
                            rows="2"
                            class="form-control md-textarea"
                            onChange={(e)=>onChangeHandler(e)}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </form>

                  <div class="mt-2">
                    <a
                      class="btn btn-primary sysbtn"
                      onClick={sendMessage}
                    >
                      Send 
                    </a>
                  </div>
                  <div class="status"></div>
                </div>
              </div>
              {/* <div className="row mt-5 justify-content-center">
                <div className="col-md-1">
                  <a href="https://twitter.com/AdolphusTable" target="_blank">
                    <img
                      src="https://cdn.punchng.com/wp-content/uploads/2023/07/24084806/Twitter-new-logo.jpeg"
                      height={37}
                      style={{ borderRadius: "50%" }}
                      alt=""
                    />
                  </a>
                </div>
                <div className="col-md-1">
                  <a
                    href="https://www.youtube.com/channel/UC6klOzayd1_y3lPx-RoQGqA"
                    target="_blank"
                  >
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_youtube-512.png"
                      height={40}
                      style={{ borderRadius: "50%" }}
                      alt=""
                    />
                  </a>
                </div>
                <div className="col-md-1">
                  <a
                    href="https://www.facebook.com/profile.php?id=61552318801816"
                    target="_blank"
                  >
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png"
                      height={44}
                      style={{ borderRadius: "50%" }}
                      alt=""
                    />
                  </a>
                </div>
                <div className="col-md-1">
                  <a
                    href="https://www.tiktok.com/@adolphustable"
                    target="_blank"
                  >
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/023/986/921/original/tiktok-logo-tiktok-logo-transparent-tiktok-icon-transparent-free-free-png.png"
                      height={50}
                      style={{ borderRadius: "50%" }}
                      alt=""
                    />
                  </a>
                </div>
                <div className="col-md-1">
                  <a
                    href="https://www.instagram.com/adolphustable/"
                    target="_blank"
                  >
                    <img
                      src="https://img.freepik.com/premium-vector/modern-badge-logo-instagram-icon_578229-124.jpg?size=626&ext=jpg"
                      height={50}
                      style={{ borderRadius: "50%" }}
                      alt=""
                    />
                  </a>
                </div>
              </div> */}
            </section>
          </div>
        </section>
      </div>
    </WebThemeProvider>
  );
};

export default Contact;
