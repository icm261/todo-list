import { useState, useEffect } from "react";
import Task from "./Task";
import Spinner from "./Spinner";
import ClearTasks from "./ClearTasks";
import ListHeader from "./ListHeader";

const MainList = () => {
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

    const priorityTasks = tasks.filter((task) => task.today && task.priority);
    const todayTasks = tasks.filter((task) => task.today && !task.priority);

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
                                {priorityTasks.map((task) => (
                                    <Task key={task.id} task={task} numPriorities={priorityTasks.length}/>
                                ))}
                            </div>
                            </>
                        )} 
                </div>

                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-2 justify-center py-10 gap-4">
                        {todayTasks.map((task) => (
                                <Task key={task.id} task={task} numPriorities={priorityTasks.length}/>
                        ))}
                    </div>
                </div>
            </div>
            <ClearTasks tasks={tasks}/>
        </section>
    );
};
export default MainList;