const sharp = require('sharp');

const optimizeImage = async (base64Image) => {
  const imageBuffer = Buffer.from(base64Image, 'base64');

  const optimizedBuffer = await sharp(imageBuffer)
    .resize(300, 300, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: 50 })
    .toBuffer();

  const optimizedBase64 = optimizedBuffer.toString('base64');

  const originalSize = Math.round(base64Image.length / 1024);
  const optimizedSize = Math.round(optimizedBase64.length / 1024);
  console.log(`Image optimized: ${originalSize}KB → ${optimizedSize}KB`);

  return optimizedBase64;
};

module.exports = { optimizeImage };