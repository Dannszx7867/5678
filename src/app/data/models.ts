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
  '🇪🇸': 'https://i.imgur.com/klAVsrd.png',
};

const modelData = [
  { id: '1', name: 'vale.castaneda', persona: 'musa', description: 'Imagínala solo para ti...', imageId: 'model-1', videoUrl: '/video_01.mp4', evaluationImageUrl: 'https://i.imgur.com/Sfq1Ae3.png', nationality: '🇨🇴', photos: 195, videos: 50, followers: '15.2K', attributes: { beleza: 96, estilo: 93, interacao: 97 } },
  { id: '3', name: 'ester.muniz', persona: 'carioca', description: '¿Podrías con esta delicia?', imageId: 'model-3', videoUrl: '/video_02.mp4', evaluationImageUrl: 'https://i.imgur.com/ok930yD.png', nationality: '🇧🇷', photos: 155, videos: 30, followers: '18.3K', attributes: { beleza: 93, estilo: 97, interacao: 90 } },
  { id: '4', name: 'Karol.Rosado', persona: 'influencer', description: '¿Qué te parece esta belleza?', imageId: 'model-4', videoUrl: '/video_03.mp4', evaluationImageUrl: 'https://i.imgur.com/QspexUv.png', nationality: '🇨🇴', photos: 210, videos: 55, followers: '19.8K', attributes: { beleza: 94, estilo: 91, interacao: 96 } },
  { id: '10', name: 'annie.lust', persona: 'traviesa', description: '¿Te atreves a conocerla?', imageId: 'model-10', videoUrl: '/video_04.mp4', evaluationImageUrl: 'https://i.imgur.com/FkvAYXq.png', nationality: '🇪🇸', photos: 310, videos: 80, followers: '30.1K', attributes: { beleza: 95, estilo: 92, interacao: 98 } },
  { id: '6', name: 'kimber.sanchez', persona: 'milf', description: '¿Podrías con esta belleza?', imageId: 'model-6', videoUrl: '/video_05.mp4', evaluationImageUrl: 'https://i.imgur.com/Knk2Slb.png', nationality: '🇺🇸', photos: 210, videos: 58, followers: '23.5K', attributes: { beleza: 93, estilo: 94, interacao: 95 } },
  { id: '7', name: 'Kerolay.Chaves', persona: 'milf', description: '¿Crees que podrías con ella?', imageId: 'model-7', videoUrl: '/video_06.mp4', evaluationImageUrl: 'https://i.imgur.com/Knk2Slb.png', nationality: '🇧🇷', photos: 215, videos: 55, followers: '22.5K', attributes: { beleza: 92, estilo: 95, interacao: 93 } },
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
