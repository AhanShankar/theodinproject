import './contact.css'
import fb_logo from './Facebook-logo.png';

function create_contact_card( img, description) {

    let card = document.createElement('div');
    card.classList.add('card');


    let image=new Image(310,200);
    image.src=img;

    let description_div= document.createElement('div');
    description_div.textContent=description;
    description_div.classList.add('description');

    card.appendChild(image);
    card.appendChild(description_div);

    return card;

}
function get_contact() {

    let contact_container = document.createElement('div');
    contact_container.id = 'contact_container';

    let contact_items_array=[
        [
            fb_logo,'Reach us on Facebook'
        ]
    ];
    contact_items_array.forEach(
        function (contact_item) {
            contact_container.appendChild(create_contact_card(contact_item[0], contact_item[1]));
        }
    );

        return contact_container;
}

export default get_contact;