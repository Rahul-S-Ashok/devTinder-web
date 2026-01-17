import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, showActions = true }) => {
  const dispatch = useDispatch();

  if (!user) return null;

  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills,
  } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log("REQUEST ERROR 👉", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-base-300 w-[320px] rounded-xl shadow-xl overflow-hidden">

        {/* IMAGE */}
        <div className="w-full h-[240px] bg-gray-700">
          <img
            src={photoUrl || "/default-avatar.png"}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* BODY */}
        <div className="p-4 text-white">
          <h2 className="text-lg font-semibold">
            {firstName} {lastName}
          </h2>

          {age && gender && (
            <p className="text-sm text-gray-400">
              {age}, {gender}
            </p>
          )}

          {about && (
            <p className="text-sm mt-2 line-clamp-2">
              {about}
            </p>
          )}

          {/* SKILLS */}
          {skills?.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-semibold">Skills</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded-md text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ACTION BUTTONS (ONLY FOR FEED) */}
          {showActions && (
            <div className="flex justify-center gap-6 mt-4">
              <button
                className="px-4 py-1.5 text-sm rounded-lg bg-purple-600 hover:bg-purple-700"
                onClick={() => handleSendRequest("ignored", _id)}
              >
                Ignore
              </button>

              <button
                className="px-4 py-1.5 text-sm rounded-lg bg-pink-500 hover:bg-pink-600"
                onClick={() => handleSendRequest("interested", _id)}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
