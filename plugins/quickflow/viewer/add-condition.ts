import {DDeiPluginBase} from "ddei-editor";
import AddConditionPanel from "./add-condition.vue";

class DDeiQuickFlowAddConditionPanel extends DDeiPluginBase{
  name: string = "ddei-quickflow-addcondition-panel"
  /**
   * 缺省实例
   */
  static defaultIns: DDeiQuickFlowAddConditionPanel = new DDeiQuickFlowAddConditionPanel({
    viewer: AddConditionPanel
  });



  getPanels(editor){
    return [this.options.viewer];
  }

  static modify(fn) {
    return DDeiQuickFlowAddConditionPanel.defaultIns.modify(fn)
  }

  static configuration(options, fullConfig: boolean = false) {
    //解析options，只使用自己相关的
    if (options) {
      let newOptions = {}
      if (fullConfig) {
        if (fullConfig) {
          if (options[AddConditionPanel.name]) {
            for (let i in options[AddConditionPanel.name]) {
              newOptions[i] = options[AddConditionPanel.name][i]
            }
          }
        }
      } else {
        newOptions = options
      }
      if (newOptions && Object.keys(newOptions).length !== 0) {
        let panels = new DDeiQuickFlowAddConditionPanel(newOptions);
        return panels;
      }
    }
    return DDeiQuickFlowAddConditionPanel.defaultIns;
  }
}

export default DDeiQuickFlowAddConditionPanel