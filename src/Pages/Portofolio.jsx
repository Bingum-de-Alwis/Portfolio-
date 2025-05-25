import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "html-1.svg", language: "HTML" },
  { icon: "css-3.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "typescript.svg", language: "TypeScript" },
  { icon: "java-14.svg", language: "Java" },
  { icon: "c-1.svg", language: "C" },
  { icon: "c--4.svg", language: "C#" },
  { icon: "python-5.svg", language: "Python" },
  { icon: "reactjs.svg", language: "React.js" },
  { icon: "nodejs.svg", language: "Node.js" },
  { icon: "mongodb-icon-1.svg", language: "MongoDB" },
  { icon: "express-109.svg", language: "Express.js" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "flask.svg", language: "Flask" },
  { icon: "docker-4.svg", language: "Docker" },
  { icon: "git-icon.svg", language: "Git" },
  { icon: "php-6.svg", language: "PHP" },
  { icon: "mysql-3.svg", language: "MySQL" }
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectData = [
        {
          id: "1",
          title: "Mebius: E-Commerce System",
          topic: "E-Commerce & Retail",
          description: "A fully functional e-commerce platform with a responsive UI, product browsing, cart management, and secure user authentication. Backend APIs support efficient order and user data management.",
          briefDescription: "Mebius is a modern e-commerce platform that provides a seamless shopping experience. Built with the MERN stack, it offers features like real-time inventory management, secure payments, and an intuitive admin dashboard. The platform is designed to handle high traffic and provides a smooth user experience across all devices.",
          image: "/projects/mebius.png",
          link: "https://github.com/Bingum-de-Alwis/Mebius-ecommerce/tree/main",
          TechStack: ["React.js", "Node.js", "Express.js", "MongoDB"],
          Features: [
            "User authentication and authorization",
            "Product catalog with search and filtering",
            "Shopping cart and wishlist functionality",
            "Secure payment integration",
            "Order tracking and management",
            "Admin dashboard for inventory control",
            "Responsive design for all devices"
          ],
          Github: "https://github.com/Bingum-de-Alwis/Mebius-ecommerce",
          Role: "Full Stack Developer",
          Duration: "3 months",
          Challenges: [
            "Implementing secure payment gateway integration",
            "Optimizing database queries for better performance",
            "Managing real-time inventory updates"
          ]
        },
        {
          id: "2",
          title: "Sportswear: E-Commerce Clothing Platform",
          topic: "E-Commerce & Fashion",
          description: "Another MERN-powered e-commerce platform, enhanced with Docker for containerization. Includes a sleek UI, product management, and user authentication system.",
          briefDescription: "Sportswear is a specialized e-commerce platform for athletic apparel and accessories. The platform features advanced product filtering, size/color variants, and a review system. Containerized with Docker for easy deployment and scaling, it provides a robust solution for online sports retail.",
          image: "/projects/sportwear.png",
          link: "https://github.com/Bingum-de-Alwis/sportswear-ecommerce",
          TechStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Docker"],
          Features: [
            "Docker containerization for easy deployment",
            "Advanced product filtering and sorting",
            "Size and color variant management",
            "User reviews and ratings system",
            "Order history and tracking",
            "Email notifications for order updates",
            "Responsive mobile-first design"
          ],
          Github: "https://github.com/Bingum-de-Alwis/sportswear-ecommerce",
          Role: "Full Stack Developer",
          Duration: "4 months",
          Challenges: [
            "Setting up Docker containers for development and production",
            "Implementing complex product filtering logic",
            "Managing concurrent user sessions"
          ]
        },
        {
          id: "3",
          title: "Paddy Doctor",
          topic: "AI & Agriculture",
          description: "An AI-powered disease detection platform for rice plants. Uses a custom-trained ML model to identify diseases in real-time via image uploads. Includes multilingual support, AI chatbot powered by Gemini API, and secure user auth.",
          briefDescription: "Paddy Doctor is an innovative AI solution for rice farmers, combining computer vision and natural language processing. The platform can detect plant diseases from images and provide treatment recommendations. It includes a multilingual interface and an AI chatbot for instant support, making agricultural technology accessible to farmers worldwide.",
          image: "/projects/paddy doctor.png",
          link: "https://github.com/Bingum-de-Alwis/Paddy-Doctor-",
          TechStack: ["React.js", "TypeScript", "Flask", "TensorFlow", "MongoDB"],
          Features: [
            "AI-powered disease detection from images",
            "Multilingual support for farmers",
            "AI chatbot for plant care advice",
            "Real-time disease analysis",
            "Historical data tracking",
            "Mobile-responsive interface",
            "Secure user authentication"
          ],
          Github: "https://github.com/Bingum-de-Alwis/Paddy-Doctor-",
          Role: "Full Stack Developer & ML Engineer",
          Duration: "6 months",
          Challenges: [
            "Training and optimizing the ML model",
            "Implementing real-time image processing",
            "Building an effective multilingual system"
          ]
        },
        {
          id: "4",
          title: "Hostel Management Web App",
          topic: "Education & Management",
          description: "A full-stack web app for managing university hostel accommodations. Features include student login, admin dashboards, booking systems, and report generation.",
          briefDescription: "A comprehensive hostel management system designed for universities, streamlining the entire accommodation process. The platform handles room allocation, payment processing, and maintenance requests. It includes separate interfaces for students, administrators, and maintenance staff, with real-time updates and automated notifications.",
          image: "/projects/hostelfinder.png",
          link: "https://github.com/Bingum-de-Alwis/Hostel-finder",
          TechStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
          Features: [
            "Student registration and authentication",
            "Room booking and allocation system",
            "Admin dashboard for hostel management",
            "Payment tracking and management",
            "Complaint management system",
            "Report generation and analytics",
            "Email notifications for updates"
          ],
          Github: "https://github.com/Bingum-de-Alwis/Hostel-finder",
          Role: "Full Stack Developer",
          Duration: "3 months",
          Challenges: [
            "Implementing secure payment system",
            "Managing concurrent booking requests",
            "Creating an intuitive admin interface"
          ]
        },
      ];

      const certificateData = [
        {
          title: "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
          issuer: "Oracle",
          date: "2024",
          link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=B9ED7832D78FD061D19963126292C896A4304577E2DCF439BE5B8BBD0837B6D2",
          image: "/certificates/Oracle Cloud Infrastructure 2024 Generative AI Certified Professional.png"
        },
        {
          title: "Oracle Cloud Data Management 2023 Certified Foundations Associate",
          issuer: "Oracle",
          date: "2023",
          link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=953A30CB152D7C13590E5E864C5309FC5FE65814DAB2C58C82216BE20F3244A4",
          image: "/certificates/Oracle Cloud Data Management 2023 Certified Foundations Associate.png"
        },
        {
          title: "Oracle Cloud Infrastructure 2023 AI Certified Foundations Associate",
          issuer: "Oracle",
          date: "2023",
          link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=1A919F3D5CFDED0CC2BCDE9E61B0FDB89AA356C9F4693EE9F2BF5F804565E170",
          image: "/certificates/Oracle Cloud Infrastructure 2023 AI Certified Foundations Associate.png"
        }
      ];

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.image}
                      Title={project.title}
                      Description={project.description}
                      Link={project.link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.image} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}