import SvgModules from '@components/SvgTag/SvgModules'
import classNames from 'classnames'
import React from 'react'
import './SvgTag.scss'

interface SvgTagProps extends React.SVGProps<SVGSVGElement> {
    svgName: string
}

const SvgTag: React.FC<SvgTagProps> = ({
    svgName,
    className,
    viewBox,
    ...rest
}) => {
    return (
        <svg
            className={classNames('svg-tag', className)}
            viewBox={
                viewBox || (SvgModules[svgName] && SvgModules[svgName].viewBox)
            }
            {...rest}
        >
            <use xlinkHref={`#${svgName}`} />
        </svg>
    )
}

export default SvgTag
