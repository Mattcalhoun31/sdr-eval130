(function() {
  'use strict';

  const SymmetriVoiceAI = {
    config: {
      apiEndpoint: 'https://your-domain.com/api/chat',
      position: 'bottom-right',
      primaryColor: '#3b82f6',
      apiKey: null
    },

    init: function(options) {
      this.config = { ...this.config, ...options };

      // Validate API key
      if (!this.config.apiKey) {
        console.error('SymmetriVoiceAI: API key is required');
        return;
      }

      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.render());
      } else {
        this.render();
      }
    },

    render: function() {
      // Create container
      const container = document.createElement('div');
      container.id = 'symmetri-voice-ai-widget';
      document.body.appendChild(container);

      // Load styles
      this.loadStyles();

      // Create iframe for widget
      const iframe = document.createElement('iframe');
      iframe.src = `${this.config.apiEndpoint.replace('/api/chat', '')}/widget-embed?key=${this.config.apiKey}`;
      iframe.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 384px;
        height: 600px;
        border: none;
        z-index: 9999;
        border-radius: 16px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      `;

      container.appendChild(iframe);

      // Handle messages from iframe
      window.addEventListener('message', (event) => {
        if (event.data.type === 'symmetri-voice-ai-minimize') {
          iframe.style.width = '80px';
          iframe.style.height = '80px';
        } else if (event.data.type === 'symmetri-voice-ai-maximize') {
          iframe.style.width = '384px';
          iframe.style.height = '600px';
        } else if (event.data.type === 'symmetri-voice-ai-close') {
          container.style.display = 'none';
        }
      });
    },

    loadStyles: function() {
      // Inject any custom styles needed
      const style = document.createElement('style');
      style.textContent = `
        #symmetri-voice-ai-widget {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Expose to global scope
  window.SymmetriVoiceAI = SymmetriVoiceAI;
})();
