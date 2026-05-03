const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE = 'https://cdn.prod.website-files.com/68945fe30f07ec4fa0eedd9c';

const assets = {
  // Images
  'images/hand-pick.png': `${BASE}/689db3469bee226ac05aff99_hand-pick.png`,
  'images/shane-rocket.png': `${BASE}/689587b7e541f77ab7a6a14d_shane-rocket.png`,
  'images/rocket-blast.gif': `${BASE}/689587b7e541f77ab7a6a153_ezgif-4-2973f9a342.gif`,
  'images/hand-drawn.png': `${BASE}/6895b2db3ec3028dcd4b57f2_hand.png`,
  'images/flip-phone.png': `${BASE}/689dac009007e77a9c754f7c_77726d9ec6e10a34578707042cfbd236_depositphotos_207492386-stock-photo-holding-a-flip-phone-style.png`,

  // Work thumbnails
  'images/work/shukur.png': `${BASE}/68945fe30f07ec4fa0eede31/689b269b39ac75e4ba96c8f1_behance%20thumbnail-min%20(1).png`,
  'images/work/dotfun.png': `${BASE}/68945fe30f07ec4fa0eede31/6895d8d60fda0f53327b48c3_Behance%20Thumbnail.png`,
  'images/work/senses.png': `${BASE}/68945fe30f07ec4fa0eede31/68970ec25b4299038b0f31e4_Behance%20Thumbnail.png`,
  'images/work/tati-wina.png': `${BASE}/68945fe30f07ec4fa0eede31/6895d2c595b6669bc1090543_Behance%20Thumbnail.png`,
  'images/work/innovation-game.png': `${BASE}/68945fe30f07ec4fa0eede31/6895d35de717537413292204_Behance%20Thumbnail.png`,

  // Hero images
  'images/hero/Image151.jpg': `${BASE}/68945fe30f07ec4fa0eede94_Image151%201.jpg`,
  'images/hero/Image159.jpg': `${BASE}/68945fe30f07ec4fa0eedea1_Image159%201.jpg`,
  'images/hero/Image102.jpg': `${BASE}/68945fe30f07ec4fa0eede63_Image102%201.jpg`,
  'images/hero/Image157.jpg': `${BASE}/68945fe30f07ec4fa0eede9d_Image157%201.jpg`,
  'images/hero/Image122.jpg': `${BASE}/68945fe30f07ec4fa0eede8b_Image122%201.jpg`,
  'images/hero/Image117.jpg': `${BASE}/68945fe30f07ec4fa0eede78_Image117%201.jpg`,
  'images/hero/Image105.jpg': `${BASE}/68945fe30f07ec4fa0eede64_Image105%201.jpg`,
  'images/hero/Image156.jpg': `${BASE}/68945fe30f07ec4fa0eede92_Image156%201.jpg`,
  'images/hero/Image158.jpg': `${BASE}/68945fe30f07ec4fa0eede97_Image158%201.jpg`,

  // Testimonial avatars
  'images/testimonials/square-two.jpg': `${BASE}/68945fe30f07ec4fa0eedf17_square%20two.jpg`,
  'images/testimonials/square-ten.jpg': `${BASE}/68945fe30f07ec4fa0eedf13_square%20ten.jpg`,
  'images/testimonials/square-twelve.jpg': `${BASE}/68945fe30f07ec4fa0eedf14_square%20twelve.jpg`,

  // SVG icons
  'images/arrow-right.svg': `${BASE}/68945fe30f07ec4fa0eede42_arrow-right---filled(24x24)%402x.svg`,

  // OG image / favicons
  'images/og-image.png': `https://cdn.prod.website-files.com/68945fe30f07ec4fa0eedd9c/68a2c3d6a72ed147467b3050_OPENGRAPH.png`,
  'favicon/favicon.png': `${BASE}/68a81ca4385ba8a9f3271c90_WEB%20ICON.png`,
  'favicon/apple-icon.png': `${BASE}/68a81c9986d59ffe72d74ebe_web%20icon%20large.png`,
};

// Font files
const fonts = {
  'fonts/HandDrawnShapes.woff2': `${BASE}/68958b66a4c3d08a03fa490d_HandDrawnShapes.woff2`,
  'fonts/pastline-sans.woff2': `${BASE}/6895914ecc496d004cbc1e77_pastline-sans.woff2`,
  'fonts/PlusJakartaSans-Regular.woff': `${BASE}/68945fe30f07ec4fa0eedf76_PlusJakartaSans-Regular.woff`,
  'fonts/PlusJakartaSans-Medium.woff': `${BASE}/68945fe30f07ec4fa0eedf75_PlusJakartaSans-Medium.woff`,
  'fonts/PlusJakartaSans-MediumItalic.woff': `${BASE}/68945fe30f07ec4fa0eedf72_PlusJakartaSans-MediumItalic.woff`,
  'fonts/PlusJakartaSans-Bold.woff': `${BASE}/68945fe30f07ec4fa0eedf63_PlusJakartaSans-Bold.woff`,
  'fonts/PlusJakartaSans-BoldItalic.woff': `${BASE}/68945fe30f07ec4fa0eedf62_PlusJakartaSans-BoldItalic.woff`,
  'fonts/PlusJakartaSans-Italic.woff': `${BASE}/68945fe30f07ec4fa0eedf6c_PlusJakartaSans-Italic.woff`,
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    fs.mkdirSync(dir, { recursive: true });
    const file = fs.createWriteStream(dest);
    https.get(url, { rejectUnauthorized: false }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        console.error(`  FAILED (${res.statusCode}): ${url}`);
        return resolve();
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      file.close();
      fs.unlinkSync(dest, () => {});
      console.error(`  ERROR: ${url} - ${err.message}`);
      resolve();
    });
  });
}

async function main() {
  const publicDir = 'public';

  console.log('Downloading images...');
  const entries = Object.entries(assets);
  for (let i = 0; i < entries.length; i += 4) {
    const batch = entries.slice(i, i + 4);
    await Promise.all(batch.map(([dest, url]) => {
      console.log(`  ${dest}`);
      return download(url, path.join(publicDir, dest));
    }));
  }

  console.log('\nDownloading fonts...');
  const fontEntries = Object.entries(fonts);
  for (let i = 0; i < fontEntries.length; i += 4) {
    const batch = fontEntries.slice(i, i + 4);
    await Promise.all(batch.map(([dest, url]) => {
      console.log(`  ${dest}`);
      return download(url, path.join(publicDir, dest));
    }));
  }

  console.log('\nDone!');
}

main().catch(console.error);
