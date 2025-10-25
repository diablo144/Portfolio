import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Typing Effect Component
const TypingEffect = ({ texts, typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (!isDeleting && displayText === currentText) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(prev => {
        if (isDeleting) {
          return currentText.substring(0, prev.length - 1);
        } else {
          return currentText.substring(0, prev.length + 1);
        }
      });
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, textIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="inline-block">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-8 md:h-10 bg-purple-500 ml-1 align-middle"
      />
    </span>
  );
};

// Animated Section Component with scroll detection
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const projects = [
    {
      title: "Weather App",
      description: "A real-time weather application using a public API to fetch and display current weather data and forecasts for any city.",
      tags: ["HTML", "CSS", "JavaScript", "API"],
      image: "https://placehold.co/600x400/3b82f6/ffffff?text=Weather+App",
      github: "https://github.com/diablo144/weatherApp",
      demo: "https://diablo144.github.io/weatherApp/weather.html"
    },
    {
      title: "Netflix Clone",
      description: "A responsive clone of the Netflix landing page, built purely with HTML and CSS to practice layout and design.",
      tags: ["HTML", "CSS"],
      image: "https://placehold.co/600x400/e50914/ffffff?text=Netflix+Clone",
      github: "https://github.com/diablo144/netflix-clone",
      demo: "https://diablo144.github.io/Netflix-Clone/Netflix.html"
    },
   
    {
      title: "Realtime Geotagging To Report Issue",
      description: "An application that allows users to report issues with real-time location tagging.",
      tags: ["JavaScript", "API"],
      image: "https://placehold.co/600x400/8b5cf6/ffffff?text=Geotagging+Web",
      github: "https://github.com/diablo144/Issue-reporting",
      demo: "https://diablo144.github.io/Issue-reporting/MCET.html"
    },
    {
      title: "YouTube Clone",
      description: "A responsive clone of YouTube's interface with video grid layout and navigation.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "https://placehold.co/600x400/ff0000/ffffff?text=YouTube+Clone",
      github: "https://github.com/diablo144/youtube-clone",
      demo: "https://diablo144.github.io/Youtube-clone/Youtube.html"
    },
    {
      title: "Spotify Clone",
      description: "A music player interface clone featuring Spotify's design and layout.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "https://placehold.co/600x400/1db954/ffffff?text=Spotify+Clone",
      github: "https://github.com/diablo144/spotify-clone",
      demo: "https://diablo144.github.io/Spotify-clone/"
    },
    
    {
      title: "Stone Paper Scissor Game",
      description: "An interactive game with smooth animations and score tracking.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "https://placehold.co/600x400/ec4899/ffffff?text=Game",
      github: "https://github.com/diablo144/Rock-Paper-Scissor-Game",
      demo: "https://diablo144.github.io/Rock-Paper-Scissor-Game/GAME.html"
    },
  
  ];

  const skills = [
    { 
      category: "Languages", 
      items: ["Java", "JavaScript"], 
      icon: "💻",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      category: "Web Technologies", 
      items: ["HTML", "CSS", "JavaScript"], 
      icon: "🌐",
      color: "from-purple-500 to-pink-500"
    },
    { 
      category: "Frameworks & Libraries", 
      items: ["Tailwind CSS", "Express.js","Node.js","React"], 
      icon: "⚛️",
      color: "from-cyan-500 to-blue-500"
    },
    { 
      category: "Tools", 
      items: ["Burpsuite", "Wireshark", "Postman","Figma"], 
      icon: "🛠️",
      color: "from-orange-500 to-red-500"
    },
    { 
      category: "Databases", 
      items: ["MySQL", "MongoDB"], 
      icon: "🗄️",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const education = [
    {
      degree: "B.E CSE [CYBER SECURITY]",
      institution: "Dr. Mahalingam College of Engineering and Technology",
      year: "2023-2027",
      location: "Pollachi"
    },
    {
      degree: "HSC",
      institution: "Saraswathi Vidhyashram Matric Hr Sec School",
      year: "2023",
      location: "Kavindapadi"
    },
    {
      degree: "SSLC",
      institution: "Saraswathi Vidhyashram Matric Hr Sec School",
      year: "2021",
      location: "Kavindapadi"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 text-gray-800'
    }`}>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? `backdrop-blur-glass shadow-lg ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/90'}` 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`text-2xl font-bold cursor-pointer ${
                isDarkMode ? 'gradient-text' : 'text-orange-600'
              }`}
              onClick={() => scrollToSection('home')}
            >
              Sanjay S
            </motion.div>
            <div className="hidden md:flex space-x-8 items-center">
              {['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.1, color: '#667eea' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-colors duration-300 font-medium ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-amber-700 hover:text-orange-800'
                  }`}
                >
                  {item}
                </motion.button>
              ))}
              {/* Theme Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="ml-4 p-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? (
                  <motion.svg
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="moon"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </motion.svg>
                )}
              </motion.button>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Mobile Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                className={`${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isDarkMode 
            ? 'cosmic-gradient opacity-30' 
            : 'bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200 opacity-60'
        }`}></div>
        {/* Additional geometric pattern overlay */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isDarkMode ? 'geometric-pattern opacity-20' : 'bg-gradient-to-br from-amber-100/30 via-orange-100/30 to-red-100/30'
        }`}></div>
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full particle-float ${
                isDarkMode ? 'bg-white' : 'bg-orange-400'
              }`}
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center z-10 px-4"
        >
          {/* Profile Picture */}
          <motion.div
            variants={scaleIn}
            className="mb-8 flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl pulse-glow morphing-shape">
                <img 
                  src='../img.jpg'
                  alt="Sanjay S"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-400 border-r-indigo-400"
              ></motion.div>
            </motion.div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className={`text-5xl md:text-7xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-orange-800'
            }`}
          >
            I'm <span className="text-shimmer">Sanjay S</span>
          </motion.h1>
          <motion.div
            variants={fadeInUp}
            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto min-h-[4rem] flex items-center justify-center ${
              isDarkMode ? 'text-gray-300' : 'text-amber-700'
            }`}
          >
            <TypingEffect 
              texts={[
                
                "Security-Minded Web Developer"
              ]}
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2000}
            />
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            className="flex justify-center space-x-6 mb-12"
          >
            {[
              { icon: "💼", link: "https://in.linkedin.com/in/sanjay-s-21b68a294", label: "LinkedIn" },
              { icon: "🐙", link: "https://github.com/diablo144", label: "GitHub" },
              { icon: "📧", link: "mailto:sanjay144@gmail.com", label: "Email" }
            ].map((social, index) => (
              <motion.a
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 wave-animation neon-glow"
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
          
          <motion.button
            variants={scaleIn}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(102, 126, 234, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('projects')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 magnetic-hover glow-pulse"
          >
            View My Work
          </motion.button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 ${
              isDarkMode ? 'text-shimmer' : 'text-orange-600'
            }`}>
              About Me
            </h2>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-8 rounded-2xl shadow-2xl transition-all duration-500 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                  : 'bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200 shadow-xl'
              }`}
            >
              <p className={`text-lg leading-relaxed mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                A motivated, entry-level web developer and B.E. Cyber Security student with a dual passion for full-stack Web Development and secure coding.
              </p>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                I am focused on creating clean, user-friendly websites using a strong foundation in HTML, CSS, and JavaScript. I am an analytical problem-solver seeking to contribute my enthusiasm and commitment to a collaborative team.
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-4 transition-all duration-500 ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-gradient-to-br from-yellow-50 to-orange-50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${
              isDarkMode ? 'text-shimmer' : 'text-orange-600'
            }`}>
              My Technical Toolkit
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <AnimatedSection key={index}>
                <motion.div
                  initial={{ opacity: 0, rotateY: -90 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -15,
                    rotateY: 5,
                    rotateX: 5,
                  }}
                  className={`bg-gradient-to-br ${skill.color} p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden magnetic-hover neon-glow`}
                >
                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 shimmer opacity-0 hover:opacity-100"
                    whileHover={{ opacity: 1 }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="text-5xl mb-4 text-center relative z-10 bounce-slow"
                  >
                    {skill.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-center mb-4 text-white relative z-10">
                    {skill.category}
                  </h3>
                  <ul className="space-y-2 relative z-10">
                    {skill.items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ x: 5, scale: 1.05 }}
                        transition={{ delay: idx * 0.1 }}
                        className="text-white/90 text-center font-medium cursor-default"
                      >
                        • {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${
              isDarkMode ? 'text-shimmer' : 'text-orange-600'
            }`}>
              My Projects
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <AnimatedSection key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.03,
                    rotateY: 3,
                    transition: { duration: 0.3 }
                  }}
                  className={`rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 relative group magnetic-hover card-hover-effect ${
                    isDarkMode 
                      ? 'bg-gray-800 border border-gray-700' 
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {/* Gradient overlay on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"
                  />
                  
                  <motion.div 
                    className="overflow-hidden relative"
                  >
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.15, rotate: 2 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                  <div className="p-6 relative z-20">
                    <motion.h3 
                      className={`text-2xl font-bold mb-3 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.title}
                    </motion.h3>
                    <p className={`mb-4 leading-relaxed ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.15, y: -2 }}
                          className="px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-sm font-medium cursor-default"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <motion.a
                        whileHover={{ scale: 1.08, x: -3 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 px-4 py-2 rounded-lg text-center font-medium transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                        }`}
                      >
                        🐙 GitHub
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.08, x: 3 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-center font-medium hover:shadow-lg transition-all duration-300"
                      >
                        🚀 Live Demo
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section - Unique Design */}
      <section id="education" className={`py-20 px-4 relative overflow-hidden transition-all duration-500 ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50'
      }`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                isDarkMode ? 'bg-purple-500' : 'bg-orange-400'
              }`}
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-center mb-20"
              whileHover={{ scale: 1.05 }}
            >
              <span className={isDarkMode ? 'text-shimmer' : 'text-orange-600'}>Education Journey</span>
            </motion.h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {education.map((edu, index) => (
              <AnimatedSection key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ 
                    y: -20,
                    rotateY: 5,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="relative group magnetic-hover"
                >
                  {/* Glassmorphism card */}
                  <div className={`relative backdrop-blur-xl p-8 rounded-3xl shadow-2xl overflow-hidden ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50' 
                      : 'bg-gradient-to-br from-white/90 to-blue-50/90 border border-blue-200/50'
                  }`}>
                    {/* Neon glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Animated corner accent */}
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-20 rounded-bl-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    {/* Year badge */}
                    <motion.div 
                      className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-sm font-bold mb-4 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {edu.year}
                    </motion.div>
                    
                    {/* Degree with icon */}
                    <div className="flex items-start space-x-3 mb-4">
                      <motion.div
                        className="text-3xl"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        🎓
                      </motion.div>
                      <h3 className={`text-xl font-bold leading-tight ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {edu.degree}
                      </h3>
                    </div>
                    
                    {/* Institution */}
                    <p className={`mb-2 font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {edu.institution}
                    </p>
                    
                    {/* Location with icon */}
                    <div className={`flex items-center space-x-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span>📍</span>
                      <p className="text-sm">{edu.location}</p>
                    </div>
                    
                    {/* Decorative line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                    />
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Unique Design */}
      <section id="contact" className="py-20 px-4 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-purple-900/20 via-gray-900 to-indigo-900/20' 
            : 'bg-gradient-to-br from-yellow-100/50 via-orange-100/50 to-red-100/50'
        }`} />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedSection>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-center mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <span className={isDarkMode ? 'text-shimmer' : 'text-orange-600'}>Let's Connect</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className={`text-xl text-center mb-16 max-w-2xl mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-amber-700'
              }`}
            >
              I'm always open to discussing new projects, creative ideas, or opportunities to collaborate.
            </motion.p>
          </AnimatedSection>
          
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Email Card */}
              <motion.a
                href="mailto:sanjay144@gmail.com"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                className="relative group magnetic-hover"
              >
                <div className="relative bg-gradient-to-br from-purple-600 to-indigo-600 p-8 rounded-3xl shadow-2xl overflow-hidden">
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                    animate={{ backgroundPosition: ['0px 0px', '20px 20px'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="text-6xl mb-4"
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      📧
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Email Me</h3>
                    <p className="text-purple-100 text-lg font-medium break-all">
                      sanjay144sellamuthu@gmail.com
                    </p>
                  </div>
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  />
                </div>
              </motion.a>
              
              {/* Phone Card */}
              <motion.a
                href="tel:+919578226144"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: -5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                className="relative group magnetic-hover"
              >
                <div className="relative bg-gradient-to-br from-green-600 to-emerald-600 p-8 rounded-3xl shadow-2xl overflow-hidden">
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                    animate={{ backgroundPosition: ['0px 0px', '20px 20px'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="text-6xl mb-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      📱
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Call Me</h3>
                    <p className="text-green-100 text-lg font-medium">
                      +91 9578226144
                    </p>
                  </div>
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  />
                </div>
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-4 border-t transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200'
      }`}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`text-center ${
            isDarkMode ? 'text-gray-400' : 'text-amber-700'
          }`}
        >
          <p>© 2025 Sanjay S. Built with React & Tailwind CSS.</p>
        </motion.div>
      </footer>
    </div>
  );
}

export default App;
