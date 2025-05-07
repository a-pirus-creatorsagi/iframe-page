(function() {
  // Get configuration from script tag
  const scriptTag = document.currentScript || document.querySelector('script[src*="creatorsagi-widget.js"]');
  const config = {
    domain: scriptTag?.getAttribute('data-domain') || 'creatorsagi.com',
    mobileButtonText: scriptTag?.getAttribute('data-mobile-button-text') || 'Chat with AI',
    dialogTitle: scriptTag?.getAttribute('data-dialog-title') || 'Ask Anything Below…',
    dialogSubtitle: scriptTag?.getAttribute('data-dialog-subtitle') || '',
    suggestions: JSON.parse(scriptTag?.getAttribute('data-suggestions') || '[]'),
    primaryColor: scriptTag?.getAttribute('data-primary-color') || '#009fe3',
    placeholderText: scriptTag?.getAttribute('data-placeholder-text') || "Enter your message here..."
  };

  // Color computation function
  function adjustColor(hex, amount) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Adjust RGB values
    const newR = Math.max(0, Math.min(255, r + amount));
    const newG = Math.max(0, Math.min(255, g + amount));
    const newB = Math.max(0, Math.min(255, b + amount));
    
    // Convert back to hex
    return '#' + [newR, newG, newB]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
  }

  function getColorShades(primaryColor) {
    return {
      primary: primaryColor,
      light: adjustColor(primaryColor, 30),
      lighter: adjustColor(primaryColor, 60),
      dark: adjustColor(primaryColor, -30),
      darker: adjustColor(primaryColor, -60)
    };
  }

  const colors = getColorShades(config.primaryColor);

  function createDialog() {
    try {
      // Check if dialog already exists
      if (document.getElementById('creatorsagi-dialog')) {
        return;
      }

      // Create dialog container
      const dialog = document.createElement('div');
      dialog.id = 'creatorsagi-dialog';
      dialog.innerHTML = `
        <div class="dialog-box" id="dialog-box">
          <div class="dialog-title">${config.dialogTitle}</div>
          ${config.dialogSubtitle && `<div class="dialog-description">${config.dialogSubtitle}</div>`}
          <div class="dialog-input-container">
            <div class="input-wrapper">
              <textarea class="dialog-textarea" id="dialog-input" placeholder="${config.placeholderText}" rows="1"></textarea>
              <button class="dialog-submit-btn" id="dialog-submit-btn" disabled title="Send">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 20V8M14 8L19 13M14 8L9 13" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="suggestions">
            ${config.suggestions.map((suggestion, i) => `
              <button class="suggestion-btn">${suggestion} <span class="arrow">↑</span></button>
            `).join('')}
          </div>
        </div>
      `;

      // Add styles
      const styles = document.createElement('style');
      styles.textContent = `
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
          background: ${colors.primary};
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
          background: ${colors.primary};
          border: none;
          box-shadow: 0 4px 16px ${colors.primary}4D;
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
          box-shadow: 0 2px 12px ${colors.primary}0A;
        }
        .input-wrapper:focus-within {
          border: 1.5px solid ${colors.primary};
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
          color: ${colors.dark};
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
          border-color: ${colors.primary};
          color: ${colors.primary};
        }
        .suggestion-btn .arrow {
          font-size: 1.1rem;
          color: #b0b8c1;
          margin-left: 2px;
        }
        .dialog-submit-btn {
          margin-left: 8px;
          background: ${colors.primary};
          border: none;
          border-radius: 50%;
          width: 36px;
          min-width: 36px;
          height: 36px;
          min-height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px ${colors.primary}21;
          color: ${colors.primary};
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
      `;

      document.head.appendChild(styles);
      document.body.appendChild(dialog);

      // Add mobile button
      const mobileButton = document.createElement('button');
      mobileButton.className = 'mobile-button';
      mobileButton.title = config.mobileButtonText;
      mobileButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-text-icon lucide-message-square-text">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff"/>
          <path d="M13 8H7" stroke="#fff"/>
          <path d="M17 12H7" stroke="#fff"/>
        </svg>
      `;
      mobileButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(`https://${config.domain}`, '_blank');
      });
      document.body.appendChild(mobileButton);

      // Add event listeners
      const dialogInput = document.getElementById('dialog-input');
      const dialogSubmitBtn = document.getElementById('dialog-submit-btn');
      const suggestionBtns = document.querySelectorAll('.suggestion-btn');

      // Add UUID generation function
      function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }

      function openChat(message) {
        const messageObj = [{
          id: generateUUID(),
          role: "user",
          content: message,
          createdAt: new Date().toISOString()
        }];
        const encodedMessage = encodeURIComponent(JSON.stringify(messageObj));
        window.open(`https://${config.domain}?send_messages=${encodedMessage}`, '_blank');
      }

      function updateSubmitBtnState() {
        if (dialogInput.value.trim() === '') {
          dialogSubmitBtn.disabled = true;
        } else {
          dialogSubmitBtn.disabled = false;
        }
      }
      dialogInput.addEventListener('input', updateSubmitBtnState);
      updateSubmitBtnState();

      function handleSubmit() {
        const message = dialogInput.value.trim();
        if (message !== '') {
          openChat(message);
          dialogInput.value = '';
          dialogInput.style.height = 'auto';
          updateSubmitBtnState();
        }
      }
      dialogInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSubmit();
        }
      });
      dialogSubmitBtn.addEventListener('click', handleSubmit);

      // Add click handlers for suggestion buttons
      suggestionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          const message = btn.textContent.replace(' ↑', '').trim();
          openChat(message);
        });
      });

      // Auto-expand textarea as user types
      function autoExpandTextarea() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
      }
      dialogInput.addEventListener('input', autoExpandTextarea);
      // Initialize height
      dialogInput.style.height = 'auto';
      dialogInput.style.height = (dialogInput.scrollHeight) + 'px';

      console.log('Dialog created successfully');
    } catch (error) {
      console.error('Error creating dialog:', error);
    }
  }

  // Run when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createDialog);
  } else {
    createDialog();
  }
})();