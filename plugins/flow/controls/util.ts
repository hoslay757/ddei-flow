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
    if (editor.ddInstance.stage.selectedModels?.size > 0){
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
          if (subModel.allowIncludeModel){
            let mds = getIncludeModels(subModel, modelLinks,false)
            models.push(...mds)
          }
          
        }
      });
    }
    
    return models;
  }


const getParentModels = function(model){
  let returnArray = []
  if (model?.includePModelId){
    let stage = model.stage
    let pModel = stage.getModelById(model.includePModelId)
    returnArray.push(pModel);
    let pModels = getParentModels(pModel);
    returnArray.push(...pModels)
  }

  return returnArray
  
}

const updateCallActivityView = function (stage,layer,dragParentActiveIds){
  let pModels = new Map()
  //老关系和新关系的所有上级都要检查是否被callactivity引用，如果存在引用，则更新图像
  dragParentActiveIds.forEach(parentActId => {
    let pModel = stage.getModelById(parentActId)
    pModels.set(pModel.id, pModel)
    let pModelList = getParentModels(pModel)
    pModelList.forEach(pm => {
      pModels.set(pm.id, pm)
    });
  })

  let subModels = layer.getSubModels(null, 20)
  subModels.forEach(sm => {

    if (sm.bpmnType == 'CallActivityTask' && pModels.has(sm.upActivityId)) {

      delete sm.upActivityId
    }
  });
}

const lineObiCheck = function(model, param){
  let line = param.line
  if (line) {
    let distLinks = line.stage.getDistModelLinks(line.id);
    if (distLinks) {
      let len = distLinks.length
      let includeModels = getIncludeModels(model)
      //如果线的开始点和结束点之一是本subprocess，则作为障碍物
      for (let i = 0; i < len; i++) {
        if (!distLinks[i].disabled) {
          if (distLinks[i].sm == model) {
            return true;
          }
          //如果线的开始和结束节点之一是subprocess的子元素，则本subprocess不作为寻路障碍物
          else if (includeModels.indexOf(distLinks[i].sm) != -1) {
            return false
          }
        }
      }
    }
  } else {
    let otherModel = param.model
    if (otherModel) {
      let subprocessIncludeModels = getIncludeModels(otherModel)
      if (subprocessIncludeModels.indexOf(model) != -1) {
        return false;
      }
    }
  }

  return true
}





export { showSettingButton, getIncludeModels, getParentModels, updateCallActivityView, lineObiCheck }