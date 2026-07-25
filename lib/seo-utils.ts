export function generateItemListSchema(items: any[], siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": items.length,
    "itemListElement": items.map((item, index) => {
      const categorySlug = item.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized';
      return {
        "@type": "ListItem",
        "position": index + 1,
        "url": `${siteUrl}/ai-examples/${categorySlug}/${item.slug || item.id}`
      };
    })
  };
}

export function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\\]/g, '\\$&');
}
