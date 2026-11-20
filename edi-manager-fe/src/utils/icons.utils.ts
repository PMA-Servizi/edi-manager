import { h, type VNodeChild } from 'vue'
import { Icon } from '@iconify/vue'

export const renderIcon = (icon: string): (() => VNodeChild) => {
  return () => h(Icon, { icon })
}
