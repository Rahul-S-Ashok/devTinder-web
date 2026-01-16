import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // ===================== LOGIN =====================
  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/auth/login",
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  // ===================== SIGNUP =====================
  const handleSignUp = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/auth/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-lg font-semibold">
            {isLoginForm ? "Login" : "Signup"}
          </h2>

          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-3">
                  <div className="label mb-1">
                    <span className="label-text font-medium">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full max-w-xs text-sm pl-3"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-3">
                  <div className="label mb-1">
                    <span className="label-text font-medium">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs text-sm pl-3"
                  />
                </label>
              </>
            )}

            <label className="form-control w-full max-w-xs my-3">
              <div className="label mb-1">
                <span className="label-text font-medium">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full max-w-xs text-sm pl-3"
              />
            </label>

            {/* PASSWORD WITH SHOW / HIDE */}
            <label className="form-control w-full max-w-xs my-3">
              <div className="label mb-1">
                <span className="label-text font-medium">Password</span>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full max-w-xs pl-3 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </label>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div className="flex justify-center mt-4">
            <button
              className="bg-purple-600 text-white w-40 px-4 py-2 rounded-md 
                         text-sm font-medium hover:bg-purple-700 
                         active:scale-95 transition"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>

          <p
            className="text-center cursor-pointer py-2 text-sm"
            onClick={() => setIsLoginForm((prev) => !prev)}
          >
            {isLoginForm
              ? "New user? Signup here"
              : "Existing user? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
