const path = require('path')
const fs = require('fs')
const { backendUrl } = require('../src/config/config')
const aliasPaths = require('../paths').compilerOptions.paths
const { DefinePlugin } = require('webpack')

const [origin, pathname] = backendUrl.match(/^https?:\/{2}[^/]+(\/.*)?/) || []
const isProduction = process.env.NODE_ENV === 'production'

function resolve(...args) {
    return path.resolve(fs.realpathSync(process.cwd()), ...args)
}

/**
 * @desc 添加路径别名
 * */
function addAlias(config) {
    config.resolve.alias = {
        ...config.resolve.alias,
        ...Object.entries(aliasPaths).reduce(
            (pre, [key, value]) => ({
                ...pre,
                [key.replace(/\/\*$/, '')]: resolve(
                    value[0].replace(/^(.*)\/\*$/, 'src/$1'),
                ),
            }),
            {},
        ),
    }
    return config
}

/**
 * @desc 使用 thread loader
 * */
function useThreadLoader(config) {
    const babelLoader = config.module.rules[2].oneOf[1]

    config.module.rules[2].oneOf[1].use = [
        'thread-loader',
        {
            loader: babelLoader.loader,
            options: babelLoader.options,
        },
    ]

    config.module.rules[2].oneOf[1].loader = undefined
    config.module.rules[2].oneOf[1].options = undefined

    return config
}

/**
 * @desc 添加路径别名
 * */
function addSvgSpriteLoader(config) {
    const svgSpriteLoader = {
        test: /\.svg$/,
        loader: ['svg-sprite-loader', 'svgo-loader'],
        include: [resolve('src/common/svg-sprite')],
        exclude: /node_modules/,
    }
    config.module.rules[2].oneOf.splice(0, 0, svgSpriteLoader)
    return config
}

/**
 * @desc 添加环境变量，相关插件 webpack.DefinePlugin
 * */
function addEnvVariable(config) {
    config.plugins.some(plugin => {
        if (plugin instanceof DefinePlugin) {
            plugin.definitions['process.env'] = {
                ...plugin.definitions['process.env'],
                BACKEND_URL: JSON.stringify(isProduction ? '' : pathname),
                BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
            }
        }
        return !!plugin.definitions
    })
    return config
}

/**
 * @desc css 编译规则扩展
 * */
function cssLoader(config, env) {
    const isDevelopment = env === 'development'

    const cssRules = config.module.rules[2].oneOf.filter(
        rule => rule.test && /(s?css)|(sass)/.test(rule.test.toString()),
    )

    cssRules.forEach(rule => {
        rule.use = rule.use.map(loader => {
            if (isDevelopment && typeof loader === 'string') {
                // 默认的 style-loader 会将内联的 sourceMap 转为 blob
                // 由注入 style 标签改为注入 link 标签
                // 如此页面加载的时候会出现由于 css 异步加载导致的闪屏问题
                // vue-style-loader 可以解决这个问题
                return 'vue-style-loader'

                // return loader
            }

            if (/sass-loader/.test(loader.loader)) {
                // 注册全局 sass 变量，函数等
                // common-variable.scss 要求不能出现实际的 类名/id 样式，这会导致编译内容重复 n 遍
                loader.options.data = `@import "${resolve(
                    'src/common/css/common-variable.scss',
                ).replace(new RegExp(`\\${path.sep}`, 'g'), '/')}";`
            }

            return {
                ...loader,
                options: {
                    ...loader.options,
                    // 开发时开启 css 的 sourceMap
                    sourceMap: isDevelopment,
                },
            }
        })
    })

    return config
}

/**
 * @desc eslint 扩展
 * */
function eslintExtends(config, env) {
    if (env === 'development') {
        config.module.rules[1].use[0].options = {
            ...config.module.rules[1].use[0].options,
            ignore: true,
            useEslintrc: true,
            fix: true,
        }
    }
    return config
}

const overrides = {
    addAlias,
    useThreadLoader,
    addSvgSpriteLoader,
    addEnvVariable,
    cssLoader,
    eslintExtends,
}

module.exports = {
    webpack: (config, env) => {
        if (env === 'development') {
            // 禁止编译初始编译结束时打开浏览器
            process.env.BROWSER = 'none'
        }

        // 运行覆盖函数
        Object.values(overrides).forEach(override => {
            override(config, env)
        })

        // console.log(config)
        return config
    },
    devServer: configFunction => {
        const overrideProxy = origin &&
            pathname &&
            pathname !== '/' && {
                [pathname]: {
                    target: origin.replace(pathname, ''),
                    secure: false,
                },
            }
        return (proxy, allowedHost) => {
            return {
                ...configFunction(overrideProxy || proxy, allowedHost),
                // disableHostCheck: true,
                // compress: false,
                // clientLogLevel: 'info',
                quiet: false,
            }
        }
    },
}
