import { DDeiUtil, DDeiConfig,DDeiEditor, DDeiEditorUtil, DDeiEnumOperateType, DDei, DDeiFuncCallResult, DDeiAbstractShape } from 'ddei-editor'
import {Matrix3,Vector3} from "three"
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


/**
 * 展开子流程
 * @param operate 
 * @param data 
 * @param ddInstance 
 * @param evt 
 * @returns 
 */
const expandOrNotSubProcess = function (model:DDeiAbstractShape){
  let stage = model.stage
  let ddInstance = stage.ddInstance
  //计算位置，显示按钮div
  let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
  if (editor) {
    //当前关闭，则展开
    let scaleX = 1,scaleY = 1;
    let targetWidth, targetHeight
    let container = model.pModel
    if(!model.isExpand){
      //展开当前容器下所有控件大小和坐标
      targetWidth = model.otherWidth ? model.otherWidth : 300
      targetHeight = model.otherHeight ? model.otherHeight : 200
      //记录当前大小
      model.otherWidth = model.width
      model.otherHeight = model.height
    }
    //展开，则关闭
    else{
      //展开当前容器下所有控件大小和坐标
      targetWidth = model.otherWidth
      targetHeight = model.otherHeight
      //记录当前大小
      model.otherWidth = model.width
      model.otherHeight = model.height
    }
    scaleX = targetWidth / model.otherWidth
    scaleY = targetHeight / model.otherHeight
    //构建缩放矩阵
    if (scaleX != 1 || scaleY != 1) {
      let m1 = new Matrix3()
      let move1Matrix = new Matrix3(
        1, 0, -model.cpv.x,
        0, 1, -model.cpv.y,
        0, 0, 1);
      m1.premultiply(move1Matrix)
      if (model.rotate) {
        let angle = DDeiUtil.preciseTimes(model.rotate, DDeiConfig.ROTATE_UNIT)
        let rotateMatrix = new Matrix3(
          Math.cos(angle), Math.sin(angle), 0,
          -Math.sin(angle), Math.cos(angle), 0,
          0, 0, 1);
        m1.premultiply(rotateMatrix)
      }
      let scaleMatrix = new Matrix3(
        scaleX, 0, 0,
        0, scaleY, 0,
        0, 0, 1);
      m1.premultiply(scaleMatrix)
      if (model.rotate) {
        let angle = DDeiUtil.preciseTimes(-model.rotate, DDeiConfig.ROTATE_UNIT)
        let rotateMatrix = new Matrix3(
          Math.cos(angle), Math.sin(angle), 0,
          -Math.sin(angle), Math.cos(angle), 0,
          0, 0, 1);
        m1.premultiply(rotateMatrix)
      }
      let move2Matrix = new Matrix3(
        1, 0, model.cpv.x,
        0, 1, model.cpv.y,
        0, 0, 1);
      m1.premultiply(move2Matrix)
      model.transVectors(m1)

      let deltaWidth = (targetWidth - model.otherWidth) / 2
      let deltaHeight = (targetHeight - model.otherHeight) / 2
      //改变其他控件位置
      container.midList.forEach(mid => {
        let subModel = container.models.get(mid);
        if (subModel.baseModelType != 'DDeiLine') {
          //对比控件的cpv，如果x相等，位置不变
          let moveX = 0, moveY = 0
          if (subModel.cpv.x > model.cpv.x) {
            moveX = deltaWidth
          } else if (subModel.cpv.x < model.cpv.x) {
            moveX = -deltaWidth
          }
          if (subModel.cpv.y > model.cpv.y) {
            moveY = deltaHeight
          } else if (subModel.cpv.y < model.cpv.y) {
            moveY = -deltaHeight
          }
          if (moveX || moveY) {
            let m2 = new Matrix3(
              1, 0, moveX,
              0, 1, moveY,
              0, 0, 1);
            subModel.transVectors(m2)
          }
        }
      });
      //重新计算连线
      container.midList.forEach(mid => {
        let subModel = container.models.get(mid);
        subModel.updateLinkModels()
      });
    }
    //通知改变
    editor.notifyChange()
    
    DDeiEditorUtil.closeDialog(editor, 'ddei-flow-setting-button-dialog')
    DDeiEditorUtil.closeDialog(editor, 'ddei-flow-element-setting-dialog')

  }
}



export { showSettingButton, expandOrNotSubProcess }