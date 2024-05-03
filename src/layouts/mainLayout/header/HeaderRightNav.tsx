import { FaRegCircleUser } from "react-icons/fa6";
import { RiSearch2Line } from "react-icons/ri";
import { useAppDispatch } from "../../../app/hooks";
import { logout } from "../../../features/auth/authSlices";
import { Link } from "react-router-dom";
import { eraseCookie } from "../../../api/utilis";

export default function HeaderRightNav() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    eraseCookie("token");
  };

  return (
    <ul>
      <li><Link to="/search"><RiSearch2Line /></Link></li>
      <li>
        <FaRegCircleUser />
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/comments">Comments</Link></li>
          <li><Link to="/favorite-movies">Favorite</Link></li>
          <li><Link to="/movies-to-watch">To watch</Link></li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </li>
    </ul>
  );
}
