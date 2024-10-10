import { lineObiCheck, showSettingButton } from "../util"
import BpmnGroupViewer from "../views/bpmn-group-viewer.vue"


export default {
  id: '1000401',
  name: '分组',
  code: 'group',
  desc: 'bpmn中的Group',
  from: '1000011',
  subject: 'bpmn',
  define: {
    bpmnBaseType: 'Group',
    bpmnType: 'Group',
    allowIncludeModel: 1,
    width: 400,
    height: 320,
    otherWidth:110,
    otherHeight:70,
    isExpand:1,
    border: {
      round: 10
    },
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': '编码',
          'desc': '用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "group",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '标题',
          'desc': '分组标题',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "分组1",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'border.color',
          'name': '颜色',
          'desc': '图形的边框显示颜色，在高级设置中，可以分别设置不同方向边框的样式',
          'controlType': 'color-combo',
          'dataType': 'string',
          'defaultValue': 'black',
        },
        {
          'code': 'desc',
          'name': '备注',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "子流程节点",
          'type': [1, 2] //类别，1图形，2业务，3事件
        }
      ],
      groups: [
        {
          name: "数据",
          icon: 'icon-a-ziyuan409',
          subGroups: [
            {
              name: "基本信息",
              attrs: ["code", "name", "desc"]
            }
          ]
        },
      ]
    }
  },
  viewer: BpmnGroupViewer,
  filters: {
    LINE_OBI_FILTER: lineObiCheck
  },
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-group"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
