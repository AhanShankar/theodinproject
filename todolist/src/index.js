import './index.css';
import get_header from './header';
import get_sidebar from './sidebar.js';
import get_container from './container.js';
import home from './homescreen.js' ;

let content = document.getElementById('content');
let header = get_header();
let sidebar = get_sidebar();
let container = get_container();

content.appendChild(header);
content.appendChild(sidebar);
content.appendChild(container);


function create_project(name, description = null) {
    let tasklist = [];

    function add_task(name, description, priority, date = null) {
        tasklist.push({ name, description, priority, date });

            tasklist.sort(function (task1, task2) {
                if (task1.priority > task2.priority)
                    return -1;
                else if (task1.priority < task2.priority)
                    return 1;
                return 0;
            });
    }
    function remove_task(name) {
        for (let i = tasklist.length - 1; i >= 0; i--) {
            if (tasklist[i].name === name) {
                tasklist.splice(i, 1);
            }
            tasklist.sort(function (task1, task2) {
                if (task1.priority > task2.priority)
                    return -1;
                else if (task1.priority < task2.priority)
                    return 1;
                return 0;
            });
        }
    }
    function change_priority(name, new_priority) {
        let task = tasklist.find(task => task.name === name);
        task.priority = new_priority;
    }
    return { name, description, tasklist, add_task, remove_task, change_priority };
};
let project_array = [];
project_array.push(create_project('none'));

let addtask_button = document.createElement('div');
addtask_button.textContent = '+';
addtask_button.id = 'addtask_button';

project_array[0].add_task('Study','Study hard',1);
project_array[0].add_task('Clothes','Clean',3)
project_array[0].add_task('Market','shop',2);
project_array[0].add_task('Assignment','complete',2);






project_array[0].add_task('asdss','none',0);






// console.log(home);
home().populate(container,project_array);
container.appendChild(addtask_button);
home