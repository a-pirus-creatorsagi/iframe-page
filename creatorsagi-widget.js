!function(){var t;let e=document.currentScript||document.querySelector('script[src*="creatorsagi-widget.js"]'),i={domain:e?.getAttribute("data-domain")||"creatorsagi.com",mobileButtonText:e?.getAttribute("data-mobile-button-text")||"Chat with AI",dialogTitle:e?.getAttribute("data-dialog-title")||"Ask Anything Below…",dialogSubtitle:e?.getAttribute("data-dialog-subtitle")||"",suggestions:JSON.parse(e?.getAttribute("data-suggestions")||"[]"),primaryColor:e?.getAttribute("data-primary-color")||"#009fe3",placeholderText:e?.getAttribute("data-placeholder-text")||"Enter your message here..."};function o(t,e){t=t.replace("#","");let i=parseInt(t.substring(0,2),16),o=parseInt(t.substring(2,4),16),r=parseInt(t.substring(4,6),16);return"#"+[Math.max(0,Math.min(255,i+e)),Math.max(0,Math.min(255,o+e)),Math.max(0,Math.min(255,r+e))].map(t=>t.toString(16).padStart(2,"0")).join("")}let r={primary:t=i.primaryColor,light:o(t,30),lighter:o(t,60),dark:o(t,-30),darker:o(t,-60)};function n(){try{if(document.getElementById("creatorsagi-dialog"))return;let t=document.createElement("div");t.id="creatorsagi-dialog",t.innerHTML=`
  <div class="dialog-box" id="dialog-box">
    <div class="dialog-title">${i.dialogTitle}</div>
    ${i.dialogSubtitle&&`<div class="dialog-description">${i.dialogSubtitle}</div>`}
    <div class="dialog-input-container">
      <div class="input-wrapper">
        <textarea class="dialog-textarea" id="dialog-input" placeholder="${i.placeholderText}" rows="1"></textarea>
        <button class="dialog-submit-btn" id="dialog-submit-btn" disabled title="Send">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 20V8M14 8L19 13M14 8L9 13" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="suggestions">
      ${i.suggestions.map((t,e)=>`
        <button class="suggestion-btn">${t} <span class="arrow">↑</span></button>
      `).join("")}
    </div>
  </div>
`;let e=document.createElement("style");e.textContent=`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
  html, body, .dialog-box, .dialog-title, .dialog-input, .dialog-textarea, .suggestion-btn, .dialog-link {
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif !important;
  }
  .dialog-box {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 340px;
    max-width: 90vw;
    padding: 32px 20px 20px 20px;
    border-radius: 10px;
    background: ${r.primary};
    box-shadow: 0 4px 16px rgba(0,0,0,0.18);
    z-index: 999999;
    transition: all 0.3s;
    color: #fff;
  }
  .mobile-button {
    display: none;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: ${r.primary};
    border: none;
    box-shadow: 0 4px 16px ${r.primary}4D;
    cursor: pointer;
    z-index: 999999;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  .mobile-button svg {
    width: 24px;
    height: 24px;
    color: white;
  }
  .dialog-title {
    font-size: 1.6rem;
    margin-bottom: 10px;
    color: #fff;
    letter-spacing: -0.5px;
    cursor: default;
    font-weight: 700;
  }
  .dialog-input-container {
    width: 100%;
    margin: 0 auto 10px auto;
    display: flex;
    align-items: flex-end;
    gap: 8px;
    position: relative;
  }
  .input-wrapper {
    display: flex;
    align-items: end;
    width: 100%;
    background: #fff;
    border: 1.5px solid #e0e6ed;
    border-radius: 10px;
    padding: 4px 4px 4px 12px;
    box-shadow: 0 2px 12px ${r.primary}0A;
  }
  .input-wrapper:focus-within {
    border: 1.5px solid ${r.primary};
  }
  .dialog-textarea {
    width: 100%;
    min-height: 40px;
    max-height: 160px;
    font-size: 1rem;
    padding: 8px 0px 8px 0px;
    border: none;
    outline: none;
    box-shadow: none;
    border-radius: 0;
    background: transparent;
    resize: none;
    transition: none;
    overflow-y: auto;
    line-height: 1.5;
  }
  .dialog-textarea:focus {
    outline: none;
  }
  .suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-start;
    margin-bottom: 8px;
    width: 100%;
  }
  .suggestion-btn {
    background: #fff;
    color: ${r.dark};
    border: 1.5px solid #e0e6ed;
    border-radius: 10px;
    padding: 6px 14px 6px 14px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 0.18s, border 0.18s, color 0.18s;
    margin: 0;
    line-height: 1.2;
    position: relative;
  }
  .suggestion-btn:hover {
    background: #f5f8fc;
    border-color: ${r.primary};
    color: ${r.primary};
  }
  .suggestion-btn .arrow {
    font-size: 1.1rem;
    color: #b0b8c1;
    margin-left: 2px;
  }
  .dialog-submit-btn {
    margin-left: 8px;
    background: ${r.primary};
    border: none;
    border-radius: 50%;
    width: 36px;
    min-width: 36px;
    height: 36px;
    min-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px ${r.primary}21;
    color: ${r.primary};
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    z-index: 2;
    padding: 0;
  }
  .dialog-submit-btn[disabled] {
    background: #e0e6ed;
    color: #b0b8c1;
    cursor: not-allowed;
  }
  .dialog-submit-btn svg {
    width: 24px;
    height: 24px;
    display: block;
  }
  .dialog-description {
    color: #fff;
    font-size: 0.9rem;
    font-weight: 400;
    margin-bottom: 24px;
    opacity: 0.9;
  }
  @media (max-width: 768px) {
    .dialog-box {
      display: none;
    }
    .mobile-button {
      display: flex;
    }
  }
`,document.head.appendChild(e),document.body.appendChild(t);let o=document.createElement("button");o.className="mobile-button",o.title=i.mobileButtonText,o.innerHTML=`
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-text-icon lucide-message-square-text">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff"/>
    <path d="M13 8H7" stroke="#fff"/>
    <path d="M17 12H7" stroke="#fff"/>
  </svg>
`,o.addEventListener("click",function(t){t.preventDefault(),window.open(`https://${i.domain}`,"_blank")}),document.body.appendChild(o);let n=document.getElementById("dialog-input"),a=document.getElementById("dialog-submit-btn"),d=document.querySelectorAll(".suggestion-btn");function l(t){let e=[{id:"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){let e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)}),role:"user",content:t,createdAt:new Date().toISOString()}],o=encodeURIComponent(JSON.stringify(e));window.open(`https://${i.domain}?send_messages=${o}`,"_blank")}function s(){""===n.value.trim()?a.disabled=!0:a.disabled=!1}function p(){let t=n.value.trim();""!==t&&(l(t),n.value="",n.style.height="auto",s())}n.addEventListener("input",s),s(),n.addEventListener("keydown",function(t){"Enter"!==t.key||t.shiftKey||(t.preventDefault(),p())}),a.addEventListener("click",p),d.forEach(t=>{t.addEventListener("click",function(e){e.preventDefault();let i=t.textContent.replace(" ↑","").trim();l(i)})}),n.addEventListener("input",function t(){this.style.height="auto",this.style.height=this.scrollHeight+"px"}),n.style.height="auto",n.style.height=n.scrollHeight+"px",console.log("Dialog created successfully")}catch(g){console.error("Error creating dialog:",g)}}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",n):n()}();