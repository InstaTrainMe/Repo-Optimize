import { useEffect } from 'react';

export function useCanonical(path: string) {
  useEffect(() => {
    // Set or update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    
    // Build the canonical URL (ensure no trailing slash unless it's the root)
    const baseUrl = 'https://www.instatrainme.com';
    const cleanPath = path === '/' ? '' : path.replace(/\/$/, '');
    const finalUrl = path === '/' ? `${baseUrl}/` : `${baseUrl}${cleanPath}`;
    canonicalLink.href = finalUrl;
  }, [path]);
}
