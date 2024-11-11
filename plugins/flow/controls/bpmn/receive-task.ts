import { showSettingButton, lineObiCheck } from "../util"
import BpmnReceiveTaskViewer from "../views/bpmn-receive-task-viewer.vue"


export default {
  id: '1000061',
  name: 'ddei.flow.receivetask',
  code: 'receive_task',
  desc: 'bpmn中的ReceiveTask',
  from: '1000011',
  subject: 'bpmn',
  define: {
    bpmnBaseType: 'Activity',
    bpmnType: 'ReceiveTask',
    width: 110,
    height: 70,
    border:{
      round:5
    },
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': 'ddei.code',
          'desc': '用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "receive_task",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': 'ddei.name',
          'desc': '任务的名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ddei.flow.receivetask",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },

        {
          'code': 'desc',
          'name': 'ddei.description',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "ddei.flow.receivetask",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },

      ]
    }
  },
  filters: {
    LINE_OBI_FILTER: lineObiCheck
  },
  viewer: BpmnReceiveTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-receive-task"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
