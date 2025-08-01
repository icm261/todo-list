import { Link } from "react-router-dom";

const ListHeader = ({ title }) => {
    return (
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl">{title}</h2>
            <Link to="/create">
            <button 
                className="inline-block w-40 h-10 text-white bg-blue-800 hover:bg-blue-700 rounded-sm cursor-pointer"
            >
                Create Task +
            </button>
            </Link>
        </div>
    );
};
export default ListHeader;