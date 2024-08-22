import { DDeiUtil, DDeiEnumBusCommandType,DDeiEditor, DDeiEditorUtil, DDeiEnumOperateType, DDei, DDeiFuncCallResult, DDeiAbstractShape } from 'ddei-editor'
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
    let btnEle = document.getElementById(editor.id + "_flow_setting_btn");
    let canvasEle = document.getElementById(editor.id + "_canvas");
    let canvasDomPos = DDeiUtil.getDomAbsPosition(canvasEle);
    if (!btnEle) {
      btnEle = document.createElement("div")
      btnEle.innerHTML = `<svg style="width:11px;height:11px;opacity:0.5" class="icon-ddei-flow" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-setting"></use>
      </svg>`
      btnEle.style.position = "absolute"
      btnEle.setAttribute("id", editor.id + "_flow_setting_btn")
      btnEle.style.zIndex = "99900"
      btnEle.onmouseenter = exChangeEventMouseEnter
      btnEle.onmouseleave = exChangeEventMouseLeave
      canvasEle.appendChild(btnEle)
    }
    //位置
    editor.tempOperateModel = model
    let stageRatio = model.getStageRatio()
    btnEle.style.transform = " scale(" + stageRatio + ")"
    //获取model的绝对位置
    let modelPos = DDeiUtil.getModelsDomAbsPosition([model])
    btnEle.style.left = modelPos.left + modelPos.width + (5.5 * (stageRatio - 1)) - canvasDomPos.left + "px"
    btnEle.style.top = modelPos.top +  (5.5 * (stageRatio - 1)) - canvasDomPos.top + "px"

    btnEle.style.display = "flex"
    DDeiEditorUtil.closeDialog(editor, 'ddei-flow-element-setting-dialog')
    
  }
  return rs;
}

/**
 * 显示设置dialog
 * @param evt 
 */
const showSettingDialog = function (evt) {
  let editor = DDeiEditor.ACTIVE_INSTANCE
  if (editor.tempOperateModel) {
    let model = editor.tempOperateModel
    if (model){
      
      let stageRatio = model.getStageRatio()
      
      let srcElement = evt.srcElement
      let canvasEle = document.getElementById(editor.id + "_canvas");
      let canvasDomPos = DDeiUtil.getDomAbsPosition(canvasEle);

      let left = srcElement.offsetLeft + canvasDomPos.left + srcElement.clientWidth + ((5.5) * (stageRatio-1)) 
      let top = srcElement.offsetTop + canvasDomPos.top + ((-5.5) * (stageRatio - 1))

      DDeiEditorUtil.showDialog(editor, 'ddei-flow-element-setting-dialog', {
        group: "canvas-pop",
        model: model
      }, { type: 99, left: left, top: top, hiddenMask: true }, null, true, true)
      
    }
  }
}


const exChangeEventMouseEnter = function (evt) {
  let ele = evt.srcElement.children[0];
  ele.style.opacity = ""
  showSettingDialog(evt)
}

const exChangeEventMouseLeave = function (evt) {
  let ele = evt.srcElement.children[0];
  ele.style.opacity = "0.5"
  let editor = DDeiEditor.ACTIVE_INSTANCE
  delete editor.tempOperateModel
}

/**
 * 切换至下一个类型
 */
const changeNextBpmnSubType = function(evt){
  let editor = DDeiEditor.ACTIVE_INSTANCE
  if (editor.tempOperateModel){
    let model = editor.tempOperateModel
    let controlDefine = DDeiEditorUtil.getControlDefine(model);
    let ds = controlDefine.attrDefineMap.get("bpmnSubType")?.dataSource
    if (ds?.length > 0){
      let index = -1;
      for (let i = 0; i < ds.length;i++){
        if (ds[i].value == model.bpmnSubType){
          index = i
          break;
        }
      }
      if (index == ds.length-1 || index == -1){
        model.bpmnSubType = ds[0].value
      }else{
        model.bpmnSubType = ds[index+1].value
      }
      editor.bus.push(DDeiEnumBusCommandType.RefreshShape);
      editor.bus.executeAll();
    }
  }
}

export { showSettingButton, showSettingDialog }