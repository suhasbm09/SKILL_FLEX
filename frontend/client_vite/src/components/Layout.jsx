import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import '../index.css';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col text-white">
      
      <Header />
      <main className=" flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;