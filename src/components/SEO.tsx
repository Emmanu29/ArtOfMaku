import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title: string;
  description: string;
  image?: string;
  canonicalUrl?: string;
};

const SEO = ({ title, description, image, canonicalUrl }: SEOProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Gerard Villanueva Quizon",
    "alternateName": "Art of Maku",
    "url": "https://art-of-maku.vercel.app",
    "image": "https://art-of-maku.vercel.app/artofmaku.jpg",
    "description": "Filipino content creator, character designer & concept art",
    "jobTitle": "Digital Artist",
    "nationality": "Filipino",
    "knowsAbout": ["Digital Art", "Character Design", "Concept Art"]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Indexing and canonical */}
      <meta name="robots" content="index, follow" />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;