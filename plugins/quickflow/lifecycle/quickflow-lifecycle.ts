import { DDeiAbstractShape,DDeiLifeCycle, DDeiFuncData, DDeiEditorUtil, DDeiUtil, DDeiFuncCallResult, DDeiEditorEnumBusCommandType, DDeiEnumBusCommandType } from "ddei-editor";
import { clone, merge } from "ddei-editor";
import { getIncludeModels, showSettingButton, changeSettingButtonPos, updateCallActivityView } from "../controls/util"
import { getCurrentInstance, render, createVNode } from "vue"
import defaultOperateView from "./operate-view.vue"

class DDeiQuickFlowLifeCycle extends DDeiLifeCycle {
  
  name: string = "ddei-quick-flow-lifecycle"
  /**
   * 缺省实例
   */
  static defaultIns: DDeiQuickFlowLifeCycle = new DDeiQuickFlowLifeCycle();
  
  /**
   * 鼠标移动进入控件的钩子，该插件由它来进行整体分发
   */
  EVENT_EDITOR_INIT: DDeiFuncData | null = new DDeiFuncData("ddei-quickflow-editor-init", 1, (operateType, data, ddInstance, evt) => {
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    if (editor?.flow){
      let flowAPI = editor.flow;

      let stage = ddInstance.stage;
      if (!stage.flowDesignData){
        //加载初始化数据
        //position，图像在画布的整体位置，0正中，1上、2右、3下、4左
        let flowData = `{
"direct":3,
"position":1,
"marginY":20,
"spaceHeight":40,
"print":1,
"config":{
  "start": {
    "model":"1000001",
    "width":50,
    "height":50,
    "textField": "name"
  },
  "task": {
    "model":"1000011",
    "width":160,
    "height":80,
    "textField": "name"
  },
  "script": {
    "model":"1000021",
    "width":160,
    "height":80,
    "textField": "name"
  },
  "branch": {
    "model":"1000202",
    "width":60,
    "height":60,
    "textField": "name"
  },
  "condition": {
    "model":"100001",
    "width":60,
    "height":60,
    "textField": "name"
  },
  "end": {
    "model":"1000003",
    "width":50,
    "height":50,
    "textField": "name"
  }
},
"data":
    {
      "id": "begin",
      "name": "开始",
      "type": "start",
       "children": [
        {
          "id": "task_1",
          "name": "任务节点1",
          "type": "task",
          "children": [
            {
              "id": "end",
              "name": "结束",
              "type": "end"
            }
          ]
        }
      ]
    }
}`;
        stage.flowDesignData = JSON.parse(flowData);
      }
      
      flowAPI.loadFromFlowData(stage.flowDesignData, true);
      editor.ddInstance["AC_DESIGN_DRAG"] = false
      editor.ddInstance["AC_DESIGN_LINK"] = false
      editor.ddInstance["AC_DESIGN_ROTATE"] = false
      editor.ddInstance["AC_DESIGN_SCALE"] = false
      
    }
    
  });


  EVENT_CONTROL_VIEW: DDeiFuncData | null = new DDeiFuncData("ddei-quickflow-control-view-after", 1, (operateType, data, ddInstance, evt) => {
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    data?.models?.forEach(model => {
      if (model.bpmnBaseType == 'Sequence'){
        this.refreshOperateBtnRenderViewer(model, operateType, editor)
      }
    });
  });

  
  EVENT_CONTROL_DEL_AFTER: DDeiFuncData | null = new DDeiFuncData("ddei-quickflow-control-remove", 1, (operateType, data, ddInstance, evt) => {
    
    data.renders?.forEach(render => {
      if (render.model.bpmnBaseType == 'Sequence') {
        if (render.operateBtn) {
          let vNode = render.operateBtn;
          vNode.component.isUnmounted = true
          vNode.component.update()
          vNode.el.parentElement.remove()
          delete render.operateBtn
        }
      }
    });
  });

  EVENT_MOUSE_MOVE_IN_LAYER: DDeiFuncData | null = new DDeiFuncData("ddei-quickflow-mousemove", 1, (operateType, data, ddInstance, evt) => { return this.mouseInLayer(operateType, data, ddInstance, evt) });


