module.exports = {
  displayName: 'backend',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/backend',
  transformIgnorePatterns: ['node_modules/(?!(@prisma|prisma|@backend)/)'],
};
