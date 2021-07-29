const calc=document.getElementById('calculator');
buttonsarray=Array.from(calc.children);
// console.log(buttonsarray);
expression='';
function add(a,b){return +a + +b;}
function multiply(a,b){return a*b;}
function subtract(a,b){return a-b;}
function mod(a,b){return a%b;}
function divide(a,b){return a/b;}
function evaluate()
{
    if(expression.length===0)
        return 0;
    splitarray=expression.split(' ');
    //console.table(splitarray);
    if(splitarray[splitarray.length-1]==='')
        return 1%0;
    ans=splitarray[0];
    for(i=1;i<splitarray.length;i+=2)
    {
        if(splitarray[i]=='x')
            ans=multiply(ans,splitarray[i+1]);
        else if(splitarray[i]=='/')
            ans=divide(ans,splitarray[i+1]);
        else if(splitarray[i]=='-')
            ans=subtract(ans,splitarray[i+1]);
        else if(splitarray[i]=='+') 
            ans=add(ans,splitarray[i+1]);
        else if(splitarray[i]=='%')
            ans=mod(ans,splitarray[i+1]);
    }
    return ans; 
}


function clearscreen(div)
{
    let screendiv=document.getElementById('screen');
    expression='';
    if(screendiv.lastChild)
        {
            screendiv.removeChild(screendiv.lastChild);
            expression='';
            return;
        }
    return;
}
function displayonscreen(div)//handles screen,clear and backspace
{
    let screendiv=document.getElementById('screen');

    if(div.id==='decimal')
    {
        spaceindex=expression.lastIndexOf(' ');
        if(spaceindex>0)
        {
            if((expression.slice(spaceindex,spaceindex.length).match(/\./g)||[]).length===0)
                expression+='.';
        }
        else
        {
            if((expression.match(/\./g)||[]).length===0)
            expression+='.';}
        }
    if(div.id==='backspace')
    {
        if(screendiv.lastChild)
        {
            if(expression.slice(-1)!=' ')
                expression=expression.slice(0,-1);
            else
                expression=expression.slice(0,-3);
            let expressionnode=document.createTextNode(expression);
            screendiv.removeChild(screendiv.lastChild);
            screendiv.appendChild(expressionnode);
        }
        return;
    }
    if(div.id==='equal')
        expression=evaluate(expression);

    
    if(div.textContent==='+'||div.textContent==='%'||div.textContent==='/'||div.textContent==='-'||div.textContent==='x')
    {
        if(expression.slice(-1)!=' ' && expression.length!==0)
            expression+=' '+div.textContent+' ';
        else
            return;
    }
    else
    {
        try{
        if (div.textContent.match(/[0-9]/g))
            expression+=div.textContent;
        }
        catch(e){}
    }
    
    let expressionnode=document.createTextNode(expression);
    // expressionnode.style["font-size"]="100px";
    //console.log(expressionnode);
    if(screendiv.lastChild)
        screendiv.removeChild(screendiv.lastChild);
    screendiv.appendChild(expressionnode);
}

buttonsarray.forEach((button,i)=>
{
    if(i)
    {
        if(i<=3)
        {
            button.onmouseover=function(){
                button.style["background"]='red';
                button.classList.add('enlargebutton');
            };
        }
        else if(i%4==0)
        {
            button.onmouseover=function(){
                button.style["background"]='aquamarine';
                button.classList.add('enlargebutton');
            };
        }
        else
        {
            button.onmouseover=function(){
                button.style["background"]='rgb(197, 161, 107)';
                button.classList.add('enlargebutton');
            };
        }
        button.onmouseleave=function(){
            button.style['background']='blanchedalmond';
            button.classList.remove('enlargebutton');
            // button.classList.remove('operator');
        }
    }
    

});
buttonsarray.forEach((button,i)=>
{
    if(i)
    {
        id=button.id;
        if(id==='clear')
        {
            button.onclick=function(){
                button.animate([{transform:'translateY(0px)'},{transform:'translateY(-2px)'}],{duration:300,easing:'ease'});
                clearscreen();};
        }
        else if(id==='equal')
        {
            button.onclick=function(){
            button.animate([{transform:'translateY(0px)'},{transform:'translateY(-2px)'}],{duration:300,easing:'ease'});
            expression=''+evaluate(expression);
            displayonscreen(expression);};
        }
        
        else
        {
        //    button.onclick=displayonscreen(this.id); 
        button.onclick=function() {
            displayonscreen(button);
            button.animate([{transform:'translateY(0px)'},{transform:'translateY(-3px)'}],{duration:300,easing:'ease'});
        };
        }
        
    }
});