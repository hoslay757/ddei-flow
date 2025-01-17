import {DDeiPluginBase} from "ddei-editor";
import RightMovePanel from "./condition-right-operate-view.vue";

class DDeiQuickFlowRightMovePanel extends DDeiPluginBase{
  name: string = "ddei-quickflow-rightmove-panel"
  /**
   * 缺省实例
   */
  static defaultIns: DDeiQuickFlowRightMovePanel = new DDeiQuickFlowRightMovePanel({
    viewer: RightMovePanel
  });



  getPanels(editor){
    return [this.options.viewer];
  }

  static modify(fn) {
    return DDeiQuickFlowRightMovePanel.defaultIns.modify(fn)
  }

  static configuration(options, fullConfig: boolean = false) {
    //解析options，只使用自己相关的
    if (options) {
      let newOptions = {}
      if (fullConfig) {
        if (fullConfig) {
          if (options[RightMovePanel.name]) {
            for (let i in options[RightMovePanel.name]) {
              newOptions[i] = options[RightMovePanel.name][i]
            }
          }
        }
      } else {
        newOptions = options
      }
      if (newOptions && Object.keys(newOptions).length !== 0) {
        let panels = new DDeiQuickFlowRightMovePanel(newOptions);
        return panels;
      }
    }
    return DDeiQuickFlowRightMovePanel.defaultIns;
  }
}

export default DDeiQuickFlowRightMovePanel