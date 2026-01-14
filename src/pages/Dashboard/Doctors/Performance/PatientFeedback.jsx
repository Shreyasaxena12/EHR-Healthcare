import React from "react";
import data from "../../../../shared/DataStore/Doctors/DocProfile.json";

export default function PatientFeedback() {
  const doctor = data[0]; // assuming one doctor for now
  const feedbacks = doctor.feedbacks || [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Feedback</h2>

      {feedbacks.length === 0 ? (
        <div className="text-gray-500">No feedback available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.feedbackId}
              className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-indigo-700">
                  {feedback.patientName}
                </h3>
                <span className="text-sm text-gray-500">{feedback.date}</span>
              </div>
              <div className="mb-2">
                <RatingStars rating={feedback.rating} />
              </div>
              <p className="text-gray-700 text-sm">{feedback.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Subcomponent to show rating as stars
function RatingStars({ rating }) {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <svg
      key={i}
      className={`w-4 h-4 inline-block ${
        i < rating ? "text-yellow-400" : "text-gray-300"
      }`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 15l-5.878 3.09 1.122-6.545L.487 6.91l6.564-.955L10 0l2.949 5.955 6.564.955-4.757 4.635 1.122 6.545z" />
    </svg>
  ));
  return <div>{stars}</div>;
}
