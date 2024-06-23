module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./node_modules/@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|@rneui)/)'
  ],
};
