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
    
    // Build the canonical URL (without query parameters)
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.instatrainme.com';
    canonicalLink.href = `${baseUrl}${path}`;
  }, [path]);
}
