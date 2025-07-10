import React from "react";
import phone from "../assets/phone.png"; 
const DownloadApp: React.FC = () => {
  return (
    <section className=" pt-12 px-6 bg-white md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Left Content */}
      <div className="flex-1 max-w-lg">
        <button className="bg-blue-100 text-blue-600 text-xs px-4 py-1 rounded-full mb-3">
          DOWNLOAD
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Download Rentcars App for <span className="text-blue-600">FREE</span>
        </h2>
        <p className="text-sm text-gray-500 mt-3">
          For faster, easier booking and exclusive deals.
        </p>
        <div className="flex gap-4 mt-6">
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-12"
            />
          </a>
          <a href="#">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-12"
            />
          </a>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 relative ">
        <img
          src={phone} 
          alt="Rentcars App Preview"
          className="w-full  max-w-xs md:max-w-md mx-auto"
        />
      </div>
    </section>
  );
};

export default DownloadApp;
