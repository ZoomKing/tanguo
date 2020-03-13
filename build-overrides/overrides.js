const webpackOverride = require('./webpack.override')
const jest = require('./jest.overritde')

module.exports = {
    ...webpackOverride,
    jest,
    paths: null,
}
