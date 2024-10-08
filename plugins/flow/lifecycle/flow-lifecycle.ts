import { DDeiAbstractShape,DDeiLifeCycle, DDeiFuncData, DDeiEditorUtil, DDeiUtil, DDeiFuncCallResult, DDeiEditorEnumBusCommandType, DDeiEnumBusCommandType } from "ddei-editor";
import { clone} from "lodash";
import { getIncludeModels, showSettingButton } from "../controls/util"
import { toRaw} from 'vue'

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

  EVENT_CONTROL_CREATE_AFTER: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-create-after", 1, (operateType, data, ddInstance, evt) => { this.controlCreateAfter(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_CREATE_BEFORE: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-create-before", 1, (operateType, data, ddInstance, evt) => { this.controlCreateBefore(operateType, data, ddInstance, evt) });

  EVENT_COPY_BEFORE: DDeiFuncData | null = new DDeiFuncData("ddei-flow-copy-before", 1, (operateType, data, ddInstance, evt) => { this.controlCopyBefore(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_DRAG_BEFORE: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-drag-before", 1, (operateType, data, ddInstance, evt) => { this.controlDragBefore(operateType, data, ddInstance, evt) });


  EVENT_CONTROL_ROTATE_BEFORE: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-rotate-before", 1, (operateType, data, ddInstance, evt) => { this.controlDragBefore(operateType, data, ddInstance, evt) });

  EVENT_CLOSE_FILE_AFTER: DDeiFuncData | null = new DDeiFuncData("ddei-flow-hidden-eles", 1, (operateType, data, ddInstance, evt) => { this.hiddenTempElements(operateType, data, ddInstance, evt) });

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

  controlCopyBefore(operateType, data, ddInstance, evt) {
    if (ddInstance && ddInstance["AC_DESIGN_EDIT"]) {
      if (data.models?.size > 0) {
        //如果拖拽的为subProcess，将其includeModels也纳入拖放范围
        // let dragModels = [...data.models]
        let lines = []
        data.models.forEach(model => {
          if (model.bpmnType == 'SubProcess' || model.bpmnType == 'Group') {
            let models = getIncludeModels(model)
            
            models.forEach(m => {
              data.models.set(m.id,m)
              let links = m.stage.getSourceModelLinks(m.id)
              links?.forEach(lk => {
                if (lines.indexOf(lk.dm) == -1){
                  lines.push(lk.dm)
                }else{
                  if(!data.models.has(lk.dm.id)){
                    data.models.set(lk.dm.id,lk.dm)
                  }
                }
              });
            })
            let links = model.stage.getSourceModelLinks(model.id)
            links?.forEach(lk => {
              if (lines.indexOf(lk.dm) == -1) {
                lines.push(lk.dm)
              } else {
                if (!data.models.has(lk.dm.id)) {
                  data.models.set(lk.dm.id, lk.dm)
                }
              }
            });
          }
        });
      }
    }
  }

  controlCreateBefore(operateType, data, ddInstance, evt){
    if (ddInstance && ddInstance["AC_DESIGN_EDIT"]) {
      if (data.models?.length > 0) {
        this.dragModels = data.models        
        this.resetSubProcesses(data, ddInstance);
      }
    }
  }

  /**
   * 修改模型ID
   * @param stage 舞台
   * @param item 控件
   * @return 新的ID
   */
  changeModelId(stage, item: DDeiAbstractShape): string {
    let newId = ""
    while (true) {
      stage.idIdx++

      if (item.id.indexOf("_") != -1) {
        newId = item.id.substring(0, item.id.lastIndexOf("_")) + "_" + stage.idIdx;
      } else {
        newId = item.id + "_cp_" + stage.idIdx;
      }
      if (!stage.getModelById(newId)) {
        break;
      }
    }
    item.oldId = item.id
    item.id = newId
    item.unicode = DDeiUtil.getUniqueCode()
    let accuContainer = item.getAccuContainer()
    if (accuContainer?.baseModelType == 'DDeiContainer') {
      let midList: string = []
      let models: Map<string, DDeiAbstractShape> = new Map<string, DDeiAbstractShape>();
      accuContainer.midList.forEach(mid => {
        let model = accuContainer.models.get(mid);
        let modelNewId = this.changeModelId(stage, model)
        models.set(modelNewId, model)
        midList.push(modelNewId)
      })
      accuContainer.models = models
      accuContainer.midList = midList
    } else if (accuContainer?.baseModelType == 'DDeiTable') {
      for (let i = 0; i < accuContainer.rows; i++) {
        let rowObj = accuContainer.rows[i];
        for (let j = 0; j < rowObj.length; j++) {
          let accuContainer = rowObj[j].getAccuContainer()
          let midList: string[] = []
          let models: Map<string, DDeiAbstractShape> = new Map<string, DDeiAbstractShape>();
          accuContainer.midList.forEach(mid => {
            let model = accuContainer.models.get(mid);
            let modelNewId = this.changeModelId(stage, model)
            models.set(modelNewId, model)
            midList.push(modelNewId)
          })
          accuContainer.models = models
          accuContainer.midList = midList
        }
      }
    }
    return newId;
  }

  /**
     * 拖拽前
     */
  controlDragBefore(operateType, data, ddInstance, evt): DDeiFuncCallResult {
    if (ddInstance && ddInstance["AC_DESIGN_EDIT"]) {
      if (data.models?.length > 0){
        
        

        //如果拖拽的为subProcess，将其includeModels也纳入拖放范围
        this.dragModels = [...data.models]
        data.models.forEach(model => {
          if (model.bpmnType == 'SubProcess' || model.bpmnType == 'Group') {
            let models = getIncludeModels(model)
            models.forEach(m=>{
              
              // let md = DDeiUtil.getShadowControl(m);
              // layer.shadowControls.push(md);
              data.models.push(m)
            })
          }
        });
        this.resetSubProcesses(data,ddInstance)
        
        
      }
    }
  }

  resetSubProcesses(data, ddInstance){
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    //计算editor.desigingSubProecsses
    let layer = data.models[0].layer;
    let subModels = layer.getSubModels(null, 20)
    editor.desigingSubProecsses = []
    subModels?.forEach(mds => {
      if (mds.bpmnType == 'SubProcess' || mds.bpmnType == 'Group') {
        if (data.models.indexOf(mds) == -1) {
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

  modelsToTreeRoot(models:DDeiAbstractShape[],stage){
    let treeRoot = []
    let cachedModel = {}
    models.forEach(model=>{
      if (model.baseModelType != 'DDeiLine'){
        //没有上一级,且没有includePModelId
        if (model.pModel == model.layer && !model.includePModelId){
          if (treeRoot.indexOf(model)) {
            treeRoot.push(model)
          } 
        }
        //有上一级,且没有includePModelId，且上一级不在选中范围内
        else if (model.pModel != model.layer && !model.includePModelId){
          if (models.indexOf(model.pModel) == -1){
            if (treeRoot.indexOf(model)) {
              treeRoot.push(model)
            } 
          }
        }
          //有includePModelId，且往上都不在选中范围内
        else if (model.includePModelId){
          let includePModelId = model.includePModelId
          let include = false
          while (includePModelId){
            let ipm = cachedModel[includePModelId];
            if (!ipm){
              ipm = stage.getModelById(includePModelId)
              cachedModel[includePModelId] = ipm
            }
            if (ipm){
              if (models.indexOf(ipm) != -1){
                include = true
                break;
              }
              includePModelId = ipm.includePModelId
            }else{
              break;
            }
          }
          if (!include){
            if(treeRoot.indexOf(model)){
              treeRoot.push(model)
            } 
          }
        }
      }
    })
    return treeRoot;
  }


  changeNodeZIndexDeep(model: DDeiAbstractShape,parentNode,stage){
    let len = parentNode.includeModels.length
    let oldZindex = model.zIndex ? model.zIndex : len
    model.zIndex = parentNode.zIndex ? parentNode.zIndex + oldZindex : oldZindex
    model.includeModels?.forEach(imid => {
      let imodel = stage.getModelById(imid)
      this.changeNodeZIndexDeep(imodel,model,stage)
    });
    let links = stage.getSourceModelLinks(model.id)
    links?.forEach(link => {
      this.changeNodeZIndexDeep(link.dm, parentNode,stage)
    });
  }

  controlCreateAfter(operateType, data, ddInstance, evt): DDeiFuncCallResult {
    //复制的情况，由于ID发生了变化，需要重新维护关系
    
    this.dragModels?.forEach(dmodel=>{
      if(dmodel.includePModelId){
        for (let k = 0; k < this.dragModels?.length;k++){
          if (this.dragModels[k].oldId == dmodel.includePModelId){
            let subProcessModel = this.dragModels[k];
            dmodel.includePModelId = subProcessModel.id
            let oldIndex = subProcessModel.includeModels.indexOf(dmodel.oldId)
            if (oldIndex != -1){
              subProcessModel.includeModels.splice(oldIndex, 1, dmodel.id)
            }
            
            break;
          }
        }
      }
    })
    
    this.controlDragAfter(operateType, data, ddInstance, evt)
    
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
        
        let dmodels = []
        this.dragModels?.forEach(dm => {
          //建立新关系
          let id = dm.id
          if (id.indexOf("_shadow") != -1) {
            id = id.substring(0, id.indexOf("_shadow"))
            dmodels.push(stage.getModelById(id))
          }else{
            dmodels.push(dm)
          }
          
        })
        
        let treeRoots = this.modelsToTreeRoot(dmodels,stage)
        
        treeRoots?.forEach(dmodel => {
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
            delete dSourceModel.includePModelId
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
              this.changeNodeZIndexDeep(dSourceModel, dragContainerModel,stage)
              
            }
          }
          dmodel.pModel.resortModelByZIndex()
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
        let data1 = clone(data)
        data1.model = models[i]
        let rs = showSettingButton(operate, data1, ddInstance, evt)
        if (rs && (rs.state == 2 || rs.state == -2)) {
            break;
        }
      }
    }
  }

  mouseMoveInLayer(operate, data, ddInstance, evt) {
    //循环每个models，验证是否为本插件的控件，只有本插件的控件才响应
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    if (editor) {
      //如果存在选中控件，则不处理
      if (editor.ddInstance.stage.selectedModels?.size > 0) {
        return;
      }
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
      if (model.bpmnType == 'SubProcess' || model.bpmnType == 'Group') {
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