import { showSettingButton, lineObiCheck } from "../util"
import BpmnScriptTaskViewer from "../views/bpmn-script-task-viewer.vue"


export default {
  id: '1000021',
  name: 'ddei.flow.scripttask',
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
          'name': 'ddei.code',
          'desc': '用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "script_task",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': 'ddei.name',
          'desc': '任务的名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ddei.flow.scripttask",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'scriptFormat',
          'name': 'ddei.flow.property.language',
          'desc': '脚本采用的语言',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "groovy",
          'type': [2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'script',
          'name': 'ddei.flow.property.script',
          'desc': '脚本内容',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "",
          'type': [2] //类别，1图形，2业务，3事件
        },

        {
          'code': 'desc',
          'name': 'ddei.description',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "ddei.flow.scripttask",
          'type': [2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'border.color',
          'name': 'ddei.color',
          'desc': '图形的边框显示颜色，在高级设置中，可以分别设置不同方向边框的样式',
          'controlType': 'color-combo',
          'dataType': 'string',
          'defaultValue': 'black',
        },

      ]
    }
  },
  filters: {
    LINE_OBI_FILTER: lineObiCheck
  },
  viewer: BpmnScriptTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-script-task"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
