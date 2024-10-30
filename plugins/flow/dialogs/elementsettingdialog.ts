import {DDeiPluginBase} from "ddei-editor";
import ElementSettingDialog from "./ElementSettingDialog.vue";

class DDeiFlowElementSettingDialog extends DDeiPluginBase{
  name: string = ElementSettingDialog.name
  /**
   * 缺省实例
   */
  static defaultIns: DDeiFlowElementSettingDialog = new DDeiFlowElementSettingDialog({
    items: [
      {
        id: 'ddei-flow-property-editor-text',
        label: "代码",
        desc: "业务唯一标识",
        property: 'code',
      },
      {
        id: 'ddei-flow-property-editor-text',
        label: "名称",
        desc: "名称",
        property: 'name',
        condition: "model.bpmnBaseType != 'Event'"
      },
      {
        id: 'ddei-flow-property-editor-text',
        label: "发送人",
        desc: "上方参与人，用逗号隔开多个参与人",
        property: 'topUser',
        condition: "model.bpmnType == 'ChoreographyTask' || model.bpmnType == 'ChoreographySubProcess'"
      },
      {
        id: 'ddei-flow-property-editor-text',
        label: "接收人",
        desc: "下方参与人，用逗号隔开多个参与人",
        property: 'bottomUser',
        condition: "model.bpmnType == 'ChoreographyTask' || model.bpmnType == 'ChoreographySubProcess'"
      },
      {
        id: 'ddei-flow-property-editor-textarea',
        label: "备注",
        desc: "备注",
        property: 'desc',
      },
      {
        id: 'ddei-flow-change-bpmnsubtype'
      },
      {
        id: 'ddei-flow-time-setting'
      },
      {
        id: 'ddei-flow-message-setting'
      },
      {
        id: 'ddei-flow-signal-setting'
      },
      {
        id: 'ddei-flow-error-setting'
      },
      {
        id: 'ddei-flow-change-linetype'
      },
      {
        id: 'ddei-flow-change-linepointtype'
      },
      {
        id: 'ddei-flow-callactivity-review'
      },
      {
        id: 'ddei-flow-change-activity-labels'
      },
      {
        viewer: null,
      }
    ]
  });


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