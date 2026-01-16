import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      // ✅ FIX: backend sends user directly
      dispatch(addUser(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
