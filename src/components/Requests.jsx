import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log("REVIEW ERROR 👉", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/requests/received`,
        { withCredentials: true }
      );

      const requestList =
        res.data?.data ||
        res.data?.connectionRequests ||
        [];

      dispatch(addRequests(requestList));
    } catch (error) {
      console.log("REQUEST FETCH ERROR 👉", error);
      dispatch(addRequests([]));
    }
  };

  useEffect(() => {
    if (requests === null) {
      fetchRequests();
    }
  }, [requests]);

  // 🔄 Loading
  if (requests === null) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // 🚫 Empty
  if (!Array.isArray(requests) || requests.length === 0) {
    return (
      <h1 className="flex justify-center text-2xl my-10 text-green-300">
        No Requests found
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-center my-6 px-3">
      <h1 className="font-bold text-2xl md:text-3xl text-pink-400 mb-4">
        Requests ({requests.length})
      </h1>

      <div className="w-full max-w-md space-y-4">
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId || {};

          return (
            <div
              key={request._id}
              className="flex flex-col sm:flex-row items-center sm:items-start
                         justify-between p-4 rounded-xl bg-base-300 shadow-md"
            >
              {/* Image */}
              <img
                src={photoUrl}
                alt="profile"
                className="w-16 h-16 rounded-full object-cover mb-3 sm:mb-0"
              />

              {/* Info */}
              <div className="flex-1 sm:mx-4 text-center sm:text-left">
                <h2 className="font-bold text-lg">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm">
                    {age} • {gender}
                  </p>
                )}
                <p className="text-sm text-gray-400">{about}</p>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col gap-2 mt-3 sm:mt-0">
                <button
                  className="px-4 py-1 rounded-md text-white text-sm bg-pink-500 hover:bg-pink-600 transition"
                  onClick={() =>
                    reviewRequest("accepted", request._id)
                  }
                >
                  Accept
                </button>
                <button
                  className="px-4 py-1 rounded-md text-white text-sm bg-violet-600 hover:bg-violet-700 transition"
                  onClick={() =>
                    reviewRequest("rejected", request._id)
                  }
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
