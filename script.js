const sideMenu= document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggle = document.querySelector(".themeToggler")

//show sidebar
menuBtn.addEventListener('click', ()=>{
    sideMenu.style.display='block';
})

closeBtn.addEventListener('click', ()=>{
    sideMenu.style.display='none';
})

// set dark color theme