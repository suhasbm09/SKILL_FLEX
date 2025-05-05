import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import { WalletContext } from '../components/WalletContext';
import { FaKeyboard, FaRobot, FaCube } from 'react-icons/fa';

const Home = () => {
  const { walletAddress } = useContext(WalletContext);

  return (
    <div  className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-12">
      <div  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-purple-900 opacity-10 blur-[120px] rounded-full z-0" />
      
      <h1  className="text-4xl mt-10 sm:text-5xl animate-fadeInUp font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-400 to-cyan-400">
        Turn Your Skill Into Proof.
      </h1>
      
      <div>
      <section className="mt-12 w-full mb-6 max-w-4xl grid grid-cols-1 animate-fadeInUp sm:grid-cols-3 gap-6 ">
          {[
            { icon: <FaKeyboard />, title: ' Complete Challenge' },
            { icon: <FaRobot />,    title: ' AI Evaluates' },
            { icon: <FaCube />,     title: ' Mint NFT' },
          ].map(({ icon, title }, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-6 bg-gray-800 rounded-2xl 
                         border-2  border-purple-800 
                         transition-all duration-200 "
            >
              <div className="text-5xl text-purple-400 mb-4 ">{icon}</div>
              <h3 className="text-xl font-semibold ">{title}</h3>
            </div>
          ))}
        </section>
      </div>
      <div className="w-full text-center max-w-xl mb-20 mt-4">
      {walletAddress ? (
        <p className=" font-bold text-sm justify-center mb-8 animate-pulse border-2 bg-green-400 border-green-400 rounded-lg p-2">
          Wallet Connected: {walletAddress}
        </p>
      ) : (
        <p className=" font-bold text-sm mb-8 justify-center animate-pulse border-2 bg-red-400 border-red-400 rounded-lg p-2">
          Phantom wallet not connected
        </p>
      )}
      </div>
      <div className="w-full max-w-full flex flex-col">
        <h2 className="text-2xl animate-fadeInUp sm:text-4xl font-bold mb-6 ml-7 font-mono bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">SKILLS </h2>
      <hr className='border-gray-500 mb-2'/>

      {/* skills section */}
      <div className='space-y-4  '>

        {/* 1. Programming Language DSA */}
        <div className='flex animate-fadeInUp items-center justify-between p-8 bg-gradient-to-l from-black via-gray-800 to-black border-2 border-gray-500 rounded-lg w-full mb-2.5 bg-opacity-40 backdrop-blur-sm shadow-sm shadow-purple-700'>
          <h1 className=' text-xl font-semibold'>1. Algorithmic Problem Solving in JavaScript</h1>
          <Link 
            to="/challenge/1" 
            className="text-center py-3 px-6 bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition-all duration-200"
          >
            <i className="fas fa-lightbulb mr-2"></i>Start Challenge
          </Link>
        </div>

        {/* 2. Database */}
        <div className='flex items-center animate-fadeInUp justify-between p-8 bg-gradient-to-l from-black via-gray-800 to-black border-2 border-gray-500 rounded-lg w-full mb-2.5 bg-opacity-40 backdrop-blur-sm shadow-sm shadow-purple-700'>
          <h1 className=' text-xl font-semibold'>2. Query & Model Data with MongoDB</h1>
          <Link 
            to="/challenge/2" 
            className="text-center py-3 px-6 bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition-all duration-200"
          >
            <i className="fas fa-lightbulb mr-2"></i>Start Challenge
          </Link>
        </div>

        {/* 3. Cloud Platform */}
        <div data-aos="fade-up" className='flex items-center justify-between animate-fadeInUp p-8 bg-gradient-to-l from-black via-gray-800 to-black border-2 border-gray-500 rounded-lg w-full mb-2.5 bg-opacity-40 backdrop-blur-sm shadow-sm shadow-purple-700'>
          <h1 className=' text-xl font-semibold'>3. Full-Stack Application Deployment on AWS ECS</h1>
          <Link 
            to="/challenge/3" 
            className="text-center py-3 px-6 bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition-all duration-200"
          >
            <i className="fas fa-lightbulb mr-2"></i>Start Challenge
          </Link>
        </div>

        {/* 4. DevOps */}
        <div data-aos="fade-up" className='flex items-center justify-between animate-fadeInUp p-8 bg-gradient-to-l from-black via-gray-800 to-black border-2 border-gray-500 rounded-lg w-full mb-2.5 bg-opacity-40 backdrop-blur-sm shadow-sm shadow-purple-700'>
          <h1 className=' text-xl font-semibold'>4. Efficient Software Delivery with Docker</h1>
          <Link 
            to="/challenge/4" 
            className="text-center py-3 px-6 bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition-all duration-200"
          >
            <i className="fas fa-lightbulb mr-2"></i>Start Challenge
          </Link>
        </div>
        {/* 4. Solana Blockchain */}
        <div data-aos="fade-up" className='flex items-center justify-between animate-fadeInUp p-8 bg-gradient-to-l from-black via-gray-800 to-black border-2 border-gray-500 rounded-lg w-full mb-2.5 bg-opacity-40 backdrop-blur-sm shadow-sm shadow-purple-700'>
          <h1 className=' text-xl font-semibold'>5. Smart Contract Development on Solana</h1>
          <Link 
            to="/challenge/5" 
            className="text-center py-3 px-6 bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition-all duration-200"
          >
            <i className="fas fa-lightbulb mr-2"></i>Start Challenge
          </Link>
        </div>

        

          </div>  
        </div>

    </div>
  );
};

export default Home;