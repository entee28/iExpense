module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          libs: './src/libs',
          screens: './src/screens',
          assets: './src/assets'
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    ]
  ]
}
