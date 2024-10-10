import DDeiFlowControls from "./controls";
import { DDeiPluginBase, DDeiEditor, DDeiUtil, DDeiCoreToolboxSimplePanel, DDeiCoreTopMenuSimplePanel } from "ddei-editor";
import DDeiFlowLifeCycles from "./lifecycle"
import DDeiFlowDialogs from "./dialogs"
import DDeiFlowHotkeys from "./hotkeys";
import DDeiFlowAPI from "./apis/api";
import { DDeiEditorUtil, DDeiExtSearch, DDeiExtQuickControl, DDeiConfig } from "ddei-editor"

class DDeiFlow extends DDeiPluginBase {
  type: string = "package"


  /**
   * 缺省实例
   */
  static defaultIns: DDeiFlow = new DDeiFlow({
    initConfig: {
      //覆盖
      rewrite: {
        currentLayout: "ddei-core-layout-simple"
      },
      //追加
      append: {
        extensions: [
          DDeiExtSearch,
          DDeiExtQuickControl,
          DDeiCoreToolboxSimplePanel.configuration({
            direct: 1,//方向，1纵向，2横向
            position: 8,//位置1-9顺时针，1为左上角，9为中心
            drag: 1,//是否允许拖拽位置
            dragCreate: 1,//是否在选择控件时创建一个控件
            groups: [
              {
                editMode: 1,
                desc: "选择",
                icon: `<svg class="icon" style="width: 28px; height: 28px;margin-left:-1px;margin-top:2px; " aria-hidden="true">
            <use xlink: href = "#icon-a-ziyuan432">< /use>
          </svg>`
              },
              {
                editMode: 4,
                desc: "连线",
                controls: [
                  "1000601"
                ]
              },
              {
                controls: [
                  "1000001",
                  "1000002",
                  "1000003",
                ]
              },
              {
                controls: [
                  "1000011",
                  "1000021",
                  "1000031",
                  "1000041",
                  "1000051",
                  "1000061",
                  "1000071",
                  "1000081",
                  "1000091",
                  "1000101",
                  "1000102",
                ]
              },
              {
                controls: [
                  "1000201",
                  "1000202",
                  "1000203",
                  "1000204",
                  "1000205",
                ]
              },
              {
                controls: [
                  "1000401",
                ]
              },
              {
                controls: [
                  "1000701",
                ]
              },
              {
                controls: [
                  "1000501",
                  "1000504",
                  "1000505",
                  "103010",
                  "103011"
                ]
              }
            ]
          }),
          DDeiCoreTopMenuSimplePanel.configuration({
            direct: 2,//方向，1纵向，2横向
            position: 2,//位置1-9顺时针，1为左上角，9为中心
            drag: 1,//是否允许拖拽位置
          })
        ]
      }
    }
  });

  hotkeys: object = DDeiFlowHotkeys;

  controls: object = DDeiFlowControls;

  lifecycles: object = DDeiFlowLifeCycles;

  dialogs: object = DDeiFlowDialogs;


  //获取默认配置
  static getInitConfig() {
    return DDeiFlow.defaultIns.getInitConfig()
  }

  getInitConfig(){
    return this.options?.initConfig
  }

  getOptions(): object {
    let options = {}
    let array = [this.controls, this.lifecycles,this.dialogs]
    array.forEach(plugin => {
      if (DDeiPluginBase.isSubclass(plugin, DDeiPluginBase)) {
        options = Object.assign({}, options, plugin.defaultIns.getOptions())
      } else if (plugin instanceof DDeiPluginBase) {
        options = Object.assign({}, options, plugin.getOptions())
      }
    });
    return options;
  }


  getControls(editor) {
    if (DDeiPluginBase.isSubclass(this.controls, DDeiPluginBase)) {
      return this.controls.defaultIns.getControls(editor);
    } else if (this.controls instanceof DDeiPluginBase) {
      return this.controls.getControls(editor);
    }
  }

  getGroups(editor) {
    if (DDeiPluginBase.isSubclass(this.controls, DDeiPluginBase)) {
      return this.controls.defaultIns.getGroups(editor);
    } else if (this.controls instanceof DDeiPluginBase) {
      return this.controls.getGroups(editor);
    }
  }

  getLifeCyclies(editor: DDeiEditor) {
    if (DDeiPluginBase.isSubclass(this.lifecycles, DDeiPluginBase)) {
      return this.lifecycles.defaultIns.getLifeCyclies(editor);
    } else if (this.lifecycles instanceof DDeiPluginBase) {
      return this.lifecycles.getLifeCyclies(editor);
    }
  }

  getDialogs(editor) {
    if (DDeiPluginBase.isSubclass(this.dialogs, DDeiPluginBase)) {
      return this.dialogs.defaultIns.getDialogs(editor);
    } else if (this.dialogs instanceof DDeiPluginBase) {
      return this.dialogs.getDialogs(editor);
    }
  }

