import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import '../index.css';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col text-white relative overflow-hidden">
      {/* Advanced Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Primary gradient background - Much darker */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Secondary dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-black to-slate-950/80"></div>
        
        {/* Animated floating orbs - Reduced opacity for darker feel */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Additional dark accent orbs */}
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-indigo-500/8 rounded-full blur-2xl animate-pulse delay-1500"></div>
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-cyan-500/8 rounded-full blur-2xl animate-pulse delay-3000"></div>
        
        {/* Grid pattern overlay - More subtle */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Noise texture - Reduced opacity */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>
        
        {/* Dark vignette effect */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30"></div>
      </div>
      
      <Header />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;