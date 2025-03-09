import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#f8f8f8] text-gray-800 py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-center">
          © {currentYear} All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;