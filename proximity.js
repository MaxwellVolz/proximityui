/*
  Proximity UI JavaScript
  Optional enhancements only.
*/

(function() {
  'use strict';

  // Modal functionality
  function initModals() {
    const modals = document.querySelectorAll('.modal');
    if (!modals.length) return;

    // Track original active element for focus restoration
    let previousActiveElement = null;

    // Open modal
    function openModal(modal) {
      previousActiveElement = document.activeElement;
      modal.setAttribute('open', '');
      document.body.style.overflow = 'hidden';

      // Focus first focusable element or close button
      const focusable = getFocusableElements(modal);
      if (focusable.length) {
        focusable[0].focus();
      }
    }

    // Close modal
    function closeModal(modal) {
      modal.removeAttribute('open');
      document.body.style.overflow = '';

      // Restore focus
      if (previousActiveElement) {
        previousActiveElement.focus();
        previousActiveElement = null;
      }
    }

    // Get all focusable elements within container
    function getFocusableElements(container) {
      const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
      return Array.from(container.querySelectorAll(selector));
    }

    // Focus trap
    function trapFocus(modal, event) {
      const focusable = getFocusableElements(modal);
      if (!focusable.length) return;

      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }

    // Initialize each modal
    modals.forEach(modal => {
      const modalId = modal.id;
      if (!modalId) return;

      // Find triggers (buttons with data-modal attribute)
      const triggers = document.querySelectorAll(`[data-modal="${modalId}"]`);
      triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          openModal(modal);
        });
      });

      // Close button
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => closeModal(modal));
      }

      // Backdrop click
      const backdrop = modal.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.addEventListener('click', () => closeModal(modal));
      }

      // Escape key
      modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeModal(modal);
        } else if (e.key === 'Tab') {
          trapFocus(modal, e);
        }
      });

      // Cancel buttons (with data-modal-close)
      const cancelButtons = modal.querySelectorAll('[data-modal-close]');
      cancelButtons.forEach(btn => {
        btn.addEventListener('click', () => closeModal(modal));
      });
    });
  }

  // Initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModals);
  } else {
    initModals();
  }

  // Re-initialize for dynamically added content (HTMX support)
  document.addEventListener('htmx:afterSwap', initModals);
})();

// Tabs functionality
(function() {
  'use strict';

  function initTabs() {
    const tabsContainers = document.querySelectorAll('.tabs');
    if (!tabsContainers.length) return;

    tabsContainers.forEach(container => {
      const tabList = container.querySelector('.tab-list');
      if (!tabList) return;

      const tabs = Array.from(tabList.querySelectorAll('.tab'));
      if (!tabs.length) return;

      // Ensure tablist has role
      tabList.setAttribute('role', 'tablist');

      // Setup ARIA and get panels
      const panels = [];
      tabs.forEach((tab, index) => {
        // Ensure tab has role
        tab.setAttribute('role', 'tab');

        // Get associated panel via href or aria-controls
        const href = tab.getAttribute('href');
        const panelId = href && href.startsWith('#')
          ? href.substring(1)
          : tab.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : null;

        panels.push(panel);

        // Setup ARIA relationships
        if (panel) {
          panel.setAttribute('role', 'tabpanel');
          if (!panel.id) panel.id = `panel-${index}`;
          if (!tab.id) tab.id = `tab-${index}`;
          tab.setAttribute('aria-controls', panel.id);
          panel.setAttribute('aria-labelledby', tab.id);
        }
      });

      // Activate tab function
      function activateTab(tab, panel) {
        const tabIndex = tabs.indexOf(tab);
        if (tabIndex === -1) return;

        // Deactivate all tabs and hide all panels
        tabs.forEach((t, i) => {
          t.setAttribute('aria-selected', 'false');
          t.setAttribute('tabindex', '-1');
          if (panels[i]) {
            panels[i].setAttribute('hidden', '');
          }
        });

        // Activate selected tab and show panel
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
        if (panel) {
          panel.removeAttribute('hidden');
        }
      }

      // Initialize: activate first tab or tab matching URL hash
      let initialTab = tabs[0];
      const hash = window.location.hash;
      if (hash) {
        const targetTab = tabs.find(t => t.getAttribute('href') === hash);
        if (targetTab) initialTab = targetTab;
      }
      const initialIndex = tabs.indexOf(initialTab);
      activateTab(initialTab, panels[initialIndex]);

      // Click handling
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
          // Skip disabled tabs
          if (tab.disabled || tab.getAttribute('aria-disabled') === 'true') {
            e.preventDefault();
            return;
          }

          // Allow HTMX to work, but prevent normal navigation
          if (!tab.hasAttribute('hx-get')) {
            e.preventDefault();
          }

          activateTab(tab, panels[index]);
        });
      });

      // Keyboard navigation
      tabList.addEventListener('keydown', (e) => {
        const currentTab = document.activeElement;
        const currentIndex = tabs.indexOf(currentTab);

        // Only handle keyboard events if a tab has focus
        if (currentIndex === -1) return;

        let nextIndex = currentIndex;

        switch(e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            // Move to previous tab, wrap to end
            nextIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
            // Skip disabled tabs
            while (tabs[nextIndex].disabled || tabs[nextIndex].getAttribute('aria-disabled') === 'true') {
              nextIndex = nextIndex === 0 ? tabs.length - 1 : nextIndex - 1;
              if (nextIndex === currentIndex) break; // Prevent infinite loop
            }
            tabs[nextIndex].focus();
            activateTab(tabs[nextIndex], panels[nextIndex]);
            break;

          case 'ArrowRight':
            e.preventDefault();
            // Move to next tab, wrap to beginning
            nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
            // Skip disabled tabs
            while (tabs[nextIndex].disabled || tabs[nextIndex].getAttribute('aria-disabled') === 'true') {
              nextIndex = nextIndex === tabs.length - 1 ? 0 : nextIndex + 1;
              if (nextIndex === currentIndex) break; // Prevent infinite loop
            }
            tabs[nextIndex].focus();
            activateTab(tabs[nextIndex], panels[nextIndex]);
            break;

          case 'Home':
            e.preventDefault();
            // Jump to first non-disabled tab
            nextIndex = 0;
            while (tabs[nextIndex].disabled || tabs[nextIndex].getAttribute('aria-disabled') === 'true') {
              nextIndex++;
              if (nextIndex >= tabs.length) break;
            }
            if (nextIndex < tabs.length) {
              tabs[nextIndex].focus();
              activateTab(tabs[nextIndex], panels[nextIndex]);
            }
            break;

          case 'End':
            e.preventDefault();
            // Jump to last non-disabled tab
            nextIndex = tabs.length - 1;
            while (tabs[nextIndex].disabled || tabs[nextIndex].getAttribute('aria-disabled') === 'true') {
              nextIndex--;
              if (nextIndex < 0) break;
            }
            if (nextIndex >= 0) {
              tabs[nextIndex].focus();
              activateTab(tabs[nextIndex], panels[nextIndex]);
            }
            break;
        }
      });
    });
  }

  // Initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabs);
  } else {
    initTabs();
  }

  // Re-initialize for dynamically added content (HTMX support)
  document.addEventListener('htmx:afterSwap', initTabs);
})();

