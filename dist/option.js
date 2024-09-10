(()=>{"use strict";var e={481:(e,t)=>{function o(){let e=!1;document.getElementById("wordList")||chrome.storage.sync.get(["blockedWords"],(t=>{const o=t.blockedWords||[];!function t(r){if(r.nodeType===Node.TEXT_NODE){let t=r.textContent||"";o.forEach((o=>{const r=new RegExp(`\\b${o}\\w{0,2}\\b`,"gi");r.test(t)&&(e=!0,t=t.replace(r,(e=>"*".repeat(e.length))))})),r.textContent=t}else r.nodeType===Node.ELEMENT_NODE&&(["SCRIPT","STYLE","NOSCRIPT"].includes(r.nodeName)||r.childNodes.forEach(t))}(document.body),e&&alert("Cette page contient des mots bloqués !")}))}Object.defineProperty(t,"__esModule",{value:!0}),t.blockWords=o,window.addEventListener("DOMContentLoaded",(()=>{o()})),new MutationObserver((()=>{o()})).observe(document.body,{childList:!0,subtree:!0})},114:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.fetchJSONData=function(){return fetch(chrome.runtime.getURL("../assets/trigger_db.json")).then((e=>e.json())).then((e=>e.categories)).catch((e=>{throw console.error("Erreur lors du chargement du JSON:",e),e}))},t.afficherAvis=function(e){document.getElementById("trigger_list").innerHTML="";const t=document.createElement("p");for(const[o,[r,n]]of Object.entries(Object.entries(e)))t.innerHTML+="",t.innerHTML+=`\n            <div>\n            <input type="checkbox" id="${r}" name="categorie"/>\n            <label for="categorie">${r}</label>\n            </div>\n            </br>`;document.getElementById("trigger_list").appendChild(t)}}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,o),c.exports}(()=>{const e=o(114),t=o(114),r=o(481);window.addEventListener("DOMContentLoaded",(e=>{document.getElementById("wordInput"),document.getElementById("addWordButton");const t=document.getElementById("saveBlockedWords");t&&t.addEventListener("click",(()=>{const e=document.getElementById("blockedWords").value.split(",").map((e=>e.trim())).filter((e=>e.length>0));chrome.storage.sync.set({blockedWords:e}),chrome.tabs.query({active:!0,currentWindow:!0},(e=>{void 0!==e[0].id&&chrome.scripting.executeScript({target:{tabId:e[0].id},func:()=>{console.log("Executing blockWords function"),(0,r.blockWords)()}},(()=>{chrome.runtime.lastError&&console.error(chrome.runtime.lastError.message)}))}))}))}));const n=document.getElementById("saveBlockedWords"),c=document.getElementById("blockedWords"),d=document.getElementById("wordList"),s=document.getElementById("wordItemTemplate");function i(){d.innerHTML="",chrome.storage.sync.get("blockedWords",(e=>{(e.blockedWords||[]).forEach((e=>{const t=document.importNode(s.content,!0).firstElementChild;if(t){const o=t.querySelector(".word-text");o&&(o.textContent=e);const n=t.querySelector(".remove-word-button");n&&n.addEventListener("click",(()=>{var t;t=e,chrome.storage.sync.get("blockedWords",(e=>{const o=(e.blockedWords||[]).filter((e=>e!==t));chrome.storage.sync.set({blockedWords:o},(()=>{chrome.runtime.lastError?console.error("Error saving blocked words:",chrome.runtime.lastError):console.log("Blocked words updated:",o),i(),chrome.tabs.query({active:!0,currentWindow:!0},(e=>{void 0!==e[0].id?chrome.scripting.executeScript({target:{tabId:e[0].id},func:r.blockWords}):console.error("No active tab found!")}))}))}))})),d.appendChild(t)}}))}))}n.addEventListener("click",(()=>{if(c){const t=c.value.split(",").map((e=>e.trim())).filter((e=>e.length>0));e=t,chrome.storage.sync.get("blockedWords",(t=>{const o=t.blockedWords||[],n=[...new Set([...o,...e])];chrome.storage.sync.set({blockedWords:n},(()=>{chrome.runtime.lastError?console.error("Error saving blocked words:",chrome.runtime.lastError):console.log("Blocked words saved to storage:",n),i(),chrome.tabs.query({active:!0,currentWindow:!0},(e=>{void 0!==e[0].id?chrome.scripting.executeScript({target:{tabId:e[0].id},func:r.blockWords}):console.error("No active tab found!")}))}))})),c.value=""}var e})),i(),document.addEventListener("DOMContentLoaded",(()=>{document.getElementById("showTriggerOption").addEventListener("click",(()=>{(0,e.fetchJSONData)().then((e=>{document.getElementById("trigger_list")&&(0,t.afficherAvis)(e)})).catch((e=>{console.error("Erreur lors du chargement du JSON:",e)}))}))}))})()})();