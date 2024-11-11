import { showSettingButton, lineObiCheck } from "../util"
import BpmnUserTaskViewer from "../views/bpmn-user-task-viewer.vue"


export default {
  id: '1000011',
  name: 'ddei.flow.usertask',
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
          'name': 'ddei.code',
          'desc': '用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "user_task",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': 'ddei.name',
          'desc': '任务的名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ddei.flow.usertask",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'humanPerformer',
          'name': 'ddei.flow.property.humanperformer',
          'desc': '任务的执行人',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ddei.flow.property.humanperformer",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'potentialOwner',
          'name': 'ddei.flow.property.potentialowner',
          'desc': '任务的候选人',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ddei.flow.property.potentialowner",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'isLoop',
          'name': 'dde.flow.loop',
          'desc': 'dde.flow.loop',
          'controlType': 'switch-checkbox',
          'dataType': 'integer',
          'hiddenTitle': true,
          'display': 'column',
          'defaultValue': 0,
          'type': [1, 2], //类别，1图形，2业务，3事件
        },
        {
          'code': 'multiInstance',
          'name': 'ddei.flow.multiins',
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
          'name': 'ddei.flow.parallel',
          'desc': '多个执行人是否并行执行',
          'controlType': 'switch-checkbox',
          'dataType': 'integer',
          'display': 'column',
          'hiddenTitle': true,
          'defaultValue': 0,
          'type': [1, 2], //类别，1图形，2业务，3事件
        },
        {
          'code': 'isCompensation',
          'name': 'ddei.flow.compensation',
          'desc': '是否为补偿',
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
          'defaultValue': "ddei.flow.usertask",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },

      ],
      groups: [
        {
          'name': 'ddei.data',
          icon: 'icon-a-ziyuan409',
          subGroups: [
            {
              'name': 'ddei.basic',
              attrs: ["code", "name", "isLoop", "multiInstance", "isParallel","isCompensation", "desc"]
            }
          ]
        },
      ]
    }
  },
  filters: {
    LINE_OBI_FILTER: lineObiCheck
  },
  viewer: BpmnUserTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-user-task"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
