import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   
  const handleLogout = async () => {
    try {
      // ✅ FIX: correct logout endpoint
      await axios.post(BASE_URL + "/auth/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">🧑‍💻DevTinder</Link>
      </div>

      {user && (
        <div className="flex items-center gap-2">
          <div className="form-control"></div>
          
          <div className="dropdown dropdown-end mx-5 flex">
            <p className='px-4'>Welcome, {user.firstName}</p>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User photo"
                  src={user.photoUrl}
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>

              <li>
                <Link to="/connections">
                  Connections <span className="badge badge-error">💗</span>
                </Link>
              </li>

              <li>
                <Link to="/requests" className="justify-between hover:bg-gray-800 rounded-md p-2">
                  Requests <span className="badge badge-warning">👁️</span>
                </Link>
              </li>

              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
