import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../Components/layoutCard';

export default function LectureDetail() {
  const { state: lecture } = useLocation();

  if (!lecture) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <h1 className="text-3xl font-bold text-blue-600">
          No lecture data found.
        </h1>
      </div>
    );
  }

  return (
    <DashboardLayout
      title={lecture.title}
      description="Your lecture is organized and ready to view. Dive in!"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="container mx-auto px-4 py-10">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Video Lecture */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Video Lecture
              </h2>
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <iframe
                  src="https://www.youtube.com/watch?v=UUMYMDo_j34"
                  title="Lecture Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Lecture Description */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {lecture.description ||
                  'No description available for this lecture.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
