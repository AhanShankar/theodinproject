import './index.css';
import get_header from './header';
import get_sidebar from './sidebar.js';
import get_container from './container.js';

let content=document.getElementById('content');
let header=get_header();
let sidebar=get_sidebar();
let container=get_container();

content.appendChild(header);
content.appendChild(sidebar);
content.appendChild(container);


