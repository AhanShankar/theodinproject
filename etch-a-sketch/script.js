
let container=document.getElementById("container");
let slider=document.getElementById('myRange');
let range=slider.value;
setgridsize(range);

slider.onchange=function(){
    while(container.lastChild)
    {
        container.removeChild(container.lastChild);
    }
    setgridsize(this.value);
    document.getElementById("gridsize").innerText=this.value+"x"+this.value;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
rgb=false;
rgbbutton=document.getElementById("RGB");
rgbbutton.onclick=function()
{
    rgb=!rgb;
    
    if(rgb)
        this.innerHTML="RGB patch:on";
    else
        this.innerHTML="RGB patch:off";
}
function setgridsize(range)
{
    let columnsize='repeat('+range+',1fr)';
    let rowsize='repeat('+range+',1fr)';
    container.style["grid-template-columns"]=columnsize;
    container.style["grid-template-rows"]=rowsize;
for( i=0;i<range**2;i++)
{
    let blockdiv=document.createElement('div');
    blockdiv.id="block"+i;
    blockdiv.onmouseover=function(){
        if(!rgb)
        this.setAttribute('style','background-color: black')
        else
        blockdiv.style["background-color"]=getRandomColor();
    };
    container.appendChild(blockdiv);
}

}

clearbutton=document.getElementById('ClearButton');
clearbutton.onclick=function()
{
    let children=document.getElementById("container").childNodes;
    children.forEach(child => {
        // console.log(child.id);
        let re=/^block/;
         if(re.test(child.id) && child.style["background-color"]!=="blanchedalmond")
         {
        child.style["background-color"]="blanchedalmond";
       
         }
        
    });
    
}

