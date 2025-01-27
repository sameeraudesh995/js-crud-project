const themeToggle = document.querySelector(".theme-toggler")

// set dark color theme
themeToggle.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme-variables');

    themeToggle.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggle.querySelector('span:nth-child(2)').classList.toggle('active');
})
