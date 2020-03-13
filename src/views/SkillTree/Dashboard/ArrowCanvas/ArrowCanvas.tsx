import React, { useRef, useEffect } from 'react'

export interface ArrowCanvasParams {
    /**
     * @desc 箭头开始位置
     *
     * Arrow start position
     */
    startPoint: number[]

    /**
     * @desc 箭头结束位置
     *
     * Arrow end position
     */
    endPoint: number[]

    /**
     * @desc canvas 转角半径
     *
     * canvas strokeStyle
     */
    cornerRadius?: number

    /**
     * @desc canvas 笔触样式
     *
     * canvas strokeStyle
     */
    strokeStyle?: string

    /**
     * @desc canvas 行宽
     *
     * canvas lineWidth
     */
    lineWidth?: number
}

interface ArrowOptions {
    options: ArrowCanvasParams[]
}

/**
 * 此箭头只会进行最多两次转折
 * 不是直线的距离的两个点，横向距离最小差40
 */
const ArrowCanvas: React.FC<ArrowOptions> = ({ options, ...rest }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    console.log('options', options)
    // 计算得出canvas宽和高
    const [width, height] = options.reduce(
        (pre, item) => {
            pre = [
                Math.max(item.startPoint[0], item.endPoint[0], pre[0]),
                Math.max(item.startPoint[1], item.endPoint[1], pre[1]),
            ]
            return pre
        },
        [0, 0],
    )

    useEffect(() => {
        if (!canvasRef.current) return
        const context = canvasRef.current.getContext('2d')
        if (!context) return

        options.forEach(item => {
            const {
                startPoint,
                endPoint,
                strokeStyle = 'gold',
                lineWidth = 1,
                cornerRadius = 20,
            } = item
            const [startPointX, startPointY] = startPoint
            const [endPointX, endPointY] = endPoint
            const XDiff = startPointX - endPointX > 0

            context.strokeStyle = strokeStyle
            context.lineWidth = lineWidth
            // 绘制直线
            context.beginPath()
            // 起点
            context.moveTo(startPointX + lineWidth / 2, startPointY)

            if (startPointX !== endPointX) {
                context.arc(
                    startPointX +
                        lineWidth / 2 +
                        (XDiff ? -cornerRadius : cornerRadius),
                    endPointY - cornerRadius * 4,
                    cornerRadius,
                    XDiff ? 0 : Math.PI,
                    Math.PI / 2,
                    !XDiff,
                )
                context.lineTo(
                    endPointX +
                        lineWidth / 2 -
                        (XDiff ? -cornerRadius : cornerRadius),
                    endPointY - cornerRadius * 3,
                )
                context.arc(
                    endPointX +
                        lineWidth / 2 -
                        (XDiff ? -cornerRadius : cornerRadius),
                    endPointY - cornerRadius * 2,
                    cornerRadius,
                    (Math.PI / 2) * 3,
                    XDiff ? Math.PI : 0,
                    !!XDiff,
                )
            }

            context.lineTo(endPointX + lineWidth / 2, endPointY - cornerRadius)
            context.stroke()
            // 除箭头部分结束
            // 箭头
            context.beginPath()
            context.lineWidth = lineWidth / 2
            context.moveTo(
                endPointX + lineWidth / 2 - cornerRadius,
                endPointY - cornerRadius,
            )
            context.lineTo(
                endPointX + lineWidth / 2 + cornerRadius,
                endPointY - cornerRadius,
            )
            context.lineTo(endPointX + lineWidth / 2, endPointY)
            context.fillStyle = strokeStyle
            context.closePath()
            context.fill()
            context.stroke()
        })
    }, [options])

    return (
        <canvas
            {...rest}
            ref={canvasRef}
            width={width + 80}
            height={height + 50}
        />
    )
}

export default ArrowCanvas
