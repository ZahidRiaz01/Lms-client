import React, { useEffect, useState } from 'react';
import { Drawer, Input, Button, Form, message } from 'antd';
import api from './api';
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Components/layoutCard';

const CoursesPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [courses, setCourses] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const navigate = useNavigate();

  const fetchCourseData = async () => {
    try {
      const response: any = await api.get('/courses');
      const respData = response.data;
      setCourses(
        respData.map((course: any) => ({
          id: course.id,
          name: course.name,
          description: course.description,
        }))
      );
    } catch (e: any) {
      console.log('Error getting all courses', e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleDeleteCourse = async (id: string) => {
  //   try {
  //     const confirmed = window.confirm(
  //       'Are you sure you want to delete this course?'
  //     );
  //     if (!confirmed) return;

  //     await api.delete(`/courses/${id}`); // Replace with your delete API
  //     setCourses(courses.filter((course: any) => course.id !== id)); // Update state after deletion
  //   } catch (error) {
  //     console.error('Error deleting course:', error);
  //   }
  // };
  const handleEditCourse = async (values: {
    name: string;
    description: string;
  }) => {
    try {
      if (selectedCourse) {
        // Update existing course
        const updatedCourseResponse = await api.patch(
          `courses/${selectedCourse.id}`,
          values
        );
        const updatedCourse = updatedCourseResponse.data;

        // Update state with the edited course
        setCourses(
          courses.map((course: any) =>
            course.id === updatedCourse.id
              ? { ...course, ...updatedCourse }
              : course
          )
        );
        message.success('Course Updated Successfully');
      } else {
        // Create new course
        const newCourseResponse = await api.post('courses', values);
        const newCourse = newCourseResponse.data;

        // Add the new course to the state
        setCourses([
          ...courses,
          {
            id: newCourse.id,
            name: newCourse.name,
            description: newCourse.description,
          },
        ]);
        message.success('Course Created Successfully');
      }

      setIsDrawerOpen(false); // Close the drawer
      setSelectedCourse(null); // Reset selected course
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
          'Error processing the request. Please try again.'
      );
      console.log('Error:', error);
    }
  };

  // const handleEditCourse = async (values: {
  //   name: string;
  //   description: string;
  // }) => {
  //   try {
  //     const newCourseResponse = await api.post('courses', values);
  //     const newCourse = newCourseResponse.data;
  //     setCourses([
  //       ...courses,
  //       {
  //         id: newCourse.id,
  //         name: newCourse.name,
  //         description: newCourse.description,
  //       },
  //     ]);

  //     setIsDrawerOpen(false);
  //     message.success('Course Created Successfully');
  //   } catch (error: any) {
  //     message.error(
  //       error?.response?.data?.message ||
  //         'Error creating a course . Please try again.'
  //     );
  //     console.log('Error while creating a course', error);
  //   }
  // };
  useEffect(() => {
    fetchCourseData();
  }, []);

  return (
    <DashboardLayout
      title="Subscribed Courses"
      description="Your courses are organized and ready to view. Dive in!"
    >
      <div className="p-8 bg-gray-50 min-h-screen">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any) => (
              <div
                key={course.id}
                className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl transition"
                onClick={() => navigate(`/lectures/${course.id}`)}
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {course.name}
                </h2>
                <p className="text-gray-600 mt-2">{course.description}</p>
              </div>
            ))}
          </div>
        )}

        <Drawer
          title="Create New Course"
          placement="right"
          onClose={() => setIsDrawerOpen(false)}
          open={isDrawerOpen}
          width={400}
        >
          <Form
            layout="vertical"
            onFinish={handleEditCourse} // Function to handle edit submission
            initialValues={{
              name: selectedCourse?.name || '',
              description: selectedCourse?.description || '',
            }}
          >
            <Form.Item
              label="Course Name"
              name="name"
              rules={[
                { required: true, message: 'Please enter the course name!' },
              ]}
            >
              <Input placeholder="Enter course name" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please enter the course description!',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Enter course description" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-500 hover:bg-blue-600 w-full"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </DashboardLayout>
  );
};

export default CoursesPage;
