import { NavLink } from "react-router-dom";

export default function HeaderLeftNav() {
  return (
    <ul>
      <li>
        <NavLink to={"/"}>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to={"/movies"}>Movies</NavLink>
      </li>
    </ul>
  );
}
