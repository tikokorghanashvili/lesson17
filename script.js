
let mainWraperPost=document.getElementById('post-block');
let overlaycontent=document.getElementById('overlay');
let closeoverlay=document.getElementById('close');
let content=document.getElementById('content');


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

    divwraper.appendChild(h2tag);
    divwraper.appendChild(h3tag);

    divwraper.addEventListener('click',function(event){
        let id =event.target.getAttribute('data-id');
        openoverlay(id);
    })

    mainWraperPost.appendChild(divwraper);

    console.log(divwraper);
}

function openoverlay(id){
    overlaycontent.classList.add('active');
    let url=`https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(url,function(data){
        console.log(data);
    })
    console.log(id);
}

closeoverlay.addEventListener('click',function(){
    overlaycontent.classList.remove('active');
})