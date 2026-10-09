document.addEventListener("DOMContentLoaded", () => {
 const drawer=document.getElementById("contentsDrawer"), backdrop=document.getElementById("drawerBackdrop"), toggle=document.getElementById("menuToggle");
 function open(){drawer.classList.add("open");backdrop.classList.add("open");document.body.classList.add("drawer-open");toggle.setAttribute("aria-expanded","true");}
 function close(){drawer.classList.remove("open");backdrop.classList.remove("open");document.body.classList.remove("drawer-open");toggle.setAttribute("aria-expanded","false");}
 toggle.addEventListener("click",open);document.getElementById("closeMenu").addEventListener("click",close);backdrop.addEventListener("click",close);
 drawer.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));
 document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
});
