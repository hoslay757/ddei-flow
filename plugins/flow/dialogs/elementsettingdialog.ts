import {DDeiPluginBase} from "ddei-editor";
import ElementSettingDialog from "./ElementSettingDialog.vue";

class DDeiFlowElementSettingDialog extends DDeiPluginBase{
  name: string = ElementSettingDialog.name
  /**
   * 缺省实例
   */
  static defaultIns: DDeiFlowElementSettingDialog = new DDeiFlowElementSettingDialog(null);


  plugins: object[] = [ElementSettingDialog]

  getDialogs(editor){
    return this.plugins;
  }

  static configuration(options, fullConfig: boolean = false) {
    //解析options，只使用自己相关的
    if (options) {
      let newOptions = {}
      if (fullConfig) {
        if (fullConfig) {
          if (options[ElementSettingDialog.name]) {
            for (let i in options[ElementSettingDialog.name]) {
              newOptions[i] = options[ElementSettingDialog.name][i]
            }
          }
        }
      } else {
        newOptions = options
      }
      if (newOptions && Object.keys(newOptions).length !== 0) {
        let panels = new DDeiFlowElementSettingDialog(newOptions);
        return panels;
      }
    }
    return DDeiFlowElementSettingDialog;
  }
}

export default DDeiFlowElementSettingDialog