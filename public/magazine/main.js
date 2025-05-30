let navBar = document.getElementById("navbar");

function myFunction(x) {
  x.classList.toggle("change");
  navBar.classList.toggle("open")
}

let switcherli = document.querySelectorAll(".header li");
let conetnt = document.querySelectorAll(".change")


switcherli.forEach((li)=>{
  li.addEventListener("click",removeActive)
  li.addEventListener("click",manageContent)
})

function removeActive(){
  switcherli.forEach((li)=>{
    li.classList.remove("active")
    this.classList.add("active")
  })
}

function manageContent (){
  conetnt.forEach((cont)=>{
    cont.classList.add("remove")
  })
  document.querySelectorAll(`.${this.dataset.cat}`).forEach((con)=>{
    con.classList.remove("remove")
  })
}

let spanSwitchers = document.querySelectorAll(".switcher");
let imgs = document.querySelectorAll(".tech .kill");


spanSwitchers.forEach((span)=>{
  span.addEventListener("click",removeActiveSpan)
  span.addEventListener("click",manageImages)
  
})


function removeActiveSpan(){
  spanSwitchers.forEach((span)=>{
    span.classList.remove("active");
    this.classList.add("active")
  })
}


function manageImages(){
  imgs.forEach((imgss)=>{
    imgss.classList.add("hide")
  })
  document.querySelectorAll(`.${this.dataset.num}`).forEach((imgs)=>{
    imgs.classList.remove("hide")
  })
}

// Slider
var swiper = new Swiper(".swiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

