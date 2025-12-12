import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
}

export function ShareButtons({ title, url, className = "" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link");
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      <Button
        size="icon"
        variant="outline"
        onClick={() => handleShare("facebook")}
        aria-label="Share on Facebook"
        data-testid="button-share-facebook"
      >
        <Facebook className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={() => handleShare("twitter")}
        aria-label="Share on Twitter"
        data-testid="button-share-twitter"
      >
        <Twitter className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={() => handleShare("linkedin")}
        aria-label="Share on LinkedIn"
        data-testid="button-share-linkedin"
      >
        <Linkedin className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={handleCopyLink}
        aria-label="Copy link"
        data-testid="button-share-copy"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
      </Button>
    </div>
  );
}
