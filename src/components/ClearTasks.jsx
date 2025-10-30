import { deleteTask } from "../utils";
import { updateTasks } from "../api";

const ClearTasks = ({ tasks, setTasks}) => {

    const clearTasks = () => {
        const confirm = window.confirm('Are you sure you want to clear the tasks?');

        let updatedCategory;

        if (!confirm) return;
        const updatedTasks = tasks.map((category) => {
            updatedCategory = category;
            category.tasksbyproject.map((project) => {
                project.tasks.map((task) => {
                    if (task.complete) {
                        updatedCategory = deleteTask(task.id, updatedCategory);
                        updateTasks(updatedCategory);
                    }
                })
            })
            return updatedCategory;
        })
        setTasks(updatedTasks);
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