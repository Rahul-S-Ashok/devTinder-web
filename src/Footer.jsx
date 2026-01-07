import React from 'react'
import { FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-neutral-content px-6 py-4 
                        flex items-center justify-between 
                        fixed bottom-0 left-0 w-full z-50">
      
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <span className="text-lg">#</span>
        <p>Copyright © 2026 - All rights reserved</p>
      </div>

      {/* Right Section */}
      <div className="flex gap-5 text-xl">
        <FaTwitter className="text-white cursor-pointer hover:text-blue-400" />
        <FaYoutube className="text-white cursor-pointer hover:text-red-500" />
        <FaFacebook className="text-white cursor-pointer hover:text-blue-500" />
      </div>

    </footer>
  )
}

export default Footer
