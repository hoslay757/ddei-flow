import { DDeiAbstractShape,DDeiLifeCycle, DDeiFuncData, DDeiEditorUtil, DDeiUtil, DDeiFuncCallResult, DDeiEditorEnumBusCommandType, DDeiEnumBusCommandType } from "ddei-editor";
import { clone} from "ddei-editor";
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
"config":{
  "StartEvent": {
    "model":"1000001",
    "width":50,
    "height":50,
    "textField": "name",
    "fields":[
      {
        "key":"name",
        "field":"name"
      }
    ]
  },
  "UserTask": {
    "model":"1000011",
    "width":160,
    "height":80,
    "textField": "name",
     "fields":[
      {
        "key":"name",
        "field":"name"
      }
    ]
  },
  "ScriptTask": {
    "model":"1000021",
    "width":160,
    "height":80,
    "textField": "name",
    "fields":[
      {
        "key":"name",
        "field":"name"
      }
    ]
  },
  "ExclusiveGateway": {
    "model":"1000202",
    "width":60,
    "height":60,
    "textField": "name",
    "fields":[
      {
        "key":"name",
        "field":"name"
      }
    ]
  },
  "EndEvent": {
    "model":"1000003",
    "width":50,
    "height":50,
    "textField": "name",
    "fields":[
      {
        "key":"name",
        "field":"name"
      }
    ]
  }
},
"data":
    {
      "id": "begin",
      "name": "开始",
      "type": "StartEvent",
       "children": [
        {
          "id": "task_1",
          "name": "任务节点1",
          "type": "UserTask",
          "children": [
            {
              "id": "end",
              "name": "结束",
              "type": "EndEvent"
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
        if(model.pvs.length == 2){
          
          btnEl.style.left = (model.pvs[0].x + model.pvs[1].x) / 2 * stageRatio + stage.wpv.x - (btnEl.offsetWidth ) / 2  + "px"
          btnEl.style.top = (model.pvs[0].y + model.pvs[1].y) / 2 * stageRatio + stage.wpv.y - (btnEl.offsetHeight ) / 2  + "px"
        }else if(model.pvs.length == 3){
          btnEl.style.left = model.pvs[1].x * stageRatio + stage.wpv.x - (btnEl.offsetWidth) / 2 + "px"
          btnEl.style.top = model.pvs[1].y* stageRatio + stage.wpv.y - (btnEl.offsetHeight) / 2 + "px"
        }

         btnEl.style.display = "block"
        
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