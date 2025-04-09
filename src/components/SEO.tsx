// src/components/SEO.tsx
import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title: string;
  description: string;
  image?: string;
};

const SEO = ({ title, description, image }: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default SEO;
