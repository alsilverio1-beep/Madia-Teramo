import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  noindex?: boolean;
  breadcrumb?: BreadcrumbItem[];
}

const BASE_URL = 'https://www.madiateramo.it';
const DEFAULT_IMAGE = '/og-image.jpg';

export function SEO({ title, description, canonical, ogImage = DEFAULT_IMAGE, noindex = false, breadcrumb }: SEOProps) {
  const fullTitle = `${title} | Madia Teramo`;
  const fullImage = `${BASE_URL}${ogImage}`;
  const fullCanonical = canonical.startsWith('http') ? canonical : `${BASE_URL}${canonical}`;

  const breadcrumbJson = breadcrumb
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL + '/' },
          ...breadcrumb.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 2,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : BASE_URL + item.url,
          })),
        ],
      })
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="it_IT" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {breadcrumbJson && (
        <script type="application/ld+json">{breadcrumbJson}</script>
      )}
    </Helmet>
  );
}
