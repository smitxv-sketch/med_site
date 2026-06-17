import { useEffect, useRef, useLayoutEffect } from 'react';
import { useUISettingsStore } from '../store/uiSettingsStore';

export function DevChangeHighlighter() {
  const isDevMode = useUISettingsStore(s => s.isDevMode);
  // We'll track the last time the store state completely changed 
  const stateHash = useUISettingsStore(s => JSON.stringify({
      heroMobileVariant: s.heroMobileVariant,
      bottomNavVariant: s.bottomNavVariant,
      homePageConcept: s.homePageConcept,
      doctorsSectionVariant: s.doctorsSectionVariant,
      promotionsSectionVariant: s.promotionsSectionVariant,
      quickActionsVariant: s.quickActionsVariant,
      directionsSectionVariant: s.directionsSectionVariant,
      colorTheme: s.colorTheme,
      fontFamily: s.fontFamily,
      appRadius: s.appRadius,
      shadowStyle: s.shadowStyle
  }));

  const lastChangeTime = useRef<number>(Date.now());
  const lastHash = useRef<string>(stateHash);

  // Update time synchronously during render when hash changes
  if (lastHash.current !== stateHash) {
      lastHash.current = stateHash;
      lastChangeTime.current = Date.now();
  }

  useEffect(() => {
    if (!isDevMode) return;

    // Create the global style sequence for highlighting
    const style = document.createElement('style');
    style.id = 'fsd-dev-highlighter-style';
    style.innerHTML = `
      @keyframes softMarketingHighlight {
        0% { 
          box-shadow: 0 0 0 2px rgba(13, 148, 136, 1), 0 0 15px 5px rgba(13, 148, 136, 0.4), 0 0 40px 15px rgba(13, 148, 136, 0.15); 
        }
        100% { 
          box-shadow: 0 0 0 1px rgba(13, 148, 136, 0), 0 0 0 0 rgba(13, 148, 136, 0), 0 0 0 0 rgba(13, 148, 136, 0); 
        }
      }
      .fsd-highlight-active {
        position: relative !important;
      }
      .fsd-highlight-active::after {
        content: '';
        position: absolute;
        inset: -2px;
        border-radius: inherit;
        pointer-events: none;
        z-index: 9999;
        /* Имитация уходящего фейда с размытием снаружи */
        animation: softMarketingHighlight 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
      }
    `;
    if (!document.getElementById('fsd-dev-highlighter-style')) {
      document.head.appendChild(style);
    }

    // We will use a MutationObserver to catch what React actually re-rendered or mutated
    const observer = new MutationObserver((mutations) => {
      // Check if we are within 200ms of a state change. 
      // If not, this is a natural mutation (like carousel scrolling) and we ignore it.
      const timeSinceChange = Date.now() - lastChangeTime.current;
      if (timeSinceChange > 200) return;

      const targets = new Set<HTMLElement>();
      
      for (const m of mutations) {
          if (!(m.target instanceof HTMLElement)) continue;
          
          const target = m.target;

          // Exclude the dev panel itself and its children
          if (
              target.closest('.dev-mode-panel') || 
              target.closest('#command-center-tabs') || 
              target.closest('.fixed.inset-y-0.right-0') ||
              target.id === 'fsd-dev-highlighter-style'
          ) {
              continue;
          }

          if (m.type === 'childList') {
              // For childList, we check if the target or any added node belongs to a marketing block
              const block = target.closest('[data-marketing-block="true"]');
              if (block) {
                  targets.add(block as HTMLElement);
              } else {
                  m.addedNodes.forEach(node => {
                      if (!(node instanceof HTMLElement)) return;
                      if (node.getAttribute('data-marketing-block') === 'true') {
                          targets.add(node);
                      } else {
                          const childBlock = node.querySelector('[data-marketing-block="true"]');
                          if (childBlock) targets.add(childBlock as HTMLElement);
                      }
                  });
              }
          } else if (m.type === 'attributes') {
              if (m.attributeName === 'class') {
                  const oldClass = m.oldValue || '';
                  const newClass = target.getAttribute('class') || '';
                  const cleanOld = oldClass.replace(/fsd-highlight-active/g, '').replace(/\s+/g, ' ').trim();
                  const cleanNew = newClass.replace(/fsd-highlight-active/g, '').replace(/\s+/g, ' ').trim();
                  if (cleanOld === cleanNew) continue;
              }
              const block = target.closest('[data-marketing-block="true"]');
              if (block) {
                  targets.add(block as HTMLElement);
              }
          }
      }

      // Apply animation class robustly
      requestAnimationFrame(() => {
          targets.forEach(t => {
              // Extra safety: do not highlight the whole document body or main wrappers
              if (t === document.body || t === document.documentElement || t.id === 'root') return;
              
              // Skip tiny elements (e.g., text nodes mapped to spans) to reduce noise
              if (t.offsetHeight < 20 && t.offsetWidth < 20) return;
              
              t.classList.remove('fsd-highlight-active');
              void t.offsetWidth; // Force Reflow
              t.classList.add('fsd-highlight-active');
              
              setTimeout(() => {
                  if (t?.classList) {
                      t.classList.remove('fsd-highlight-active');
                  }
              }, 2500);
          });
      });
    });

    observer.observe(document.body, {
       attributes: true,
       attributeOldValue: true,
       attributeFilter: ['class', 'data-variant', 'style'],
       subtree: true,
       childList: true 
    });

    return () => {
      observer.disconnect();
    };
  }, [isDevMode]); // Bind observer only once or when dev mode changes

  // Cleanup styles on unmount
  useEffect(() => {
     return () => {
        const existing = document.getElementById('fsd-dev-highlighter-style');
        if (existing) existing.remove();
     };
  }, []);

  return null;
}

