export const taskColor = (category, use) => {
    switch (category) {
        case 'Film/Video':
            if (use == 'cardColor') return `bg-purple-300`;
            else if (use == 'titleColor') return `bg-purple-700`;
            else if (use == 'taskColor') return `bg-purple-700 hover:bg-purple-600`;
            else return '';
            break;
        case 'Writing':
            if (use == 'cardColor') return `bg-green-300`;
            else if (use == 'titleColor') return `bg-green-700`;
            else if (use == 'taskColor') return `bg-green-700 hover:bg-green-600`;
            else return '';
            break;
        case 'Correspondence':
            if (use == 'cardColor') return `bg-pink-300`;
            else if (use == 'titleColor') return `bg-pink-500`;
            else if (use == 'taskColor') return `bg-pink-500 hover:bg-pink-400`;
            else return '';
            break;
        case 'Computer Science':
            if (use == 'cardColor') return `bg-orange-300`;
            else if (use == 'titleColor') return `bg-orange-500`;
            else if (use == 'taskColor') return `bg-orange-500 hover:bg-orange-400`;
            else return '';
            break;
        case 'Photography':
            if (use == 'cardColor') return `bg-indigo-300`;
            else if (use == 'titleColor') return `bg-indigo-500`;
            else if (use == 'taskColor') return `bg-indigo-500 hover:bg-indigo-400`;
            else return '';
            break;
        default:
            if (use == 'cardColor') return `bg-amber-300`;
            else if (use == 'titleColor') return `bg-amber-500`;
            else if (use == 'taskColor') return `bg-amber-500 hover:bg-amber-400`
            else return '';
            break;
    }
};