import {DDeiPluginBase} from "ddei-editor";
import SettingButtonDialog from "./SettingButtonDialog.vue";


class DDeiFlowSettingButtonDialog extends DDeiPluginBase{
  name: string = SettingButtonDialog.name
  /**
   * 缺省实例
   */
  static defaultIns: DDeiFlowSettingButtonDialog = new DDeiFlowSettingButtonDialog({
    buttons: [
      {
        id: 'ddei-flow-edit-property'
      },
      {
        id: 'ddei-flow-choose-activity'
      },
      {
        id: 'ddei-flow-expand-or-not'
      },
      {
        id: 'ddei-flow-lock-or-unlock'
      },
      {
        id: 'ddei-flow-remove-control'
      }
    ]
  });


  plugins: object[] = [SettingButtonDialog]

  getDialogs(editor){
    return this.plugins;
  }

  static modify(fn) {
    return DDeiFlowSettingButtonDialog.defaultIns.modify(fn)
  }

  static configuration(options, fullConfig: boolean = false) {
    //解析options，只使用自己相关的
    if (options) {
      let newOptions = {}
      if (fullConfig) {
        if (fullConfig) {
          if (options[SettingButtonDialog.name]) {
            for (let i in options[SettingButtonDialog.name]) {
              newOptions[i] = options[SettingButtonDialog.name][i]
            }
          }
        }
      } else {
        newOptions = options
      }
      if (newOptions && Object.keys(newOptions).length !== 0) {
        let panels = new DDeiFlowSettingButtonDialog(newOptions);
        return panels;
      }
    }
    return DDeiFlowSettingButtonDialog;
  }
}

export default DDeiFlowSettingButtonDialog