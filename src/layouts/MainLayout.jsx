import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
    return (
        <>
            <Header />
            <Navbar />
            <Outlet />
            <ToastContainer />
        </>
    );
};
export default MainLayout;