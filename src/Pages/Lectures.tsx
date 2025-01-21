import { useEffect, useRef, useState } from 'react';
import { Drawer, Input, Button, Form, message } from 'antd';
import api from './api';
import {
  DeleteOutlined,
  FilePdfOutlined,
  UploadOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import { useParams } from 'react-router-dom';
import { Modal } from 'antd';
import DashboardLayout from '../Components/layoutCard';

const LecturesPage = () => {
  const videoRef = useRef<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showFileViewer, setShowFileViewer] = useState(false);
  const [fileToView, setFileToView] = useState<string | null>(null);
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [lectures, setLetures] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const { id } = useParams();

  const fetchLectureData = async () => {
    try {
      const response: any = await api.get(`/lectures/${id}`);
      const respData = response.data;
      setLetures(
        respData.map((lecture: any) => ({
          id: lecture.id,
          name: lecture.name,
          description: lecture.description,
          files: lecture.files,
        }))
      );
    } catch (e: any) {
      console.log('Error getting all courses', e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = async (values: {
    name: string;
    description: string;
  }) => {
    try {
      if (selectedCourse) {
        const updatedCourseResponse = await api.patch(
          `courses/${selectedCourse.id}`,
          values
        );
        const updatedCourse = updatedCourseResponse.data;

        setLetures(
          lectures.map((course: any) =>
            course.id === updatedCourse.id
              ? { ...course, ...updatedCourse }
              : course
          )
        );
        message.success('Course Updated Successfully');
      } else {
        const newCourseResponse = await api.post('courses', values);
        const newCourse = newCourseResponse.data;

        setLetures([
          ...lectures,
          {
            id: newCourse.id,
            name: newCourse.name,
            description: newCourse.description,
          },
        ]);
        message.success('Course Created Successfully');
      }

      setIsDrawerOpen(false);
      setSelectedCourse(null);
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
          'Error processing the request. Please try again.'
      );
      console.log('Error:', error);
    }
  };
  const handleCloseModal = () => {
    setShowFileViewer(false);
    setFileToView(null);
  };
  const handleDrawerClose = () => {
    setCreateDrawerOpen(false);
  };

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (videoRef?.current) {
      videoRef?.current?.pause();
      videoRef.current.currentTime = 0; // Reset the video to the beginning
    }
    setIsModalOpen(false);
    setSelectedVideo(null);
  };
  const handleUploadSuccess = () => {
    handleDrawerClose();
    fetchLectureData();
  };

  useEffect(() => {
    fetchLectureData();
  }, []);

  return (
    <DashboardLayout
      title="Subscribed Lectures"
      description="Your lectures are organized and ready to view. Dive in!"
    >
      <div className="p-8 bg-gray-50 min-h-screen">
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div>
            {lectures.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 ">
                {lectures.map((lecture: any) => (
                  <div
                    key={lecture.id}
                    className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition"
                  >
                    <div className="flex flex-col items-center justify-center text-center">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {lecture.name}
                      </h2>
                      <p className="text-gray-600 mt-2">
                        {lecture.description}
                      </p>
                    </div>

                    {lecture.files && lecture.files.length > 0 ? (
                      <div className="mt-6 grid grid-cols-3 gap-4">
                        {lecture.files.map((file: any) => {
                          const fileExtension = file.url
                            .split('.')
                            .pop()
                            .toLowerCase();
                          let thumbnail;

                          if (fileExtension === 'mp4' || 'mov') {
                            thumbnail = (
                              <video
                                src={file.url}
                                className="w-full h-30 object-cover rounded-lg"
                                controls={false}
                              />
                            );
                          } else if (
                            ['jpg', 'jpeg', 'png', 'gif'].includes(
                              fileExtension
                            )
                          ) {
                            thumbnail = (
                              <img
                                src={file.url}
                                alt={file.originalName}
                                className="w-full h-30 object-cover rounded-lg"
                              />
                            );
                          } else if (fileExtension === 'pdf') {
                            thumbnail = (
                              <div className="w-full h-30 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg">
                                <FilePdfOutlined className="text-4xl" />
                                <p className="ml-2">PDF</p>
                              </div>
                            );
                          } else {
                            thumbnail = (
                              <div className="w-full h-30 flex items-center justify-center bg-red-100 text-red-600 rounded-lg">
                                <ExclamationCircleOutlined className="text-4xl" />
                                <p className="ml-2">Unsupported</p>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={file.id}
                              className="cursor-pointer   w-48 "
                              onClick={() => {
                                if (fileExtension === 'mp4') {
                                  handleVideoClick(file.url);
                                } else {
                                  console.log('file.url', file.url);
                                  setShowFileViewer(true);
                                  setFileToView(file.url);
                                }
                              }}
                            >
                              {thumbnail}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="mt-4 text-gray-500">
                        No files available for this lecture.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 text-lg">
                No lectures available. Please add a lecture to get started.
              </div>
            )}
          </div>
        )}

        {/* <Drawer
          title="Create New Course"
          placement="right"
          onClose={() => setIsDrawerOpen(false)}
          open={isDrawerOpen}
          width={400}
        >
          <Form
            layout="vertical"
            onFinish={handleEditCourse}
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
        </Drawer> */}

        <Modal
          title="Lecture Video"
          visible={isModalOpen}
          footer={null}
          onCancel={closeModal}
          centered
          width={800}
        >
          {selectedVideo && (
            <video
              controls
              autoPlay
              className="w-full rounded-lg"
              ref={videoRef}
            >
              <source src={selectedVideo} />
              Your browser does not support the video tag.
            </video>
          )}
        </Modal>
        {showFileViewer && (
          <Modal
            visible={showFileViewer}
            onCancel={handleCloseModal}
            footer={null}
            width="80%"
            className="!p-0"
            closeIcon={
              <Button
                type="text"
                onClick={handleCloseModal}
                className="absolute top-2 right-2"
              >
                <span className="text-xl">×</span>
              </Button>
            }
          >
            <div className="relative">
              {fileToView?.endsWith('.pdf') ? (
                <iframe
                  src={fileToView}
                  width="100%"
                  height="800px"
                  title="PDF Viewer"
                />
              ) : (
                <img
                  src={fileToView || ''}
                  alt="File content"
                  className="w-full h-auto rounded-lg"
                />
              )}
            </div>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LecturesPage;
