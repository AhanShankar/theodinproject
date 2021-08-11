import get_about from './home'
import './menu.css'
import Tunday_Kabab_pic from './tunday-kabab.jpg';
import Mughlai_paratha_pic from './mughlai_paratha.jpg';
import Biryani_pic from './biryani.jpeg';
import kebab_paratha_pic from './kabab-paratha.jpeg';

function get_menu_item(img, item_name, item_description) {
    let menu_item = document.createElement('div');
    menu_item.classList.add('menu_item');

    let item_image = new Image(150, 150);
    item_image.src = img;

    let item_name_div = document.createElement('div');
    item_name_div.textContent = item_name;
    item_name_div.classList.add('item_name');

    let item_description_div = document.createElement('div');
    item_description_div.textContent = item_description;
    item_description_div.classList.add('item_description');

    menu_item.appendChild(item_image);
    menu_item.appendChild(item_name_div);
    menu_item.appendChild(item_description_div);

    return menu_item;
}
function get_menu() {
    let menu_container = document.createElement('div');

    let menu_items_array = [
        [
            Tunday_Kabab_pic, 'Tunday kabab', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.'
        ],
        [
            Mughlai_paratha_pic, 'Mughlai Paratha', 'Parathas made on inverted kadhais'
        ],
        [
            Biryani_pic,'Biryani','Rice cooked with chicken and spices'
        ],
        [
            kebab_paratha_pic,'Kebab Paratha Combo','Traditional combination of kebabas and parathas'
        ]
    ];
    // let tunday_kabab = get_menu_item(Tunday_Kabab_pic, 'Tunday Kabab', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.');
    // menu_container.appendChild(tunday_kabab);

    menu_items_array.forEach(
        function (menu_item) {
            menu_container.appendChild(get_menu_item(menu_item[0], menu_item[1], menu_item[2]));
        }
    );

    return menu_container;
}


export default get_menu;