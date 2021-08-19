import './index.css';
import get_header from './header';
import get_sidebar from './sidebar.js';
import get_container from './container.js';
import home from './homescreen.js';
import project_screen from './projects.js';

let content = document.getElementById('content');
let header = get_header();
let sidebar = get_sidebar();
let container = get_container();

content.appendChild(header);
content.appendChild(sidebar);
content.appendChild(container);


export default function create_project(name, description = null) {
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
        let flag = false;
        for (let i = tasklist.length - 1; i >= 0; i--) {
            if (tasklist[i].name === name) {
                flag = true;
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
        return flag;
    }
    function change_priority(name, new_priority) {
        let task = tasklist.find(task => task.name === name);
        task.priority = new_priority;
    }
    return { name, description, tasklist, add_task, remove_task, change_priority };
};
let project_array = [];
project_array.push(create_project('No project'));


project_array[0].add_task('Study', 'Study hard', 1, '12/03/2022');
project_array[0].add_task('Christmas', 'Clean', 3, '12/25/2021');
project_array[0].add_task('room', 'Clean', 3, '8/18/2021');
project_array[0].add_task('Spa', 'mud bath :-)', 3, '8/23/2021');

project_array.push(create_project('JS fundamentals'));
project_array[1].add_task('learn factory functions','theodinproject.com',2,'9/19/2021');
project_array[1].add_task('write better code','write better code, and dont be redundant, and dont repeat stuff',2,'9/19/2051');



home().populate(container, project_array);
let home_button = document.querySelectorAll('.sidebar_contents')[0];
home_button.onclick = function () {
    while (container.lastElementChild) {
        if (container.lastElementChild.classList.contains('addtaskcard'))
            break;
        container.removeChild(container.lastElementChild);
    }

    home().populate(container, project_array);
};
let today_button = document.querySelectorAll('.sidebar_contents')[1];
today_button.onclick = function () {
    while (container.firstElementChild) {
        container.removeChild(container.firstElementChild);
    }
    let currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    let task_arr = [];
    project_array.forEach(project => {
        project.tasklist.forEach(task => {
            let d = new Date(task.date);
            // console.log(d);
            if (d instanceof Date && d.getTime() === currentdate.getTime()) {

                task_arr.push(task);
            }
        });
    });

    task_arr.sort(function (task1, task2) {
        if (task1.priority > task2.priority)
            return -1;
        else if (task1.priority < task2.priority)
            return 1;
        return 0;
    });

    task_arr.forEach(task => {
        container.appendChild(home().create_taskcard(task));
    });

};
let thisweek_button = document.querySelectorAll('.sidebar_contents')[2];
thisweek_button.onclick = function () {
    while (container.firstElementChild) {
        container.removeChild(container.firstElementChild);
    }
    let task_arr = [];
    function isThisWeek(date) {
        const now = new Date();

        const weekDay = (now.getDay() + 6) % 7; // Make sure Sunday is 6, not 0
        const monthDay = now.getDate();
        const mondayThisWeek = monthDay - weekDay;

        const startOfThisWeek = new Date(+now);
        startOfThisWeek.setDate(mondayThisWeek);
        startOfThisWeek.setHours(0, 0, 0, 0);

        const startOfNextWeek = new Date(+startOfThisWeek);
        startOfNextWeek.setDate(mondayThisWeek + 7);

        return date >= startOfThisWeek && date < startOfNextWeek;
    }
    project_array.forEach(project => {
        project.tasklist.forEach(task => {
            let d = new Date(task.date);
            // console.log(d);
            if (d instanceof Date && isThisWeek(d))
                task_arr.push(task);
        });
    });

    task_arr.sort(function (task1, task2) {
        if (task1.priority > task2.priority)
            return -1;
        else if (task1.priority < task2.priority)
            return 1;
        return 0;
    });

    task_arr.forEach(task => {
        container.appendChild(home().create_taskcard(task));
    });
}
let projects_button = document.querySelectorAll('.sidebar_contents')[3];
projects_button.onclick = function () {
    while (container.firstElementChild)
        container.removeChild(container.firstElementChild);
    project_screen().populate(container, project_array);


};

