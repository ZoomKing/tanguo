const aliasPaths = require('../paths').compilerOptions.paths

module.exports = config => {
    config.moduleNameMapper = {
        ...config.moduleNameMapper,
        ...Object.entries(aliasPaths).reduce(
            (pre, [key, value]) => ({
                ...pre,
                [`^${key.replace(/\/\*$/, '/(.*)$')}`]: `${value[0].replace(
                    /^(.*)\/\*$/,
                    '<rootDir>/src/$1',
                )}/$1`,
            }),
            {},
        ),
    }
    return config
}
