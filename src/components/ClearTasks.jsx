import { deleteTask } from "../api";

const ClearTasks = ({ tasks }) => {

    const clearTasks = () => {
        const confirm = window.confirm('Are you sure you want to clear the tasks?');

        if (!confirm) return;
        {(tasks.filter((task) => task.complete)).map((task) => {
            deleteTask(task.id);
        })};
    }

    return (
        <div className="mx-auto max-w-6xl mb-20 px-2">
            <div className="flex items-center justify-end">
                <button 
                    onClick={() => clearTasks()}
                    className="inline-block w-60 h-10 mt-20 text-white bg-red-700 hover:bg-red-600 rounded-sm cursor-pointer"
                >
                    Clear Completed Tasks
                </button>
            </div>
        </div>
    );
};
export default ClearTasks;