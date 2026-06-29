(function(){
  var f=document.getElementById('rsdHeroFrame');
  if(!f||f.dataset.wired)return; f.dataset.wired='1';
  function play(){
    if(f.dataset.playing)return; f.dataset.playing='1';
    var i=document.createElement('iframe');
    i.className='rsd-hero-iframe';
    i.src='https://www.youtube-nocookie.com/embed/kydN5OnSwqI?autoplay=1&rel=0&modestbranding=1&playsinline=1';
    i.title='Real Space Digital';
    i.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    i.setAttribute('allowfullscreen','');
    f.innerHTML=''; f.appendChild(i); f.style.cursor='default';
  }
  f.addEventListener('click',play);
  f.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();play();}});
})();