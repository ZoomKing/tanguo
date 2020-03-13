// svg-sprite symbol 雪碧图注册
interface SvgSpriteModule {
    id: string
    content: string
    isMounted: boolean
    node: SVGSymbolElement
    viewBox?: string
}

declare interface SvgSpriteModules {
    [key: string]: SvgSpriteModule
}

const requireCtx = (() => {
    try {
        return (require as any).context('@svg-sprite', true, /\.svg$/)
    } catch (e) {
        return null
    }
})()

const SvgModules = requireCtx
    ? requireCtx
          .keys()
          .map(requireCtx)
          .map((svgModule: any) => svgModule.default)
          .reduce(
              (pre: SvgSpriteModules, svgModule: SvgSpriteModule) => ({
                  ...pre,
                  [svgModule.id]: svgModule,
              }),
              {},
          )
    : {}

export default SvgModules
