let bookarray=[];
let pastelcolors=['#FFDFD3','rgba(88, 225, 230)','#FEC8D8','#E0BBE4','#957DAD','#D291BC','#CADECD','#DDE6CF',' #A1E2D2'];

let optionsdiv=document.createElement('div');
optionsdiv.id='optionsdiv';

let deleteicon=document.createElement('img');
deleteicon.id='deleteicon';
deleteicon.src='deleteicon.png';

let editicon=document.createElement('img');
editicon.id='deleteicon';
editicon.src='editicon.png';

optionsdiv.appendChild(deleteicon);optionsdiv.appendChild(editicon);
function book(title,author,totalpages,pagesread)
{
    this.title=title;
    this.author=author;
    this.totalpages=totalpages;
    this.pagesread=pagesread;
}
book.prototype.pagesremaining=function()
{
    return this.totalpages-this.pagesread;
};
// bookicon=document.getElementById('addbookicon');
document.getElementById('addbookicon').onclick=function()//open form using icon
{
    let modalform=document.getElementsByClassName('modal');
    modalform[0].style['display']='block';
    modalform[0].animate([{opacity:'0%'},{opacity:'100%'}],{duration:150});
   // addbook();
}
function addbook()//submit
{
        let  form=document.getElementById('bookform');
        let bookobject= new book(form.bookname.value,form.authorname.value,form.pages.value,form.pagesread.value);
        bookarray.push(bookobject);
        displayonscreen(bookobject);
      
    document.getElementsByClassName('modal')[0].style['display']='none';
    form.reset();
}
function editbook(bookdiv)
{
    let modalform=document.getElementsByClassName('modal');
    modalform[0].style['display']='block';
    let  form=document.getElementById('bookform');
    let parray=bookdiv.querySelectorAll('p');
    document.getElementById('submitbutton').onclick=function()
    {
        parray[0].textContent=form.bookname.value;
        parray[1].textContent=form.authorname.value;
        parray[2].textContent=pagestatusformat(form.pages.value,form.pagesread.value);
        document.getElementsByClassName('modal')[0].style['display']='none';
        form.reset();
    }
}
document.getElementById('submitbutton').onclick=function(){addbook();};
document.getElementById('closebutton').onclick=()=>//close form
{
    let modalform=document.getElementsByClassName('modal')[0].style['display']='none';
};
function pagestatusformat(pagesread,totalpages)//fomrat page status for large values
{
    if(pagesread>=1000000 && totalpages>=1000000)
   {
       pagesread/=1000000; totalpages/=1000000;
        if(pagesread%1!==0)
            pagesread=pagesread.toFixed(1);
        if(totalpages%1!==0)
            totalpages=totalpages.toFixed(1);
       pagesread+='M';totalpages+='M';
   }
    else if(pagesread>=100000 && totalpages>=100000)
    {
        pagesread/=1000; totalpages/=1000;
        if(pagesread%1!==0)
            pagesread=pagesread.toFixed(1);
        if(totalpages%1!==0)
            totalpages=totalpages.toFixed(1);
        pagesread+='K';totalpages+='K';
    }

    return `${pagesread}/${totalpages}`;
}
function displaybookoptions(bookcontainer)
{
    bookcontainer.appendChild(optionsdiv);
deleteicon.animate([
    { transform: 'translateX(0px)' },
    { transform: 'translateX(70px)' }
  ], {
    duration: 300,
    fill:'forwards',
    iterations:1,
  });
  editicon.animate([
    { transform: 'translateX(0px)' },
    { transform: 'translateX(70px)' }
  ], {
    duration: 300,
    fill:'forwards',
    iterations:1,
  });
}
function hidebookoptions(bookcontainer){
    
deleteicon.animate([
    { transform: 'translateX(0px)' }
    //{ transform: 'translateX(-70px)' }
  ], {
    duration: 300,
    fill:'forwards',
    iterations:1,
  });
  editicon.animate([
    { transform: 'translateX(0px)' }
   // { transform: 'translateX(-70px)' }
  ], {
    duration: 300,
    fill:'forwards',
    iterations:1,
  });
}
function displayonscreen(bookobj)
{
    let bookcontainer=document.createElement('div');
    let bookdiv=document.createElement('div');
    let booktitle=document.createElement('p');
    let bookauthor=document.createElement('p');
    let pagestatus=document.createElement('p');
    
    pagestatus.textContent=pagestatusformat(bookobj.pagesread,bookobj.totalpages);
    pagestatus.style['writing-mode']='horizontal-tb';
    pagestatus.style['margin']='5px 10px 5px 10px';
    pagestatus.style['word-break']='break-word';
    
    booktitle.textContent=bookobj.title.toUpperCase();
    booktitle.style['margin']='10px 10px auto 10px';
    booktitle.style['text-align']='left';
    
    bookauthor.textContent=bookobj.author;
    // bookauthor.style['align-items']='space-around';
    bookauthor.style['margin']='auto 10px 10px 10px';
    bookauthor.style['text-align']='right'; 
    
    bookdiv.style['background-color']=pastelcolors[Math.floor(Math.random() * pastelcolors.length)];
    bookdiv.appendChild(booktitle);bookdiv.appendChild(bookauthor);bookdiv.appendChild(pagestatus);
    bookdiv.onclick=function(){expandbook(this);};
    bookdiv.classList.add('book');

    bookcontainer.appendChild(bookdiv);
    // bookcontainer.appendChild(optionsdiv);
    bookcontainer.classList.add('bookcontainer');
    bookcontainer.onmouseenter=function(){displaybookoptions(this);};
    bookcontainer.onmouseleave=function(){
        hidebookoptions(this);
    };
    document.getElementById('bookshelf').appendChild(bookcontainer);
}

function expandbook(bookdiv)
{
    bookdiv.classList.remove('book');
    bookdiv.classList.add('expandedbook');
    bookdiv.querySelector('p').style['font-weight']='900';
    bookdiv.querySelectorAll('p')[2].style['font-size']='10px';
    // bookdiv.booktitle.style['font-weight']='bolder';    
}
deleteicon.onclick=function()
{
    bookcontainer=this.parentElement.parentElement;
    // console.log(bookcontainer);
    // currentbook=bookcontainer.firstChild;
    bookshelf=document.getElementById('bookshelf');
    bookshelf.removeChild(bookcontainer);
}
editicon.onclick=function()
{
    editbook(this.parentElement.parentElement.firstChild);
}