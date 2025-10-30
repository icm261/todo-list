import { useState, useEffect } from "react";
import Task from "./Task";
import Spinner from "./Spinner";
import ClearTasks from "./ClearTasks";
import ListHeader from "./ListHeader";
import { updateCategory, deleteTask } from "../utils";
import { updateTasks } from "../api";
import { toast } from "react-toastify";


const MainList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [numPriorities, setNumPriorities] = useState(0);
    const [priorityTasks, setPriorityTasks] = useState([]);
    const [priorityCategories, setPriorityCategories] = useState([]);
    const [todayTasks, setTodayTasks] = useState([]);
    const [todayCategories, setTodayCategories] = useState([]);

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

    useEffect(() => {
        let number = 0;
        const todays = [];
        const priorities = [];
        const categoriesToday = [];
        const categoriesPriority = [];

        tasks.map((category) => {
            category.tasksbyproject.map((project) => {
                project.tasks?.map((task) => {
                    if (task.today && task.priority) {
                        number++;
                        priorities.push(task);
                        categoriesPriority.push(category);
                    }
                    if (task.today && !task.priority) {
                        todays.push(task);
                        categoriesToday.push(category);
                    }
                });
            });
        });

        setNumPriorities(number);
        setPriorityTasks(priorities);
        setPriorityCategories(categoriesPriority);
        setTodayTasks(todays);
        setTodayCategories(categoriesToday);

     }, [tasks]);

    const onUpdateMain = (changeTask, category) => {
        const updatedCategory = updateCategory(changeTask, category);
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
        <section>
            <div className="mx-auto max-w-6xl px-2">
                <ListHeader title="Today's Tasks"/>
                <div className="flex items-center justify-center">
                        {loading  ? (
                            <Spinner loading={loading} />
                        ) : (
                            <>
                            <div className="grid grid-cols-1 justify-center py-10 gap-4">
                                {priorityTasks.map((task, index) => (
                                    <Task 
                                        key={task.id} 
                                        task={task} 
                                        numPriorities={numPriorities}
                                        category={priorityCategories[index]}
                                        handleUpdate={onUpdateMain}
                                        deleteTask={onDeleteTask}
                                    />
                                ))}
                            </div>
                            </>
                        )} 
                </div>

                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-2 justify-center py-10 gap-4">
                        {todayTasks.map((task, index) => (
                            <Task 
                                key={task.id} 
                                task={task} 
                                numPriorities={numPriorities} 
                                category={todayCategories[index]}
                                handleUpdate={onUpdateMain}
                                deleteTask={onDeleteTask}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <ClearTasks tasks={tasks} setTasks={setTasks}/>
        </section>
    );
};
export default MainList;