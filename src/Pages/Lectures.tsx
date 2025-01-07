import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Components/layoutCard';

const lectures = [
  {
    id: 1,
    title: 'Introduction to Accounting',
    type: 'Video',
    s3Link: 'https://s3-url/video.mp4',
    image: 'accLec.png',
    description:
      'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain.',
  },
  {
    id: 2,
    title: 'Double Entry Bookkeeping',
    type: 'PDF',
    s3Link: 'https://s3-url/document.pdf',
    image: '/accLec.png',
    description:
      'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain.',
  },
  {
    id: 3,
    title: 'Accruals and Prepayments',
    type: 'Image',
    s3Link: 'https://s3-url/image.jpg',
    image: '/accLec.png',
    description:
      'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain.',
  },
  {
    id: 4,
    title: 'Accruals and Prepayments',
    type: 'Image',
    s3Link: 'https://s3-url/image.jpg',
    image: '/accLec.png',
    description:
      'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain.',
  },
  {
    id: 5,
    title: 'Accruals and Prepayments',
    type: 'Image',
    s3Link: 'https://s3-url/image.jpg',
    image: '/accLec.png',
    description:
      'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain.',
  },
  {
    id: 6,
    title: 'Accruals and Prepayments',
    type: 'Image',
    s3Link: 'https://s3-url/image.jpg',
    image: '/accLec.png',
    description:
      'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain.',
  },
];

export default function Lectures() {
  const navigate = useNavigate();

  const handleSelectLecture = (lecture: any) => {
    navigate(`/lecture/${lecture.id}`, { state: lecture });
  };

  return (
    <DashboardLayout
      title="Subscribed Lectures"
      description="Your lectures are organized and ready to view. Dive in!"
    >
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {lectures.map((lecture) => (
              <div
                key={lecture.id}
                className="bg-gradient-to-br from-indigo-200 to-indigo-700  shadow-lg rounded-lg rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => handleSelectLecture(lecture)}
              >
                <img
                  src={lecture.image}
                  alt={lecture.title}
                  className="rounded-t-lg h-44 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-white mb-2 text-center">
                    {lecture.title}
                  </h2>
                  <p className="text-sm text-white mb-2">
                    <span className="font-bold text-lg text-white">Type:</span>{' '}
                    {lecture.type || 'N/A'}
                  </p>
                  <p className="text-sm text-white">
                    <span className="font-bold text-lg text-white">
                      Description:
                    </span>{' '}
                    {lecture.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
