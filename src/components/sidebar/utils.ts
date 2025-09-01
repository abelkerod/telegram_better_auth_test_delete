import type { NavItem } from "./types";

export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export function checkIsActive(href: string, item: NavItem, mainNav = false) {
  const itemUrl = "url" in item ? item.url : undefined;
  if (!itemUrl) {
    // For collapsible groups, check if any child item's URL is the start of the current href
    return !!item.items?.some((subItem) => href === subItem.url || href.startsWith(subItem.url + '/'));
  }
  return (
    href === itemUrl ||
    href.split("?")[0] === itemUrl ||
    (mainNav && href.split("/")[1] !== "" && href.split("/")[1] === itemUrl.split("/")[1])
  );
}
