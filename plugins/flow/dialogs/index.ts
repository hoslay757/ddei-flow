import {DDeiPluginBase} from "ddei-editor";
import DDeiFlowElementSettingDialog from "./elementsettingdialog"
import DDeiFlowSettingButtonDialog from "./settingbuttondialog"

class DDeiFlowDialogs extends DDeiPluginBase {

  type: string = "package"
  /**
   * 缺省实例
   */
  static defaultIns: DDeiFlowDialogs = new DDeiFlowDialogs(null);

  plugins: object[] = [DDeiFlowElementSettingDialog, DDeiFlowSettingButtonDialog]

  getDialogs(editor) {
    let dialogs = []
    this.plugins?.forEach(plugin => {
      let ls
      if (DDeiPluginBase.isSubclass(plugin, DDeiPluginBase)) {
        ls = plugin.defaultIns.getDialogs(editor);
      } else if (plugin instanceof DDeiPluginBase) {
        ls = plugin.getDialogs(editor);
      }
      if (ls?.length > 0) {
        dialogs = dialogs.concat(ls);
      }
    })
    return dialogs
  }



  static configuration(options) {
    if (options) {
      //解析options，只使用自己相关的
      let dialogs = new DDeiFlowDialogs(options);
      for (let i = 0; i < dialogs.plugins?.length; i++) {
        dialogs.plugins[i] = dialogs.plugins[i].configuration(options, true)
      }
      return dialogs;
    }
    return DDeiFlowDialogs;
  }
}


export { DDeiFlowDialogs, DDeiFlowElementSettingDialog, DDeiFlowSettingButtonDialog }
export default DDeiFlowDialogs