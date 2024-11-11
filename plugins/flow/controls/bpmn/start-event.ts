import { showSettingButton, lineObiCheck } from "../util"
import BpmnStartEventViewer from "../views/bpmn-start-event-viewer.vue"

export default {
  'id': '1000001',
  'name': 'ddei.flow.startevent',
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
          'name': 'ddei.code',
          'desc': '用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "start",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': 'ddei.name',
          'desc': '名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ddei.flow.startevent",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'bpmnSubType',
          'name': 'ddei.type',
          'desc': '控件的主体显示文本',
          'controlType': 'combox',
          'dataType': 'integer',
          'dataSource': [
            { 'text': 'ddei.flow.property.ds.default', 'value': 1 }, { 'text': 'ddei.flow.property.ds.message', 'value': 2 },
            { 'text': 'ddei.flow.property.ds.timer', 'value': 3 }, { 'text': 'ddei.flow.property.ds.condition', 'value': 4 },
            { 'text': 'ddei.flow.property.ds.signal', 'value': 5 }, { 'text': 'ddei.flow.property.ds.multiple', 'value': 6 },
            { 'text': 'ddei.flow.property.ds.parallel', 'value': 7 }, { 'text': 'ddei.flow.property.ds.escalation', 'value': 8 },
            { 'text': 'ddei.flow.property.ds.error', 'value': 9 }, { 'text': 'ddei.flow.property.ds.compensation', 'value': 10 }
          ],
          'itemStyle': { width: 100, height: 25, col: 2, row: 0},
          'defaultValue': 1,
          'type': [1, 2], //类别，1图形，2业务，3事件
        },
        {
          'code': 'notInterrupting',
          'text': 'ddei.flow.property.notInterrupting',
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
          'name': 'ddei.color',
          'desc': '图形的边框显示颜色，在高级设置中，可以分别设置不同方向边框的样式',
          'controlType': 'color-combo',
          'dataType': 'string',
          'defaultValue': 'black',
        },
        {
          'code': 'desc',
          'name': 'ddei.description',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "ddei.flow.startevent",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        
      ],
      groups: [
        {
          'name': 'ddei.data',
          icon: 'icon-a-ziyuan409',
          subGroups: [
            {
              'name': 'ddei.basic',
              attrs: ["code", "name", "bpmnSubType", "desc"]
            }
          ]
        },
      ]
    }
  },
  filters: {
    LINE_OBI_FILTER: lineObiCheck
  },
  viewer: BpmnStartEventViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-start-event-none"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
