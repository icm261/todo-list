import { NavLink } from "react-router-dom";

const Navbar = () => {

    const linkClass = ({ isActive }) => 
        isActive 
            ? 'text-white bg-blue-800 rounded-sm px-15 py-2' 
            : 'text-black bg-blue-300 hover:bg-blue-800 hover:text-white rounded-sm px-15 py-2';

    return (
    <nav>
        <div className="mx-auto max-w-5xl px-2">
            <div className="flex h-30 items-center justify-center">
                <div className="flex space-x-3">
                    <NavLink
                        to="/"
                        className={linkClass}
                    >
                        Today
                    </NavLink>
                    <NavLink
                        to="/categories"
                        className={linkClass}
                    >
                        Categories
                    </NavLink>
                    <NavLink
                        to="/dailies"
                        className={linkClass}
                    >
                        Dailies
                    </NavLink>
                </div>
            </div>
        </div>
    </nav>
    );
};
export default Navbar;