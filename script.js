window.addEventListener(
"scroll",
()=>{

document.querySelectorAll(
"section"
).forEach(
(section)=>{

let top =
section.getBoundingClientRect().top;


if(top < window.innerHeight-100){

section.style.opacity="1";

}

}

)

}

);



document.querySelectorAll(
"section"
).forEach(
s=>{

s.style.transition=
"opacity .8s";

s.style.opacity="0";

}

);
