import { showSettingButton } from "../util"
import BpmnUserViewer from "../views/bpmn-user-viewer.vue"

export default {
  id: '1000504',
  name: '用户',
  code: 'user',
  desc: 'bpmn中的用户对象',
  from: '100103',
  subject: 'bpmn',
  define: {
    width: 50,
    height: 65,
    bpmnBaseType: 'Other',
    bpmnType:"User",
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': '编码',
          'desc': '编码，一般用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "user",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '名称，一般用于显示',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "用户",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'desc',
          'name': '备注',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "用户节点",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
      ]
    }
  },
  viewer: BpmnUserViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-user-icon"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}

