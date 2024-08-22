import { showSettingButton } from "../util"
import BpmnServiceTaskViewer from "../views/bpmn-service-task-viewer.vue"


export default {
  id: '1000031',
  name: '服务任务',
  code: 'service_task',
  desc: 'bpmn中的ServiceTask',
  from: '1000011',
  subject: 'bpmn',
  define: {
    bpmnBaseType: 'Activity',
    bpmnType: 'ServiceTask',
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
          'defaultValue': "service_task",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '任务的名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "服务任务",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        
        {
          'code': 'desc',
          'name': '备注',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "服务任务节点",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },

      ]
    }
  },
  viewer: BpmnServiceTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-service-task"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
