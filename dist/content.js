<<<<<<< HEAD
(()=>{"use strict";window.addEventListener("DOMContentLoaded",(e=>{fetch("./assets/trigger_db.json").then((e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return e.json()})).then((e=>console.log(e))).catch((e=>console.error("Unable to fetch data:",e))),function(){let e=!1;chrome.storage.sync.get(["blockedWords"],(t=>{const o=t.blockedWords||[];!function t(n){if(n.nodeType===Node.TEXT_NODE){let t=n.textContent||"";o.forEach((o=>{const n=new RegExp(`\\b${o}\\w{0,2}\\b`,"gi");n.test(t)&&(e=!0,t=t.replace(n,(e=>"*".repeat(e.length))))})),n.textContent=t}else n.nodeType===Node.ELEMENT_NODE&&(["SCRIPT","STYLE","NOSCRIPT"].includes(n.nodeName)||n.childNodes.forEach(t))}(document.body),e&&alert("Cette page contient des mots bloqués !")}))}()}))})();
=======
(()=>{"use strict";(()=>{var e;function t(e){localStorage.setItem("wordList",JSON.stringify(e))}function n(){const e=localStorage.getItem("wordList");return e?JSON.parse(e):[]}function o(){const e=n(),d=document.getElementById("wordList"),c=document.getElementById("wordItemTemplate");d&&c&&(d.innerHTML="",e.forEach((e=>{const r=document.importNode(c.content,!0),i=r.querySelector(".word-text"),s=r.querySelector(".remove-word-button");i&&s&&(i.textContent=e,s.addEventListener("click",(()=>{!function(e){t(n().filter((t=>t!==e)))}(e),o()})),d.appendChild(r))})))}window.addEventListener("DOMContentLoaded",(e=>{!function(){let e=!1;chrome.storage.sync.get(["blockedWords"],(t=>{const n=t.blockedWords||[];!function t(o){if(o.nodeType===Node.TEXT_NODE){let t=o.textContent||"";n.forEach((n=>{const o=new RegExp(`\\b${n}\\w{0,2}\\b`,"gi");o.test(t)&&(e=!0,t=t.replace(o,(e=>"*".repeat(e.length))))})),o.textContent=t}else o.nodeType===Node.ELEMENT_NODE&&(["SCRIPT","STYLE","NOSCRIPT"].includes(o.nodeName)||o.childNodes.forEach(t))}(document.body),e&&alert("Cette page contient des mots bloqués !")}))}()})),window.addEventListener("DOMContentLoaded",(()=>{o()})),null===(e=document.getElementById("addWordButton"))||void 0===e||e.addEventListener("click",(()=>{const e=document.getElementById("wordInput"),d=e.value.trim();d&&(function(e){const o=n();o.includes(e)||(o.push(e),t(o))}(d),e.value="",o())}))})()})();
>>>>>>> 5c79dc4597d5c80a33440b3c45568b7613816dd5
