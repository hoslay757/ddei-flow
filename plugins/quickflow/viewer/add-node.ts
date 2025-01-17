import {DDeiPluginBase} from "ddei-editor";
import AddNodePanel from "./add-node.vue";

class DDeiQuickFlowAddNodePanel extends DDeiPluginBase{
  name: string = "ddei-quickflow-addnode-panel"
  /**
   * 缺省实例
   */
  static defaultIns: DDeiQuickFlowAddNodePanel = new DDeiQuickFlowAddNodePanel({
    viewer: AddNodePanel
  });



  getPanels(editor){
    return [this.options.viewer];
  }

  static modify(fn) {
    return DDeiQuickFlowAddNodePanel.defaultIns.modify(fn)
  }

  static configuration(options, fullConfig: boolean = false) {
    //解析options，只使用自己相关的
    if (options) {
      let newOptions = {}
      if (fullConfig) {
        if (fullConfig) {
          if (options[AddNodePanel.name]) {
            for (let i in options[AddNodePanel.name]) {
              newOptions[i] = options[AddNodePanel.name][i]
            }
          }
        }
      } else {
        newOptions = options
      }
      if (newOptions && Object.keys(newOptions).length !== 0) {
        let panels = new DDeiQuickFlowAddNodePanel(newOptions);
        return panels;
      }
    }
    return DDeiQuickFlowAddNodePanel.defaultIns;
  }
}

export default DDeiQuickFlowAddNodePanel