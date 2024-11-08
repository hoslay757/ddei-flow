import { showSettingButton } from "../util"
import BpmnBusinessRuleTaskViewer from "../views/bpmn-businessrule-task-viewer.vue"


export default {
  id: '1000071',
  name: 'ddei.flow.busitask',
  code: 'busisrule_task',
  desc: 'bpmn中的BusinessRuleTask',
  from: '1000011',
  subject: 'bpmn',
  define: {
    bpmnBaseType: 'Activity',
    bpmnType: 'BusinessTask',
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
          'defaultValue': "busirule_task",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': 'ddei.name',
          'desc': '任务的名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ddei.flow.busitask",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },

        {
          'code': 'desc',
          'name': 'ddei.description',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "ddei.flow.busitask",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },

      ]
    }
  },
  viewer: BpmnBusinessRuleTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-business-rule-task"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
