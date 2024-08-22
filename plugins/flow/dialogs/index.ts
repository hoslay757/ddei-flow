import {DDeiPluginBase} from "ddei-editor";
import ElementSettingDialog from "./elementsettingdialog"

class DDeiFlowDialogs extends DDeiPluginBase {

  type: string = "package"
  /**
   * 缺省实例
   */
  static defaultIns: DDeiFlowDialogs = new DDeiFlowDialogs(null);

  plugins: object[] = [ElementSettingDialog
  ]

  getDialogs(editor) {
    let panels = []
    this.plugins?.forEach(plugin => {
      let ls
      if (DDeiPluginBase.isSubclass(plugin, DDeiPluginBase)) {
        ls = plugin.defaultIns.getDialogs(editor);
      } else if (plugin instanceof DDeiPluginBase) {
        ls = plugin.getDialogs(editor);
      }
      if (ls?.length > 0) {
        panels = panels.concat(ls);
      }
    })
    return panels
  }



  static configuration(options) {
    if (options) {
      //解析options，只使用自己相关的
      let panels = new DDeiFlowDialogs(options);
      for (let i = 0; i < panels.plugins?.length; i++) {
        panels.plugins[i] = panels.plugins[i].configuration(options, true)
      }
      return panels;
    }
    return DDeiFlowDialogs;
  }
}


export {DDeiFlowDialogs
}
export default DDeiFlowDialogs