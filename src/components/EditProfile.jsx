import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  // -------------------------------
  // FORM STATE
  // -------------------------------
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");

  // skills as string for input
  const [skillsInput, setSkillsInput] = useState(
    Array.isArray(user.skills) ? user.skills.join(", ") : ""
  );

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  // -------------------------------
  // SAVE PROFILE
  // -------------------------------
  const saveProfile = async () => {
    setError("");
    try {
      const skillsArray = skillsInput
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

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

      // backend returns updated user
      dispatch(addUser(res.data.data));

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.log("Save profile error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row justify-center items-start gap-6 my-10 px-4">

        {/* LEFT: EDIT FORM */}
        <div className="w-full max-w-md">
          <div className="card bg-base-300 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>

              <label className="form-control w-full my-2">
                <span className="label-text">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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

              {/* SKILLS */}
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

              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}

              <div className="mt-4">
              <button className="btn bg-purple-600 hover:bg-purple-700 text-white w-full" onClick={saveProfile}
  >
                Save Profile
              </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: PREVIEW CARD (NO ACTION BUTTONS) */}
        <div className="w-full max-w-sm">
          <UserCard
            user={{
              _id: user._id,
              firstName,
              lastName,
              photoUrl,
              about,
              age,
              gender,
              skills: skillsInput
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean),
            }}
            showActions={false}
          />
        </div>
      </div>

      {/* SUCCESS TOAST */}
      {showToast && (
        <div className="toast toast-top toast-center pt-20 z-50">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
