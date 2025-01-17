import {DDeiPluginBase} from "ddei-editor";
import RemovePanel from "./remove-btn-viewer.vue";

class DDeiQuickFlowRemovePanel extends DDeiPluginBase{
  name: string = "ddei-quickflow-remove-panel"
  /**
   * 缺省实例
   */
  static defaultIns: DDeiQuickFlowRemovePanel = new DDeiQuickFlowRemovePanel({
    viewer: RemovePanel
  });



  getPanels(editor){
    return [this.options.viewer];
  }

  static modify(fn) {
    return DDeiQuickFlowRemovePanel.defaultIns.modify(fn)
  }

  static configuration(options, fullConfig: boolean = false) {
    //解析options，只使用自己相关的
    if (options) {
      let newOptions = {}
      if (fullConfig) {
        if (fullConfig) {
          if (options[RemovePanel.name]) {
            for (let i in options[RemovePanel.name]) {
              newOptions[i] = options[RemovePanel.name][i]
            }
          }
        }
      } else {
        newOptions = options
      }
      if (newOptions && Object.keys(newOptions).length !== 0) {
        let panels = new DDeiQuickFlowRemovePanel(newOptions);
        return panels;
      }
    }
    return DDeiQuickFlowRemovePanel.defaultIns;
  }
}

export default DDeiQuickFlowRemovePanel