import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { WalletContext } from '../components/WalletContext';
import { skills } from '../assets/Challenge_Tasks';
import { 
  FaKeyboard, 
  FaRobot, 
  FaCube, 
  FaRocket, 
  FaShieldAlt, 
  FaTrophy,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaCode,
  FaDatabase,
  FaCloud,
  FaDocker,
  FaLink,
  FaPlay,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaExternalLinkAlt,
  FaBolt,
  FaLock,
  FaGlobe
} from 'react-icons/fa';

const challengeSteps = [
  { 
    icon: <FaKeyboard />, 
    title: 'Complete Challenge',
    description: 'Submit your solution via text, code, or file upload',
    color: 'from-blue-500 to-cyan-500',
    delay: 0
  },
  { 
    icon: <FaRobot />, 
    title: 'AI Evaluates',
    description: 'Get instant, unbiased scoring from advanced AI',
    color: 'from-purple-500 to-pink-500',
    delay: 200
  },
  { 
    icon: <FaCube />,  
    title: 'Mint NFT',
    description: 'Receive your soulbound credential on Solana',
    color: 'from-green-500 to-emerald-500',
    delay: 400
  }
];

const features = [
  {
    icon: <FaRocket />,
    title: 'Instant Evaluation',
    description: 'Get AI-powered feedback in seconds, not days',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Soulbound NFTs',
    description: 'Non-transferable credentials that prove your skills',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: <FaTrophy />,
    title: 'Verified Skills',
    description: 'Share your achievements directly on LinkedIn and X',
    color: 'from-blue-500 to-cyan-500'
  }
];

const socialLinks = [
  { icon: <FaGithub />, href: 'https://github.com/suhasbm09/SKILL_FLEX', label: 'GitHub' },
  { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter' },
  { icon: <FaLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' }
];

// Map icon string to React element
const iconMap = {
  '<FaCode />': <FaCode />, 
  '<FaDatabase />': <FaDatabase />, 
  '<FaCloud />': <FaCloud />, 
  '<FaDocker />': <FaDocker />, 
  '<FaLink />': <FaLink />
};

export default function Home() {
  const { walletAddress } = useContext(WalletContext);
  const [activeSkill, setActiveSkill] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full min-h-screen relative">
      {/* Interactive Background Elements */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.1), transparent 40%)`
        }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Animated Hero Title */}
          <div className={`transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative mb-8">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-tight">
                <span className="gradient-text block mb-2">Turn Your</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 block">
                  Skill Into Proof
                </span>
              </h1>
              
              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-float delay-1000 opacity-60"></div>
            </div>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed px-4 font-light">
              Complete AI-evaluated challenges, mint soulbound NFTs, and showcase your verified skills on the blockchain
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 px-4">
              <Link
                to="/challenge/1"
                className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-105 glow w-full sm:w-auto overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <FaPlay className="text-sm" />
                  Start Your Journey
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              
              <Link
                to="/about"
                className="group px-8 sm:px-10 py-4 sm:py-5 glass text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-500 w-full sm:w-auto text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative">Learn More</span>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex justify-center items-center gap-6 mb-16">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 glass rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-110"
                >
                  <div className="text-xl text-gray-300 group-hover:text-white transition-colors">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              Why Choose SkillFlex?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of skill verification with cutting-edge technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`glass rounded-3xl p-8 lg:p-10 text-center hover:scale-105 transition-all duration-700 animate-fade-in-up group relative overflow-hidden`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className={`text-6xl mb-6 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent animate-float`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Simple steps to transform your skills into verifiable credentials
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {challengeSteps.map((step, index) => (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${step.delay}ms` }}
              >
                {/* Connection Line */}
                {index < challengeSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent transform -translate-y-1/2 z-0"></div>
                )}
                
                <div className="glass rounded-3xl p-8 lg:p-10 text-center relative z-10 hover:scale-105 transition-all duration-700 group-hover:glow overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className={`text-7xl mb-6 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      {step.icon}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {step.description}
                    </p>
                    
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wallet Status */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div
            className={`glass rounded-3xl p-8 text-center transition-all duration-700 hover:scale-105 ${
              walletAddress ? 'border-green-500/50 shadow-green-500/20' : 'border-red-500/50 shadow-red-500/20'
            }`}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className={`w-4 h-4 rounded-full ${walletAddress ? 'bg-green-500' : 'bg-red-500'} animate-pulse shadow-lg`}></div>
              <span className="text-xl font-semibold">
                {walletAddress ? 'Wallet Connected' : 'Wallet Not Connected'}
              </span>
            </div>
            
            {walletAddress && (
              <p className="text-lg text-gray-300 font-mono mb-2">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </p>
            )}
            
            {!walletAddress && (
              <p className="text-lg text-gray-400 mb-4">
                Connect your Phantom wallet to start minting credentials
              </p>
            )}

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <FaLock className="text-xs" />
              <span>Secure • Private • Decentralized</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              Available Challenges
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Master the skills that matter in today's tech landscape
            </p>
          </div>
          
          <div className="space-y-6 lg:space-y-8">
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className={`glass rounded-3xl p-6 lg:p-8 transition-all duration-700 hover:scale-[1.02] cursor-pointer ${
                  activeSkill === skill.id ? 'ring-2 ring-purple-500/50 shadow-purple-500/20' : ''
                } group overflow-hidden`}
                onMouseEnter={() => setActiveSkill(skill.id)}
                onMouseLeave={() => setActiveSkill(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-6 flex-1">
                    <div className={`text-5xl lg:text-6xl mt-2 flex-shrink-0 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                      {iconMap[skill.icon]}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                        <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight">
                          {skill.id}. {skill.title}
                        </h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            skill.difficulty === 'Expert' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            skill.difficulty === 'Advanced' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                            'bg-green-500/20 text-green-400 border border-green-500/30'
                          }`}>
                            {skill.difficulty}
                          </span>
                          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            {skill.duration}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed mb-4 text-lg">
                        {skill.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex items-center gap-2 flex-wrap mb-4">
                        {skill.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-lg border border-white/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Progress indicators */}
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <FaCheckCircle className="text-green-400" />
                          <span>AI Evaluated</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaStar className="text-yellow-400" />
                          <span>85% Pass Rate</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaBolt className="text-purple-400" />
                          <span>Instant Results</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    to={`/challenge/${skill.id}`}
                    className="group/btn flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-105 glow"
                  >
                    <span>Start Challenge</span>
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
            <div className="glass rounded-3xl p-8 lg:p-10 hover:scale-105 transition-all duration-500 group">
              <div className="text-4xl lg:text-5xl font-bold gradient-text mb-4">95%</div>
              <div className="text-gray-300 text-lg lg:text-xl">Success Rate</div>
              <div className="text-gray-500 text-sm mt-2">AI-powered accuracy</div>
            </div>
            <div className="glass rounded-3xl p-8 lg:p-10 hover:scale-105 transition-all duration-500 group">
              <div className="text-4xl lg:text-5xl font-bold gradient-text mb-4">24/7</div>
              <div className="text-gray-300 text-lg lg:text-xl">AI Evaluation</div>
              <div className="text-gray-500 text-sm mt-2">Always available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-3xl p-12 lg:p-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              Ready to Prove Your Skills?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the future of skill verification and start building your blockchain-powered portfolio today.
            </p>
            <Link
              to="/challenge/1"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-105 glow text-lg"
            >
              <FaPlay />
              Get Started Now
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
