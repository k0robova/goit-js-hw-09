const t=document.body,e=document.querySelector("button[data-start]"),a=document.querySelector("button[data-stop]"),o={start(){this.idSetInterval=setInterval((()=>{e.disabled=!0;const a=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;t.style.backgroundColor=a}),1e3)},stop(){clearInterval(this.idSetInterval),e.disabled=!1}};e.addEventListener("click",(()=>{o.start()})),a.addEventListener("click",(()=>{o.stop()}));
//# sourceMappingURL=01-color-switcher.5711fada.js.map