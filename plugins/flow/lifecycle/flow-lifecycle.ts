import { DDeiAbstractShape,DDeiLifeCycle, DDeiFuncData, DDeiEditorUtil, DDeiUtil, DDeiFuncCallResult, DDeiEditorEnumBusCommandType, DDeiEnumBusCommandType } from "ddei-editor";
import { clone} from "lodash";
import { getIncludeModels, showSettingButton, changeSettingButtonPos, updateCallActivityView } from "../controls/util"


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

  EVENT_MOUSE_OPERATING: DDeiFuncData | null = new DDeiFuncData("ddei-flow-hidden-eles", 1, (operateType, data, ddInstance, evt) => { return this.mouseOperating(operateType,data,ddInstance,evt) });

  EVENT_CONTROL_DRAGING: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-draging", 1, (operateType, data, ddInstance, evt) => { return this.controlDraging(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_DRAG_AFTER: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-drag-after", 1, (operateType, data, ddInstance, evt) => { return this.controlDragAfter(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_CREATE_AFTER: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-create-after", 1, (operateType, data, ddInstance, evt) => { return this.controlCreateAfter(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_CREATE_BEFORE: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-create-before", 1, (operateType, data, ddInstance, evt) => { return this.controlCreateBefore(operateType, data, ddInstance, evt) });

  EVENT_COPY_BEFORE: DDeiFuncData | null = new DDeiFuncData("ddei-flow-copy-before", 1, (operateType, data, ddInstance, evt) => { return this.controlCopyBefore(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_DRAG_BEFORE: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-drag-before", 1, (operateType, data, ddInstance, evt) => { return this.controlDragBefore(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_ROTATE_BEFORE: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-rotate-before", 1, (operateType, data, ddInstance, evt) => { return this.controlDragBefore(operateType, data, ddInstance, evt) });

  EVENT_CLOSE_FILE_AFTER: DDeiFuncData | null = new DDeiFuncData("ddei-flow-hidden-eles", 1, (operateType, data, ddInstance, evt) => { return this.hiddenTempElements(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_DEL_AFTER: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-del-after", 1, (operateType, data, ddInstance, evt) => { return this.controlDelAfter(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_SELECT_BEFORE: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-select-before", 1, (operateType, data, ddInstance, evt) => { return this.controlSelectBefore(operateType, data, ddInstance, evt) });

  EVENT_CONTROL_DBL_CLICK: DDeiFuncData | null = new DDeiFuncData("ddei-flow-control-dbl-click", 1, (operateType, data, ddInstance, evt) => { return this.controlDblClick(operateType, data, ddInstance, evt) });

  dragModels :DDeiAbstractShape[]|null = null

  /**
   * 控件双击
   * @param operateType 
   * @param data 
   * @param ddInstance 
   * @param evt 
   * @returns 
   */
  controlDblClick(operateType, data, ddInstance, evt) {
    if (data?.models && data.models.length > 0) {
      let model = data.models[0]
      //屏蔽掉默认的双击快捷编辑行为
      if (model.bpmnBaseType == 'Event' || model.bpmnBaseType == 'Activity' || model.bpmnBaseType == 'Gateway' || model.bpmnBaseType == 'Group') {
        let result = new DDeiFuncCallResult()
        result.state = -1
        return result;
      }


    }
  }
  /**
   * 拖拽中
   */
  controlDraging(operateType, data, ddInstance, evt): DDeiFuncCallResult {
    if (this.markHiddenPanel) {

      let toolBoxs = document.getElementsByClassName("ddei-core-panel-toolbox-simple")
      for (let i = 0; i < toolBoxs.length; i++) {
        toolBoxs[i].style.display = "none"
      }
      let topMenus = document.getElementsByClassName("ddei-core-panel-topmenu-simple")
      for (let i = 0; i < topMenus.length; i++) {
        topMenus[i].style.display = "none"
      }
      delete this.markHiddenPanel
    }
    if (ddInstance && ddInstance["AC_DESIGN_EDIT"]) {
      let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
      let models = [...data.models]
      //如果仅拖拽了一个控件，且控件为startEvent、boundaryEvent则类行为修改attachedModel判定，否则判定includeModel
      if (models?.length == 1 && (models[0].bpmnType == 'StartEvent' || models[0].bpmnType == 'BoundaryEvent')){
        let evtModel = data.models[0];
        let activities = editor.activities;
        let attachModel = null
        for (let n = 0; n < activities.length; n++) {
          let subModel = activities[n]
          let k = editor.viewerMap.get(subModel.id)
          if (!attachModel && evtModel.isInRect(subModel.essBounds.x, subModel.essBounds.y, subModel.essBounds.x + subModel.essBounds.width, subModel.essBounds.y + subModel.essBounds.height) && 
            (Math.abs(subModel.essBounds.x - evtModel.cpv.x) <= 3 || Math.abs(subModel.essBounds.x1 - evtModel.cpv.x) <= 3 || Math.abs(subModel.essBounds.y - evtModel.cpv.y) <= 3 || Math.abs(subModel.essBounds.y1 - evtModel.cpv.y) <= 3)
          ) {
            attachModel = subModel
            k.component.ctx.refreshDragState(1)
          }else{
            k.component.ctx.refreshDragState(0)
          }
        
        }
        
        
      }

      if (editor.desigingSubProecsses?.length > 0){
        
        //比较被拖拽的对象是否位于desigingSubProecsses中，如果是则变色
        let dragContainerModel = null;
        let model = models[0]
        for (let i = 0; i < editor.desigingSubProecsses?.length; i++) {
          let containerModel = editor.desigingSubProecsses[i]
          let isIn = false
          if (model.isInRect(containerModel.essBounds.x, containerModel.essBounds.y, containerModel.essBounds.x + containerModel.essBounds.width, containerModel.essBounds.y + containerModel.essBounds.height)) {
            let k = editor.viewerMap.get(containerModel.id)
            if (!k.component.ctx.isInRect || (k.component.ctx.isInRect && k.component.ctx.isInRect(model))){
              dragContainerModel = containerModel
              k.component.ctx.refreshDragState(1)
              isIn = true
            }
          } 
          
          if(!isIn){
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
          if (model.allowIncludeModel) {
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
        this.markHiddenPanel = true
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
        
        
        let toolBoxs = document.getElementsByClassName("ddei-core-panel-toolbox-simple")
        for (let i = 0; i < toolBoxs.length; i++) {
          toolBoxs[i].style.display = "none"
        }
        let topMenus = document.getElementsByClassName("ddei-core-panel-topmenu-simple")
        for (let i = 0; i < topMenus.length; i++) {
          topMenus[i].style.display = "none"
        }

        
        
        data.models.forEach(model => {
          let models = getIncludeModels(model)
          models.forEach(m=>{
            data.models.push(m)
          })
        });
        //如果拖拽的为subProcess，将其includeModels也纳入拖放范围
        
        this.dragModels = [...data.models]
        
        this.resetSubProcesses(data,ddInstance)
        
        
      }
    }
  }

  resetSubProcesses(data, ddInstance){
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    //计算editor.desigingSubProecsses
    let layer = data.models[0].layer ? data.models[0].layer : editor.ddInstance.stage.layers[editor.ddInstance.stage.layerIndex];
    let subModels = layer.getSubModels(null, 20)
    editor.desigingSubProecsses = []
    editor.activities = []
    subModels?.forEach(mds => {
      if (mds.allowIncludeModel) {
        if (data.models.indexOf(mds) == -1) {
          if (!mds.lock && mds.isExpand) {
            editor.desigingSubProecsses.push(mds)
          }
        }
      }
      if (mds.bpmnBaseType == 'Activity') {
        editor.activities.push(mds)
      }
    });
    editor.desigingSubProecsses.sort((a, b) => {
      if (a?.render && b?.render) {
        return a.render.tempZIndex - b.render.tempZIndex
      }
      return 0
    })
    editor.activities.sort((a, b) => {
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
      if (imodel){
        this.changeNodeZIndexDeep(imodel,model,stage)
      }
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
      //如果仅拖拽了一个控件，且控件为startEvent、boundaryEvent则类行为修改attachedModel判定，否则判定includeModel
      let attachModel = null
      if (data.models?.length == 1 && (data.models[0].bpmnType == 'StartEvent' || data.models[0].bpmnType == 'BoundaryEvent')) {
        let evtModel = data.models[0];
        let activities = editor.activities;
        let stage = evtModel.stage;
        let id = evtModel.id
        if (id.indexOf("_shadow") != -1) {
          id = id.substring(0, id.indexOf("_shadow"))
          evtModel = stage.getModelById(id)
        }
        //解除原有关系
        if (evtModel.attachPModel) {
          let oldattachPModel = stage.getModelById(evtModel.attachPModel)
          oldattachPModel.attachModels?.splice(oldattachPModel.attachModels?.indexOf(evtModel.id))
          delete evtModel.attachPModel
        }
        
        //建立新的关系
        for (let n = 0; n < activities.length; n++) {
          let subModel = activities[n]
          let k = editor.viewerMap.get(subModel.id)
          if (!attachModel && evtModel.isInRect(subModel.essBounds.x, subModel.essBounds.y, subModel.essBounds.x + subModel.essBounds.width, subModel.essBounds.y + subModel.essBounds.height) &&
            (Math.abs(subModel.essBounds.x - evtModel.cpv.x) <= 3 || Math.abs(subModel.essBounds.x1 - evtModel.cpv.x) <= 3 || Math.abs(subModel.essBounds.y - evtModel.cpv.y) <= 3 || Math.abs(subModel.essBounds.y1 - evtModel.cpv.y) <= 3)
          ) {
            evtModel.attachPModel = subModel.id
            if (!subModel.attachModels) {
              subModel.attachModels = []
            }
            subModel.attachModels.push(evtModel.id)
            attachModel = subModel
          }
          k.component.ctx.refreshDragState(0)
          
        }


      }
      if (editor.desigingSubProecsses?.length > 0 && this.dragModels?.length > 0) {
        let dragParentActiveIds = []
        let dragContainerModel = null;
        let model = this.dragModels[0]
        let stage = ddInstance.stage;
        for (let i = 0; i < editor.desigingSubProecsses.length; i++) {
          let containerModel = editor.desigingSubProecsses[i]
          let k = editor.viewerMap.get(containerModel.id)
          if (attachModel != containerModel && model.isInRect(containerModel.essBounds.x, containerModel.essBounds.y, containerModel.essBounds.x + containerModel.essBounds.width, containerModel.essBounds.y + containerModel.essBounds.height)) {
            if (!k.component.ctx.isInRect || (k.component.ctx.isInRect && k.component.ctx.isInRect(model))) {
              dragContainerModel = containerModel
            }
          }
          
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
          if (dmodel.depModel){
            return
          }
          //建立新关系
          let id = dmodel.id
          if (id.indexOf("_shadow") != -1) {
            id = id.substring(0, id.indexOf("_shadow"))
          }
          
          let dSourceModel = stage.getModelById(id)
          if (dSourceModel){
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
              dragParentActiveIds.push(dSourceModel.includePModelId)
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
              if (dragParentActiveIds.indexOf(pid) == -1){
                dragParentActiveIds.push(pid)
              }
            }
          }
          dmodel.pModel?.resortModelByZIndex()
        })
       
        updateCallActivityView(stage, model.layer, dragParentActiveIds)
        
      }
      editor.bus.push("refresh-shape");
      editor.bus.executeAll();
      this.dragModels = null

      //选择调用控件
      if (data.models?.length > 0){
        let data1 = clone(data)
        data1.model = data.models[0]
        changeSettingButtonPos(operateType, data1, ddInstance, evt)
      }
      let toolBoxs = document.getElementsByClassName("ddei-core-panel-toolbox-simple")
      for (let i = 0; i < toolBoxs.length; i++) {
        toolBoxs[i].style.display = ""
      }
      let topMenus = document.getElementsByClassName("ddei-core-panel-topmenu-simple")
      for (let i = 0; i < topMenus.length; i++) {
        topMenus[i].style.display = ""
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


  mouseOperating(operateType, data, ddInstance, evt){
   
    return this.hiddenTempElements(operateType, data, ddInstance, evt)
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

  static modify(fn) {
    return DDeiFlowLifeCycle.defaultIns.modify(fn)
  }

  mouseMoveInControl(operate, data, ddInstance, evt) {
    //循环每个models，验证是否为本插件的控件，只有本插件的控件才响应
    let models = data?.models
    if (models?.length > 0){
      let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
      if (editor.tempChooseCallActivity) {
        if (models[0] != editor.tempChooseCallActivity && editor.tempCallActivity != models[0]) {
          if (models[0].id != editor.tempChooseCallActivity.id && (models[0].bpmnBaseType == 'Activity' || models[0].bpmnBaseType == 'Event')){
            editor.tempCallActivity?.render?.clearCachedValue();
            editor.tempCallActivity = models[0]
            models[0].render.setCachedValue("border.color", "blue")
            editor.bus.push("refresh-shape");
            editor.bus.executeAll();
          }
        }
      }else{
        for (let i = 0; i < models.length; i++) {
          if (models[i]) {
            //选择调用控件
            let data1 = clone(data)
            data1.model = models[i]
            let rs = showSettingButton(operate, data1, ddInstance, evt)
            if (rs && (rs.state == 2 || rs.state == -2)) {
                break;
            }
          }
        }
      }
    }
  }

  mouseMoveInLayer(operate, data, ddInstance, evt) {
    //循环每个models，验证是否为本插件的控件，只有本插件的控件才响应
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    if (editor) {
      if (editor.tempCallActivity){
        editor.tempCallActivity.render.clearCachedValue();
        delete editor.tempCallActivity
      }
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
      let includeModels = getIncludeModels(model)
      includeModels.forEach(lms => {
        stage.removeModel(lms, true)
      })
    });

    DDeiEditorUtil.closeDialog(editor, 'ddei-flow-setting-button-dialog')
    DDeiEditorUtil.closeDialog(editor, 'ddei-flow-element-setting-dialog')
    return result;
  }

  controlSelectBefore(operateType, data, ddInstance, evt): DDeiFuncCallResult {
    let result = new DDeiFuncCallResult()
    result.state = 1
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    
    if (editor.tempChooseCallActivity) {
      if (editor.tempCallActivity){
        editor.tempChooseCallActivity.activityId = editor.tempCallActivity.id
        editor.tempChooseCallActivity.destroyRender();
        editor.tempChooseCallActivity.initRender()
      }
      editor.tempCallActivity?.render?.clearCachedValue();
      delete editor.tempCallActivity
      delete editor.tempChooseCallActivity
      
      

      editor.bus.push(DDeiEnumBusCommandType.RefreshShape);
      editor.bus.executeAll();

      result.state = -1
    }
    return result;
  }

}

export default DDeiFlowLifeCycle