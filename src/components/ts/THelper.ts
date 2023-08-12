import { AxesHelper, GridHelper } from 'three'

export const allHelper = []

export const axesHelper = new AxesHelper(500)
export const gridHelper = new GridHelper(100, 10, 'red', 'rgb(0,0,0)')

allHelper.push(axesHelper, gridHelper)

