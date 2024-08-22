import { showSettingButton } from "../util"
import BpmnUserTaskViewer from "../views/bpmn-user-task-viewer.vue"


export default {
  id: '1000011',
  name: '用户任务',
  code: 'user_task',
  desc: 'bpmn中的UserTask',
  from: '100002',
  subject: 'bpmn',
  define: {
    bpmnBaseType: 'Activity',
    bpmnType: 'UserTask',
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
          'defaultValue': "user_task",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '任务的名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "用户任务",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'isLoop',
          'name': '循环',
          'desc': '循环',
          'controlType': 'switch-checkbox',
          'dataType': 'integer',
          'hiddenTitle': true,
          'display': 'column',
          'defaultValue': 0,
          'type': [1, 2], //类别，1图形，2业务，3事件
        },
        {
          'code': 'multiInstance',
          'name': '多实例',
          'desc': '执行人是多个实例',
          'controlType': 'switch-checkbox',
          'dataType': 'integer',
          'defaultValue': 0,
          'hiddenTitle':true,
          'display': 'column',
          'type': [1, 2], //类别，1图形，2业务，3事件
          'cascadeDisplay': { 0: { hidden: ['isParallel'] }, 1: { show: ['isParallel'] }, default: { hidden: ['isParallel'] }, empty: { hidden: ['isParallel'] } }
        },
        {
          'code': 'isParallel',
          'name': '并行',
          'desc': '多个执行人是否并行执行',
          'controlType': 'switch-checkbox',
          'dataType': 'integer',
          'display': 'column',
          'hiddenTitle': true,
          'defaultValue': 0,
          'type': [1, 2], //类别，1图形，2业务，3事件
        },
        {
          'code': 'desc',
          'name': '备注',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "用户任务节点",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },

      ],
      groups: [
        {
          name: "数据",
          icon: 'icon-a-ziyuan409',
          subGroups: [
            {
              name: "基本信息",
              attrs: ["code", "name", "isLoop", "multiInstance", "isParallel", "desc"]
            }
          ]
        },
      ]
    }
  },
  viewer: BpmnUserTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-user-task"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
