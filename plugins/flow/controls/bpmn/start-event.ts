import { showSettingButton } from "../util"
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
    bpmnBaseType: 'Event',
    bpmnType: 'StartEvent',
    bpmnSubType: 1,
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
          'name': '类型',
          'desc': '控件的主体显示文本',
          'controlType': 'combox',
          'dataType': 'integer',
          'dataSource': [
            { 'text': '默认', 'value': 1 }, { 'text': '消息', 'value': 2 },
            { 'text': '定时器', 'value': 3 }, { 'text': '条件', 'value': 4 },
            { 'text': '信号', 'value': 5 }, { 'text': '多次', 'value': 6 },
            { 'text': '并行', 'value': 7 }, { 'text': '升级', 'value': 8 },
            { 'text': '错误', 'value': 9 }, { 'text': '补偿', 'value': 10 }
          ],
          'itemStyle': { width: 100, height: 25, col: 2, row: 0},
          'defaultValue': 1,
          'type': [1, 2], //类别，1图形，2业务，3事件
        },
        {
          'code': 'notInterrupting',
          'name': '非中断',
          'desc': '非中断将不会终止运行，默认中断',
          'controlType': 'switch-checkbox',
          'dataType': 'integer',
          'display': 'column',
          'hiddenTitle': true,
          'defaultValue': 0,
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
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
