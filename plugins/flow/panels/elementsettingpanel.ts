import {DDeiPluginBase} from "ddei-editor";
import ElementSettingPanel from "./ElementSettingPanel.vue";

class DDeiFlowElementSettingPanel extends DDeiPluginBase{
  name: string = ElementSettingPanel.name
  /**
   * 缺省实例
   */
  static defaultIns: DDeiFlowElementSettingPanel = new DDeiFlowElementSettingPanel({
    items: [
      {
        id: 'ddei-flow-property-editor-text',
        label: "ddei.code",
        desc: "ddei.code",
        property: 'code',
      },
      {
        id: 'ddei-flow-property-editor-text',
        label: "ddei.name",
        desc: "ddei.name",
        property: 'name',
        condition: "model.bpmnBaseType != 'Event'"
      },
      {
        id: 'ddei-flow-property-editor-text',
        label: "ddei.flow.property.humanperformer",
        desc: "ddei.flow.user",
        property: 'humanPerformer',
        condition: "model.bpmnType == 'UserTask'"
      },
      {
        id: 'ddei-flow-property-editor-text',
        label: "ddei.flow.property.potentialowner",
        desc: "ddei.flow.user",
        property: 'potentialOwner',
        condition: "model.bpmnType == 'UserTask'"
      },
      {
        id: 'ddei-flow-property-editor-textarea',
        label: "ddei.flow.property.script",
        desc: `sum = 0
for ( i in inputArray ) {
  sum += i
}`,
        property: 'script',
        condition: "model.bpmnType == 'ScriptTask'"
      },
      {
        id: 'ddei-flow-property-editor-text',
        label: "ddei.flow.property.sender",
        desc: "上方参与人，用逗号隔开多个参与人",
        property: 'topUser',
        condition: "model.bpmnType == 'ChoreographyTask' || model.bpmnType == 'ChoreographySubProcess'"
      },
      {
        id: 'ddei-flow-property-editor-text',
        label: "ddei.flow.property.receiver",
        desc: "下方参与人，用逗号隔开多个参与人",
        property: 'bottomUser',
        condition: "model.bpmnType == 'ChoreographyTask' || model.bpmnType == 'ChoreographySubProcess'"
      },
      {
        id: 'ddei-flow-change-bpmnsubtype'
      },
      {
        id: 'ddei-flow-dataobject-setting'
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
        id: 'ddei-flow-escal-setting'
      },
      {
        id: 'ddei-flow-error-setting'
      },
      {
        id: 'ddei-flow-condition-setting'
      },
      {
        id: 'ddei-flow-change-linetype'
      },
      {
        id: 'ddei-flow-change-linepointtype'
      },
      // {
      //   id: 'ddei-flow-callactivity-review'
      // },
      {
        id: 'ddei-flow-change-activity-labels'
      },
      {
        id: 'ddei-flow-property-editor-text',
        label: "ddei.flow.property.capacity",
        desc: "ddei.flow.property.capacity",
        property: 'capacity',
        condition: "model.bpmnType == 'DataStore' && !model.isUnlimited"
      },
      {
        id: 'ddei-flow-property-editor-textarea',
        label: "ddei.desc",
        desc: "ddei.desc",
        property: 'desc',
      }
    ]
  });


  plugins: object[] = [ElementSettingPanel]

  getPanels(editor){
    return this.plugins;
  }

  static modify(fn) {
    return DDeiFlowElementSettingPanel.defaultIns.modify(fn)
  }

  static configuration(options, fullConfig: boolean = false) {
    //解析options，只使用自己相关的
    if (options) {
      let newOptions = {}
      if (fullConfig) {
        if (fullConfig) {
          if (options[ElementSettingPanel.name]) {
            for (let i in options[ElementSettingPanel.name]) {
              newOptions[i] = options[ElementSettingPanel.name][i]
            }
          }
        }
      } else {
        newOptions = options
      }
      if (newOptions && Object.keys(newOptions).length !== 0) {
        let panels = new DDeiFlowElementSettingPanel(newOptions);
        return panels;
      }
    }
    return DDeiFlowElementSettingPanel.defaultIns;
  }
}

export default DDeiFlowElementSettingPanel