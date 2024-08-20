import { showExchangeEventTypeButton } from "../util"
import BpmnStartEventViewer from "../views/bpmn-start-event-viewer.vue"

export default {
  'id': '1000001',
  'name': '开始事件',
  'code': 'start',
  'desc': 'bpmn中的StartEvent',
  'from': '100103',
  subject: 'bpmn',
  
  'define': {
    width: 40,
    height: 40,
    bpmnType: 'StartEvent',
    bpmnSubType:1,
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': '编码',
          'desc': '用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "start",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "开始",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'bpmnSubType',
          'name': '文本1',
          'desc': '控件的主体显示文本',
          'controlType': 'combox',
          'dataType': 'integer',
          'dataSource': [
            { 'text': '默认', 'value': 1 }, { 'text': '中断-消息', 'value': 2 }, { 'text': '非中断-消息', 'value': 3 },
            { 'text': '中断-定时器', 'value': 4 }, { 'text': '非中断-定时器', 'value': 5 }, { 'text': '中断-条件', 'value': 6 },
            { 'text': '非中断-条件', 'value': 7 }, { 'text': '中断-信号', 'value': 8 }, { 'text': '非中断-信号', 'value': 9 },
            { 'text': '中断-多次', 'value': 10 }, { 'text': '非中断-多次', 'value': 11 }, { 'text': '中断-并行', 'value': 12 },
            { 'text': '非中断-并行', 'value': 13 }, { 'text': '中断-升级', 'value': 14 }, { 'text': '非中断-升级', 'value': 15 },
            { 'text': '中断-错误', 'value': 16 }, { 'text': '中断-补偿', 'value': 17 }
          ],
          'itemStyle': { width: 100, height: 25, col: 2, row: 0},
          'defaultValue': 1,
          'type': [1, 2], //类别，1图形，2业务，3事件
        },
        {
          'code': 'desc',
          'name': '备注',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "流程开始节点",
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
              attrs: ["code", "name", "bpmnSubType", "desc"]
            }
          ]
        },
      ]
    }
  },

  viewer: BpmnStartEventViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-start-event-none"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showExchangeEventTypeButton
}