  getHotKeys(editor) {
    if (DDeiPluginBase.isSubclass(this.hotkeys, DDeiPluginBase)) {
      return this.hotkeys.defaultIns.getHotKeys(editor);
    } else if (this.hotkeys instanceof DDeiPluginBase) {
      return this.hotkeys.getHotKeys(editor);
    }
  }

  installed(editor: DDeiEditor) {
    //复写判定隐藏的方法，增加subprocess的情况
    DDeiUtil.isModelHidden = this.createModelHiddenProxy(DDeiUtil.isModelHidden)
    DDeiEditorUtil.lineInitJSON = {
      modelCode: "1000601",
    };
    DDeiEditorUtil.getLineInitJSON = this.createGetLineInitJSONProxy(DDeiEditorUtil.getLineInitJSON, editor)
    DDeiUtil.getLineInitJSON = DDeiEditorUtil.getLineInitJSON
    DDeiEditorUtil.getModelInitJSON = this.createGetModelInitJSONProxy(DDeiEditorUtil.getModelInitJSON, editor)
    DDeiUtil.getModelInitJSON = DDeiEditorUtil.getModelInitJSON

    editor.flow = new DDeiFlowAPI(editor)
    DDeiConfig.SERI_FIELDS['AbstractShape'].SKIP.push("upActivityId")
    DDeiConfig.SERI_FIELDS['AbstractShape'].SKIP2.push("upActivityId")
  }



  // 代理方法的工厂函数
  createModelHiddenProxy(originalFunc) {
    return function proxy() {
      let model = arguments[0]
      let hidden = originalFunc.apply(this, arguments);
      if (!hidden){
        let stage = model.stage
        if(model.includePModelId){
          let subProcessModel = stage.getModelById(model.includePModelId)
          if (subProcessModel){
            if (!subProcessModel.isExpand){
              return true
            }else{
              return DDeiUtil.isModelHidden(subProcessModel)
            }
          }
          
        }else if(model.baseModelType == 'DDeiLine'){
          let distLinks = stage.getDistModelLinks(model.id);
          if (distLinks?.length == 2){
            let hiddenOne = DDeiUtil.isModelHidden(distLinks[0].sm)
            let hiddenTwo = DDeiUtil.isModelHidden(distLinks[1].sm)
            return hiddenOne && hiddenTwo
          }
        }
      }
      return hidden
    };
  }

  createGetLineInitJSONProxy(originalFunc) {
    return function proxy() {
      let ddInstance = arguments[0]
      let smodel = arguments[1]
      let emodel = arguments[2]
      if (ddInstance && smodel?.id && emodel?.id){
        let startModel = ddInstance.stage.getModelById(smodel.id);
        let endModel = ddInstance.stage.getModelById(emodel.id);
        if (startModel){
          //验证：1.开始连开始
          if (startModel.bpmnType == "StartEvent") {
            if (endModel.bpmnType == "StartEvent") {
              return null
            }
          }
          else if (startModel.bpmnType == "EndEvent") {
            if (endModel.bpmnType == "EndEvent") {
              return null
            }
          }
          //判断补偿和默认
          
          if ((startModel.bpmnType == 'EndEvent' && startModel.bpmnSubType == 7) 
          || (startModel.bpmnType == 'IntermediateEvent' && (startModel.bpmnSubType == 28 || startModel.bpmnSubType == 29))
            ||  (startModel.bpmnType == 'StartEvent' && startModel.bpmnSubType == 17) 
          ) {
            return {
              modelCode: "1000601",
              bpmnSubType: 5,
              dash :[4, 4],
              ep: { type: 1 }
            }
          }
        }

        if (startModel?.bpmnType == 'Comment' || endModel?.bpmnType == 'Comment') {
          //注释为协会、以及直线、无箭头
          
          return {
            modelCode: "1000601",
            bpmnSubType: 5,
            dash: [4, 4],
            sp : {type:0},
            ep: {type:0},
            type:1
          }
        }
        
      }
      return originalFunc.apply(this, arguments);
    };
  }

  createGetModelInitJSONProxy(originalFunc) {
    return function proxy() {
      let ddInstance = arguments[0]
      let model = arguments[1]
      let createControls = arguments[2]
      if (ddInstance && model && createControls?.length > 0){
        
        if ((model.bpmnType == 'EndEvent' && model.bpmnSubType == 7)
          || (model.bpmnType == 'IntermediateEvent' && (model.bpmnSubType == 28 || model.bpmnSubType == 29))
          || (model.bpmnType == 'StartEvent' && model.bpmnSubType == 17)
        ) {
          //增加补偿标志
          createControls.forEach(c=>{
            c.isCompensation = 1
          });
          return createControls;
        }
      }
      return originalFunc.apply(this, arguments);
    };
  }

  

  static configuration(options) {
    let core = new DDeiFlow(options);
    core.controls = core.controls.configuration(options, true)
    core.lifecycles = core.lifecycles.configuration(options, true)
    core.dialogs = core.dialogs.configuration(options, true)
    return core;
  }
}


export * from "./controls"
export * from "./lifecycle"
export * from "./hotkeys"
export * from "./apis/api"
export { DDeiFlow }
export default DDeiFlow;