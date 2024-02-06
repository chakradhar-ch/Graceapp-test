import SocialIcons from "../../../components/ui/socialIcons";
import WebHeader from "../../../components/webTheme/header";
import { Link } from "react-router-dom";
const WebThemeProvider = ({ children }) => {
  return (
    <div id="page-top">
      <div id="wrapper">
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            <WebHeader />
            {children}
            <footer id="footer">
              <div class="container py-4 justify-content-center">
                <ul className="d-flex list-unstyled justify-content-center ">
                  <li className="pl-3">
                    <span>
                      <a href="/">Home</a>
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
                </ul>
              </div>
              <SocialIcons />
              <div className="container text-center pb-2">
                <p className="">&copy; Copyright . All Rights Reserved</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebThemeProvider;
