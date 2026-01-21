/**
 * Browser Detection Utilities
 * Detect if user is in an in-app browser and provide solutions
 */

/**
 * Detect if user is in an in-app browser
 * (Facebook, Instagram, Twitter, LinkedIn, etc.)
 */
export function isInAppBrowser() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  
  // Common in-app browser signatures
  const inAppBrowsers = [
    'FBAN',        // Facebook App
    'FBAV',        // Facebook App
    'Instagram',   // Instagram
    'Twitter',     // Twitter
    'LinkedInApp', // LinkedIn
    'Line',        // Line
    'KAKAOTALK',   // KakaoTalk
    'Snapchat',    // Snapchat
    'WeChat',      // WeChat
    'TikTok',      // TikTok
  ];
  
  return inAppBrowsers.some(browser => ua.includes(browser));
}

/**
 * Get the name of the in-app browser
 */
export function getInAppBrowserName() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  
  if (ua.includes('FBAN') || ua.includes('FBAV')) return 'Facebook';
  if (ua.includes('Instagram')) return 'Instagram';
  if (ua.includes('Twitter')) return 'Twitter';
  if (ua.includes('LinkedInApp')) return 'LinkedIn';
  if (ua.includes('Line')) return 'Line';
  if (ua.includes('KAKAOTALK')) return 'KakaoTalk';
  if (ua.includes('Snapchat')) return 'Snapchat';
  if (ua.includes('WeChat')) return 'WeChat';
  if (ua.includes('TikTok')) return 'TikTok';
  
  return 'In-App Browser';
}

/**
 * Copy current URL to clipboard
 */
export async function copyCurrentUrl() {
  const url = window.location.href;
  
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
      return true;
    }
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy URL:', err);
    return false;
  }
}
