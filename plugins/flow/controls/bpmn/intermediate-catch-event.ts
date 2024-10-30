import { showSettingButton } from "../util"
import BpmnIntermediateCatchEventViewer from "../views/bpmn-intermediate-catch-event-viewer.vue"

export default {
  'id': '1000002',
  'name': '中间捕获',
  'code': 'icatchevt',
  'desc': 'bpmn中的IntermediateCatchEvent',
  'from': '1000001',
  subject: 'bpmn',
  
  'define': {
    width: 40,
    height: 40,
    bpmnBaseType: 'Event',
    bpmnSubType: 1,
    bpmnType: 'IntermediateCatchEvent',
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': '编码',
          'desc': '编码，一般用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "icatchevt",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '名称，一般用于显示',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "中间捕获事件",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'bpmnSubType',
          'name': '类型',
          'desc': '子类型，用于区分中间节点的不同作用',
          'controlType': 'combox',
          'dataType': 'integer',
          'dataSource': [
            { 'text': '定时器', 'value': 1 },
            { 'text': '消息', 'value': 2 },
            { 'text': '信号', 'value': 3 },
            { 'text': '链接', 'value': 4 },
            { 'text': '并行', 'value': 5 },
            { 'text': '多次', 'value': 6 },
          ],
          'itemStyle': { width: 130, height: 25, col: 2, row: 0 },
          'defaultValue': 1,
          'type': [1, 2], //类别，1图形，2业务，3事件
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
          'defaultValue': "流程中间事件",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
      ]
    }
  },

  viewer: BpmnIntermediateCatchEventViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-boundary-event-time"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
