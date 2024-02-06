import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <ul
      class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        class="sidebar-brand d-flex align-items-center justify-content-center"
        href="/dashboard"
      >
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">
          {" "}
          Admin <sup>2</sup>
        </div>
      </a>
      <hr class="sidebar-divider my-0" />
      <li class="nav-item active">
        <a class="nav-link" href="/dashboard">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>
      <hr class="sidebar-divider" />
      <li class="nav-item active">
        <a class="nav-link" href="/setwinner">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Set Winner</span>
        </a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/userlist">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>User List</span>
        </a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/winnernumber">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Winner Number</span>
        </a>
      </li>
    </ul>
  );
};

export default SideBar;
