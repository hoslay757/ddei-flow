import { DDeiUtil, DDeiLink,DDeiConfig,DDeiEditor, DDeiEditorUtil, DDeiEnumOperateType, DDei, DDeiFuncCallResult, DDeiAbstractShape } from 'ddei-editor'

/**
 * 额外显示一个切换控件类型的小图标在右上角区域
 */
const showSettingButton = function (operate: DDeiEnumOperateType, data: object | null, ddInstance: DDei, evt: Event): DDeiFuncCallResult {
  let rs = new DDeiFuncCallResult();
  rs.state = 2;
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
          if (subModel.bpmnType == 'SubProcess'){
            let mds = getIncludeModels(subModel, modelLinks,false)
            models.push(...mds)
          }
          // let sublinks = stage.getSourceModelLinks(subModel.id)
          // sublinks?.forEach(lk => {
          //   models.push(lk)
          //   if (modelLinks.indexOf(lk) == -1){
          //     modelLinks.push(lk)
          //   }
          // });
        }
      });
    }
    // let links = stage.getSourceModelLinks(subProcessModel.id)
    // links?.forEach(lk => {
    //   models.push(lk)
    //   if (modelLinks.indexOf(lk) == -1) {
    //     modelLinks.push(lk)
    //   }
    // });
    // if (first){
    //   let startLinkLines = []
    //   let appendLines = []
    //   for (let k = models.length-1;k >=0;k--){
    //     if(models[k] instanceof DDeiLink){
    //       if (models[k].sm && models.indexOf(models[k].sm) != -1 ){
    //         if (startLinkLines.indexOf(models[k].dm) == -1){
    //           startLinkLines.push(models[k].dm)
    //         }else{
    //           appendLines.push(models[k].dm)
    //         }
    //       }
    //       models.splice(k, 1)
    //     }
        
    //   }

    //   appendLines.forEach(aline=>{
    //     if (models.indexOf(aline) == -1){
    //       models.push(aline)
    //     }
    //   })
      
    // }
    return models;
  }





export { showSettingButton, getIncludeModels }