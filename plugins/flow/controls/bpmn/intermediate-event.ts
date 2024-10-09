import { showSettingButton } from "../util"
import BpmnIntermediateEventViewer from "../views/bpmn-intermediate-event-viewer.vue"

export default {
  'id': '1000002',
  'name': '中间事件',
  'code': 'intermediate',
  'desc': 'bpmn中的IntermediateEvent',
  'from': '1000001',
  subject: 'bpmn',
  
  'define': {
    width: 40,
    height: 40,
    bpmnBaseType: 'Event',
    bpmnSubType: 1,
    bpmnType: 'IntermediateEvent',
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': '编码',
          'desc': '编码，一般用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "intermediate",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '名称，一般用于显示',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "中间事件",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'bpmnSubType',
          'name': '类型',
          'desc': '子类型，用于区分中间节点的不同作用',
          'controlType': 'combox',
          'dataType': 'integer',
          'dataSource': [
            { 'text': '默认', 'value': 1 },
            { 'text': '捕获消息', 'value': 2 }, { 'text': '中断-边界-捕获消息', 'value': 3 }, { 'text': '非中断-边界-捕获消息', 'value': 4 }, { 'text': '投掷消息', 'value': 5 },
            { 'text': '定时器', 'value': 6 }, { 'text': '中断-边界-定时器', 'value': 7 }, { 'text': '非中断-边界-定时器', 'value': 8 }, 
            { 'text': '条件', 'value': 9 }, { 'text': '中断-边界-条件', 'value': 10 }, { 'text': '非中断-边界-条件', 'value': 11 }, 
            { 'text': '捕获信号', 'value': 12 }, { 'text': '中断-边界-捕获信号', 'value': 13 }, { 'text': '非中断-边界-捕获信号', 'value': 14 }, { 'text': '中断-边界-投掷信号', 'value': 15 },
            { 'text': '捕获多次', 'value': 16 }, { 'text': '中断-边界-捕获多次', 'value': 17 }, { 'text': '非中断-边界-捕获多次', 'value': 18 }, { 'text': '投掷多次', 'value': 19 }, 
            { 'text': '捕获并行', 'value': 20 }, { 'text': '中断-边界-捕获并行', 'value': 21 }, { 'text': '非中断-边界-捕获并行', 'value': 22 },
            { 'text': '捕获升级', 'value': 23 }, { 'text': '中断-边界-捕获升级', 'value': 24 }, { 'text': '非中断-边界-捕获升级', 'value': 25 }, { 'text': '投掷升级', 'value': 26 }, 
            { 'text': '错误', 'value': 27 }, { 'text': '边界-捕获补偿', 'value': 28 }, { 'text': '边界-投掷补偿', 'value': 29 }, 
            { 'text': '捕获链接', 'value': 30 }, { 'text': '投掷链接', 'value': 31 }, { 'text': '边界-捕获取消', 'value': 32 } 
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

  viewer: BpmnIntermediateEventViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-intermediate-event-n"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
