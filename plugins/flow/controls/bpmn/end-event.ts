import { showSettingButton } from "../util"
import BpmnEndEventViewer from "../views/bpmn-end-event-viewer.vue"

export default {
  id: '1000003',
  name: '结束事件',
  code: 'end',
  desc: 'bpmn中的EndEvent',
  from: '1000001',
  subject: 'bpmn',
  define: {
    width: 40,
    height: 40,
    bpmnBaseType: 'Event',
    bpmnType:"EndEvent",
    bpmnSubType: 1,
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': '编码',
          'desc': '编码，一般用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "end",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '名称，一般用于显示',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "结束",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'bpmnSubType',
          'name': '类型',
          'desc': '控件的主体显示文本',
          'controlType': 'combox',
          'dataType': 'integer',
          'dataSource': [
            { 'text': '默认', 'value': 1 }, { 'text': '消息', 'value': 2 }, { 'text': '信号', 'value': 3 },
            { 'text': '多次', 'value': 4 }, { 'text': '升级', 'value': 5 }, { 'text': '错误', 'value': 6 },
            { 'text': '补偿', 'value': 7 }, { 'text': '取消', 'value': 8 }, { 'text': '终止', 'value': 9 }
          ],
          'itemStyle': { width: 80, height: 25, col: 2, row: 0 },
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
          'defaultValue': "流程结束节点",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
      ]
    }
  },
  viewer: BpmnEndEventViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-end-event-none"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
