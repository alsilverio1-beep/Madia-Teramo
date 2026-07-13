interface PricedItem {
  name: string;
  description: string;
  price?: number | string;
  prices?: number[];
  section: string;
  subcategory: string;
}

function itemOffers(item: PricedItem) {
  if (item.prices?.length) {
    return item.prices.map(price => ({ '@type': 'Offer', price, priceCurrency: 'EUR' }));
  }
  if (item.price !== undefined) {
    return [{ '@type': 'Offer', price: item.price, priceCurrency: 'EUR' }];
  }
  return undefined;
}

/** Genera un JSON-LD schema.org Menu/MenuSection/MenuItem raggruppando gli item per section e subcategory. */
export function buildMenuJsonLd<T extends PricedItem>(
  items: T[],
  sectionLabels: Record<string, string>,
  hasMenuSection: boolean = true,
) {
  const sectionOrder = Object.keys(sectionLabels);

  const sections = sectionOrder
    .map(sectionId => {
      const sectionItems = items.filter(i => i.section === sectionId);
      if (!sectionItems.length) return null;

      const subcategories = [...new Set(sectionItems.map(i => i.subcategory))];

      return {
        '@type': 'MenuSection',
        name: sectionLabels[sectionId],
        hasMenuSection: subcategories.map(sub => ({
          '@type': 'MenuSection',
          name: sub,
          hasMenuItem: sectionItems
            .filter(i => i.subcategory === sub)
            .map(i => ({
              '@type': 'MenuItem',
              name: i.name,
              description: i.description || undefined,
              offers: itemOffers(i),
            })),
        })),
      };
    })
    .filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    ...(hasMenuSection ? { hasMenuSection: sections } : {}),
  };
}
