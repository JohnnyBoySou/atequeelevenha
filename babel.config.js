module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        root: ['./'],
        alias: {
          '@': './',
          '@app': './app',
          '@theme': './app/theme',
          '@pages': './app/pages',
          '@components': './app/components',
          '@utils': './app/utils',
          '@assets': './app/assets',
          '@hooks': './app/hooks',
          '@api': './app/api',
          '@env': '.env',
        },
        extesion: ['ts', 'tsx', 'js', 'jsx', 'json']        
      }  
      ]
    ]
  };
};