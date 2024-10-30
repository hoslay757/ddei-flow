import { showSettingButton } from "../util"
import BpmnBoundaryEventViewer from "../views/bpmn-boundary-event-viewer.vue"

export default {
  'id': '1000004',
  'name': '边界事件',
  'code': 'boundaryevent',
  'desc': 'bpmn中的BoundaryEvent',
  'from': '1000001',
  subject: 'bpmn',
  
  'define': {
    width: 40,
    height: 40,
    bpmnBaseType: 'Event',
    bpmnSubType: 1,
    bpmnType: 'BoundaryEvent',
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': '编码',
          'desc': '编码，一般用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "boundaryevent",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '名称，一般用于显示',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "边界事件",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'bpmnSubType',
          'name': '类型',
          'desc': '子类型，用于区分中间节点的不同作用',
          'controlType': 'combox',
          'dataType': 'integer',
          'dataSource': [
            { 'text': '消息', 'value': 1 }, 
            { 'text': '定时器', 'value': 2 }, 
            { 'text': '信号', 'value': 3 },
            { 'text': '错误', 'value': 4 }, 
            { 'text': '补偿', 'value': 5 },
            { 'text': '取消', 'value': 6 } 
          ],
          'itemStyle': { width: 130, height: 25, col: 2, row: 0 },
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
          'defaultValue': "流程中间事件",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
      ]
    }
  },

  viewer: BpmnBoundaryEventViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-boundary-event-message"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
