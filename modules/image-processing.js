import fs from 'node:fs/promises';
import path from 'path';
import sharp from 'sharp';
import { getPath } from './get-path.js';

function getName(fullName) {
  const [name] = fullName.split('.');
  return `${name}.webp`;
}

export const imageProcessing = (image, maxSize) => {
  const fullPath = getPath(path.resolve(image.dist), getName(image.name));

  fs.mkdir(image.dist, { recursive: true }).then(() => {
    sharp.cache(false);
    const input = sharp(image.path);

    input.metadata().then((metadata) => {
      const width = metadata.width > maxSize.width ? maxSize.width : metadata.width;
      const height = metadata.height > maxSize.height ? maxSize.height : metadata.height;
      return input.resize(width, height, { fit: 'inside' }).toFile(fullPath);
    });
  });
};
