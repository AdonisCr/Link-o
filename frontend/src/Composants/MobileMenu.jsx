import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaUserAlt,
  FaHome,
  FaLink,
  FaGlobe,
  FaHeadset,
  FaCog,
} from "react-icons/fa";
import logo from "../assets/images/logo.png";

const mobileMenus = [
  { id: 1, path: "/dashboard", name: "Dashboard", icon: <FaHome /> },
  { id: 2, path: "/dashboard/links", name: "Links", icon: <FaLink /> },
  { id: 3, path: "/dashboard/domains", name: "Domains", icon: <FaGlobe /> },
  { id: 4, path: "/dashboard/support", name: "Support", icon: <FaHeadset /> },
  { id: 5, path: "/dashboard/settings", name: "Settings", icon: <FaCog /> },
];

const modalVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const MobileMenu = ({ isOpen, onClose, username, email }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex xl:hidden bg-black bg-opacity-50 z-50">
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="w-1/2 h-full bg-violet-600 py-4 px-2 flex flex-col items-start justify-between dark:bg-tokena-dark-blue-1"
      >
        {/* Logo */}
        <div className="w-full flex flex-col items-start text-start">
          <img src={logo} alt="Logo" className="w-32 h-auto object-cover" />

          {/* Navigation Links */}
          <ul className="space-y-1 mt-6">
            {mobileMenus.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className="px-2 py-2 flex items-center text-white space-x-2 "
              >
                <span className="text-xl">{link.icon}</span>

                <span className="text-base">{link.name}</span>
              </Link>
            ))}
          </ul>
        </div>

        {/* Profil Section */}
        <div className="mb-4 w-full flex text-white items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-2 text-lg cursor-pointer transition border-2 border-white rounded-full p-1.5 duration-300">
              <FaUserAlt />
            </div>

            <div className="flex flex-col text-left">
              <h3 className="text-xs font-semibold">{username}</h3>

              <span className="text-xs font-medium truncate">{email}</span>
            </div>
          </div>

          <FaChevronDown size={12} />
        </div>
      </motion.div>

      <div onClick={onClose} className="w-1/2 h-full"></div>
    </div>
  );
};

export default MobileMenu;
