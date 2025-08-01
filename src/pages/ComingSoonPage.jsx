import { Link } from "react-router-dom";

const ComingSoonPage = () => {
    return (
        <>
            <section className="text-center flex flex-col justify-center items-center h-96">
                <h1 className="text-4xl text-black font-bold mb-8">
                    Coming Soon
                </h1>
                <Link to="/">
                    <button 
                        className="inline-block w-25 h-8 text-white text-[14px] bg-red-800 hover:bg-red-700 rounded-sm cursor-pointer"
                    >
                        Go Back
                    </button>
                </Link>
            </section>
        </>
    );
};
export default ComingSoonPage;