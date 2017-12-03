/**
 * Created by FBegiello on 03.12.2017.
 */
import * as types from '../types/sound'

export function playSound(name) {
    return {
        type: types.PLAY_SOUND,
        name: name
    }
}