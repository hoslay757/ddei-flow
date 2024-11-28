import { showSettingButton, lineObiCheck } from "../util"
import BpmnUserViewer from "../views/bpmn-user-viewer.vue"

export default {
  id: '1000504',
  name: 'ddei.flow.user',
  code: 'user',
  desc: 'bpmn中的用户对象',
  from: '100103',
  subject: 'bpmn',
  define: {
    width: 30,
    height: 45,
    bpmnBaseType: 'Other',
    bpmnType:"User",
    name: "ddei.flow.user",
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
          'name': 'ddei.code',
          'desc': '编码，一般用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "user",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': 'ddei.name',
          'desc': '名称，一般用于显示',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ddei.flow.user",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'desc',
          'name': 'ddei.description',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "ddei.flow.user",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
      ]
    }
  },
  viewer: BpmnUserViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-user"></use>
      </svg>`,
  filters: {
    LINE_OBI_FILTER: lineObiCheck
  },
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}

