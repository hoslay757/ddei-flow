import {DDeiPluginBase} from "ddei-editor";
import DDeiQuickFlowAddConditionPanel from "./add-condition"
import DDeiQuickFlowAddNodePanel from "./add-node"
import DDeiQuickFlowRemovePanel from "./remove"
import DDeiQuickFlowLeftMovePanel from "./left-move"
import DDeiQuickFlowRightMovePanel from "./right-move"
import DDeiQuickFlowOperatePanel from "./operate"


class DDeiQuickFlowPanels extends DDeiPluginBase {

  type: string = "package"
  /**
   * 缺省实例
   */
  static defaultIns: DDeiQuickFlowPanels = new DDeiQuickFlowPanels(null);

  plugins: object[] = [DDeiQuickFlowAddConditionPanel, DDeiQuickFlowAddNodePanel, DDeiQuickFlowRemovePanel, DDeiQuickFlowLeftMovePanel, DDeiQuickFlowRightMovePanel, DDeiQuickFlowOperatePanel]


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
    return DDeiQuickFlowPanels.defaultIns.modify(fn)
  }
  

  static configuration(options) {
    if (options) {
      //解析options，只使用自己相关的
      let dialogs = new DDeiQuickFlowPanels(options);
      for (let i = 0; i < dialogs.plugins?.length; i++) {
        dialogs.plugins[i] = dialogs.plugins[i].configuration(options, true)
      }
      return dialogs;
    }
    return DDeiQuickFlowPanels;
  }
}


export { DDeiQuickFlowPanels, DDeiQuickFlowAddConditionPanel, DDeiQuickFlowAddNodePanel, DDeiQuickFlowRemovePanel, DDeiQuickFlowLeftMovePanel, DDeiQuickFlowRightMovePanel, DDeiQuickFlowOperatePanel }
export default DDeiQuickFlowPanels