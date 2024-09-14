import { DDeiAbstractShape,DDeiLifeCycle, DDeiFuncData, DDeiEditorUtil, DDeiUtil, DDeiFuncCallResult, DDeiEditorEnumBusCommandType, DDeiEnumBusCommandType } from "ddei-editor";
import { clone, debounce } from "lodash";
import { getIncludeModels } from "../controls/util"

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

  EVENT_MOUSE_OPERATING: DDeiFuncData | null = new DDeiFuncData("ddei-flow-hidden-eles", 1, (operateType, data, ddInstance, evt) => { this.hiddenTempElements(operateType, data, ddInstance, evt) });


  EVENT_CONTROL_DRAGING: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-draging", 1, (operateType, data, ddInstance, evt) => { this.controlDraging(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_DRAG_AFTER: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-drag-after", 1, (operateType, data, ddInstance, evt) => { this.controlDragAfter(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_CREATE_AFTER: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-create-after", 1, (operateType, data, ddInstance, evt) => { this.controlDragAfter(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_CREATE_BEFORE: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-create-before", 1, (operateType, data, ddInstance, evt) => { this.controlDragBefore(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_DRAG_BEFORE: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-drag-before", 1, (operateType, data, ddInstance, evt) => { this.controlDragBefore(operateType, data, ddInstance, evt) });

  EVENT_AFTER_CLOSE_FILE: DDeiFuncData | null = new DDeiFuncData("ddei-flow-hidden-eles", 1, (operateType, data, ddInstance, evt) => { this.hiddenTempElements(operateType, data, ddInstance, evt)});

  EVENT_CONTROL_DEL_AFTER: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-del-after", 1, (operateType, data, ddInstance, evt) => { this.controlDelAfter(operateType, data, ddInstance, evt) });

  dragModels :DDeiAbstractShape[]|null = null
  /**
   * 拖拽中
   */
  controlDraging(operateType, data, ddInstance, evt): DDeiFuncCallResult {
    if (ddInstance && ddInstance["AC_DESIGN_EDIT"]) {
      let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
      if (editor.desigingSubProecsses?.length > 0){
        let models = [...data.models]
        //比较被拖拽的对象是否位于desigingSubProecsses中，如果是则变色
        let dragContainerModel = null;
        let model = models[0]
        for (let i = 0; i < editor.desigingSubProecsses?.length; i++) {
          let containerModel = editor.desigingSubProecsses[i]
          if (model.isInRect(containerModel.essBounds.x, containerModel.essBounds.y, containerModel.essBounds.x + containerModel.essBounds.width, containerModel.essBounds.y + containerModel.essBounds.height)) {
            dragContainerModel = containerModel
            let k = editor.viewerMap.get(containerModel.id)
            k.component.ctx.refreshDragState(1)
          } else {
            let k = editor.viewerMap.get(containerModel.id)
            k.component.ctx.refreshDragState(0)
          }
        }
      }
      
      this.hiddenTempElements(operateType, data, ddInstance, evt)
    }
  }

  /**
     * 拖拽前
     */
  controlDragBefore(operateType, data, ddInstance, evt): DDeiFuncCallResult {
    if (ddInstance && ddInstance["AC_DESIGN_EDIT"]) {
      if (data.models?.length > 0){
        let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
        //计算editor.desigingSubProecsses
        let layer = data.models[0].layer;
        

        //如果拖拽的胃subProcess，将其includeModels也纳入拖放范围
        this.dragModels = [...data.models]
        data.models.forEach(model => {
          if (model.bpmnType == 'SubProcess') {
            let models = getIncludeModels(model)
            models.forEach(m=>{
              
              // let md = DDeiUtil.getShadowControl(m);
              // layer.shadowControls.push(md);
              data.models.push(m)
            })
          }
        });
        let subModels = layer.getSubModels(null, 20)
        editor.desigingSubProecsses = []
        subModels?.forEach(mds => {
          if (mds.bpmnType == 'SubProcess') {
            if (data.models.indexOf(mds) == -1){
              if (!mds.lock && mds.isExpand) {
                editor.desigingSubProecsses.push(mds)
              }
            }
          }
        });
        editor.desigingSubProecsses.sort((a, b) => {
          if (a?.render && b?.render) {
            return a.render.tempZIndex - b.render.tempZIndex
          }
          return 0
        })
        
        
      }
    }
  }


  /**
   * 拖拽后
   */
  controlDragAfter(operateType, data, ddInstance, evt): DDeiFuncCallResult {
    if (ddInstance && ddInstance["AC_DESIGN_EDIT"]) {
      let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
      if (editor.desigingSubProecsses?.length > 0 && this.dragModels?.length > 0) {
        //比较被拖拽的对象是否位于desigingSubProecsses中，如果是则变色
        let dragContainerModel = null;
        let model = this.dragModels[0]
        let stage = model.stage;
        for (let i = 0; i < editor.desigingSubProecsses.length; i++) {
          let containerModel = editor.desigingSubProecsses[i]
          if (model.isInRect(containerModel.essBounds.x, containerModel.essBounds.y, containerModel.essBounds.x + containerModel.essBounds.width, containerModel.essBounds.y + containerModel.essBounds.height)) {
            dragContainerModel = containerModel
          }
          let k = editor.viewerMap.get(containerModel.id)
          k.component.ctx.refreshDragState(0)
        }
        let pid
        if (dragContainerModel) {
          pid = dragContainerModel.id
          if (pid.indexOf("_shadow") != -1) {
            pid = pid.substring(0, pid.indexOf("_shadow"))
          }
        }
        this.dragModels?.forEach(dmodel => {
          //建立新关系
          let id = dmodel.id
          if (id.indexOf("_shadow") != -1) {
            id = id.substring(0, id.indexOf("_shadow"))
          }
          
          let dSourceModel = stage.getModelById(id)
          //删除老关系
          if (dSourceModel.includePModelId) {
            
            let includePModel = null;
            for (let n = 0; n < editor.desigingSubProecsses.length;n++){
              if (editor.desigingSubProecsses[n].id == dSourceModel.includePModelId){
                includePModel = editor.desigingSubProecsses[n]
                break;
              }
            }
            if (includePModel && includePModel.includeModels.indexOf(id) != -1) {
              includePModel.includeModels.splice(includePModel.includeModels.indexOf(id), 1)
            }
            delete dSourceModel.render.tempZIndex
          }
          //更新关系
          if (dragContainerModel) {
            if (!dragContainerModel.includeModels) {
              dragContainerModel.includeModels = []
            }
            
            if (dragContainerModel.includeModels.indexOf(id) == -1) {
              dragContainerModel.includeModels.push(id)
              
              dSourceModel.includePModelId = pid
              dSourceModel.render.tempZIndex = dragContainerModel.render.tempZIndex + (dragContainerModel.includeModels.length)
            }
          }
        })
        
        editor.bus.push("refresh-shape");
        editor.bus.executeAll();
        this.dragModels = null

      }
    }
  }

  /**
   * 鼠标操作时、隐藏临时按钮
   */
  hiddenTempElements(operateType, data, ddInstance, evt): DDeiFuncCallResult {
    if (ddInstance && ddInstance["AC_DESIGN_EDIT"]) {
      let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
      
      if (operateType == "DRAG" || operateType == "SCROLL_WORKING" || operateType == "CHANGE_RATIO" || operateType == "CHANGE_WPV" || operateType == "CHANGE_BOUNDS" || operateType == "CHANGE_ROTATE") {
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
          //0不存在无回调函数，继续调用/1调用成功，继续调用/2调用成功，中断调用/-1调用失败，继续调用/-2调用失败，中断调用。
          let rs = controlDefine?.EVENT_MOUSE_MOVE_IN_CONTROL(operate, data1, ddInstance, evt)
          if (rs && (rs.state == 2 || rs.state == -2)) {
            break;
          }
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
  
  controlDelAfter(operateType, data, ddInstance, evt): DDeiFuncCallResult {
    let result = new DDeiFuncCallResult()
    result.state = 1
    let models = data.models;
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    let stage = ddInstance.stage
    
    models.forEach(model => {
      if (model.bpmnType == 'SubProcess') {
        let includeModels = getIncludeModels(model)
        includeModels.forEach(lms => {
          stage.removeModel(lms, true)
        })
      }
    });
    
    DDeiEditorUtil.closeDialog(editor, 'ddei-flow-setting-button-dialog')
    DDeiEditorUtil.closeDialog(editor, 'ddei-flow-element-setting-dialog')
    return result;
  }

}

export default DDeiFlowLifeCycle