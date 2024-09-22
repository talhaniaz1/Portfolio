import React, { useEffect, useState } from "react";
import "./portfolio.css";
import logo from "../../assets/logo.png";
import TalhaPic from "../../assets/tlha.jpg";
import { Bounce, Flip, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Cv from "../../assets/Talha_Resume(Reactjs Developer).pdf"

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let activeSec = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 0 && rect.bottom > 0) {
          activeSec = section.id;
        }
      });

      setActiveSection(activeSec);
      // Check if the navbar should become sticky
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };
  const [expandedStates, setExpandedStates] = useState([false, false, false]);

  // Function to toggle a specific item's expanded state
  const toggleDescription = (index) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };
  const handleClick = () => {
    toast.success("🦄 Wow so easy!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
  };
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    subjectFor: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    mobileNo: false,
    subjectFor: false,
    message: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "mobileNo") {
      // Remove non-numeric characters
      processedValue = value.replace(/\D/g, "");
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false, // Reset error for the field when it's being edited
    }));
  };
  const [isLoading, setIsLoading] = useState(false); // New state for loading status
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFields = Object.keys(formData).filter((key) => !formData[key]);
    if (emptyFields.length > 0) {
      const updatedErrors = { ...errors };
      emptyFields.forEach((field) => {
        updatedErrors[field] = true;
      });
      setErrors(updatedErrors);
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(formData); // Log form data to the console
    setFormData({
      fullName: "",
      email: "",
      mobileNo: "",
      subjectFor: "",
      message: "",
    });
    setErrors({
      fullName: false,
      email: false,
      mobileNo: false,
      subjectFor: false,
      message: false,
    });
    setIsLoading(false);

    toast.success("Message submitted successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      className: "toast-custom", // Custom CSS class for styling
    });
  };
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://jsonplaceholder.typicode.com/photos?_limit=15"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       console.log("my data from api", data);
  //       setUsers(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // const getFirstFiveWords = (title) => {
  //   return title.split(' ').slice(0, 4).join(' ');
  // };
  return (
    <>
      <main className="portfolioMain">
        <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
          <div className="navbar-container">
            <div className="navbar-logo">
              <a href="#">
                <img src={logo} alt="logo" />
              </a>
            </div>
            <div className={`navbar-links ${showMenu ? "active" : ""}`}>
              <ul className="navbarlinks">
                <li className="navlink">
                  <a
                    href="#home"
                    className={activeSection === "home" ? "active" : ""}
                    onClick={closeMenu}
                  >
                    Home
                  </a>
                </li>
                <li className="navlink">
                  <a
                    href="#About"
                    className={activeSection === "about" ? "active" : ""}
                    onClick={closeMenu}
                  >
                    About
                  </a>
                </li>
                <li className="navlink">
                  <a
                    href="#workExperience"
                    className={
                      activeSection === "workexperience" ? "active" : ""
                    }
                    onClick={closeMenu}
                  >
                    Work Experience
                  </a>
                </li>
                <li className="navlink">
                  <a
                    href="#Skills"
                    className={activeSection === "skills" ? "active" : ""}
                    onClick={closeMenu}
                  >
                    Skills
                  </a>
                </li>

                <li className="navlink">
                  <a
                    href="#Education"
                    className={activeSection === "education" ? "active" : ""}
                    onClick={closeMenu}
                  >
                    Education
                  </a>
                </li>

                <li className="navlink">
                  <a
                    href="#Contact"
                    className={activeSection === "contact" ? "active" : ""}
                    onClick={closeMenu}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
              <i className={showMenu ? "ri-close-fill" : "ri-menu-3-line"}></i>
            </div>
          </div>
        </nav>
        <div className="content">
          <section id="home" className="home">
            <div className="text-content">
              <h2>Muhammad Talha Niaz</h2>
              <h5>WEBSITE DEVELOPER</h5>
              <p>
              I am passionate about crafting intuitive and visually captivating websites that merge creativity with functionality. With a strong attention to detail and a focus on delivering seamless user experiences, I thrive on bringing unique ideas to life through clean, efficient code. Let's work together to transform your vision into a cutting-edge digital solution.
              </p>
              <div className="social-media">
                <a href="https://www.facebook.com/talha.niaz.399" target="_blank">
                  {" "}
                  <i className="ri-facebook-fill"></i>
                </a>
                <a href="https://www.instagram.com/talha.niaz1/?next=%2F" target="_blank">
                  <i className="ri-instagram-line"></i>
                </a>
                <a href="#" target="_blank">
                  <i className="ri-youtube-fill"></i>
                </a>
                <a href="#" target="_blank">
                  <i className="ri-twitter-x-fill"></i>
                </a>
                <a href="https://www.linkedin.com/in/muhammad-talha-niaz-07a13121b/" target="_blank">
                  <i className="ri-linkedin-box-fill"></i>
                </a>
              </div>
              <a href={Cv} download="Talha_Resume(Reactjs Developer).pdf">
                <button className="btncv">Download CV</button>
              </a>
            </div>
            <div className="image-cover">
              <div className="image" />
              <div className="background" />
            </div>
          </section>
          <section id="About" className="About">
            <div className="about-image-cover">
              <div className="image-content">
                <h2>Muhammad Talha Niaz</h2>
                <h5>Website Developer</h5>
                <img src={TalhaPic} alt="Talhapic" />
              </div>
            </div>
            <div className="about-text-content">
              <h3 className="title">
                <i className="ri-user-line"></i>
                ABOUT ME
              </h3>
              <p>
              Hello! I'm Muhammad Talha Niaz, a dedicated web developer with a passion for transforming creative concepts into functional, dynamic websites. With several years of experience, I specialize in building modern, responsive, and visually engaging digital experiences. My journey in web development started with a fascination for the limitless possibilities of the web, and I've continuously refined my expertise across various programming languages and frameworks. Staying ahead of industry trends is a priority, ensuring that I deliver innovative solutions that not only meet but exceed client expectations. When I'm not coding, I enjoy exploring new technologies, working on creative side projects, or finding inspiration outdoors. Let's connect and bring your digital vision to life!
              </p>
              <div className="social-media">
                <a href="https://www.facebook.com/talha.niaz.399" target="_blank">
                  {" "}
                  <i className="ri-facebook-fill"></i>
                </a>
                <a href="https://www.instagram.com/talha.niaz1/?next=%2F" target="_blank">
                  <i className="ri-instagram-line"></i>
                </a>
                <a href="#" target="_blank">
                  <i className="ri-youtube-fill"></i>
                </a>
                <a href="#" target="_blank">
                  <i className="ri-twitter-x-fill"></i>
                </a>
                <a href="https://www.linkedin.com/in/muhammad-talha-niaz-07a13121b/" target="_blank">
                  <i className="ri-linkedin-box-fill"></i>
                </a>
              </div>
            </div>
          </section>
          <section id="workExperience" className="workExperience">
            <h3 className="title">
              <i className="ri-building-line"></i>
              Work Experience
            </h3>
            <div className="workcontainer">
              <div className="office">
                <h5>
                   Worked As a JavaScript/Full Stack Devloper at AnyTechSol Private Limited from
                  Nov-2022 - June2024
                </h5>
                <Link to="https://anytechsol.com/" target="blank">
                  <img src="ATS_logo.png" alt="" />
                </Link>
                </div>
                <div className="office">
                <h5>
                   Worked As a Associate Software Engineer at Keystone Consulting Private Limited from
                  Mar-2022 - Aug2024
                </h5>
                <Link to="https://www.key-stone.co/" target="blank">
                  <img src="Keystone-Logo.png" alt="" />
                </Link>
              </div>
            </div>
            <div className="projects">
              <h3 className="title">
                <i className="ri-file-code-line"></i>Completed Projects
              </h3>
              <div className="projectcontent">
                <h5>
                React Admin Dashboard Project: Developed React Dashboard Project using Node.js and React.Built with HTML5, CSS3 and React and made responsive design for different screen sizes.Database tables in MySQL with backend connected to MySQL and integrated with React frontend with Node.js for Functionality.
                </h5>
              </div>
              <div className="projectcontent">
                <h5>
                  React Ecommerce Project: Developed React frontend for Ecommerce website designed with HTML5, CSS3 and React.js for Frontend development.Responsive design for different screen sizes; utilizes mongo dB for database management.
                </h5>
                <p></p>
              </div>
            </div>
          </section>
          <section id="Skills" className="Skills">
            <h3 className="title">
              <i className="ri-code-s-slash-line"></i>SKILLS
            </h3>
            <div className="skill-container">
              <div className="skill-content">
                <i className="ri-html5-fill">+</i>
                <i className="ri-css3-fill"></i>
                <h5>HTML+CSS</h5>
                <p className={`short-description ${expandedStates[0] ? 'hidden' : ''}`}>
                  HTML and CSS are the foundational building blocks of web
                  development, and I specialize in crafting elegant and
                  responsive user interfaces using these technologies. With
                  HTML, I structure the content of websites, ensuring...
                </p>
                <p
                  className={`full-description ${
                    expandedStates[0] ? "expanded" : ""
                  }`}
                >
                  HTML and CSS are the foundational building blocks of web
                  development, and I specialize in crafting elegant and
                  responsive user interfaces using these technologies. With
                  HTML, I structure the content of websites, ensuring proper
                  hierarchy and semantics for optimal accessibility and SEO.
                  CSS, on the other hand, allows me to add style and flair to
                  web pages, creating visually appealing layouts and designs.
                  Whether it's designing layouts from scratch or fine-tuning
                  existing styles, I leverage the power of HTML and CSS to bring
                  visions to life on the web. Let's collaborate to create
                  stunning and functional websites that captivate audiences and
                  leave a lasting impression.
                </p>
                <button className="btncv" onClick={() => toggleDescription(0)}>
                  {expandedStates[0] ? "Read less" : "Read more"}
                </button>
              </div>
              <div className="skill-content">
                <i className="ri-javascript-fill"></i>
                <h5>JAVASCRIPT</h5>
                <p className={`short-description ${expandedStates[1] ? 'hidden' : ''}`}>
                  JavaScript is the dynamic and interactive powerhouse behind
                  modern web development, and it's where my passion truly
                  ignites. With JavaScript, I breathe life into static web
                  pages, adding functionality...
                </p>
                <p
                  className={`full-description ${
                    expandedStates[1] ? "expanded" : ""
                  }`}
                >
                  JavaScript is the dynamic and interactive powerhouse behind
                  modern web development, and it's where my passion truly
                  ignites. With JavaScript, I breathe life into static web
                  pages, adding functionality, interactivity, and responsiveness
                  that engages users and enhances their experience. From
                  creating interactive forms and validating user input to
                  implementing smooth animations and dynamic content updates,
                  JavaScript empowers me to push the boundaries of web
                  development. Leveraging the latest features and best
                  practices, I harness the full potential of JavaScript to build
                  robust and innovative solutions tailored to your needs. Let's
                  collaborate and harness the power of JavaScript to elevate
                  your web presence to new heights.
                </p>
                <button className="btncv" onClick={() => toggleDescription(1)}>
                  {expandedStates[1] ? "Read less" : "Read more"}
                </button>
              </div>
              <div className="skill-content">
                <i className="ri-reactjs-fill"></i>
                <h5>REACT.JS</h5>
                <p className={`short-description ${expandedStates[2] ? 'hidden' : ''}`}>
                  React.js is my go-to framework for building dynamic and
                  interactive user interfaces with ease, seamlessly integrating
                  with various APIs to fetch and display data in real-time. With
                  React.js, I embrace the power of component...
                </p>
                <p
                  className={`full-description ${
                    expandedStates[2] ? "expanded" : ""
                  }`}
                >
                  React.js is my go-to framework for building dynamic and
                  interactive user interfaces with ease, seamlessly integrating
                  with various APIs to fetch and display data in real-time. With
                  React.js, I embrace the power of component-based architecture
                  to create modular and reusable UI elements that seamlessly
                  come together to form immersive web experiences. Whether it's
                  crafting single-page applications, implementing complex UI
                  features, or integrating with backend services through RESTful
                  or GraphQL APIs, React.js empowers me to build scalable and
                  efficient solutions that meet the demands of modern web
                  development. Leveraging the virtual DOM and state management
                  capabilities of React.js, I ensure optimal performance and
                  maintainability across projects, allowing for rapid iteration
                  and seamless updates. Let's collaborate and harness the full
                  potential of React.js to bring your ideas to life, integrate
                  with external services, and delight users with engaging and
                  intuitive web applications.
                </p>
                <button className="btncv" onClick={() => toggleDescription(2)}>
                  {expandedStates[2] ? "Read less" : "Read more"}
                </button>
              </div>
              <div className="skill-content">
                <i className="ri-git-merge-line">+</i>
                <i className="ri-github-fill"></i>
                <h5>GIT + GITHUB</h5>
                <p className={`short-description ${expandedStates[3] ? 'hidden' : ''}`}>
                I have a strong proficiency in using Git commands and a deep
                understanding of Git Flow and GitHub. Git Commands: I am skilled
                in utilizing various Git commands for efficient version control,
                including commit, branch ...
                </p>
                <p
                  className={`full-description ${
                    expandedStates[3] ? "expanded" : ""
                  }`}
                >
                     I have a strong proficiency in using Git commands and a deep
                understanding of Git Flow and GitHub. Git Commands: I am skilled
                in utilizing various Git commands for efficient version control,
                including commit, branch, merge, rebase, and reset. My expertise
                allows me to manage and navigate repositories with ease,
                ensuring seamless development workflows. Git Flow: I understand
                and implement the Git Flow branching strategy to enhance project
                organization. This includes using feature branches for
                development, release branches for final preparations, and hotfix
                branches for critical bug fixes, ensuring a structured and
                reliable workflow. GitHub: I leverage GitHub for hosting
                repositories, collaborating with team members, and managing
                project tasks. My experience includes creating and managing pull
                requests, conducting code reviews, and using GitHub Issues and
                Projects for effective project management. Additionally, I
                integrate with CI/CD pipelines to automate testing and
                deployment processes. By combining these skills, I ensure robust
                version control, efficient project management, and effective
                team collaboration.
                </p>
                <button className="btncv" onClick={() => toggleDescription(3)}>
                  {expandedStates[3] ? "Read less" : "Read more"}
                </button>
              </div>
              <div className="skill-content">
                <i className="ri-bootstrap-fill">+</i>
                <i className="ri-tailwind-css-fill"></i>
                <h5>BOOTSRAP + TAILWIND</h5>
                <p className={`short-description ${expandedStates[4] ? 'hidden' : ''}`}>
                I am proficient in using Bootstrap and Tailwind CSS to create
                responsive and visually appealing web interfaces. Bootstrap:
                Utilizing Bootstrap to rapidly develop responsive websites with
                a consistent design. Proficient...
                </p>
                <p
                  className={`full-description ${
                    expandedStates[4] ? "expanded" : ""
                  }`}
                >
                 I am proficient in using Bootstrap and Tailwind CSS to create
                responsive and visually appealing web interfaces. Bootstrap:
                Utilizing Bootstrap to rapidly develop responsive websites with
                a consistent design. Proficient in using its grid system,
                pre-designed components, and utility classes to create modern
                and mobile-first web applications. Experience includes
                customizing Bootstrap to match specific design requirements and
                integrating it seamlessly into various projects. Tailwind CSS:
                Expertise in using Tailwind CSS for utility-first styling,
                allowing for highly customizable and responsive designs.
                Proficient in applying utility classes directly in HTML to style
                components, enabling fast development and ensuring design
                consistency. Capable of extending Tailwind with custom
                configurations and integrating it with various front-end
                frameworks. By combining these skills, I ensure robust version
                control, efficient project management, and the creation of
                responsive, visually appealing web applications.
                </p>
                <button className="btncv" onClick={() => toggleDescription(4)}>
                  {expandedStates[4] ? "Read less" : "Read more"}
                </button>
              </div>
              <div className="skill-content">
                <i className="ri-nodejs-fill">+</i>
                <i className="ri-database-2-fill"></i>
                <h5>NODE.JS + MONOGO DB</h5>
                <p className={`short-description ${expandedStates[5] ? 'hidden' : ''}`}>
                I have extensive experience in developing server-side
                applications with Node.js and managing databases with MongoDB.
                Node.js: Proficient in building scalable and efficient
                server-side applications using Node.js....
                </p>
                <p
                  className={`full-description ${
                    expandedStates[5] ? "expanded" : ""
                  }`}
                >
                     I have extensive experience in developing server-side
                applications with Node.js and managing databases with MongoDB.
                Node.js: Proficient in building scalable and efficient
                server-side applications using Node.js. Experience includes
                working with asynchronous programming, creating RESTful APIs,
                and leveraging frameworks like Express.js to streamline
                development. Capable of integrating Node.js applications with
                various services and APIs to build robust backend systems.
                MongoDB: Skilled in using MongoDB for data storage and
                management in web applications. Experience includes designing
                and implementing database schemas, performing CRUD operations,
                and using MongoDB's aggregation framework to process data.
                Proficient in integrating MongoDB with Node.js applications
                using libraries like Mongoose for efficient database
                interactions. By combining these skills, I ensure robust version
                control, efficient project management, responsive and visually
                appealing web applications, and scalable, efficient server-side
                solutions with effective database management.
                </p>
                <button className="btncv" onClick={() => toggleDescription(5)}>
                  {expandedStates[5] ? "Read less" : "Read more"}
                </button>
              </div>
            </div>
          </section>
          <section id="Education" className="Education">
            <h3 className="title">
              <i className="ri-graduation-cap-fill"></i>
              EDUCATION{" "}
            </h3>
            <div className="row">
              <div className="column">
                <div className="education-content">
                  <div className="year">2017-2022</div>
                  <h2>University of Engineering And Technology Taxila (UET)</h2>
                  <p>BSc Computer Engineering</p>
                  <p>HEC Board</p>
                  <p>2.92/4.00 CGPA</p>
                </div>
                <div className="education-content">
                  <div className="year">2015-2017</div>
                  <h2>Govt Post Graduate College Muzaffargarh</h2>
                  <p>FSc</p>
                  <p>DG Khan Board</p>
                  <p>924/1100 Marks</p>
                </div>
              </div>
              <div className="column">
                <div className="education-content">
                  <div className="year">2013-2015</div>
                  <h2>Sardar kaurey Khan School Muzaffargarh</h2>
                  <p>Matric</p>
                  <p>DG Khan Board</p>
                  <p>956/1050 Marks</p>
                </div>
                <div className="education-content">
                  <div className="year">2002-2012</div>
                  <h2>Sardar kaurey Khan School Muzaffargarh</h2>
                  <p>From PG - 8th Class</p>
                  <p>DG Khan Board</p>
                  <p>Overall Pass</p>
                </div>
              </div>
            </div>
          </section>
          <section id="Contact" className="contact">
            <h3 className="title">
              <i className="ri-contacts-book-3-line"></i>
              CONTACT ME
            </h3>
            {isLoading ? (
              <div className="imageLoadwrap">
                <img src="walking.gif" alt="" className="loadingImage" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contactForm">
                <div className="inputBox">
                  <input
                    type="text"
                    placeholder={
                      errors.fullName ? "Full Name(required)" : "Full Name"
                    }
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <input
                    className={errors.email ? "inputFieldError" : ""}
                    type="email"
                    placeholder={errors.email ? "Email(required)" : "Email"}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="inputBox">
                  <input
                    type="tel"
                    placeholder={
                      errors.mobileNo ? "mobileNo(required)" : "mobileNo"
                    }
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                  />
                  <input
                    className={errors.subjectFor ? "inputFieldError" : ""}
                    type="text"
                    placeholder={
                      errors.subjectFor ? "subjectFor(required)" : "subjectFor"
                    }
                    name="subjectFor"
                    value={formData.subjectFor}
                    onChange={handleChange}
                  />
                </div>
                <textarea
                  name="message"
                  cols={30}
                  rows={10}
                  placeholder={
                    errors.message ? "Your Message(required)" : "Your Message"
                  }
                  value={formData.message}
                  onChange={handleChange}
                />
                <input type="submit" value="Send Message" className="btn" />
              </form>
            )}
            ;
          </section>
          <footer>
            <div className="footer-text">
              <p>Copyright @ 2024 by Muhammad Talha Niaz</p>
            </div>
            <a href="#">
              <i className="ri-corner-right-up-line"></i>
            </a>
          </footer>
        </div>
      </main>
    </>
  );
};

export default Portfolio;
