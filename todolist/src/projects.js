import './projects.css';
import deleteimage from './deleteicon.png';
import { create_addtaskcard } from './homescreen.js';
import create_project from './index.js';
let prioritycolor = ['rgb(137 137 137)', '#5ba55b', '#dfdf45', '#d90d0d'];

function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};
function checkinput(name, description, date) {
    if (name === "")
        return false;
    let d = new Date(date);
    let currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    if (!(d instanceof Date && d >= currentdate)) {
        // console.log(d);
        return false;
    }
    return true;
};
export default function project_screen() {
    function create_addprojectcard() {
        let addcard = document.createElement('div');
        addcard.classList.add('projectcard');
        let title = document.createElement('p');
        title.textContent = "Add new project";
        title.classList.add('title');
        addcard.appendChild(title);

        let pname_input = document.createElement('input');
        pname_input.type = 'text';
        pname_input.id = 'projectnameinput';
        pname_input.placeholder = 'Project name';

        let addprojectbutton = document.createElement('button');
        addprojectbutton.textContent = 'Add project';
        addprojectbutton.id = 'addprojectbutton';
        addprojectbutton.classList.add('addtaskbutton');

        addcard.appendChild(pname_input);
        addcard.appendChild(addprojectbutton);
        return addcard;

    }
    function create_taskdiv(task) {
        let div = document.createElement('div');
        div.classList.add('projecttask');
        let currdate = new Date(); currdate.setHours(0, 0, 0, 0);
        let d = new Date(task.date);

        let duedate = document.createElement('div');
        let diff = dateDiffInDays(currdate, d);
        if (diff > 0)
            duedate.textContent = `Due in ${diff} days`;
        else if (diff === 0)
            duedate.textContent = `Due in less than a day`;
        else
            duedate.textContent = 'overdue';
        duedate.classList.add('duedate');

        let deleteicon = new Image(15, 15);
        deleteicon.src = deleteimage;
        deleteicon.classList.add('deleteicon');

        let task_name = document.createElement('div');
        task_name.textContent = task.name;
        task_name.classList.add('taskname');
        task_name.style.color = prioritycolor[task.priority];
        task_name.appendChild(deleteicon);

        div.appendChild(task_name);
        div.appendChild(duedate);
        return div;
    }
    function create_projectcard(project) {
        let card = document.createElement('div');
        card.classList.add('projectcard');

        let title = document.createElement('p');
        title.textContent = project.name;
        title.classList.add('title');
        card.appendChild(title);

        let addtask_button = document.createElement('button');
        addtask_button.classList.add('addtaskbutton');
        addtask_button.textContent = 'Add';

        card.appendChild(addtask_button);


        project.tasklist.forEach(task => {
            card.appendChild(create_taskdiv(task));
        });
        return card;
    }

    function populate(container, project_array) {
        let addcard = create_addprojectcard();
        addcard.querySelector('#addprojectbutton').onclick = function () {
            let p_name = addcard.querySelector('#projectnameinput').value;
            if (p_name !== '') {
                project_array.push(create_project(p_name));
                while (container.firstElementChild)
                    container.removeChild(container.firstElementChild);
                populate(container, project_array);
            }
        }
        container.appendChild(addcard);

        project_array.forEach(project => {

            let temp = create_projectcard(project);
            Array.from(temp.querySelectorAll('.deleteicon')).forEach(deleteicon => {
                deleteicon.onclick = function () {
                    let task_name = deleteicon.parentElement.textContent;
                    let project_name = deleteicon.parentElement.parentElement.parentElement.querySelector('p').textContent;
                    project_array.forEach(project => {
                        if (project.name === project_name) {
                            if (project.remove_task(task_name)) {
                                while (container.firstElementChild)
                                    container.removeChild(container.firstElementChild);
                                project_screen().populate(container, project_array);
                                return;
                            }
                        }

                    });
                };
            });

            let addtask_card = create_addtaskcard();
            temp.querySelector('.addtaskbutton').onclick = function () {

                temp.insertBefore(addtask_card, temp.querySelector('.projecttask'));

            }
            addtask_card.querySelector('#submitbutton').onclick = function () {
                let inputs = Array.from(container.querySelectorAll('.addtaskinputs'));
                if (checkinput(inputs[0].value, inputs[1].value, inputs[2].value)) {
                    let temp1 = document.getElementById('setprioritydiv').querySelectorAll('.prioritysetters');
                    let p = 0;
                    (Array.from(temp1)).forEach(function (color, i) {
                        if (color.classList.contains('checked')) {
                            p = color.id;

                        }
                    });
                    project.add_task(inputs[0].value, inputs[1].value, p, inputs[2].value);
                    while (container.firstElementChild)
                        container.removeChild(container.firstElementChild);
                    populate(container, project_array);

                    inputs.forEach(input_field => {
                        input_field.value = '';
                    });
                }
            };
            container.appendChild(temp);
        });
    };
    return { populate };
}