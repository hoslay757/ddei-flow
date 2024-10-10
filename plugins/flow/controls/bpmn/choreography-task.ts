import { showSettingButton } from "../util"
import BpmnChoreTaskViewer from "../views/bpmn-chore-task-viewer.vue"


export default {
  id: '1000101',
  name: '编排任务',
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
    topUsers: [{
      name: "参与者A"
    }],
    bottomUsers: [{
      name: "参与者B"
    }],
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': '编码',
          'desc': '用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "chor_task",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '任务的名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "编排任务",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        
        {
          'code': 'desc',
          'name': '备注',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "编排任务节点",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },

      ]
    }
  },
  viewer: BpmnChoreTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-chore"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
