import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstname] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");

  // ✅ FIXED: keep skills as STRING for input
  const [skillsInput, setSkillsInput] = useState(
    Array.isArray(user.skills) ? user.skills.join(", ") : ""
  );

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  // -------------------------------
  // SAVE PROFILE
  // -------------------------------
  const saveProfile = async () => {
    setError("");
    try {
      // Convert string → array only when saving
      const skillsArray = skillsInput
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills: skillsArray,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.log("Save profile error:", error);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* Main Wrapper */}
      <div className="flex flex-col lg:flex-row justify-center items-start gap-6 my-10 px-4">
        {/* Edit Form */}
        <div className="w-full max-w-md">
          <div className="card bg-base-300 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>

              <label className="form-control w-full my-2">
                <span className="label-text">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full my-2">
                <span className="label-text">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full my-2">
                <span className="label-text">Age</span>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full my-2">
                <span className="label-text">Photo URL</span>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full my-2">
                <span className="label-text">Gender</span>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Others</option>
                </select>
              </label>

              {/* ✅ FIXED SKILLS INPUT */}
              <label className="form-control w-full my-2">
                <span className="label-text">Skills</span>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="React, Node, MongoDB"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full my-2">
                <span className="label-text">About</span>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="textarea textarea-bordered w-full"
                />
              </label>

              <p className="text-red-500 text-center">{error}</p>

              <div className="card-actions justify-center mt-2">
                <button
                  className="btn btn-primary bg-purple-600 px-4 py-2 rounded w-full sm:w-auto"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="w-full max-w-sm">
          <UserCard
            user={{
              _id: user._id,
              firstName,
              lastName,
              photoUrl: photoUrl,
              about,
              age,
              gender,
              skills: skillsInput
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill !== ""),
            }}
          />
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-center pt-20">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
