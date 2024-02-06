import { useState, useEffect } from "react";
import ApiServices from "../../utils/services";

const UserList = () => {
  const [userlist, setUserList] = useState([]);
  const fetchUsers = async () => {
    const data = await ApiServices.webUserList();
    console.log(data);
    if (data.status === 200) {
      setUserList(data.data);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-12 col-lg-12">
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">User List</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table
                  class="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellspacing="0"
                >
                  <thead>
                    <tr>
                      <th>Sn.</th>
                      <th>User Id</th>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Registration Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userlist.map((item, index) => {
                      return (
                        <tr>
                          <td>{index+1}</td>
                          <td>{item._id}</td>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                          <td>{item.createdAt}</td>
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

export default UserList;
