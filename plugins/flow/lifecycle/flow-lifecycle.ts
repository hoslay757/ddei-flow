import { DDeiAbstractShape,DDeiLifeCycle, DDeiFuncData, DDeiEditorUtil, DDeiUtil, DDeiFuncCallResult, DDeiEditorEnumBusCommandType, DDeiEnumBusCommandType } from "ddei-editor";
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

  EVENT_MOUSE_OPERATING: DDeiFuncData | null = new DDeiFuncData("ddei-flow-hidden-eles", 1, (operateType, data, ddInstance, evt) => { this.hiddenTempElements(operateType, data, ddInstance, evt) });


  EVENT_CONTROL_DRAGING: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-draging", 1, (operateType, data, ddInstance, evt) => { this.controlDraging(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_DRAG_AFTER: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-drag-after", 1, (operateType, data, ddInstance, evt) => { this.controlDragAfter(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_CREATE_AFTER: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-create-after", 1, (operateType, data, ddInstance, evt) => { this.controlDragAfter(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_DRAG_BEFORE: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-drag-before", 1, (operateType, data, ddInstance, evt) => { this.controlDragBefore(operateType, data, ddInstance, evt) });

  EVENT_AFTER_CLOSE_FILE: DDeiFuncData | null = new DDeiFuncData("ddei-flow-hidden-eles", 1, (operateType, data, ddInstance, evt) => { this.hiddenTempElements(operateType, data, ddInstance, evt)});

  dragModels:DDeiAbstractShape[]|null = []
  /**
   * 拖拽中
   */
  controlDraging(operateType, data, ddInstance, evt): DDeiFuncCallResult {
    if (ddInstance && ddInstance["AC_DESIGN_EDIT"]) {
      let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
      if (this.dragModels.length == 0 && data.models?.length > 0){
        //计算editor.desigingSubProecsses
        let layer = data.models[0].layer;
        let containers = layer.getModelsByBaseType("DDeiContainer")
        if (containers?.length > 0){
          editor.desigingSubProecsses = []
          containers.forEach(container => {
            if (!container.lock && container.isExpand){
              editor.desigingSubProecsses.push(container)
            }
          });
          let models = [...data.models]
          //从models中移除desigingSubProecsses
          if (editor.desigingSubProecsses.length > 0 && models?.length > 0) {
            for(let i = models.length-1;i >=0;i--){
              let finded = false
              for (let j = 0; j < editor.desigingSubProecsses.length;j++){
                let id = editor.desigingSubProecsses[j].id
                let idShadow = id+"_shadow"
                if (id == models[i].id || idShadow == models[i].id) {
                  finded = true;
                  break;
                }
              }
              if (finded){
                models.splice(i, 1)
              }
            }
            if (models.length > 0) {
              this.dragModels = models
              
            }
          }
        }
      }
      if (this.dragModels?.length > 0){
        //比较被拖拽的对象是否位于desigingSubProecsses中，如果是则变色
        let dragContainerModel = null;
        let model = this.dragModels[0]
        for (let i = 0; i < editor.desigingSubProecsses?.length; i++) {
          let containerModel = editor.desigingSubProecsses[i]
          if (model.isInRect(containerModel.essBounds.x, containerModel.essBounds.y, containerModel.essBounds.x + containerModel.essBounds.width, containerModel.essBounds.y + containerModel.essBounds.height)) {
            dragContainerModel = containerModel
            editor.renderViewerIns[containerModel.id].refreshDragState(1)
          } else {
            editor.renderViewerIns[containerModel.id].refreshDragState(0)
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
        let stageRender = data.models[0].stage.render
        let oldOperateShape = stageRender.currentOperateShape
        //获取底层控件，如果能够识别，复写当前控件
        if (oldOperateShape.baseModelType == 'DDeiContainer' && oldOperateShape.isExpand == 1 && !oldOperateShape.lock){
          let ddRender = ddInstance.render
          let deepControls = DDeiAbstractShape.findBottomModelsByArea(oldOperateShape, ddRender.inAreaX, ddRender.inAreaY, true, true);
          if (deepControls?.length > 0){
            data.models.splice(data.models.indexOf(oldOperateShape), 1, deepControls[0])
            stageRender.currentOperateShape = deepControls[0]
          }
        }
        
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
        for (let i = 0; i < editor.desigingSubProecsses.length; i++) {
          let containerModel = editor.desigingSubProecsses[i]
          if (model.isInRect(containerModel.essBounds.x, containerModel.essBounds.y, containerModel.essBounds.x + containerModel.essBounds.width, containerModel.essBounds.y + containerModel.essBounds.height)) {
            dragContainerModel = containerModel
          }
          editor.renderViewerIns[containerModel.id].refreshDragState(0)
        }
        
        //建立新的关系
        editor.bus.push(DDeiEnumBusCommandType.ModelChangeContainer, { oldContainer: model.pModel, newContainer: dragContainerModel ? dragContainerModel : model.layer, models: this.dragModels }, evt);
        editor.bus.push(DDeiEnumBusCommandType.ModelChangeSelect, this.dragModels, evt);
        editor.bus.push(DDeiEditorEnumBusCommandType.RefreshEditorParts, {
          parts: ["renderviewers"],
        });
        editor.bus.push("refresh-shape");
        editor.bus.executeAll();
        

      }
      this.dragModels = []
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