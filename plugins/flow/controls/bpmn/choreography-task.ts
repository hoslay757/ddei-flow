import { showSettingButton, lineObiCheck } from "../util"
import BpmnChoreTaskViewer from "../views/bpmn-chore-task-viewer.vue"


export default {
  id: '1000101',
  name: 'ddei.flow.choretask',
  code: 'chor_task',
  desc: 'bpmn中的ChoreographyTask',
  from: '1000011',
  subject: 'bpmn',
  define: {
    bpmnBaseType: 'Activity',
    bpmnType: 'ChoreographyTask',
    width: 120,
    height: 130,
    border:{
      round:5
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
          'defaultValue': "chor_task",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': 'ddei.name',
          'desc': '任务的名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ddei.flow.choretask",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        
        {
          'code': 'desc',
          'name': 'ddei.description',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "ddei.flow.choretask",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },

      ]
    }
  },
  filters: {
    LINE_OBI_FILTER: lineObiCheck
  },
  viewer: BpmnChoreTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-chore"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
