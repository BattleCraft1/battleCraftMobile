import * as types from '../types/reportPanel'

export function showReportPanel(isShown,objectType,objectNames) {
    return {
        type: types.SHOW_REPORT_PANEL,
        isShown: isShown,
        objectType: objectType,
        objectNames:objectNames
    }
}