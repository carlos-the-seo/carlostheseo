(function(){
  window.__cmReady=true;
  var d=document, w=window, root=d.documentElement;
  var reduce=w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=w.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* split helpers */
  function splitChars(el){
    var t=el.textContent; el.textContent='';
    t.split(/(\s+)/).forEach(function(word){
      if(/^\s+$/.test(word)){el.appendChild(d.createTextNode(' '));return}
      var wspan=d.createElement('span'); wspan.style.display='inline-block'; wspan.style.whiteSpace='nowrap';
      word.split('').forEach(function(c){var s=d.createElement('span');s.className='ch';s.textContent=c;wspan.appendChild(s)});
      el.appendChild(wspan);
    });
    el.querySelectorAll('.ch').forEach(function(c,i){c.style.transitionDelay=(i*28)+'ms'});
  }
  d.querySelectorAll('[data-split]').forEach(function(el,idx){
    splitChars(el);
    if(el.classList.contains('hero__line--b')) el.querySelectorAll('.ch').forEach(function(c,i){c.style.transitionDelay=(180+i*28)+'ms'});
  });
  function splitWords(el){
    var walk=function(node){
      Array.prototype.slice.call(node.childNodes).forEach(function(n){
        if(n.nodeType===3){
          var frag=d.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function(p){
            if(!p) return;
            if(/^\s+$/.test(p)){frag.appendChild(d.createTextNode(p));return}
            var s=d.createElement('span');s.className='w';s.textContent=p;frag.appendChild(s);
          });
          node.replaceChild(frag,n);
        } else if(n.nodeType===1){walk(n)}
      });
    };
    walk(el);
  }
  var words=d.querySelector('[data-words]'); if(words) splitWords(words);

  /* ready */
  var readied=false;
  function ready(){if(readied)return;readied=true;root.classList.add('is-ready')}
  if(reduce){ready()} else {
    var go=function(){setTimeout(ready,650)};
    if(d.fonts&&d.fonts.ready){d.fonts.ready.then(go)} else {go()}
    setTimeout(ready,1800);
  }

  /* nav */
  var nav=d.querySelector('.nav'), lastY=0;
  var burger=d.querySelector('.burger'), menu=d.getElementById('menu');
  function setMenu(open){burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Close menu':'Open menu');menu.hidden=!open;d.body.style.overflow=open?'hidden':''}
  burger.addEventListener('click',function(){setMenu(burger.getAttribute('aria-expanded')!=='true')});
  menu.addEventListener('click',function(e){if(e.target.tagName==='A')setMenu(false)});
  d.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden)setMenu(false)});

  /* clock */
  var clock=d.getElementById('clock');
  function tick(){try{clock.textContent=new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',timeZone:'America/Los_Angeles'})}catch(e){}}
  if(clock){tick();setInterval(tick,15000)}

  /* reveals */
  var els=d.querySelectorAll('.reveal,.sys__card--feature,.contact__big');
  if('IntersectionObserver' in w){
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -10% 0px',threshold:.06});
    els.forEach(function(el){
      var sib=el.parentElement?Array.prototype.indexOf.call(el.parentElement.children,el):0;
      if(el.classList.contains('reveal')) el.style.transitionDelay=Math.min(sib,4)*70+'ms';
      io.observe(el);
    });
  } else els.forEach(function(el){el.classList.add('in')});

  /* scroll-driven */
  var hero=d.querySelector('.hero'), wordEls=words?words.querySelectorAll('.w'):[];
  var aboutImg=d.querySelector('.about__photo img');
  var rows=Array.prototype.slice.call(d.querySelectorAll('.marquee__row')).map(function(r){
    var tr=r.querySelector('.marquee__track'); var clone=tr.cloneNode(true); r.appendChild(clone);
    var clone2=tr.cloneNode(true); r.appendChild(clone2);
    return {el:r,tracks:[tr,clone,clone2],dir:+r.getAttribute('data-dir'),x:0};
  });
  var vel=0, prevY=w.scrollY, ticking=false;

  function onScroll(){
    var y=w.scrollY;
    nav.classList.toggle('is-scrolled',y>10);
    if(menu.hidden) nav.classList.toggle('is-hidden',y>lastY&&y>window.innerHeight*.9);
    lastY=y;
    if(reduce) return;
    var vh=w.innerHeight;
    if(hero){var p=Math.min(Math.max(y/(hero.offsetHeight),0),1);hero.style.setProperty('--hp',p.toFixed(4))}
    if(wordEls.length){
      var r=words.getBoundingClientRect();
      var prog=(vh*.85-r.top)/(r.height+vh*.35);
      var n=Math.floor(Math.min(Math.max(prog,0),1)*wordEls.length*1.05);
      for(var i=0;i<wordEls.length;i++) wordEls[i].classList.toggle('on',i<n);
    }
    if(aboutImg){var ar=aboutImg.parentElement.getBoundingClientRect();if(ar.top<vh&&ar.bottom>0){aboutImg.style.setProperty('--py',((ar.top-vh/2)*-.06).toFixed(1)+'px')}}
  }
  w.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(function(){ticking=false;onScroll()})}},{passive:true});
  onScroll();
  if(reduce&&wordEls.length) wordEls.forEach(function(x){x.classList.add('on')});

  /* marquee loop */
  if(!reduce){
    var widths=rows.map(function(r){return r.tracks[0].offsetWidth});
    w.addEventListener('resize',function(){widths=rows.map(function(r){return r.tracks[0].offsetWidth})});
    (function loop(){
      var y=w.scrollY; var dv=y-prevY; prevY=y; vel+=(dv-vel)*.12;
      rows.forEach(function(r,i){
        var wd=widths[i]||1;
        r.x+=r.dir*(0.6+Math.min(Math.abs(vel),40)*.18);
        if(r.x<=-wd) r.x+=wd; if(r.x>0) r.x-=wd;
        var tf='translate3d('+r.x.toFixed(2)+'px,0,0) skewX('+(Math.max(Math.min(vel*-.15,8),-8)).toFixed(2)+'deg)';
        r.tracks.forEach(function(t){t.style.transform=tf});
      });
      requestAnimationFrame(loop);
    })();
  }

  /* pointer effects */
  if(fine&&!reduce){
    var cur=d.querySelector('.cursor'), dot=cur.querySelector('.cursor__dot'), ring=cur.querySelector('.cursor__ring');
    var mx=-100,my=-100,rx=-100,ry=-100;
    w.addEventListener('mousemove',function(e){cur.classList.add('is-on');mx=e.clientX;my=e.clientY;dot.style.transform='translate3d('+mx+'px,'+my+'px,0)'},{passive:true});
    (function follow(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.transform='translate3d('+rx.toFixed(1)+'px,'+ry.toFixed(1)+'px,0)';requestAnimationFrame(follow)})();
    d.addEventListener('mouseover',function(e){
      var t=e.target;
      cur.classList.toggle('is-open',!!t.closest('.build'));
      cur.classList.toggle('is-link',!t.closest('.build')&&!!t.closest('a,button,label,input,textarea'));
    });
    if(hero) hero.addEventListener('mousemove',function(e){var r=hero.getBoundingClientRect();hero.style.setProperty('--mx',(e.clientX-r.left)+'px');hero.style.setProperty('--my',(e.clientY-r.top)+'px')});
    d.querySelectorAll('.build').forEach(function(b){
      var m=b.querySelector('.build__media');
      b.addEventListener('mousemove',function(e){var r=m.getBoundingClientRect();var px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;m.style.setProperty('--ry',(px*7).toFixed(2)+'deg');m.style.setProperty('--rx',(py*-7).toFixed(2)+'deg')});
      b.addEventListener('mouseleave',function(){m.style.setProperty('--ry','0deg');m.style.setProperty('--rx','0deg')});
    });
    d.querySelectorAll('.sys__card').forEach(function(c){
      c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--cx',(e.clientX-r.left)+'px');c.style.setProperty('--cy',(e.clientY-r.top)+'px')});
    });
    d.querySelectorAll('.btn,.svc__go').forEach(function(b){
      b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();var x=(e.clientX-r.left-r.width/2)*.18,y=(e.clientY-r.top-r.height/2)*.25;b.style.transform='translate('+x.toFixed(1)+'px,'+y.toFixed(1)+'px)'});
      b.addEventListener('mouseleave',function(){b.style.transform=''});
    });
  }

  /* topic links + form */
  d.querySelectorAll('[data-topic]').forEach(function(a){a.addEventListener('click',function(){var r=d.querySelector('.chips input[value="'+a.getAttribute('data-topic')+'"]');if(r)r.checked=true})});
  var form=d.getElementById('contact-form');
  form.addEventListener('submit',function(e){
    e.preventDefault(); var ok=true;
    ['name','email','message'].forEach(function(n){var f=form.elements[n],wr=f.closest('.field');var bad=!f.value.trim();wr.classList.toggle('is-error',bad);if(bad&&ok){f.focus();ok=false}});
    if(!ok) return;
    var topic=form.querySelector('input[name=topic]:checked').value, biz=form.elements.business.value.trim();
    var body='Hi Carlos,\n\n'+form.elements.message.value.trim()+'\n\n'+(biz?'Business: '+biz+'\n':'')+'From: '+form.elements.name.value.trim();
    var mailto='mailto:seo@carlosmorones.com?subject='+encodeURIComponent(topic+' inquiry')+'&body='+encodeURIComponent(body);
    var btn=form.querySelector('button[type=submit],button'); if(btn){btn.disabled=true}
    var payload={name:form.elements.name.value.trim(),email:(form.elements.email&&form.elements.email.value.trim())||'',website:biz,service:topic,message:form.elements.message.value.trim()};
    if(!payload.email){w.location.href=mailto;if(btn)btn.disabled=false;return}
    fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
      .then(function(r){if(!r.ok)throw 0;if(w.gtag)w.gtag('event','generate_lead',{form:'home_contact',service:topic});w.location.href='/thank-you/'})
      .catch(function(){w.location.href=mailto})
      .then(function(){if(btn)btn.disabled=false});
  });
  var yr=d.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();
})();
