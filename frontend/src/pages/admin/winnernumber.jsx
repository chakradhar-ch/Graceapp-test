import { useEffect, useState } from "react";
import ApiServices from "../../utils/services";

const WinnerNumber = () => {
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
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-12 col-lg-12">
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">Winner Number</h6>
            </div>
            <div class="card-body">
              <div class="row">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Sn</th>
                      <th scope="col">Numbers</th>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerNumber;
