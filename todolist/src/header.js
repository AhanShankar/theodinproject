import './header.css';
import mountains from './mountains.jpg';

function get_header() {
    let header = document.createElement('div');
    header.id = 'header';

    let mountains_img=new Image(2600,700);
    mountains_img.src=mountains;
    
    let header_title=document.createElement('div');
    header_title.id='header_title';
    header_title.textContent='Get it Done';

    let header_quote_div=document.createElement('div');
    header_quote_div.id='header_quote_div';
    let quote=document.createElement('p');
    quote.textContent='\"Routine, in an intelligent man, is a sign of ambition\"';
    header_quote_div.appendChild(quote);

    header.appendChild(mountains_img);
    header.appendChild(header_title);
    header.appendChild(header_quote_div);
    return header;
}

 export default get_header;

