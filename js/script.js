const sideMenu= document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggle = document.querySelector(".theme-toggler")

//show sidebar
menuBtn.addEventListener('click', ()=>{
    sideMenu.style.display='block';
})

closeBtn.addEventListener('click', ()=>{
    sideMenu.style.display='none';
})

// set dark color theme
themeToggle.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme-variables');

    themeToggle.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggle.querySelector('span:nth-child(2)').classList.toggle('active');
})

//menu navigation

const sideMenuItems = document.querySelectorAll('.side-menu');

// Loop through each item and add a click event listener
sideMenuItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove 'active' class from all items
    sideMenuItems.forEach(menu => menu.classList.remove('active'));

    // Add 'active' class to the clicked item
    item.classList.add('active');
  });
});