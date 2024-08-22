import { showSettingButton } from "../util"
import BpmnSendTaskViewer from "../views/bpmn-send-task-viewer.vue"


export default {
  id: '1000041',
  name: '发送任务',
  code: 'send_task',
  desc: 'bpmn中的SendTask',
  from: '1000011',
  subject: 'bpmn',
  define: {
    bpmnBaseType: 'Activity',
    bpmnType: 'SendTask',
    width: 110,
    height: 70,
    border:{
      round:5
    },
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': '编码',
          'desc': '用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "send_task",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '任务的名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "发送任务",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'desc',
          'name': '备注',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "发送任务节点",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },

      ]
    }
  
  },
  viewer: BpmnSendTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-send-task"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
