import { taskColor } from "../utils";

const Card = ({ children , title}) => {
    let titleColor = taskColor(title, 'titleColor');
    let cardColor = taskColor(title, 'cardColor');

    return (
        <>
            <div className={`${cardColor} min-h-100 w-100 rounded-md shadow-md overflow-hidden`}>
                <div className={`${titleColor} mb-6`}>
                    <div className="flex h-15 items-center justify-center">
                        <h3 className="text-2xl text-white font-bold">
                            { title }
                        </h3>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">{ children }</div>
            </div>
        </>
    );
};
export default Card;