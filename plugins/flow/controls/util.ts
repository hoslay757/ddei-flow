import { DDeiUtil, DDeiConfig,DDeiEditor, DDeiEditorUtil, DDeiEnumOperateType, DDei, DDeiFuncCallResult, DDeiAbstractShape } from 'ddei-editor'

/**
 * 额外显示一个切换控件类型的小图标在右上角区域
 */
const showSettingButton = function (operate: DDeiEnumOperateType, data: object | null, ddInstance: DDei, evt: Event): DDeiFuncCallResult {
  let rs = new DDeiFuncCallResult();
  rs.state = 1;
  let model = data.model
  //计算位置，显示按钮div
  let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
  if (editor) {
    //位置
    editor.tempOperateModel = model
    let stageRatio = model.getStageRatio()
    //获取model的绝对位置
    let modelPos = DDeiUtil.getModelsDomAbsPosition([model])

    let left = modelPos.left + modelPos.width + (6.5 * (stageRatio - 1))
    let top = modelPos.top + (6.5 * (stageRatio - 1))
    if (model.bpmnBaseType == 'Event') {
      left = modelPos.left + modelPos.width + (12 * (stageRatio - 1))
    }
    let settingBtnEle = document.getElementById(editor.id + "_ddei-flow-setting-button-dialog");
    if (!settingBtnEle || settingBtnEle.style.display == "none") {
      DDeiEditorUtil.showDialog(editor, 'ddei-flow-setting-button-dialog', {
        group: "ddei-flow-setting-button",
        model: model
      }, { type: 99, left: left, top: top, hiddenMask: true }, null, true, true)
    }


    DDeiEditorUtil.closeDialog(editor, 'ddei-flow-element-setting-dialog')

  }
  return rs;
}






export { showSettingButton }