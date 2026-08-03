<script>
//<![CDATA[

(function(){

'use strict';


if(window.WTS_SECURITY_CORE_X) return;

window.WTS_SECURITY_CORE_X = true;


/*
====================================================
 WTS SECURITY CORE X 2026
 Elite Content Protection System
 Blogger Optimized
====================================================
*/


/* ===============================
   CONFIGURATION
================================ */

var CONFIG = {

    toastEnabled:true,

    toastCooldown:4000,

    copyWatermark:true,

    blockSelection:true,

    protectImages:true,

    detectDevTools:true

};



/* ===============================
   TOAST ENGINE
================================ */


var lastToast={};


var toastStack=document.createElement('div');

toastStack.id='wts-toast-stack';

document.body.appendChild(toastStack);



function wtsToast(message,icon){

if(!CONFIG.toastEnabled) return;


var now=Date.now();


if(
lastToast[message] &&
(now-lastToast[message]) < CONFIG.toastCooldown
){

return;

}


lastToast[message]=now;



var box=document.createElement('div');

box.className='wts-toast';


box.innerHTML=

'<span class="wts-toast-icon">'+
(icon||'🔒')+
'</span>'+
'<span class="wts-toast-message">'+
message+
'</span>';



toastStack.appendChild(box);



requestAnimationFrame(function(){

box.classList.add('show');

});



setTimeout(function(){

box.classList.remove('show');


setTimeout(function(){

box.remove();

},400);


},2500);



while(toastStack.children.length>2){

toastStack.firstChild.remove();

}


}



/* ===============================
   SITE INFO
================================ */


var siteName =
(document.title.split('|')[0] || 'Website')
.trim();



/* ===============================
   PROTECTED AREA
================================ */


function isProtected(target){

return target &&
(
target.closest('.post-body') ||
target.closest('.entry-content') ||
target.closest('article')
);

}




/* ===============================
   IMAGE PROTECTION
================================ */


if(CONFIG.protectImages){


document.querySelectorAll('img')
.forEach(function(img){

img.setAttribute(
'draggable',
'false'
);


img.addEventListener(
'dragstart',
function(e){

e.preventDefault();

},
false
);


});


}



/* ===============================
   RIGHT CLICK PROTECTION
================================ */


document.addEventListener(
'contextmenu',
function(e){


if(isProtected(e.target)){


e.preventDefault();


wtsToast(
'Right click is disabled',
'🔒'
);


}


},
false
);




/* ===============================
   DRAG PROTECTION
================================ */


document.addEventListener(
'dragstart',
function(e){


if(isProtected(e.target)){


e.preventDefault();


}


},
false
);



/* ===============================
   TEXT SELECTION CONTROL
================================ */


document.addEventListener(
'selectstart',
function(e){


if(!CONFIG.blockSelection)
return;



var allowed=e.target.closest(
'input,textarea,pre,code,[contenteditable="true"]'
);



if(!allowed && isProtected(e.target)){


e.preventDefault();


}



},
false
);



/* ===============================
   COPY WATERMARK
================================ */


document.addEventListener(
'copy',
function(e){


if(!isProtected(e.target))
return;



var selection=
window.getSelection()
.toString();



if(selection){


var watermark=

'\n\n© '+
siteName+
'\nProtected content.\nSource: '+
location.href;



if(CONFIG.copyWatermark){


e.clipboardData.setData(
'text/plain',
selection+watermark
);


e.preventDefault();



wtsToast(
'Content protection applied',
'🛡'
);


}


}



},
false
);



/* ===============================
   KEYBOARD PROTECTION
================================ */


document.addEventListener(
'keydown',
function(e){


var key=
(e.key||'')
.toLowerCase();



var blocked =

(e.ctrlKey||e.metaKey)
&&
[
'c',
'u',
's'
]
.includes(key);



var inspect =

key==='f12'
||
(
(e.ctrlKey||e.metaKey)
&&
e.shiftKey
&&
[
'i',
'j'
]
.includes(key)
);



if(blocked || inspect){


e.preventDefault();



wtsToast(
'This action is restricted',
'🚫'
);



}


},
false
);

/* ===============================
   MOBILE LONG PRESS CONTROL
================================ */


var pressTimer=null;


document.addEventListener(
'touchstart',
function(e){


if(!isProtected(e.target))
return;



pressTimer=setTimeout(function(){


wtsToast(
'Long press copying is disabled',
'📱'
);



},900);



},
{
passive:true
}
);



document.addEventListener(
'touchend',
function(){


clearTimeout(pressTimer);


},
{
passive:true
}
);



document.addEventListener(
'touchmove',
function(){


clearTimeout(pressTimer);


},
{
passive:true
}
);





/* ===============================
   FRAME HIJACK PROTECTION
================================ */


try{


if(window.top !== window.self){


window.top.postMessage(
'WTS_SECURITY_FRAME_BLOCK',
'*'
);


}



}catch(e){}





/* ===============================
   DEVTOOLS GUARD
================================ */


var devtoolsOpen=false;



function detectDevTools(){


if(!CONFIG.detectDevTools)
return;



var widthDiff =
window.outerWidth -
window.innerWidth;


var heightDiff =
window.outerHeight -
window.innerHeight;



var detected =

widthDiff > 180 ||
heightDiff > 180;



if(detected && !devtoolsOpen){


devtoolsOpen=true;


document.documentElement
.classList.add(
'wts-devtools-active'
);



}



else if(!detected){


devtoolsOpen=false;


document.documentElement
.classList.remove(
'wts-devtools-active'
);



}



}



setInterval(
detectDevTools,
3000
);





/* ===============================
   DEBUGGER TRAP
================================ */


(function(){


var check=function(){


var start=
Date.now();


debugger;


var end=
Date.now();



if(end-start>100){


document.documentElement
.classList.add(
'wts-debugger-detected'
);



}


};



setInterval(
check,
4000
);



})();






/* ===============================
   DOM MUTATION GUARD
================================ */


var protectedObserver =
new MutationObserver(function(records){


records.forEach(function(record){



record.addedNodes
&&
record.addedNodes.forEach(function(node){



if(node.nodeType!==1)
return;



if(node.tagName==='IMG'){


node.setAttribute(
'draggable',
'false'
);



}



});



});



});



protectedObserver.observe(
document.body,
{
childList:true,
subtree:true
}
);






/* ===============================
   BASIC SCRAPER BEHAVIOUR CHECK
================================ */


var userActive=false;


[
'mousemove',
'scroll',
'touchstart',
'keydown'
]
.forEach(function(event){


document.addEventListener(
event,
function(){

userActive=true;

},
{
passive:true
}
);


});




setTimeout(function(){


if(!userActive){


document.documentElement
.classList.add(
'wts-low-activity'
);


}


},15000);






/* ===============================
   PRINT PROTECTION
================================ */


var printStyle=
document.createElement('style');



printStyle.innerHTML=

'@media print{' +

'.post-body,'+
'.entry-content,'+
'article{' +

'visibility:hidden!important;' +

'}'+

'}';



document.head.appendChild(
printStyle
);






/* ===============================
   SECURITY CSS
================================ */


var securityCSS=
document.createElement('style');



securityCSS.innerHTML=`

#wts-toast-stack{

position:fixed;

top:20px;

right:20px;

z-index:999999;

display:flex;

flex-direction:column;

gap:10px;

pointer-events:none;

}



.wts-toast{

background:#111;

color:#fff;

padding:12px 18px;

border-radius:10px;

font-size:14px;

opacity:0;

transform:translateY(-20px);

transition:.35s ease;

box-shadow:0 10px 30px rgba(0,0,0,.25);

display:flex;

align-items:center;

gap:10px;

}



.wts-toast.show{

opacity:1;

transform:translateY(0);

}



.wts-toast-icon{

font-size:18px;

}



.wts-devtools-active .post-body{

filter:blur(1px);

}



`;



document.head.appendChild(
securityCSS
);






/* ===============================
   SECURITY BADGE
================================ */


function createSecurityBadge(){


var article=
document.querySelector(
'.post-body,.entry-content'
);



if(!article)
return;



if(
document.querySelector(
'.wts-security-badge'
)
)
return;




var badge=
document.createElement('div');


badge.className=
'wts-security-badge';



badge.innerHTML=

'🛡 Protected Content';



article.appendChild(
badge
);



}



setTimeout(
createSecurityBadge,
2000
);


 
/* ===============================
   SECURITY BADGE STYLE
================================ */


var badgeCSS =
document.createElement('style');


badgeCSS.innerHTML = `

.wts-security-badge{

margin:35px auto 10px;

width:max-content;

padding:8px 18px;

border-radius:50px;

font-size:13px;

font-weight:600;

background:rgba(0,0,0,.06);

color:#555;

display:flex;

align-items:center;

gap:8px;

user-select:none;

pointer-events:none;

}


@media(max-width:600px){

.wts-security-badge{

font-size:12px;

padding:7px 14px;

}

}


`;


document.head.appendChild(
badgeCSS
);






/* ===============================
   CONTENT INTEGRITY MONITOR
================================ */


var originalTitle =
document.title;



setInterval(function(){


if(document.title !== originalTitle){


document.title =
originalTitle;


}



},5000);






/* ===============================
   BLOCK COMMON SAVE ATTEMPTS
================================ */


document.addEventListener(
'keydown',
function(e){


if(
e.key === 'PrintScreen'
){


wtsToast(
'Screenshot shortcut detected',
'🛡'
);



}



},
false
);






/* ===============================
   CLIPBOARD CLEANUP
================================ */


window.addEventListener(
'beforecopy',
function(){


try{


navigator.clipboard
.writeText('');



}catch(e){}



});







/* ===============================
   DISABLE IMAGE CONTEXT SAVE
================================ */


document.addEventListener(
'mousedown',
function(e){


if(
e.button===2 &&
e.target.tagName==='IMG'
){


e.preventDefault();


}



},
false
);






/* ===============================
   VISIBILITY WATCH
================================ */


document.addEventListener(
'visibilitychange',
function(){


if(document.hidden){


document.documentElement
.classList.add(
'wts-page-hidden'
);



}

else{


document.documentElement
.classList.remove(
'wts-page-hidden'
);



}



});






/* ===============================
   CLEAN MEMORY
================================ */


window.addEventListener(
'beforeunload',
function(){


try{


if(protectedObserver){

protectedObserver.disconnect();

}


}catch(e){}



});







/* ===============================
   FINAL READY EVENT
================================ */


window.WTS_SECURITY_READY = true;



console.log(
'WTS Security Core X 2026 Active'
);



})();



