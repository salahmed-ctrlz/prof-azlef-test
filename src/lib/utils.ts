import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Smooth scroll function for hash links
// Make sure this function exists in your utils.ts file
export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // Adjust for header height
      behavior: "smooth",
    });
  }
}

// Format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

// Generate a random ID
export function generateId(length = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Social media link formatter
export function formatSocialLink(platform: string, username: string): string {
  switch (platform) {
    case "instagram":
      return `https://instagram.com/${username.replace('@', '')}`;
    case "linkedin":
      return `https://linkedin.com/in/${username}`;
    case "youtube":
      return `https://youtube.com/@${username}`;
    default:
      return username;
  }
}

// Get viewport size
export function getViewport() {
  const width = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  
  if (width < 640) return "mobile";
  if (width < 768) return "tablet";
  if (width < 1024) return "laptop";
  return "desktop";
}
