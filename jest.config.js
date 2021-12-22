module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/packages/*.{ts,vue}',
    '!**/packages/index.ts',
  ],
}
