import DDeiFlowControls from "./controls";
import { DDeiPluginBase, DDeiEditor, DDeiUtil, DDeiCoreToolboxSimplePanel, DDeiCoreTopMenuSimplePanel } from "ddei-editor";
import DDeiFlowLifeCycles from "./lifecycle"
import DDeiFlowDialogs from "./dialogs"
import DDeiFlowPanels from "./panels"
import DDeiFlowHotkeys from "./hotkeys";
import DDeiFlowAPI from "./apis/api";
import { DDeiEditorUtil, DDeiExtSearch, DDeiExtQuickControl, DDeiConfig, DDeiCoreMobileLayout } from "ddei-editor"

class DDeiFlow extends DDeiPluginBase {
  type: string = "package"

  static{

    if(DDeiUtil.isMobile()){
      DDeiFlow.toolboxConfig = {
        direct: 1,//方向，1纵向，2横向
        position: 8,//位置1-9顺时针，1为左上角，9为中心
        drag: 0,//是否允许拖拽位置
        dragCreate: 0,//是否在选择控件时创建一个控件
        groups: [
          {
            controls: [
              "1000001",
              "1000004",
              "1000002",
              "1000005",
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
              "1000506",
              "1000507",
            ]
          }
        ]
      }
      DDeiFlow.layout = "ddei-core-layout-mobile"
    }else{
      DDeiFlow.toolboxConfig = {
        direct: 1,//方向，1纵向，2横向
        position: 8,//位置1-9顺时针，1为左上角，9为中心
        drag: 1,//是否允许拖拽位置
        dragCreate: 1,//是否在选择控件时创建一个控件
        groups: [
          {
            editMode: 1,
            desc: "ddei.choose",
            icon: `<svg class="icon" style="width: 28px; height: 28px;margin-left:-1px;margin-top:2px; " aria-hidden="true">
              <use xlink: href = "#icon-selector">< /use>
            </svg>`
          },
          {
            editMode: 4,
            desc: "ddei.flow.sequence",
            controls: [
              "1000601"
            ]
          },
          {
            controls: [
              "1000001",
              "1000004",
              "1000002",
              "1000005",
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
              "1000506",
              "1000507",
            ]
          }
        ]
      }
      DDeiFlow.layout = "ddei-core-layout-simple"
    }
  }
  /**
   * 缺省实例
   */
  static defaultIns: DDeiFlow = new DDeiFlow({
    initConfig: {
      //覆盖
      rewrite: {
        currentLayout: DDeiFlow.layout
      },
      //追加
      append: {
        extensions: [
          DDeiCoreMobileLayout.configuration({
            other: ['ddei-core-panel-toolbox-simple', 'ddei-core-panel-topmenu-simple'],
            middle: ['ddei-core-panel-canvasview'],
            before: [],
            after: ['ddei-flow-element-setting-panel']
          }),
          DDeiExtSearch,
          DDeiExtQuickControl,
          DDeiCoreToolboxSimplePanel.configuration(DDeiFlow.toolboxConfig),
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

  panels: object = DDeiFlowPanels;


  //获取默认配置
  static getInitConfig() {
    return DDeiFlow.defaultIns.getInitConfig()
  }

  getInitConfig(){
    return this.options?.initConfig
  }

  getLangs(editor) {
    const langModules = import.meta.glob('./i18n/*', { eager: true });
    let langs = {}
    for (let i in langModules) {
      let langModule = langModules[i];
      let newI = i.substring(i.lastIndexOf('/') + 1, i.lastIndexOf('.'))
      langs[newI] = langModule.default
    }
    return langs;
  }
  
  getOptions(): object {
    let options = {}
    let array = [this.controls, this.lifecycles,this.dialogs,this.panels]
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
  

  getPanels(editor) {
    if (DDeiPluginBase.isSubclass(this.panels, DDeiPluginBase)) {
      return this.panels.defaultIns.getPanels(editor);
    } else if (this.panels instanceof DDeiPluginBase) {
      return this.panels.getPanels(editor);
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
    if (originalFunc.name != 'ddeiFlowModelHiddenProxy'){
      return function ddeiFlowModelHiddenProxy() {
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
    }else{
      return originalFunc
    }
  }

  createGetLineInitJSONProxy(originalFunc) {
    if (originalFunc.name != 'ddeiFlowGetLineInitJSONProxy') {
      return function ddeiFlowGetLineInitJSONProxy() {
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
    }else{
      return originalFunc
    }
  }

  createGetModelInitJSONProxy(originalFunc) {
    if (originalFunc.name != 'ddeiFlowGetModelInitJSONProxy') {
      return function ddeiFlowGetModelInitJSONProxy() {
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
    }else{
      return originalFunc
    }
  }

  static modify(fn) {
    return DDeiFlow.defaultIns.modify(fn)
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
export * from "./dialogs"
export * from "./panels"
export { DDeiFlow }
export default DDeiFlow;