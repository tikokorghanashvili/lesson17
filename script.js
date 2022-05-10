
let mainWraperPost=document.getElementById('post-block');
let overlaycontent=document.getElementById('overlay');
let closeoverlay=document.getElementById('close');
let content=document.getElementById('content');
let addbutton=document.getElementById('add');
let postoverlay=document.getElementById('postoverlay');
let form=document.getElementById('form');


// https://jsonplaceholder.typicode.com/posts

// ფუნქცია აგზავნის მოთხოვნას სერვერზე
function ajax(url, callback){
    let requist=new XMLHttpRequest();
    requist.open('GET','url');
    requist.addEventListener('load',function(){
        let data=JSON.parse(requist.responseText);
        callback(data);
    });

    requist.send();
}
ajax('https://jsonplaceholder.typicode.com/posts', function(data){
    printdata(data);
});

function printdata(data){
    data.forEach(element => {
        createPost(element);
    });
}



// ფუნქცია ქმნის პოსტებს ჯს-დან
function createPost(item){
    let divwraper=document.createElement('div');
    divwraper.classList.add('posts');
    divwraper.setAttribute('data-id', item.id);

    let h2tag=document.createElement('h2');
    h2tag.innerText=item.id;

    let h3tag=document.createElement('h3');
    h3tag.innerText=item.title;

    let deletebtn=document.createElement('button');
    deletebtn.innerText='delete post';
    deletebtn.setAttribute('data-id', item.id);

    divwraper.appendChild(h2tag);
    divwraper.appendChild(h3tag);
    divwraper.append(deletebtn);

    divwraper.addEventListener('click',function(event){
        let id =event.target.getAttribute('data-id');
        openoverlay(id);
    })

    deletebtn.addEventListener('click',function(event){
        event.stopPropagation();
        let id=event.target.getAttribute('data-id');
        deletePost(id);
    })

    mainWraperPost.appendChild(divwraper);

    console.log(divwraper);
}

function openoverlay(id){
    overlaycontent.classList.add('active');
    let url=`https://jsonplaceholder.typicode.com/posts/${id}`;

    ajax(url,function(data){
        overlayfunction(data);
    })
    console.log(id);
}

function deletePost(id){
    let url=`https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(url,{
        method:'delete'
    })
}

function overlayfunction(item){
    let titlepost=document.createElement('h3');
    titlepost.innerText=item.title;

    let p=Document.createElement('p');
    p.innerText=item.body;

    content.appendChild(titlepost);
    content.appendChild(p);
    content.innerHTML=" ";

}

closeoverlay.addEventListener('click',function(){
    overlaycontent.classList.remove('active');
})

addbutton.addEventListener('click',function(){
    postoverlay.classList.add('active-add');
})

form.addEventListener('submit',function(event){
    event.preventDefault();
    console.log(event.target);

    let formdata={
        title:event.target[0].value;
        description:event.target[1].value;
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringif(formdata),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
    .then((response) => response.json())
    .then((json) => console.log(json));
        postoverlay.classList.remove('active-add');
        console.log(formdata);
})