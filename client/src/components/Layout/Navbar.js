import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { useTheme } from "../utils/ThemeContext";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById("home");
      const aboutSection = document.getElementById("about");
      const projectsSection = document.getElementById("projects");
      const skillsSection = document.getElementById("skills");
      const experienceSection = document.getElementById("experience");
      const contactSection = document.getElementById("contact");

      const scrollPosition = window.scrollY;
      const sections = [
        { section: "home", offset: homeSection.offsetTop },
        { section: "about", offset: aboutSection.offsetTop },
        { section: "projects", offset: projectsSection.offsetTop },
        { section: "skills", offset: skillsSection.offsetTop },
        { section: "experience", offset: experienceSection.offsetTop },
        { section: "contact", offset: contactSection.offsetTop },
      ];

      let active = "";
      sections.forEach(({ section, offset }) => {
        if (
          scrollPosition >= offset - 50 &&
          scrollPosition <
            offset + document.getElementById(section).offsetHeight - 50
        ) {
          active = section;
        }
      });
      setActiveSection(active);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed w-full flex justify-center items-center top-0 md:top-5 z-10">
      <nav
        className={`bg-${
          isDarkMode ? "gray-800" : "white"
        } md:w-[80%] rounded-none md:rounded-3xl lg:w-[50%]`}
      >
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <motion.ul
              className={`w-full md:w-[80%] lg:w-[100%] p-3 ${
                isDarkMode ? "text-black" : "text-slate-500"
              } flex flex-wrap h-[150px] md:h-[60px] md:flex-nowrap justify-evenly md:justify-between md:rounded-3xl items-center text-center `}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <li>
                <a
                  href="#home"
                  className={`text-${
                    activeSection === "home"
                      ? "yellow-300"
                      : isDarkMode
                      ? "white"
                      : "black"
                  } p-3 rounded-2xl ${
                    activeSection === "home" ? "bg-slate-100" : ""
                  } text-lg md:text-xl`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={`text-${
                    activeSection === "about"
                      ? "yellow-300"
                      : isDarkMode
                      ? "white"
                      : "black"
                  } p-3 rounded-2xl ${
                    activeSection === "about" ? "bg-slate-100" : ""
                  } text-lg md:text-xl`}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className={`text-${
                    activeSection === "experience"
                      ? "yellow-300"
                      : isDarkMode
                      ? "white"
                      : "black"
                  } p-3 rounded-2xl ${
                    activeSection === "experience" ? "bg-slate-100" : ""
                  } text-lg md:text-xl`}
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className={`text-${
                    activeSection === "skills"
                      ? "yellow-300"
                      : isDarkMode
                      ? "white"
                      : "black"
                  } p-3 rounded-2xl ${
                    activeSection === "skills" ? "bg-slate-100" : ""
                  } text-lg md:text-xl`}
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className={`text-${
                    activeSection === "projects"
                      ? "yellow-300"
                      : isDarkMode
                      ? "white"
                      : "black"
                  } p-3 rounded-2xl ${
                    activeSection === "projects" ? "bg-slate-100" : ""
                  } text-lg md:text-xl`}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`text-${
                    activeSection === "contact"
                      ? "yellow-300"
                      : isDarkMode
                      ? "white"
                      : "black"
                  } p-3 rounded-2xl ${
                    activeSection === "contact" ? "bg-slate-100" : ""
                  } text-lg md:text-xl`}
                >
                  Contact
                </a>
              </li>
              <li
                className="text-lg px-2 py-1 md:text-xl text-white rounded focus:outline-none"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <IoSunny /> : <IoMoon className="text-black" />}
              </li>
            </motion.ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;