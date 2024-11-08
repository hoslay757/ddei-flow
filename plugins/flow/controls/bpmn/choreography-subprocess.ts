import { showSettingButton, lineObiCheck } from "../util"
import BpmnChoreSubProcessViewer from "../views/bpmn-chore-subprocess-viewer.vue"


export default {
  id: '1000102',
  name: 'ddei.flow.choresubprocess',
  code: 'chor_subprocess',
  desc: 'bpmn中的ChoreographySubProcess',
  from: '1000011',
  subject: 'bpmn',
  define: {
    bpmnBaseType: 'Activity',
    bpmnType: 'ChoreographySubProcess',
    allowIncludeModel: 1,
    width: 300,
    height: 240,
    otherWidth: 120,
    otherHeight: 130,
    isExpand: 1,
    border: {
      round: 5
    },
    topUser: "ddei.flow.property.sender",
    bottomUser: "ddei.flow.property.receiver",
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': 'ddei.code',
          'desc': '用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "chor_subprocess",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': 'ddei.name',
          'desc': '任务的名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ddei.flow.choresubprocess",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'isAdHoc',
          'name': 'ddei.flow.property.custom',
          'desc': '是否为自定义流程',
          'controlType': 'switch-checkbox',
          'dataType': 'integer',
          'display': 'column',
          'hiddenTitle': true,
          'defaultValue': 0,
          'type': [1, 2], //类别，1图形，2业务，3事件
        },
        
        {
          'code': 'desc',
          'name': 'ddei.description',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "ddei.flow.choresubprocess",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },

      ]
    }
  },
  filters: {
    LINE_OBI_FILTER: lineObiCheck
  },
  viewer: BpmnChoreSubProcessViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-chore"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
