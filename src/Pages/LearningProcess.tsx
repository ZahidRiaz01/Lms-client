import React from 'react';
import 'tailwindcss/tailwind.css';
import DashboardLayout from '../Components/layoutCard';
const lectures = [
  {
    id: 1,
    title: 'React Basics',
    type: 'Video',
    s3Link: 'https://s3-url/video.mp4',
    image: '/React.png',
    description:
      'Master the foundational concepts of React, the leading JavaScript library for building dynamic and responsive user interfaces. Explore components, state management, and hooks to create seamless web applications.',
  },
  {
    id: 2,
    title: 'CSS Fundamentals',
    type: 'PDF',
    s3Link: 'https://s3-url/document.pdf',
    image: '/Css.png',
    description:
      'Delve into the core principles of CSS to craft visually appealing and responsive designs. Learn about layouts, styling techniques, and best practices to bring creativity to life on any device.',
  },
  {
    id: 3,
    title: 'JavaScript 101',
    type: 'Image',
    s3Link: 'https://s3-url/image.jpg',
    image: '/Javascript.png',
    description:
      'Kickstart your journey with JavaScript, the language powering modern web applications. Understand variables, functions, and control structures to build interactive and functional web pages.',
  },
];

const LearningProgressPage: React.FC = () => {
  return (
    <DashboardLayout
      title="Your Learning Progress"
      description="Track your journey and see how far you've come!"
    >
      <div className="min-h-screen w-full ">
        <section className="flex justify-center mt-6 ">
          <div className="bg-gradient-to-br from-indigo-200 to-indigo-700 p-10  shadow-lg rounded-2xl p-6 w-full m-5">
            <div className="flex items-center space-x-6">
              <div
                className="radial-progress  font-bold text-xl text-white bg-gradient-to-br from-indigo-400 to-indigo-900 p-5 p-5 rounded-full"
                style={{ '--value': 70 } as React.CSSProperties}
              >
                70%
              </div>
              <div>
                <h2 className="text-2xl text-white font-bold">
                  Total Progress
                </h2>
                <p className="text-white">3 Courses Enrolled</p>
                <p className="text-white">15 of 30 Lessons Completed</p>
                <p className="text-white">5 Hours Total</p>
                <button className="mt-4 bg-blue-500  hover:bg-blue-800 text-white px-4 py-2 rounded-lg">
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className=" px-4 py-5 ">
          <h2 className="text-4xl  font-bold text-gray-800">
            Enrolled Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {lectures.map((lecture) => (
              <div
                key={lecture.id}
                className="bg-gradient-to-br from-indigo-200 to-indigo-700 p-10 shadow-lg rounded-lg hover:shadow-xl transition"
              >
                <img
                  src={lecture.image}
                  alt={lecture.title}
                  className="rounded-lg mb-4 h-32 w-full object-cover"
                />
                <h3 className="text-xl font-bold">{lecture.title}</h3>
                <div className="bg-gray-200 rounded-full h-2 mt-2 mb-4">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.random() * 100}%` }}
                  ></div>
                </div>
                <p className="text-white">
                  {lecture.description.slice(0, 50)}...
                </p>
                <button
                  className="mt-4 bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
                  onClick={() => window.open(lecture.s3Link, '_blank')}
                >
                  Resume Course
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default LearningProgressPage;
