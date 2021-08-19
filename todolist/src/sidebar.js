import './sidebar.css';

function get_sidebar() {
    let sidebar = document.createElement('div');
    sidebar.id = 'sidebar';

    let homebutton = document.createElement('div');
    homebutton.textContent = 'Home';
    homebutton.classList.add('sidebar_contents');

    let todaybutton = document.createElement('div');
    todaybutton.textContent = 'Today';
    todaybutton.classList.add('sidebar_contents');

    let weekbutton = document.createElement('div');
    weekbutton.textContent = 'This week';
    weekbutton.classList.add('sidebar_contents');

    let projectsbutton = document.createElement('div');
    projectsbutton.textContent = 'Projects';
    projectsbutton.classList.add('sidebar_contents');

    sidebar.appendChild(homebutton);
    sidebar.appendChild(todaybutton);
    sidebar.appendChild(weekbutton);
    sidebar.appendChild(projectsbutton);

    
    return sidebar;
}

export default get_sidebar;