export interface Artwork {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

type ArtworkConfig = {
  count: number;
  prefix: string;
  path: string;
  category: string;
  idStart?: number;
  startIndex?: number;
};

const configs: ArtworkConfig[] = [
  { count: 15, prefix: '1', path: 'illustrations', category: 'Illustrations', startIndex: 1 },
  { count: 6, prefix: '2', path: 'childrens', category: 'Childrens Book', idStart: 100, startIndex: 1 },
  { count: 22, prefix: '3', path: 'character', category: 'Characters', idStart: 200, startIndex: 1 },
  { count: 8, prefix: '4', path: 'environment', category: 'Environments', idStart: 300, startIndex: 1 }
];

const generateFromConfigs = (configs: ArtworkConfig[]): Artwork[] =>
  configs.flatMap(({ count, prefix, path, category, idStart = 1, startIndex = 0 }) =>
    Array.from({ length: count }, (_, i) => {
      const index = i + startIndex;
      // Make category singular by removing 's' at the end if it exists
      const singularCategory = category.endsWith('s') ? category.slice(0, -1) : category;
      return {
        id: idStart + i,
        title: `${singularCategory} ${index}`,
        description: `An artwork from the ${category.toLowerCase()} series, number ${index}.`,
        imageUrl: `/${path}/${prefix}.${index}.webp`,
        category
      };
    })
  );

export const artworks: Artwork[] = generateFromConfigs(configs);
export const categories = Array.from(new Set(artworks.map(art => art.category))).sort();
