import {DDeiPluginBase} from "ddei-editor";
import OperatePanel from "./operate-view.vue";

class DDeiQuickFlowOperatePanel extends DDeiPluginBase{
  name: string = "ddei-quickflow-operate-panel"
  /**
   * 缺省实例
   */
  static defaultIns: DDeiQuickFlowOperatePanel = new DDeiQuickFlowOperatePanel({
    viewer: OperatePanel
  });



  getPanels(editor){
    return [this.options.viewer];
  }

  static modify(fn) {
    return DDeiQuickFlowOperatePanel.defaultIns.modify(fn)
  }

  static configuration(options, fullConfig: boolean = false) {
    //解析options，只使用自己相关的
    if (options) {
      let newOptions = {}
      if (fullConfig) {
        if (fullConfig) {
          if (options[OperatePanel.name]) {
            for (let i in options[OperatePanel.name]) {
              newOptions[i] = options[OperatePanel.name][i]
            }
          }
        }
      } else {
        newOptions = options
      }
      if (newOptions && Object.keys(newOptions).length !== 0) {
        let panels = new DDeiQuickFlowOperatePanel(newOptions);
        return panels;
      }
    }
    return DDeiQuickFlowOperatePanel.defaultIns;
  }
}

export default DDeiQuickFlowOperatePanel