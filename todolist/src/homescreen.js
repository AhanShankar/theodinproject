
import './homescreen.css';

let prioritycolor = ['rgb(137 137 137)', '#5ba55b', '#dfdf45', '#d90d0d'];
export function create_addtaskcard() {
    let taskcard = document.createElement('div');
    taskcard.classList.add('taskcard');
    taskcard.classList.add('addtaskcard');



    let task_name_input = document.createElement('input');
    task_name_input.type = 'text';
    task_name_input.id = 'tasknameinput';
    task_name_input.placeholder = 'Name';
    task_name_input.classList.add('addtaskinputs');
    task_name_input.spellcheck = false;

    let task_des_input = document.createElement('input');
    task_des_input.type = 'text';
    task_des_input.classList.add('addtaskinputs');
    task_des_input.placeholder = 'Description';
    task_des_input.spellcheck = false;

    let task_date_input = document.createElement('input');
    task_date_input.type = 'text';
    task_date_input.classList.add('addtaskinputs');
    task_date_input.placeholder = 'Date(MM/DD/YYYY format)';
    task_date_input.id = 'taskdateinput';

    let setprioritydiv = document.createElement('div');
    setprioritydiv.id = 'setprioritydiv';

    let redpriority = document.createElement('div');
    redpriority.style.backgroundColor = 'red';
    redpriority.classList.add('prioritysetters');
    redpriority.id = '3';

    let yellowpriority = document.createElement('div');
    yellowpriority.style.backgroundColor = 'yellow';
    yellowpriority.classList.add('prioritysetters');
    yellowpriority.id = '2';

    let greenpriority = document.createElement('div');
    greenpriority.style.backgroundColor = 'green';
    greenpriority.classList.add('prioritysetters');
    greenpriority.id = '1';

    redpriority.onclick = function () {
        if (redpriority.classList.contains('checked'))
            redpriority.classList.remove('checked');
        else
            redpriority.classList.add('checked');
    }
    yellowpriority.onclick = function () {
        if (yellowpriority.classList.contains('checked'))
            yellowpriority.classList.remove('checked');
        else
            yellowpriority.classList.add('checked');
    }
    greenpriority.onclick = function () {
        if (greenpriority.classList.contains('checked'))
            greenpriority.classList.remove('checked');
        else
            greenpriority.classList.add('checked');
    }
    let submitbutton = document.createElement('button');
    submitbutton.id = 'submitbutton';
    submitbutton.textContent = 'add';
    setprioritydiv.appendChild(redpriority);
    setprioritydiv.appendChild(yellowpriority);
    setprioritydiv.appendChild(greenpriority);
    setprioritydiv.appendChild(submitbutton);

    taskcard.appendChild(task_name_input);
    taskcard.appendChild(task_des_input);
    taskcard.appendChild(task_date_input);
    taskcard.appendChild(setprioritydiv);
    return taskcard;
}
function create_taskcard(task) {

    let taskcard = document.createElement('div');
    taskcard.classList.add('taskcard');

    let priority_div = document.createElement('div');
    priority_div.classList.add('priority');
    taskcard.appendChild(priority_div);
    priority_div.style['backgroundColor'] = prioritycolor[task.priority];

    let task_description = document.createElement('div');
    if (task.description === "")
        task.description = "No description";
    task_description.classList.add('taskdescription');
    // task_description.textContent = task.name;
    let task_name = document.createElement('div');
    task_name.textContent = task.name;

    let task_date = document.createElement('div');
    task_date.textContent = task.date;

    task_description.appendChild(task_name);
    task_description.appendChild(task_date);
    task_date.classList.add('taskdate');


    taskcard.appendChild(task_description);


    task_description.onmouseenter = function () {

        task_description.removeChild(task_name);
        // try{(task_description.removeChild(task_name))}
        // catch(err){console.log(err);}
        task_description.removeChild(task_date);
        let description = document.createElement('div');
        description.textContent = task.description;
        task_description.appendChild(description);

    };
    task_description.onmouseleave = function () {
        if (task_description.firstChild)
            task_description.removeChild(task_description.firstChild);
        task_description.appendChild(task_name);
        task_description.appendChild(task_date);
    };
    return taskcard;
}

export default function home() {

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
    function populate(container, project_array) {
        let addtask_card = create_addtaskcard();
        addtask_card.querySelector('#submitbutton').onclick = function () {
            let inputs = Array.from(container.querySelectorAll('.addtaskinputs'));
            if (checkinput(inputs[0].value, inputs[1].value, inputs[2].value)) {
                let temp = document.getElementById('setprioritydiv').querySelectorAll('.prioritysetters');
                let p = 0;
                (Array.from(temp)).forEach(function (color, i) {
                    if (color.classList.contains('checked')) {
                        p = color.id;

                    }
                });
                project_array[0].add_task(inputs[0].value, inputs[1].value, p, inputs[2].value);
                while (container.lastElementChild) {
                    // if (container.lastElementChild.classList.contains('addtaskcard'))
                    //     break;
                    container.removeChild(container.lastElementChild);
                }

                home().populate(container, project_array);
                inputs.forEach(input_field => {
                    input_field.value = '';
                });

            }
        };

        if ((container.querySelectorAll('.addtaskcard')).length === 0) {
            container.appendChild(addtask_card);
        }
        // else
        // {
        //    let temp= container.querySelectorAll('.addtaskcard');
        //    container.removeChild(temp);
        // }
        let task_arr = [];
        project_array.forEach(project => {
            project.tasklist.forEach(task => {
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
            container.appendChild(create_taskcard(task));

        });
    }
    return { populate, create_taskcard };
}