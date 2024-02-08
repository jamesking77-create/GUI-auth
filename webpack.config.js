const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
 

  plugins: [
   

    new ImageminPlugin({
    
      test: /\.(jpe?g|png)$/i,
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8]
        }),
        imageminMozjpeg({
          quality: 75
        })
      ]
    })
  ]
};
