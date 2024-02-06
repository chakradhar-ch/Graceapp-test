import { useState, useEffect } from "react";

import ApiServices from "../../utils/services";

const SetWinner = () => {
  const [numbers, setNumbers] = useState({
    day: 0,
    hour: 0,
  });
  const fetchNumbers = async () => {
    const data = await ApiServices.getWinnerNumbers();
    setNumbers(data.data);
  };
  useEffect(() => {
    fetchNumbers();
  }, []);
  const updateWinner = async () => {
    const data = await ApiServices.winnerNumbersUpdate({
      day: numbers.day,
      hour: numbers.hour,
    });
    if (data.status === 200) {
      alert("winners updatd");
    } else {
      alert("Internal server error !");
    }
  };

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-12 col-lg-12">
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">Set Winner</h6>
            </div>
            <div class="card-body">
              <div className="row">
                <div className="col-md-12">
                  <h6 className="text-primary"> Todays Winner </h6>
                </div>
                <div className="col-md-3">
                  <input
                    type="number"
                    className="form-control"
                    value={numbers?.day}
                    name="day"
                    onChange={(e) =>
                      setNumbers({
                        ...numbers,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                
                <div className="col-md-12 mt-3 ">
                  <h6 className="text-primary"> Hour Winner </h6>
                </div>
                <div className="col-md-3">
                  <input
                    type="number"
                    className="form-control"
                    value={numbers?.hour}
                    name="hour"
                    onChange={(e) =>
                      setNumbers({
                        ...numbers,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-12 mt-4">
                  <button className="btn btn-primary" onClick={updateWinner}>
                    {" "}
                    Update Winner{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetWinner;
