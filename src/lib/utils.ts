import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Masks external URLs by routing them through the local API proxy.
 * This prevents external asset domains (like ieee.socet.edu.in) 
 * from appearing in the browser's "Sources" tab.
 */
export function maskUrl(url: string | undefined): string {
  if (!url) return "";
  if (url.startsWith("/") || url.startsWith("data:") || url.startsWith("./")) return url;

  if (url.startsWith("http")) {
    return `/api/media?url=${encodeURIComponent(url)}`;
  }

  return url;
}
