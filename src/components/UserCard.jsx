import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
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
      console.log(error);
    }
  };

  return (
    <div className="card grid-rows-1 bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl || "/default-avatar.png"} alt="photo" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}</h2>

        {age && gender && <p>{age}, {gender}</p>}
        <p>{about}</p>

        {Array.isArray(skills) && skills.length > 0 && (
          <div>
            <h3 className="font-semibold">Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-700 px-2 py-1 rounded-lg text-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-6 mt-6">
          <button
            className="btn bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>

          <button
            className="btn bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;