import { DDeiAbstractShape,DDeiLifeCycle, DDeiFuncData, DDeiEditorUtil, DDeiUtil, DDeiFuncCallResult, DDeiEditorEnumBusCommandType, DDeiEnumBusCommandType } from "ddei-editor";
import { clone, merge } from "ddei-editor";
import { getIncludeModels, showSettingButton, changeSettingButtonPos, updateCallActivityView } from "../controls/util"
import { getCurrentInstance, render, createVNode } from "vue"
import defaultOperateView from "./operate-view.vue"
import defaultConditionLeftOperateView from "./condition-left-operate-view.vue"
import defaultConditionRightOperateView from "./condition-right-operate-view.vue"
import defaultAddConditionOperateView from "./add-condition.vue"

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
    this.initOrLoadFile(operateType, data, ddInstance, evt)
  });

  EVENT_ADD_FILE_AFTER:DDeiFuncData | null = new DDeiFuncData("ddei-quickflow-load-file", 1, (operateType, data, ddInstance, evt) => {
    this.initOrLoadFile(operateType, data, ddInstance, evt)
  })




  EVENT_CONTROL_VIEW: DDeiFuncData | null = new DDeiFuncData("ddei-quickflow-control-view-after", 1, (operateType, data, ddInstance, evt) => {
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    data?.models?.forEach(model => {
      if (model.bpmnBaseType == 'Sequence'){
        this.refreshOperateBtnRenderViewer(model, operateType, editor)
      }
      else if (model.type == 'condition') {
        this.refreshConditionBtnRenderViewer(model, operateType, editor)
      }
    });
  });

  
  EVENT_CONTROL_DEL_AFTER: DDeiFuncData | null = new DDeiFuncData("ddei-quickflow-control-remove", 1, (operateType, data, ddInstance, evt) => {
    // let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    // let flowAPI = editor.flow
    // let stage = ddInstance.stage;
    // if (stage.extData && stage.extData.flowDesignData) {
    //   let flowDesignData = stage?.extData ? stage.extData['flowDesignData'] : null;
    //   if (flowDesignData){
    //     data.models?.forEach(model => {
    //       //删除相关节点
    //       let nResult = flowAPI.getNodeById(model.id, flowDesignData.data)
    //       if (nResult){
    //         let parentNode = nResult.parentNode;
    //         let node = nResult.node;
    //         //删除分支条件
    //         if(node.type == 'condition'){

    //         }
    //         //删除分支
    //         else if (node.type == 'branch') {

    //         }
    //         //删除节点
    //         else{
    //           parentNode.children.splice(parentNode.children.indexOf(node),1)
    //           if(node.link){
    //             parentNode.link = node.link;
    //             delete parentNode.children
    //           }else if(node.children?.length > 0){
    //             parentNode.children = [node.children[0]]
    //           }
    //         }
    //       }
    //     });
    //   }
    // }
    data.renders?.forEach(render => {
      if (render.operateBtn) {
        let vNode = render.operateBtn;
        vNode.component.isUnmounted = true
        vNode.component.update()
        vNode.el.parentElement.remove()
        delete render.operateBtn
      }
      if (render.operateLBtn) {
        let vNode = render.operateLBtn;
        vNode.component.isUnmounted = true
        vNode.component.update()
        vNode.el.parentElement.remove()
        delete render.operateLBtn
      }
      if (render.operateRBtn) {
        let vNode = render.operateRBtn;
        vNode.component.isUnmounted = true
        vNode.component.update()
        vNode.el.parentElement.remove()
        delete render.operateRBtn
      }
      if (render.operateLAddBtn) {
        let vNode = render.operateLAddBtn;
        vNode.component.isUnmounted = true
        vNode.component.update()
        vNode.el.parentElement.remove()
        delete render.operateLAddBtn
      }
      if (render.operateRAddBtn) {
        let vNode = render.operateRAddBtn;
        vNode.component.isUnmounted = true
        vNode.component.update()
        vNode.el.parentElement.remove()
        delete render.operateRAddBtn
      }
    });
  });

  EVENT_MOUSE_MOVE_IN_LAYER: DDeiFuncData | null = new DDeiFuncData("ddei-quickflow-mouse-in-layer", 1, (operateType, data, ddInstance, evt) => { return this.mouseInLayer(operateType, data, ddInstance, evt) });


  EVENT_CONTROL_EDIT_AFTER: DDeiFuncData | null = new DDeiFuncData("ddei-quickflow-edit-after", 1, (operateType, data, ddInstance, evt) => { 
    return this.editAfter(operateType, data, ddInstance, evt);
  });

  initOrLoadFile(operateType, data, ddInstance, evt){
    
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    if (editor?.flow) {
      let flowAPI = editor.flow;

      let stage = ddInstance.stage;
      let flowDesignData = stage?.extData ? stage.extData['flowDesignData'] : null;
      if (operateType == 'LOAD_FILE') {
        
        if (flowDesignData) {
          flowAPI.loadFromFlowData(flowDesignData, true);
          editor.ddInstance["AC_DESIGN_DRAG"] = false
          editor.ddInstance["AC_DESIGN_LINK"] = false
          editor.ddInstance["AC_DESIGN_ROTATE"] = false
          editor.ddInstance["AC_DESIGN_SCALE"] = false
        }
      } else {
        if (!flowDesignData) {
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
    "width":100,
    "height":40,
    "textField": "name"
  },
  "converge": {
    "model":"1000204",
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
          flowDesignData = JSON.parse(flowData);
          stage.extData['flowDesignData'] = flowDesignData
        }

        flowAPI.loadFromFlowData(flowDesignData, true,null,1,true);
        editor.ddInstance["AC_DESIGN_DRAG"] = false
        editor.ddInstance["AC_DESIGN_LINK"] = false
        editor.ddInstance["AC_DESIGN_ROTATE"] = false
        editor.ddInstance["AC_DESIGN_SCALE"] = false
      }
    }
  }

  editAfter(operateType, data, ddInstance, evt){
    let editor = DDeiEditorUtil.getEditorInsByDDei(ddInstance);
    let flowAPI = editor.flow
    let stage = ddInstance.stage;
    let propName = data.propName
    let ignoreField = ["width","height","border","fill","font","textStyle","id","essBounds","pvs","cpv"]
    if (stage.extData && stage.extData.flowDesignData) {
      data?.models?.forEach(model => {
        //同步模型属性到存储的结构化数据
        let nResult = flowAPI.getNodeById(model.id, stage.extData.flowDesignData.data)
        let node = nResult?.node
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
        if (stage && stage.extData && stage.extData.flowDesignData?.data) {
          let flowDesignData = stage.extData.flowDesignData;
          let flowData = flowDesignData.data;
          let nResult =  editor.flow.getNodeById(model.smodel.id, flowData);
          let parentNode = nResult?.node
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

  refreshConditionBtnRenderViewer(model, operate, editor) {
    if (operate == 'VIEW') {
      let stage = editor.ddInstance.stage;
      if (stage && stage.extData && stage.extData.flowDesignData?.data) {
        
        let flowDesignData = stage.extData.flowDesignData;
        let flowData = flowDesignData.data;
        let nResult = editor.flow.getNodeById(model.id, flowData);
        let dataNode = nResult?.node;
        if (dataNode) {
          let sibNodes = nResult?.sibNodes;
          if (!model.render.operateLBtn) {
            let opts = { editor: editor, model: model }
            let btnVNode = createVNode(defaultConditionLeftOperateView, opts);
            let appContext = editor.appContext;
            //挂载
            btnVNode.appContext = appContext;
            model.render.operateLBtn = btnVNode

            let parentNode = model.pModel.render.containerViewer;
            let div = document.createElement("div")
            div.setAttribute("mid", model.id + "_l_opbtn")
            parentNode.appendChild(div)
            //渲染并挂载组件
            render(btnVNode, div);
          }
          if (!model.render.operateRBtn) {
            let opts = { editor: editor, model: model }
            let btnVNode = createVNode(defaultConditionRightOperateView, opts);
            let appContext = editor.appContext;
            //挂载
            btnVNode.appContext = appContext;
            model.render.operateRBtn = btnVNode

            let parentNode = model.pModel.render.containerViewer;
            let div = document.createElement("div")
            div.setAttribute("mid", model.id + "_r_opbtn")
            parentNode.appendChild(div)
            //渲染并挂载组件
            render(btnVNode, div);
          }
          if (!model.render.operateLAddBtn) {
            let opts = { editor: editor, model: model,direct:1 }
            let btnVNode = createVNode(defaultAddConditionOperateView, opts);
            let appContext = editor.appContext;
            //挂载
            btnVNode.appContext = appContext;
            model.render.operateLAddBtn = btnVNode

            let parentNode = model.pModel.render.containerViewer;
            let div = document.createElement("div")
            div.setAttribute("mid", model.id + "_ladd_opbtn")
            parentNode.appendChild(div)
            //渲染并挂载组件
            render(btnVNode, div);
          }
          if (!model.render.operateRAddBtn) {
            let opts = { editor: editor, model: model, direct: 2 }
            let btnVNode = createVNode(defaultAddConditionOperateView, opts);
            let appContext = editor.appContext;
            //挂载
            btnVNode.appContext = appContext;
            model.render.operateRAddBtn = btnVNode

            let parentNode = model.pModel.render.containerViewer;
            let div = document.createElement("div")
            div.setAttribute("mid", model.id + "_radd_opbtn")
            parentNode.appendChild(div)
            //渲染并挂载组件
            render(btnVNode, div);
          }
          let transform = ""
          let stage = model.stage
          let stageRatio = stage.getStageRatio()
          if (stageRatio > 0 && stageRatio != 1) {
            transform += " scale(" + stageRatio + ")"
          }
          if (model.render.operateLBtn) {
            let btnEl = model.render.operateLBtn.el;
            btnEl.style.transform = transform
            btnEl.style.left = model.essBounds.x * stageRatio + stage.wpv.x - btnEl.offsetWidth + "px"
            btnEl.style.top = (model.essBounds.y + model.essBounds.height / 2) * stageRatio + stage.wpv.y - (btnEl.offsetHeight) / 2 + 1 + "px"
            btnEl.style.display = "block"

          }
          if (model.render.operateRBtn) {
            let btnEl = model.render.operateRBtn.el;
            btnEl.style.transform = transform
            btnEl.style.left = (model.essBounds.x + model.essBounds.width) * stageRatio + stage.wpv.x + "px"
            btnEl.style.top = (model.essBounds.y + model.essBounds.height / 2) * stageRatio + stage.wpv.y - (btnEl.offsetHeight) / 2 + 1 + "px"
            btnEl.style.display = "block"
          }
          
          if (model.render.operateLAddBtn) {
            let btnEl = model.render.operateLAddBtn.el;
            btnEl.style.transform = transform
            //位于第一个元素
            let sibIdx = nResult.index
            if (sibIdx == 0) {
              //与前一个相邻元素的中心点的中间
              if (sibNodes.length > 1) {
                let model1 = stage.getModelById(sibNodes[1].id)
                btnEl.style.left = (model.cpv.x - (model1.cpv.x - model.cpv.x)/2) * stageRatio + stage.wpv.x - btnEl.offsetWidth / 2 + "px"
              } else {
                btnEl.style.left = (model.essBounds.x - model.essBounds.width / 2 - 20) * stageRatio + stage.wpv.x - btnEl.offsetWidth / 2 + "px"
              }
            } else {
              //与前一个相邻元素的中心点的中间
              let model1 = stage.getModelById(sibNodes[sibIdx - 1].id)
              btnEl.style.left = (model.cpv.x + model1.cpv.x) / 2 * stageRatio + stage.wpv.x - btnEl.offsetWidth / 2 + "px"
            }
            btnEl.style.top = (model.essBounds.y + model.essBounds.height / 2) * stageRatio + stage.wpv.y - (btnEl.offsetHeight) / 2 + 1 + "px"
            btnEl.style.display = "block"

          }
          if (model.render.operateRAddBtn) {
            let btnEl = model.render.operateRAddBtn.el;
            btnEl.style.transform = transform
            //位于第一个元素
            let sibIdx = nResult.index
            if (sibIdx == sibNodes.length-1){
              if (sibNodes.length > 1) {
                let model1 = stage.getModelById(sibNodes[sibIdx-1].id)
                btnEl.style.left = (model.cpv.x + (model.cpv.x-model1.cpv.x)/2) * stageRatio + stage.wpv.x - btnEl.offsetWidth / 2 + "px"
              } else {
                btnEl.style.left = (model.essBounds.x + model.essBounds.width *1.5 + 20) * stageRatio + stage.wpv.x - btnEl.offsetWidth / 2 + "px"
              }
              btnEl.style.top = (model.essBounds.y + model.essBounds.height / 2) * stageRatio + stage.wpv.y - (btnEl.offsetHeight) / 2 + 1 + "px"
            }else{
              btnEl.style.display = "none"
            }
            
          }
          
        }
      }

    } else if (operate == 'VIEW-HIDDEN') {
      if (model.render.operateLBtn) {
        let vNode = model.render.operateLBtn;
        vNode.component.isUnmounted = true
        vNode.component.update()
        vNode.el.parentElement.remove()
        delete model.render.operateLBtn
      }
      if (model.render.operateRBtn) {
        let vNode = model.render.operateRBtn;
        vNode.component.isUnmounted = true
        vNode.component.update()
        vNode.el.parentElement.remove()
        delete model.render.operateRBtn
      }
      if (model.render.operateLAddBtn) {
        let vNode = model.render.operateLAddBtn;
        vNode.component.isUnmounted = true
        vNode.component.update()
        vNode.el.parentElement.remove()
        delete model.render.operateLAddBtn
      }
      if (model.render.operateRAddBtn) {
        let vNode = model.render.operateRAddBtn;
        vNode.component.isUnmounted = true
        vNode.component.update()
        vNode.el.parentElement.remove()
        delete model.render.operateRAddBtn
      }
    }



  }



  


}

export default DDeiQuickFlowLifeCycle