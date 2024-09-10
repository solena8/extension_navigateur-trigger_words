(()=>{"use strict";var e={481:(e,t)=>{function o(){let e=!1;document.getElementById("wordList")||chrome.storage.sync.get(["blockedWords"],(t=>{const o=t.blockedWords||[];!function t(r){if(r.nodeType===Node.TEXT_NODE){let t=r.textContent||"";o.forEach((o=>{const r=new RegExp(`\\b${o}\\w{0,2}\\b`,"gi");r.test(t)&&(e=!0,t=t.replace(r,(e=>"*".repeat(e.length))))})),r.textContent=t}else r.nodeType===Node.ELEMENT_NODE&&(["SCRIPT","STYLE","NOSCRIPT"].includes(r.nodeName)||r.childNodes.forEach(t))}(document.body),e&&alert("Cette page contient des mots bloqués !")}))}Object.defineProperty(t,"__esModule",{value:!0}),t.blockWords=o,window.addEventListener("DOMContentLoaded",(()=>{o()})),new MutationObserver((()=>{o()})).observe(document.body,{childList:!0,subtree:!0})},114:(e,t)=>{function o(){return fetch(chrome.runtime.getURL("../assets/trigger_db.json")).then((e=>e.json())).then((e=>(console.log(Object.keys(e.categories[0])),e))).catch((e=>{throw console.error("Erreur lors du chargement du JSON:",e),e}))}function r(e){const t=document.createElement("p");for(let o=0;o<Object.keys(e.categories).length;o++)t.innerHTML+=`<b>${e.categories[o]}:</b><br>`;document.getElementById("trigger_list").appendChild(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchJSONData=o,t.afficherAvis=r,o().then((e=>{window.addEventListener("DOMContentLoaded",(t=>{document.getElementById("trigger_list")&&r(e.categories)}))})).catch((e=>{console.error("Erreur lors du chargement du JSON:",e)}))}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,o),c.exports}(()=>{const e=o(481),t=o(114);window.addEventListener("DOMContentLoaded",(o=>{(0,t.fetchJSONData)();const r=document.getElementById("saveBlockedWords");r&&r.addEventListener("click",(()=>{const t=document.getElementById("blockedWords").value.split(",").map((e=>e.trim())).filter((e=>e.length>0));chrome.storage.sync.set({blockedWords:t}),chrome.tabs.query({active:!0,currentWindow:!0},(t=>{void 0!==t[0].id&&chrome.scripting.executeScript({target:{tabId:t[0].id},func:e.blockWords})}))}));const n=document.getElementById("openOptions");n&&n.addEventListener("click",(()=>{chrome.tabs.create({url:"public/options.html"})}))}));const r=document.getElementById("saveBlockedWords"),n=document.getElementById("blockedWords"),c=document.getElementById("wordList"),d=document.getElementById("wordItemTemplate");function s(){c.innerHTML="",chrome.storage.sync.get("blockedWords",(t=>{(t.blockedWords||[]).forEach((t=>{const o=document.importNode(d.content,!0).firstElementChild;if(o){const r=o.querySelector(".word-text");r&&(r.textContent=t);const n=o.querySelector(".remove-word-button");n&&n.addEventListener("click",(()=>{var o;o=t,chrome.storage.sync.get("blockedWords",(t=>{const r=(t.blockedWords||[]).filter((e=>e!==o));chrome.storage.sync.set({blockedWords:r},(()=>{chrome.runtime.lastError?console.error("Error saving blocked words:",chrome.runtime.lastError):console.log("Blocked words updated:",r),s(),chrome.tabs.query({active:!0,currentWindow:!0},(t=>{void 0!==t[0].id?chrome.scripting.executeScript({target:{tabId:t[0].id},func:e.blockWords}):console.error("No active tab found!")}))}))}))})),c.appendChild(o)}}))}))}r.addEventListener("click",(()=>{if(n){const o=n.value.split(",").map((e=>e.trim())).filter((e=>e.length>0));t=o,chrome.storage.sync.get("blockedWords",(o=>{const r=o.blockedWords||[],n=[...new Set([...r,...t])];chrome.storage.sync.set({blockedWords:n},(()=>{chrome.runtime.lastError?console.error("Error saving blocked words:",chrome.runtime.lastError):console.log("Blocked words saved to storage:",n),s(),chrome.tabs.query({active:!0,currentWindow:!0},(t=>{void 0!==t[0].id?chrome.scripting.executeScript({target:{tabId:t[0].id},func:e.blockWords}):console.error("No active tab found!")}))}))})),n.value=""}var t})),s()})()})();