// Toast functionality
(function() {
  'use strict';

  const MAX_TOASTS = 5;

  // Create toast container if it doesn't exist
  function getToastContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  // Show toast
  function showToast(message, type = 'info', duration = 5000) {
    const container = getToastContainer();

    // Enforce max toasts limit
    const existingToasts = Array.from(container.querySelectorAll('.toast:not(.dismissing)'));
    if (existingToasts.length >= MAX_TOASTS) {
      // Remove oldest toast immediately (first in DOM, bottom-most visually due to column-reverse)
      const oldestToast = existingToasts[0];
      if (oldestToast && oldestToast.parentNode) {
        oldestToast.remove();
      }
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    const content = document.createElement('div');
    content.className = 'toast-content';
    content.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'toast-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dismissToast(toast);
    });

    toast.appendChild(content);
    toast.appendChild(closeBtn);

    // Add to container
    container.appendChild(toast);

    // Auto-dismiss
    if (duration > 0) {
      setTimeout(() => dismissToast(toast), duration);
    }

    return toast;
  }

  // Dismiss toast
  function dismissToast(toast) {
    if (!toast || toast.classList.contains('dismissing')) return;

    toast.classList.add('dismissing');

    // Use setTimeout as primary mechanism (more reliable)
    // Animation duration is 200ms (--transition-base)
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();

        // Remove container if empty
        const container = document.querySelector('.toast-container');
        if (container && !container.querySelector('.toast')) {
          container.remove();
        }
      }
    }, 200);
  }

  // Expose API
  window.ProximityUI = window.ProximityUI || {};
  window.ProximityUI.showToast = showToast;

  // Data attribute triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-toast]');
    if (trigger) {
      e.preventDefault();
      const message = trigger.getAttribute('data-toast');
      const type = trigger.getAttribute('data-toast-type') || 'info';
      const duration = parseInt(trigger.getAttribute('data-toast-duration')) || 5000;
      showToast(message, type, duration);
    }
  });

  // HTMX support - show toast from response header
  document.addEventListener('htmx:afterRequest', (e) => {
    if (!e.detail.xhr) return;

    const toastMessage = e.detail.xhr.getResponseHeader('X-Toast-Message');
    if (toastMessage) {
      const toastType = e.detail.xhr.getResponseHeader('X-Toast-Type') || 'info';
      const toastDuration = parseInt(e.detail.xhr.getResponseHeader('X-Toast-Duration')) || 5000;
      showToast(toastMessage, toastType, toastDuration);
    }
  });
})();
