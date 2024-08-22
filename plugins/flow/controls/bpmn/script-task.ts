import { showSettingButton } from "../util"
import BpmnScriptTaskViewer from "../views/bpmn-script-task-viewer.vue"


export default {
  id: '1000021',
  name: '脚本任务',
  code: 'script_task',
  desc: 'bpmn中的ScriptTask',
  from: '1000011',
  subject: 'bpmn',
  define: {
    bpmnBaseType: 'Activity',
    bpmnType: 'ScriptTask',
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
          'defaultValue': "script_task",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '任务的名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "脚本任务",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },

        {
          'code': 'desc',
          'name': '备注',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "脚本任务节点",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },

      ]
    }
  },
  viewer: BpmnScriptTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-script-task"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
