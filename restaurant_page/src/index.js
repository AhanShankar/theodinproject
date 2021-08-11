import './mainstyle.css';
import get_about from './home.js';
import get_menu from './menu.js';
import get_contact from './contact';
let title = document.createElement('h1');
title.textContent = 'Tunday Kababi';
document.body.insertBefore(title, document.body.firstChild);

let container = document.getElementById('container');


let tabdiv = document.createElement('div');
tabdiv.id = 'tabdiv';
container.appendChild(tabdiv);

let contentdiv = document.createElement('div');
contentdiv.id = 'contentdiv';


container.appendChild(contentdiv);


let homebutton = document.createElement('div'); homebutton.id = 'homebutton'; homebutton.textContent = 'Home';

let menubutton = document.createElement('div'); menubutton.id = 'menubutton'; menubutton.textContent = 'Menu';

let contactbutton = document.createElement('div'); contactbutton.id = 'contactbutton'; contactbutton.textContent = 'Contact Us';
contentdiv.appendChild(get_about());
homebutton.onclick=function()
{
    if(contentdiv.lastElementChild)
    {
        contentdiv.removeChild(contentdiv.lastElementChild);
        contentdiv.appendChild(get_about());
    }
}
menubutton.onclick=function()
{
    if(contentdiv.lastElementChild)
    {
        contentdiv.removeChild(contentdiv.lastElementChild);
        contentdiv.appendChild(get_menu());
    }
}
contactbutton.onclick=function()
{
    if(contentdiv.lastElementChild)
    {
        contentdiv.removeChild(contentdiv.lastElementChild);
        contentdiv.appendChild(get_contact());
    }
}
tabdiv.appendChild(homebutton);
tabdiv.appendChild(menubutton);
tabdiv.appendChild(contactbutton);