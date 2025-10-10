import { PlaceHolderImages } from './placeholder-images';

export type Model = {
    id: string;
    name: string;
    imageUrl: string;
    imageHint: string;
}

const modelNames = [
    "Sofía", "Valentina", "Isabella", "Camila", "Valeria",
    "Mariana", "Gabriela", "Daniela", "Paula", "Antonella"
];

export const models: Model[] = PlaceHolderImages.map((image, index) => ({
    id: image.id,
    name: modelNames[index % modelNames.length],
    imageUrl: image.imageUrl,
    imageHint: image.imageHint,
}));
