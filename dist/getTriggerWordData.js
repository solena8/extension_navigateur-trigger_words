(()=>{"use strict";(()=>{let e;document.getElementById("trigger_list").addEventListener("click",(t=>{if("BUTTON"!==t.target.nodeName)return;let n;n=t.target.id,fetch(chrome.runtime.getURL("./assets/trigger_db.json")).then((e=>e.json())).then((t=>(e=t.categories,t.categories))).catch((e=>{throw console.error("Erreur lors du chargement du JSON:",e),e})).then((e=>{!function(e,t){if(e.hasOwnProperty(t)){const n=e[t];if(console.log(`sub-${t}`),console.log(document.getElementById(`sub-${t}`).childNodes),console.log(document.getElementById(`sub-${t}`).hasChildNodes()),document.getElementById(`sub-${t}`).hasChildNodes())console.log("youpi?"),document.getElementById(`sub-${t}`).innerHTML="";else{const e=document.createElement("p");for(const[t,[o]]of Object.entries(Object.entries(n)))e.innerHTML+=`\n                        <div>\n                            <input type="checkbox" id="subTrigger-${o}" name="categorie"/>\n                            <label for="categorie">${o}</label>\n                        </div>\n                        </br>`;document.getElementById(`sub-${t}`).appendChild(e)}}else console.error(`Catégorie "${t}" non trouvée.`)}(e,n)})).catch((e=>{console.error("Erreur lors du chargement du JSON:",e)}))}))})()})();