import * as types from '../types/dimension'

export function changeDimension(height, width, orientation) {
    return {
        type: types.CHANGE_DIMENSION,
        height: height,
        width: width,
        orientation: orientation
    }
}