import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" text-black py-4  ">
      <div className="container mx-auto text-center">
        <p>&copy; {currentYear} Developed by: JPM. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
