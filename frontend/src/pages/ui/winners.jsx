import { useEffect, useState } from "react";
import ApiServices from "../../utils/services";
import { Link } from "react-router-dom";
import WebHeader from "../../components/webTheme/header";
import SocialIcons from "../../components/ui/socialIcons";

const Winners = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const data = await ApiServices.winningNumberList();
    console.log(data);
    setData(data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <WebHeader />
      <section id="" class="d-flex align-items-center">
        <div class="container mt-5 innerpageContent">
          <div class="row">
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Sn</th>
                  <th scope="col">Winners</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  const dt = item.createdAt.split("T");
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{JSON.stringify(item.numbers)}</td>
                      <td>{dt[0]}</td>
                      <td>{dt[1]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
          </ul>
        </div>
        <SocialIcons />
        <div className="container text-center">
          <p className="">&copy; Copyright . All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Winners;
