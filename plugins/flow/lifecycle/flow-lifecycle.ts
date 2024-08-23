import { DDeiLifeCycle, DDeiFuncData, DDeiEditorUtil, DDeiUtil, DDeiFuncCallResult, DDeiEditorEnumBusCommandType, DDeiEnumBusCommandType } from "ddei-editor";
import { clone, debounce } from "lodash";

class DDeiFlowLifeCycle extends DDeiLifeCycle {
  
  name:string = "ddei-flow-lifecycle"
  /**
   * 缺省实例
   */
  static defaultIns: DDeiFlowLifeCycle = new DDeiFlowLifeCycle();
  
  /**
   * 鼠标移动进入控件的钩子，该插件由它来进行整体分发
   */
  EVENT_MOUSE_MOVE_IN_CONTROL: DDeiFuncData | null = new DDeiFuncData("ddei-flow-mouse-move-in-control", 1, (operateType, data, ddInstance, evt) => {
    return this.mouseMoveInControl(operateType, data, ddInstance, evt)
  });

  EVENT_MOUSE_OPERATING: DDeiFuncData | null = new DDeiFuncData("ddei-flow-hidden-eles", 1, this.hiddenTempElements);

  EVENT_AFTER_CLOSE_FILE: DDeiFuncData | null = new DDeiFuncData("ddei-flow-hidden-eles", 1, this.hiddenTempElements);
  
  /**
   * 鼠标操作时、隐藏临时按钮
   */
  hiddenTempElements(operateType, data, ddInstance, evt): DDeiFuncCallResult {
    if (ddInstance && ddInstance["AC_DESIGN_EDIT"]) {
      let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
      
      if (operateType == "SCROLL_WORKING" || operateType == "CHANGE_RATIO" || operateType == "CHANGE_WPV" || operateType == "CHANGE_BOUNDS" || operateType == "CHANGE_ROTATE") {
        DDeiEditorUtil.hiddenDialog(editor, 'ddei-flow-setting-button-dialog')
        DDeiEditorUtil.hiddenDialog(editor, 'ddei-flow-element-setting-dialog')
      }
    }
  }


  /**
  * 鼠标移动进入画布的钩子
  */
  EVENT_MOUSE_MOVE_IN_LAYER: DDeiFuncData | null = new DDeiFuncData("ddei-flow-mouse-move-in-control", 1, (operateType, data, ddInstance, evt) => {
    return this.mouseMoveInLayer(operateType, data, ddInstance, evt)
  });

  static configuration(options) {
    //解析options，只使用自己相关的
    
    if (options && Object.keys(options).length !== 0) {
      let lcs = new DDeiFlowLifeCycle(options);
      return lcs;
    }
    
    return DDeiFlowLifeCycle;
  }

  mouseMoveInControl(operate, data, ddInstance, evt) {
    //循环每个models，验证是否为本插件的控件，只有本插件的控件才响应
    let models = data?.models
    for (let i = 0; i < models?.length; i++) {
      if (models[i]) {
        let controlDefine = DDeiEditorUtil.getControlDefine(models[i]);
        if (controlDefine?.EVENT_MOUSE_MOVE_IN_CONTROL) {
          let data1 = clone(data)
          data1.model = models[i]
          controlDefine?.EVENT_MOUSE_MOVE_IN_CONTROL(operate, data1, ddInstance, evt)
        }
      }
    }
  }

  mouseMoveInLayer(operate, data, ddInstance, evt) {
    //循环每个models，验证是否为本插件的控件，只有本插件的控件才响应
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    if (editor) {
      let settingBtnEle = document.getElementById(editor.id + "_ddei-flow-setting-button-dialog");
      let settingDialogEle = document.getElementById(editor.id + "_ddei-flow-element-setting-dialog");
      if (settingBtnEle && !settingDialogEle && !(evt.target == settingBtnEle || evt.target?.parentElement == settingBtnEle || evt.target.parentElement?.parentElement == settingBtnEle || evt.target.parentElement?.parentElement?.parentElement == settingBtnEle)) {
        DDeiEditorUtil.closeDialog(editor, 'ddei-flow-setting-button-dialog')
      } else if (settingDialogEle && !settingBtnEle && !(evt.target == settingDialogEle || evt.target?.parentElement == settingDialogEle || evt.target.parentElement?.parentElement == settingDialogEle)) {
        DDeiEditorUtil.closeDialog(editor, 'ddei-flow-element-setting-dialog')
      } else if (settingBtnEle && settingDialogEle && !(evt.target == settingBtnEle || evt.target?.parentElement == settingBtnEle || evt.target.parentElement?.parentElement == settingBtnEle || evt.target.parentElement?.parentElement?.parentElement == settingBtnEle) && !(evt.target == settingDialogEle || evt.target?.parentElement == settingDialogEle || evt.target.parentElement?.parentElement == settingDialogEle)){
        DDeiEditorUtil.closeDialog(editor, 'ddei-flow-setting-button-dialog')
        DDeiEditorUtil.closeDialog(editor, 'ddei-flow-element-setting-dialog')
      }
    }
  }

}

export default DDeiFlowLifeCycle