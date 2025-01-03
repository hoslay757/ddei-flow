import {DDeiPluginBase} from "ddei-editor";
import LeftMovePanel from "./condition-left-operate-view.vue";

class DDeiQuickFlowLeftMovePanel extends DDeiPluginBase{
  name: string = "ddei-quickflow-leftmove-panel"
  /**
   * 缺省实例
   */
  static defaultIns: DDeiQuickFlowLeftMovePanel = new DDeiQuickFlowLeftMovePanel({
    viewer: LeftMovePanel
  });



  getPanels(editor){
    return [this.options.viewer];
  }

  static modify(fn) {
    return DDeiQuickFlowLeftMovePanel.defaultIns.modify(fn)
  }

  static configuration(options, fullConfig: boolean = false) {
    //解析options，只使用自己相关的
    if (options) {
      let newOptions = {}
      if (fullConfig) {
        if (fullConfig) {
          if (options[LeftMovePanel.name]) {
            for (let i in options[LeftMovePanel.name]) {
              newOptions[i] = options[LeftMovePanel.name][i]
            }
          }
        }
      } else {
        newOptions = options
      }
      if (newOptions && Object.keys(newOptions).length !== 0) {
        let panels = new DDeiQuickFlowLeftMovePanel(newOptions);
        return panels;
      }
    }
    return DDeiQuickFlowLeftMovePanel.defaultIns;
  }
}

export default DDeiQuickFlowLeftMovePanel