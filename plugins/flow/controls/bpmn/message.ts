import { showSettingButton } from "../util"
import BpmnMessageViewer from "../views/bpmn-message-viewer.vue"

export default {
  id: '1000505',
  name: '消息',
  code: 'msg',
  desc: 'bpmn中的消息',
  from: '100103',
  subject: 'bpmn',
  define: {
    width: 32,
    height: 24,
    bpmnBaseType: 'Other',
    bpmnType:"Message",
    bpmnSubType:1,
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': '编码',
          'desc': '编码，一般用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "msg",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '名称，一般用于显示',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "消息",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'bpmnSubType',
          'name': '类型',
          'desc': '',
          'controlType': 'combox',
          'dataType': 'integer',
          'dataSource': [
            { 'text': '默认', 'value': 1 }, { 'text': '未初始化', 'value': 2 }
          ],
          'itemStyle': { width: 100, height: 25, col: 2, row: 0 },
          'defaultValue': 1,
          'type': [1, 2], //类别，1图形，2业务，3事件
        },
        {
          'code': 'desc',
          'name': '备注',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "消息节点",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
      ]
    }
  },
  viewer: BpmnMessageViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-receive"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}

