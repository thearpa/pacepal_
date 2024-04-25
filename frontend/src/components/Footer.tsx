import React from "react";

//Footer som vises på bunnen av siden

const Footer: React.FC = () => {
  return (
    <footer className="bg-custom-green p-11 mt-10">
      <div>
        <div className="flex justify-evenly items-center text-black text-s">
          <img src="running_logo.png" alt="running" className="w-10" />
          <span>© 2024 PacePal</span>

          <a
            href="mailto:contact@pacepal.com"
            className="text-black hover:underline"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
