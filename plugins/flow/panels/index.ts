import {DDeiPluginBase} from "ddei-editor";
import DDeiFlowSettingButtonPanel from "./elementsettingpanel"

class DDeiFlowPanels extends DDeiPluginBase {

  type: string = "package"
  /**
   * 缺省实例
   */
  static defaultIns: DDeiFlowPanels = new DDeiFlowPanels(null);

  plugins: object[] = [DDeiFlowSettingButtonPanel]


  getPanels(editor) {
    
    let panels = []
    this.plugins.forEach(plugin => {
      let ls
      if (DDeiPluginBase.isSubclass(plugin, DDeiPluginBase)) {
        ls = plugin.defaultIns.getPanels(editor);
      } else if (plugin instanceof DDeiPluginBase) {
        ls = plugin.getPanels(editor);
      }
      if (ls?.length > 0) {
        panels = panels.concat(ls);
      }
    })
    return panels
  }

  static modify(fn){
    return DDeiFlowPanels.defaultIns.modify(fn)
  }
  

  static configuration(options) {
    if (options) {
      //解析options，只使用自己相关的
      let dialogs = new DDeiFlowPanels(options);
      for (let i = 0; i < dialogs.plugins?.length; i++) {
        dialogs.plugins[i] = dialogs.plugins[i].configuration(options, true)
      }
      return dialogs;
    }
    return DDeiFlowPanels;
  }
}


export { DDeiFlowPanels, DDeiFlowSettingButtonPanel }
export default DDeiFlowPanels