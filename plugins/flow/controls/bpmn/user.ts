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
    width: 30,
    height: 45,
    bpmnBaseType: 'Other',
    bpmnType:"User",
    
    ext: {
      sample:{
        //依附图形的初始化配置，如果产生依附图形，则会在配置的位置生成
        depPos: {
          type: 8  //位置5中心点，6789上右下左
        },
        depProps: {
          "8": "name"   //映射属性
        },
      },
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
        <use xlink:href="#icon-ddei-flow-user"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}

