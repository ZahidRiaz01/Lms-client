import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import DashboardLayout from '../Components/layoutCard';

const ChangeDevicePage: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <DashboardLayout
      title="Change Your Device"
      description="Secure your account and seamlessly switch to a new device. Let's get you set up in no time!"
    >
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 shadow-md">
        {/* Header Section */}
        <section className=" py-10 px-4 text-center text-white ">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">Why Change Your Device?</h2>
            <p className="mt-4 text-lg">
              Whether you've upgraded to a new phone, replaced your laptop, or
              want to ensure secure access, this process makes it easy to switch
              devices without compromising your account's security.
            </p>
            <p className="mt-2 text-lg">
              Follow the steps below to request a device change and regain
              access in just a few minutes.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="flex justify-center mt-10 px-4">
          <div className=" bg-gradient-to-br from-indigo-200 to-indigo-700 rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Request Device Change
            </h2>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-white font-semibold mb-2"
                >
                  Registered Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label
                  htmlFor="otp"
                  className="block text-white font-semibold mb-2"
                >
                  One-Time Password (OTP)
                </label>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter OTP"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition"
              >
                Submit Request
              </button>
            </form>

            {/* Note */}
            <p className="text-white text-sm mt-4">
              <span className="font-semibold">Note:</span> An OTP will be sent
              to your registered email address. Use it here to verify your
              identity and switch devices.
            </p>
          </div>
        </section>

        {/* Tips Section */}
        <section className=" py-10 px-4 mt-10">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-indigo-200 to-indigo-700 p-10 shadow-lg rounded-lg p-8">
            <h2 className="text-xl font-bold text-white mb-4">
              Tips for Securing Your Account
            </h2>
            <ul className="list-disc list-inside space-y-3 text-white">
              <li>Always use a strong and unique password for your account.</li>
              <li>
                Enable two-factor authentication for an extra layer of security.
              </li>
              <li>Keep your registered email address up to date.</li>
              <li>Never share your OTP or account details with anyone.</li>
            </ul>
            <p className="text-white mt-6">
              Your security is our top priority. If you face any issues during
              the process, please contact our support team for assistance.
            </p>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ChangeDevicePage;