  EVENT_CONTROL_EDIT_AFTER: DDeiFuncData | null = new DDeiFuncData("ddei-quickflow-mousemove", 1, (operateType, data, ddInstance, evt) => { 
    return this.editAfter(operateType, data, ddInstance, evt);
  });

  editAfter(operateType, data, ddInstance, evt){
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    let flowAPI = editor.flow
    let stage = ddInstance.stage;
    let propName = data.propName
    let ignoreField = ["width","height","border","fill","font","textStyle","id","essBounds","pvs","cpv"]
    if (stage.flowDesignData) {
      data?.models?.forEach(model => {
        //同步模型属性到存储的结构化数据
        let node = flowAPI.getNodeById(model.id, stage.flowDesignData.data)
        if(node){
          if (propName){
            node[propName] = model[propName];
          }else{
            for(let n = 0;n < flowAPI.jsonField.length;n++){
              let field = flowAPI.jsonField[n];
              if (model[field] != undefined && ignoreField.indexOf(field) == -1){
                node[field] = model[field];
              }
              
            }
          }
        }
      });
    }
  }

  mouseInLayer(operateType, data, ddInstance, evt){
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    if (editor?.tempQuickFlowAddNode) {
      let vNode = editor.tempQuickFlowAddNode;
      let el = vNode?.el;
      
      let ex = evt.pageX;
      let ey = evt.pageY;
      
      let lw = -50;
      let rw = 0;
      let tw = 0;
      let bw = 0;


      if (!(el && ex >= el.offsetLeft + lw && ex <= (el.offsetLeft + el.offsetWidth + rw) && ey >= el.offsetTop - tw && ey <= (el.offsetTop + el.offsetHeight + bw) )){
        
        vNode.component.isUnmounted = true
        vNode.component.update()
        vNode.el.parentElement.remove()
        delete editor.tempQuickFlowAddNode
      }
      
    }
  }

  refreshOperateBtnRenderViewer(model,operate, editor) {
    if (operate == 'VIEW') {
      let stage = editor.ddInstance.stage;
        if (stage?.flowDesignData?.data) {
          let flowDesignData = stage.flowDesignData;
          let flowData = flowDesignData.data;
          let parentNode = editor.flow.getNodeById(model.smodel.id, flowData);
          if (parentNode && parentNode.type && parentNode.type != 'branch') {
            if (!model.render.operateBtn) {
              let opts = { editor: editor, model: model }
              let btnVNode = createVNode(defaultOperateView, opts);
              let appContext = editor.appContext;
              //挂载
              btnVNode.appContext = appContext;
              model.render.operateBtn = btnVNode

              let parentNode = model.pModel.render.containerViewer;
              let div = document.createElement("div")
              div.setAttribute("mid", model.id+"_opbtn")
              parentNode.appendChild(div)
              //渲染并挂载组件
              render(btnVNode, div);
            }
            if (model.render.operateBtn){
              let btnEl = model.render.operateBtn.el;
              //旋转,缩放
              let transform = ""
              let stage = model.stage
              let stageRatio = stage.getStageRatio()
              if (stageRatio > 0 && stageRatio != 1) {
                transform += " scale(" + stageRatio + ")"
              }

              if (model.rotate) {
                transform += " rotate(" + model.rotate + "deg)"
              }

              if (model.mirrorX) {
                transform += " rotateY(180deg)"
              }
              if (model.mirrorY) {
                transform += " rotateX(180deg)"
              }
              btnEl.style.transform = transform
              btnEl.style.left = (model.pvs[0].x + model.pvs[1].x) / 2 * stageRatio + stage.wpv.x - (btnEl.offsetWidth ) / 2  + "px"
              btnEl.style.top = (model.pvs[0].y + model.pvs[1].y) / 2 * stageRatio + stage.wpv.y - (btnEl.offsetHeight ) / 2 +1 + "px"
              btnEl.style.display = "block"
              
            }
          }
      }
    } else if (operate == 'VIEW-HIDDEN') {
      if (model.render.operateBtn) {
        let vNode = model.render.operateBtn;
        vNode.component.isUnmounted = true
        vNode.component.update()
        vNode.el.parentElement.remove()
        delete model.render.operateBtn
      }
    }
    


  }




  


}

export default DDeiQuickFlowLifeCycle