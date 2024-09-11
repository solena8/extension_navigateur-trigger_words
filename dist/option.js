(()=>{"use strict";var e={498:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.blurrImages=function(){!function(){const e=function(){const e=document.querySelector("style#dynamic-stylesheet");if(e)return e.sheet;const t=document.createElement("style");return t.id="dynamic-stylesheet",document.head.appendChild(t),t.sheet}();if(e)try{e.insertRule(".blurred { filter: blur(50px); }",e.cssRules.length)}catch(e){console.error("Error inserting blur rule:",e)}}(),document.querySelectorAll("img").forEach((e=>{e.classList.add("blurred")}))}},481:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.blockWords=n;const r=o(498);function n(){let e=!1,t=0;document.getElementById("wordList")||chrome.storage.sync.get(["blockedWords","blurButtonToggled"],(o=>{const n=o.blockedWords||[],c=o.blurButtonToggled||!1;!function o(r){if(r.nodeType===Node.TEXT_NODE){let o=r.textContent||"";n.forEach((r=>{const n={a:"[aàáâäãåAÀÁÂÄÃÅ]",e:"[eéèêëEÉÈÊË]",i:"[iíîïIÍÎÏ]",o:"[oòóôöõOÒÓÔÖÕ]",u:"[uùúûüUÙÚÛÜ]"},c=new RegExp(`\\b${(e=>e.replace(/[aeiouáàâäãåéèêëíîïóòôöõúûü]/gi,(e=>{const t=e.toLowerCase();return n[t]||e})))(r)}\\w{0,2}\\b`,"gi"),d=o.match(c);d&&(e=!0,t+=d.length,o=o.replace(c,(e=>"*".repeat(e.length))))})),r.textContent=o}else r.nodeType===Node.ELEMENT_NODE&&(["SCRIPT","STYLE","NOSCRIPT"].includes(r.nodeName)||r.childNodes.forEach(o))}(document.body),e&&(alert(`Cette page contient ${t} mot(s) bloqué(s) !`),c&&(0,r.blurrImages)())}))}window.addEventListener("DOMContentLoaded",(()=>{n()})),new MutationObserver((()=>{n()})).observe(document.body,{childList:!0,subtree:!0})},114:(e,t)=>{let o;function r(){return fetch(chrome.runtime.getURL("./assets/trigger_db.json")).then((e=>e.json())).then((e=>(o=e.categories,e.categories))).catch((e=>{throw console.error("Erreur lors du chargement du JSON:",e),e}))}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchJSONData=r,t.displayTriggerCategorie=function(e){if(""===document.getElementById("trigger_list").innerHTML){const t=document.createElement("p");for(const[o,[r]]of Object.entries(Object.entries(e)))t.innerHTML+=`\n                <div>\n                    <input type="checkbox" id="trigger-${o}" name="categorie"/>\n                    <label for="categorie">\n                        <button class="subCategorie" id="${r}">${r}</button>\n                    </label>\n                    <span id="sub-${r}"></span>\n                </div>\n                </br>`;document.getElementById("trigger_list").appendChild(t)}else document.getElementById("trigger_list").innerHTML=""},document.getElementById("trigger_list").addEventListener("click",(e=>{if("BUTTON"!==e.target.nodeName)return;let t;t=e.target.id,r().then((e=>{!function(e,t){if(e.hasOwnProperty(t)){const o=e[t];if(console.log(`sub-${t}`),console.log(document.getElementById(`sub-${t}`).childNodes),console.log(document.getElementById(`sub-${t}`).hasChildNodes()),document.getElementById(`sub-${t}`).hasChildNodes())console.log("youpi?"),document.getElementById(`sub-${t}`).innerHTML="";else{const e=document.createElement("p");for(const[t,[r]]of Object.entries(Object.entries(o)))e.innerHTML+=`\n                        <div>\n                            <input type="checkbox" id="subTrigger-${r}" name="categorie"/>\n                            <label for="categorie">${r}</label>\n                        </div>\n                        </br>`;document.getElementById(`sub-${t}`).appendChild(e)}}else console.error(`Catégorie "${t}" non trouvée.`)}(e,t)})).catch((e=>{console.error("Erreur lors du chargement du JSON:",e)}))}))}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,o),c.exports}(()=>{const e=o(114),t=o(114),r=o(481);window.addEventListener("DOMContentLoaded",(e=>{document.getElementById("wordInput"),document.getElementById("addWordButton");const t=document.getElementById("saveBlockedWords");t&&t.addEventListener("click",(()=>{const e=document.getElementById("blockedWords").value.split(",").map((e=>e.trim())).filter((e=>e.length>0));chrome.storage.sync.set({blockedWords:e}),chrome.tabs.query({active:!0,currentWindow:!0},(e=>{void 0!==e[0].id&&chrome.scripting.executeScript({target:{tabId:e[0].id},func:()=>{console.log("Executing blockWords function"),(0,r.blockWords)()}},(()=>{chrome.runtime.lastError&&console.error(chrome.runtime.lastError.message)}))}))}))}));const n=document.getElementById("saveBlockedWords"),c=document.getElementById("blockedWords"),d=document.getElementById("wordList"),s=document.getElementById("wordItemTemplate");function l(){d.innerHTML="",chrome.storage.sync.get("blockedWords",(e=>{(e.blockedWords||[]).forEach((e=>{const t=document.importNode(s.content,!0).firstElementChild;if(t){const o=t.querySelector(".word-text");o&&(o.textContent=e);const n=t.querySelector(".remove-word-button");n&&n.addEventListener("click",(()=>{var t;t=e,chrome.storage.sync.get("blockedWords",(e=>{const o=(e.blockedWords||[]).filter((e=>e!==t));chrome.storage.sync.set({blockedWords:o},(()=>{chrome.runtime.lastError?console.error("Error saving blocked words:",chrome.runtime.lastError):console.log("Blocked words updated:",o),l(),chrome.tabs.query({active:!0,currentWindow:!0},(e=>{void 0!==e[0].id?chrome.scripting.executeScript({target:{tabId:e[0].id},func:r.blockWords}):console.error("No active tab found!")}))}))}))})),d.appendChild(t)}}))}))}n.addEventListener("click",(()=>{if(c){const t=c.value.split(",").map((e=>e.trim())).filter((e=>e.length>0));e=t,chrome.storage.sync.get("blockedWords",(t=>{const o=t.blockedWords||[],n=[...new Set([...o,...e])];chrome.storage.sync.set({blockedWords:n},(()=>{chrome.runtime.lastError?console.error("Error saving blocked words:",chrome.runtime.lastError):console.log("Blocked words saved to storage:",n),l(),chrome.tabs.query({active:!0,currentWindow:!0},(e=>{void 0!==e[0].id?chrome.scripting.executeScript({target:{tabId:e[0].id},func:r.blockWords}):console.error("No active tab found!")}))}))})),c.value=""}var e})),l(),document.addEventListener("DOMContentLoaded",(()=>{document.getElementById("showTriggerOption").addEventListener("click",(()=>{(0,e.fetchJSONData)().then((e=>{document.getElementById("trigger_list")&&(0,t.displayTriggerCategorie)(e)})).catch((e=>{console.error("Erreur lors du chargement du JSON:",e)})),console.log("fetchjson data excecuted")}))})),document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("blurButton");e?(chrome.storage.sync.get("blurButtonToggled",(t=>{e.checked=t.blurButtonToggled||!1})),e.addEventListener("change",(()=>{const t=e.checked;chrome.storage.sync.set({blurButtonToggled:t})}))):console.error("Blur button element not found")}))})()})();