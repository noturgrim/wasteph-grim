import { useState, useEffect } from 'react';
import { isInAppBrowser, getInAppBrowserName, copyCurrentUrl } from '../../utils/browserDetection';

/**
 * Banner that shows when user is in an in-app browser
 * Prompts them to open in a regular browser for full functionality
 */
const InAppBrowserBanner = () => {
  const [show, setShow] = useState(false);
  const [browserName, setBrowserName] = useState('');
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user is in an in-app browser
    if (isInAppBrowser()) {
      const name = getInAppBrowserName();
      setBrowserName(name);
      
      // Check if user previously dismissed the banner
      const isDismissed = sessionStorage.getItem('inAppBrowserBannerDismissed');
      if (!isDismissed) {
        setShow(true);
      }
    }
  }, []);

  const handleCopyUrl = async () => {
    const success = await copyCurrentUrl();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem('inAppBrowserBannerDismissed', 'true');
  };

  if (!show || dismissed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Message */}
          <div className="flex items-start gap-3">
            <svg
              className="h-6 w-6 flex-shrink-0 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            
            <div className="flex-1">
              <p className="text-sm font-semibold sm:text-base">
                Limited Functionality in {browserName}
              </p>
              <p className="mt-1 text-xs text-white/90 sm:text-sm">
                For the best experience and full access to admin features, please open this page in Chrome, Safari, or your default browser.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-2 rounded-lg bg-white/20 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/30 sm:px-4 sm:text-sm"
            >
              {copied ? (
                <>
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleDismiss}
              className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Dismiss banner"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InAppBrowserBanner;
