import { DDeiPluginBase, DDeiEditor, DDeiUtil, DDeiCoreToolboxSimplePanel, DDeiCoreTopMenuSimplePanel } from "ddei-editor";
import DDeiQuickFlowLifeCycles from "./lifecycle"
import { DDeiEditorUtil, DDeiExtSearch, DDeiExtQuickControl, DDeiConfig, DDeiCoreSimpleLayout,DDeiCoreMobileLayout } from "ddei-editor"
import {DDeiFlowSettingButtonDialog} from "@ddei-flow"
import removeBtnViewer from "./viewer/remove-btn-viewer.vue"

class DDeiQuickFlow extends DDeiPluginBase {
  type: string = "package"

  /**
   * 缺省实例
   */
  static defaultIns: DDeiQuickFlow = new DDeiQuickFlow({
    initConfig:{
      append:{
        extensions: [
          DDeiCoreMobileLayout.configuration({
            other: ['ddei-core-panel-topmenu-simple'],
            middle: ['ddei-core-panel-canvasview'],
            before: [],
            after: ['ddei-flow-element-setting-panel']
          }),
          DDeiCoreSimpleLayout.configuration({
            other: ['ddei-core-panel-topmenu-simple'],
            middle: ['ddei-core-panel-canvasview'],
            before: [],
            after: ['ddei-flow-element-setting-panel']
          }),
          DDeiFlowSettingButtonDialog.configuration({
            buttons: [
              {
                id: 'ddei-flow-edit-property'
              },
              {
                id: 'ddei-flow-choose-activity'
              },
              {
                id: 'ddei-flow-expand-or-not'
              },
              {
                id: 'ddei-flow-lock-or-unlock'
              },
              {
                viewer: removeBtnViewer,
                condition:"model.modelType != 'DDeiLine' && model.type != 'start' && model.type != 'end'"
              }
            ]
          })
        ]
      }
    }
  });


  lifecycles: object = DDeiQuickFlowLifeCycles;

  //获取默认配置
  static getInitConfig() {
    return DDeiQuickFlow.defaultIns.getInitConfig()
  }

  getInitConfig(){
    return this.options?.initConfig
  }
  
  getOptions(): object {
    let options = {}
    let array = [this.lifecycles]
    array.forEach(plugin => {
      if (DDeiPluginBase.isSubclass(plugin, DDeiPluginBase)) {
        options = Object.assign({}, options, plugin.defaultIns.getOptions())
      } else if (plugin instanceof DDeiPluginBase) {
        options = Object.assign({}, options, plugin.getOptions())
      }
    });
    return options;
  }

  getLifeCyclies(editor: DDeiEditor) {
    if (DDeiPluginBase.isSubclass(this.lifecycles, DDeiPluginBase)) {
      return this.lifecycles.defaultIns.getLifeCyclies(editor);
    } else if (this.lifecycles instanceof DDeiPluginBase) {
      return this.lifecycles.getLifeCyclies(editor);
    }
  }

  allInstalled(editor: DDeiEditor) {
    let removePlugins = []
    
    editor.plugins?.forEach(plugin => {
      
      if (plugin instanceof DDeiExtQuickControl){
        removePlugins.push(plugin)
      }
    });
    if(editor.flow){
      editor.flow.getFlowDesignData = ()=>{
        return editor.ddInstance.stage.extData['flowDesignData'];
      }
    }
    removePlugins.forEach(rp=>{
      rp.unmount(editor)
    })
  }

  static modify(fn) {
    return DDeiQuickFlow.defaultIns.modify(fn)
  }

  static configuration(options) {
    let core = new DDeiQuickFlow(options);
    core.lifecycles = core.lifecycles.configuration(options, true)
    return core;
  }
}

export * from "./lifecycle"
export { DDeiQuickFlow }
export default DDeiQuickFlow;