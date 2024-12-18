import { DDeiPluginBase, DDeiEditor, DDeiUtil, DDeiCoreToolboxSimplePanel, DDeiCoreTopMenuSimplePanel } from "ddei-editor";
import DDeiQuickFlowLifeCycles from "./lifecycle"
import { DDeiEditorUtil, DDeiExtSearch, DDeiExtQuickControl, DDeiConfig, DDeiCoreMobileLayout } from "ddei-editor"

class DDeiQuickFlow extends DDeiPluginBase {
  type: string = "package"

  /**
   * 缺省实例
   */
  static defaultIns: DDeiQuickFlow = new DDeiQuickFlow({
    initConfig: {
      
     
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