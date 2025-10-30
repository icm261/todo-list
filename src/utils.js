export const taskColor = (category, use) => {
    switch (category) {
        case 'Film/Video':
            if (use == 'cardColor') return `bg-purple-300`;
            else if (use == 'titleColor') return `bg-purple-700`;
            else if (use == 'taskColor') return `bg-purple-700 hover:bg-purple-600`;
            else if (use == 'projectColor') return `bg-purple-900`;
            else if (use == 'noprojectColor') return `bg-purple-500`;
            else return '';
            break;
        case 'Writing':
            if (use == 'cardColor') return `bg-green-300`;
            else if (use == 'titleColor') return `bg-green-700`;
            else if (use == 'taskColor') return `bg-green-700 hover:bg-green-600`;
            else if (use == 'projectColor') return `bg-green-900`;
            else if (use == 'noprojectColor') return `bg-green-500`;
            else return '';
            break;
        case 'Correspondence':
            if (use == 'cardColor') return `bg-pink-300`;
            else if (use == 'titleColor') return `bg-pink-500`;
            else if (use == 'taskColor') return `bg-pink-500 hover:bg-pink-400`;
            else if (use == 'projectColor') return `bg-pink-700`;
            else if (use == 'noprojectColor') return `bg-pink-400`;
            else return '';
            break;
        case 'Computer Science':
            if (use == 'cardColor') return `bg-orange-300`;
            else if (use == 'titleColor') return `bg-orange-500`;
            else if (use == 'taskColor') return `bg-orange-500 hover:bg-orange-400`;
            else if (use == 'projectColor') return `bg-orange-700`;
            else if (use == 'noprojectColor') return `bg-orange-400`;
            else return '';
            break;
        case 'Photography':
            if (use == 'cardColor') return `bg-indigo-300`;
            else if (use == 'titleColor') return `bg-indigo-500`;
            else if (use == 'taskColor') return `bg-indigo-500 hover:bg-indigo-400`;
            else if (use == 'projectColor') return `bg-indigo-700`;
            else if (use == 'noprojectColor') return `bg-indigo-400`;
            else return '';
            break;
        default:
            if (use == 'cardColor') return `bg-amber-300`;
            else if (use == 'titleColor') return `bg-amber-500`;
            else if (use == 'taskColor') return `bg-amber-500 hover:bg-amber-400`
            else if (use == 'projectColor') return `bg-amber-700`;
            else if (use == 'noprojectColor') return `bg-amber-400`;
            else return '';
            break;
    }
};

export const createTask = (newTask, projectName, categoryName, tasks) => {
    const updateCategory = tasks.find((category) => category.category == categoryName);
    return addProject(newTask, projectName, updateCategory);
}

export const deleteTask = (taskID, category) => {
    const updatedProjects = category.tasksbyproject.map((project) => {
        const updatedTasks = project.tasks.filter(task => task.id != taskID);
        return {
            ...project,
            tasks: updatedTasks,
        }
    });

    const filteredProjects = updatedProjects.filter((project) => project.projectname != 'No Project' ? project.tasks.length != 0 : project);
    return {
        ...category,
        tasksbyproject: filteredProjects,
    }
}

export const addProject = (updatedTask, projectName, category) => {
    const projectIndex = category.tasksbyproject.findIndex((project) => project.projectname == projectName);
    if (projectIndex != -1) {
        category.tasksbyproject[projectIndex].tasks.push(updatedTask);
    }
    else {
        const newProject = {
            projectname: projectName,
            tasks: [updatedTask],
        }
        category.tasksbyproject.splice(-1, 0, newProject);
    }
    return category;
}

export const updateCategory = (updatedTask, category) => {
    const updatedProjects = category.tasksbyproject.map((project) => {
        const index = project.tasks.findIndex((task) => task.id == updatedTask.id);
        const removed = index != -1 ? project.tasks.splice(index, 1, updatedTask) : null;
        return {
            ...project,
            tasks: project.tasks,
        }
    });
    return {
        ...category,
        tasksbyproject: updatedProjects,
    }
};