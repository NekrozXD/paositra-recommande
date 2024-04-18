import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaBuilding, FaUserFriends } from "react-icons/fa";
import { MdOutlineAttachMoney, MdOutlineBarChart, MdOutlineClose, MdOutlineCurrencyExchange, MdOutlineGridView, MdOutlineLogout, MdOutlineMessage, MdOutlinePeople, MdOutlineSettings, MdOutlineShoppingBag, MdArchive, MdOutlineDomain } from "react-icons/md";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";


const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const [activeLink, setActiveLink] = useState("");

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <div className="poste"></div>
          <span className="sidebar-brand-text"> Paositra Malagasy</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className={`menu-link ${activeLink === "/" ? "active" : ""}`} onClick={() => handleMenuClick("/")}>
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/depot" className={`menu-link ${activeLink === "/depot" ? "active" : ""}`} onClick={() => handleMenuClick("/depot")}>
                <span className="menu-link-icon">
                  <MdArchive size={20} />
                </span>
                <span className="menu-link-text">Dépôt</span>
              </Link>
            </li>
              <li className="menu-item">
                <Link to="/agence" className={`menu-link ${activeLink === "/agence" ? "active" : ""}`} onClick={() => handleMenuClick("/agence")}>
                  <span className="menu-link-icon">
                    <FaBuilding size={20} />
                  </span>
                  <span className="menu-link-text">Agence</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/groupement" className={`menu-link ${activeLink === "/Groupement" ? "active" : ""}`} onClick={() => handleMenuClick("/Groupement")}>
                  <span className="menu-link-icon">
                    <MdOutlineDomain size={18} />
                  </span>
                  <span className="menu-link-text">Groupement</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/F12" className={`menu-link ${activeLink === "/Registre" ? "active" : ""}`} onClick={() => handleMenuClick("/Registre")}>
                  <span className="menu-link-icon">
                    <MdOutlineShoppingBag size={20} />
                  </span>
                  <span className="menu-link-text">Registre</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/user" className={`menu-link ${activeLink === "/Utilisateur" ? "active" : ""}`} onClick={() => handleMenuClick("/Utilisateur")}>
                  <span className="menu-link-icon">
                    <MdOutlinePeople size={20} />
                  </span>
                  <span className="menu-link-text">Utilisateur</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/Beneficiaire" className={`menu-link ${activeLink === "/Beneficiaire" ? "active" : ""}`} onClick={() => handleMenuClick("/Beneficiaire")}>
                  <span className="menu-link-icon">
                    <FaUserFriends size={18} />
                  </span>
                  <span className="menu-link-text">Bénéficiaires</span> 
                </Link>
              </li>
            </ul>
          </div>

          <div className="sidebar-menu sidebar-menu2">
            <ul className="menu-list">
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineSettings size={20} />
                  </span>
                  <span className="menu-link-text">Settings</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineLogout size={20} />
                  </span>
                  <span className="menu-link-text">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };

  export default Sidebar;
