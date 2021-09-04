import { FC } from "react"
import { IconProps } from "./"
import sprite from "@/assets/icons/sprite.svg"

const Icon: FC<IconProps> = props => {
  const { iconId, ...rest } = props

  return (
    <svg {...rest}>
      <use xlinkHref={`${sprite}#${iconId}`}></use>
    </svg>
  )
}

export default Icon
