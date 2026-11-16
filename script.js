(function(){
  var views={home:1,geospatial:1,neuroimaging:1};
  function show(){
    var h=(location.hash||"").replace("#","");
    var v=views[h]?h:"home";
    document.querySelectorAll(".view").forEach(function(el){el.classList.toggle("on",el.id==="v-"+v)});
    window.scrollTo(0,0);
  }
  window.addEventListener("hashchange",show); show();
  function goHome(then){
    if(document.getElementById("v-home").classList.contains("on")){then&&then();return}
    location.hash="home"; setTimeout(function(){then&&then()},60);
  }
  document.querySelectorAll("[data-go]").forEach(function(b){b.addEventListener("click",function(){
    var id=b.getAttribute("data-go");
    goHome(function(){var t=document.getElementById(id); if(t) t.scrollIntoView({behavior:"smooth",block:"start"})});
  })});
  document.querySelectorAll("[data-home]").forEach(function(b){b.addEventListener("click",function(){location.hash="home"})});

  // draggable stickers
  var z=5;
  document.querySelectorAll(".stk").forEach(function(s){
    var x=0,y=0,sx,sy,drag=false;
    s.addEventListener("pointerdown",function(e){drag=true;sx=e.clientX-x;sy=e.clientY-y;s.style.zIndex=++z;s.style.animation="none";s.setPointerCapture(e.pointerId)});
    s.addEventListener("pointermove",function(e){if(!drag)return;x=e.clientX-sx;y=e.clientY-sy;s.style.setProperty("--x",x+"px");s.style.setProperty("--y",y+"px")});
    function end(){drag=false}
    s.addEventListener("pointerup",end);s.addEventListener("pointercancel",end);
  });
})();
