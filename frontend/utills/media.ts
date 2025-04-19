export const getMediaUrl = (media: string): string => {
    if (media.startsWith('http')) return media;
    if (media.startsWith('/')) return `http://localhost:4000${media}`;
    return `http://localhost:4000/uploads/${media}`;
  };
  