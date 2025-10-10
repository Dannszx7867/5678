import { PlaceHolderImages } from '@/lib/placeholder-images';

export type Model = {
  id: string;
  name: string;
  persona?: string;
  description: string;
  imageUrl: string;
  evaluationImageUrl?: string;
  imageHint: string;
  nationality: string;
  flagUrl?: string;
  videoUrl?: string;
  photos: number;
  videos: number;
  followers: string;
  attributes: {
    beleza: number;
    estilo: number;
    interacao: number;
  };
};

const flagUrls: { [key: string]: string } = {
  '🇧🇷': 'https://i.imgur.com/f0IrXlc.jpeg',
  '🇨🇴': 'https://i.imgur.com/LAOhJzK.png',
  '🇯🇵': 'https://i.imgur.com/n2UvJxt.png',
  '🇺🇸': 'https://i.imgur.com/50U4mEc.png',
  '🇨🇦': 'https://i.imgur.com/csNCEdF.png',
};

const modelData = [
  { id: '1', name: 'vale.castaneda', persona: 'musa', description: 'Imagínala solo para ti...', imageId: 'model-1', evaluationImageUrl: 'https://i.imgur.com/W8I9S3p.png', nationality: '🇨🇴', photos: 195, videos: 50, followers: '15.2K', attributes: { beleza: 96, estilo: 93, interacao: 97 } },
  { id: '2', name: 'maria.gomez', persona: 'musa', description: '¿Sería tuya esta traviesa ahora?', imageId: 'model-2', evaluationImageUrl: 'https://i.imgur.com/CxNQ8jS.png', nationality: '🇨🇴', photos: 234, videos: 62, followers: '21.1K', attributes: { beleza: 91, estilo: 94, interacao: 96 } },
  { id: '3', name: 'ester.muniz', persona: 'carioca', description: '¿Podrías con esta delicia?', imageId: 'model-3', evaluationImageUrl: 'https://i.imgur.com/mZSnpaP.png', nationality: '🇧🇷', photos: 155, videos: 30, followers: '18.3K', attributes: { beleza: 93, estilo: 97, interacao: 90 } },
  { id: '4', name: 'Karol.Rosado', persona: 'influencer', description: '¿Qué te parece esta belleza?', imageId: 'model-4', evaluationImageUrl: 'https://i.imgur.com/10xEca4.png', nationality: '🇨🇴', photos: 210, videos: 55, followers: '19.8K', attributes: { beleza: 94, estilo: 91, interacao: 96 } },
  { id: '5', name: 'sophie.rain', persona: 'ninfeta', description: '¿Dejarías escapar a una de estas?', imageId: 'model-5', evaluationImageUrl: 'https://i.imgur.com/XYcFe3H.png', nationality: '🇨🇦', photos: 280, videos: 75, followers: '25.4K', attributes: { beleza: 96, estilo: 91, interacao: 89 } },
  { id: '6', name: 'kimber.sanchez', persona: 'milf', description: '¿Podrías con esta belleza?', imageId: 'model-6', evaluationImageUrl: 'https://i.imgur.com/R5Vxrk9.png', nationality: '🇨🇴', photos: 210, videos: 58, followers: '23.5K', attributes: { beleza: 93, estilo: 94, interacao: 95 } },
  { id: '7', name: 'Kerolay.Chaves', persona: 'milf', description: '¿Crees que podrías con ella?', imageId: 'model-7', evaluationImageUrl: 'https://i.imgur.com/vrML97Z.jpeg', nationality: '🇧🇷', photos: 215, videos: 55, followers: '22.5K', attributes: { beleza: 92, estilo: 95, interacao: 93 } },
  { id: '8', name: 'yasmim.cat', persona: 'chica gamer', description: '¿Viste lo que salió de esta gamer en su cuarto?', imageId: 'model-8', evaluationImageUrl: 'https://i.imgur.com/DTWFp2z.png', nationality: '🇧🇷', photos: 250, videos: 68, followers: '28.1K', attributes: { beleza: 97, estilo: 90, interacao: 95 } },
  { id: '9', name: 'eun.chae', persona: 'japonesita', description: 'Tiene un secreto que contarte. ¿Quieres saber cuál es?', imageId: 'model-9', evaluationImageUrl: 'https://i.imgur.com/JN7oCMu.png', nationality: '🇯🇵', photos: 180, videos: 40, followers: '17.2K', attributes: { beleza: 90, estilo: 93, interacao: 97 } },
];

export const models: Model[] = modelData.map(model => {
  const placeholder = PlaceHolderImages.find(p => p.id === model.imageId);
  return {
    ...model,
    imageUrl: placeholder?.imageUrl ?? `https://picsum.photos/seed/${model.id}/400/500`,
    imageHint: placeholder?.imageHint ?? 'woman portrait',
    flagUrl: flagUrls[model.nationality]
  };
});
