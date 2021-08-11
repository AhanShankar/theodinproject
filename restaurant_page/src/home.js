import './home.css';
import FounderImage from './haji_murad.jpg';
function get_about() {
    let home_container = document.createElement('div');
    home_container.id = 'home';
    let about_text = document.createElement('article');
    about_text.textContent = 'Tunday Kababy was established in 1905 in the crisscrossed lanes of Chowk area by Haji Murad Ali where it is still today. The best point with Tunday Kababy is that the food point has miraculously preserved the original taste and flavor of its kababs, it was only after keeping themselves confined to a remote corner in Chowk old Lucknow for nine long decades. Although all our dishes are tasty but if we talk about specialty for Tunday then for sure it will our kebabs. Hazi murad ali had invented this recipe approximately more than 100 year ago to fulfill requirement of Nawab of Lucknow. The recipe contains more than 160 spices in it and the recipe passed down to generation to generation by the ladies of the house. The quality of our kebabs is the softness and gets melt in your mouth.';
    about_text.id = 'home_text';

    let meetfounderheading = document.createElement('h2');
    meetfounderheading.textContent = 'Meet our Founder';

    let foundersection = document.createElement('div');
    foundersection.id = 'foundersection';


    let foundertext = document.createElement('div');
    foundertext.id = 'foundertext';
    foundertext.textContent = 'Haji Rais Ahmad is the only person who got the secret recipe from his father and preserved the original taste of Tunday Kabab till today. Haji Rais Ahmad was born in 1955 and started helping his father in his business since he was only 8 year old little boy. Now he is 60 year old but still busy to spread original Tunday Kabab\'s to the people who loves Kabab.'

    let founderimage=new Image(300,300);
    founderimage.src=FounderImage;
    founderimage.id='founderimage';

    foundersection.appendChild(founderimage);
    foundersection.appendChild(foundertext);

    home_container.appendChild(about_text);
    home_container.appendChild(meetfounderheading);
    home_container.appendChild(foundersection);

    return home_container;

}

export default get_about;