import { DDeiUtil, DDeiLink,DDeiConfig,DDeiEditor, DDeiEditorUtil, DDeiEnumOperateType, DDei, DDeiFuncCallResult, DDeiAbstractShape } from 'ddei-editor'

/**
 * 额外显示一个切换控件类型的小图标在右上角区域
 */
const showSettingButton = function (operate: DDeiEnumOperateType, data: object | null, ddInstance: DDei, evt: Event): DDeiFuncCallResult {
  let rs = new DDeiFuncCallResult();
  rs.state = 2;
  

  //计算位置，显示按钮div
  let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
  if (editor) {
    let model = data.model
    //如果存在选中控件，则重新定位到选中控件
    if (editor.ddInstance.stage.selectedModels.size > 0){
      if (!editor.ddInstance.stage.selectedModels.has(model.id)){
        if (editor.ddInstance.stage.selectedModels.size == 1) {
          model = Array.from(editor.ddInstance.stage.selectedModels.values())[0]
        }else{
          return rs;
        }
      }
    }
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
    if (!settingBtnEle || settingBtnEle.style.display == "none" || (editor.tempPopData && editor.tempPopData['ddei-flow-setting-button-dialog'] && editor.tempPopData['ddei-flow-setting-button-dialog'].model != model)) {
      DDeiEditorUtil.showDialog(editor, 'ddei-flow-setting-button-dialog', {
        group: "ddei-flow-setting-button",
        model: model
      }, { type: 99, left: left, top: top, hiddenMask: true }, null, true, true)
    }


    DDeiEditorUtil.closeDialog(editor, 'ddei-flow-element-setting-dialog')

  }
  return rs;
}

const getIncludeModels = function(subProcessModel,modelLinks,first:boolean = true){
    if (!modelLinks){
      modelLinks = []
    }
    let stage = subProcessModel.stage;
    let models = []
    if (!subProcessModel.includeModels) {
      subProcessModel.includeModels = []
    }else{
      
      subProcessModel.includeModels.forEach(subModelId => {
        if (subProcessModel.isShadowControl){
          subModelId+="_shadow"
        }
        let subModel = stage.getModelById(subModelId)
        if (subModel){
          models.push(subModel)
          if (subModel.bpmnType == 'SubProcess' || subModel.bpmnType == 'Group'){
            let mds = getIncludeModels(subModel, modelLinks,false)
            models.push(...mds)
          }
          
        }
      });
    }
    
    return models;
  }





export { showSettingButton, getIncludeModels }