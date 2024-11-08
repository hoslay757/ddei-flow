import { showSettingButton } from "../util"
import BpmnEndEventViewer from "../views/bpmn-end-event-viewer.vue"

export default {
  id: '1000003',
  name: 'ddei.flow.endevent',
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
          'name': 'ddei.code',
          'desc': '编码，一般用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "end",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': 'ddei.name',
          'desc': '名称，一般用于显示',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ddei.flow.endevent",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'bpmnSubType',
          'name': 'ddei.type',
          'desc': '控件的主体显示文本',
          'controlType': 'combox',
          'dataType': 'integer',
          'dataSource': [
            { 'text': 'ddei.flow.property.ds.default', 'value': 1 }, { 'text': 'ddei.flow.property.ds.message', 'value': 2 }, { 'text': 'ddei.flow.property.ds.signal', 'value': 3 },
            { 'text': 'ddei.flow.property.ds.multiple', 'value': 4 }, { 'text': 'ddei.flow.property.ds.escalation', 'value': 5 }, { 'text': 'ddei.flow.property.ds.error', 'value': 6 },
            { 'text': 'ddei.flow.property.ds.compensation', 'value': 7 }, { 'text': 'ddei.flow.property.ds.cancel', 'value': 8 }, { 'text': 'ddei.flow.property.ds.stop', 'value': 9 }
          ],
          'itemStyle': { width: 80, height: 25, col: 2, row: 0 },
          'defaultValue': 1,
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
          'defaultValue': "ddei.flow.endevent",
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
