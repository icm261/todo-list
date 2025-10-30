import Card from "./Card";
import ClearTasks from "./ClearTasks";
import { useState, useEffect } from "react";
import ListHeader from "./ListHeader";
import Project from "./Project";
import { updateTasks } from "../api";
import { updateCategory, deleteTask } from "../utils";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const CategoriesList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async() => {
            try {
                const res = await fetch('/api/tasks');
                const data = await res.json();
                setTasks(data);
            } catch(error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        }

        fetchTasks();
     }, []);

    const onHandleUpdate = (updatedTask, category) => {
        const updatedCategory = updateCategory(updatedTask, category);
        const updatedTasks = tasks.map((prevCategory) => prevCategory.category == category.category ? updatedCategory : prevCategory);
        setTasks(updatedTasks);
        updateTasks(updatedCategory);
    }

    const onDeleteTask = (taskID, category) => {
        const confirm = window.confirm('Are you sure you want to delete this task?');

        if (!confirm) return;
        const deletedCategory = deleteTask(taskID, category, tasks);
        const updatedTasks = tasks.map((prevCategory) => prevCategory.category == category.category ? deletedCategory : prevCategory);
        setTasks(updatedTasks);
        updateTasks(deletedCategory);
        toast.success('Task Deleted Successfully');
    }

     return (
        <>
            <section>
                <div className="mx-auto max-w-6xl px-2">
                    <ListHeader title="Categories"/>
                    <div className="flex items-center justify-center">
                        {loading  ? (
                            <Spinner loading={loading} />
                        ) : (
                        <>
                        <div className="grid grid-cols-2 py-10 gap-15">
                            {tasks.map((category) => (
                                <Card key={category.id} title={category.category}>
                                    {category.tasksbyproject?.map((project) => (
                                        <Project key={project.id} project={project} category={category} onHandleUpdate={onHandleUpdate} onDeleteTask={onDeleteTask}/>
                                    ))}
                                </Card>
                            ))}
                        </div>
                        </>
                        )} 
                    </div>
                </div>
            </section>
            <ClearTasks tasks={tasks} setTasks={setTasks}/>
        </>
    );
};
export default CategoriesList;