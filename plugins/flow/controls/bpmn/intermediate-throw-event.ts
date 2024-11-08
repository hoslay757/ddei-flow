import { showSettingButton } from "../util"
import BpmnIntermediateThrowEventViewer from "../views/bpmn-intermediate-throw-event-viewer.vue"

export default {
  'id': '1000005',
  'name': 'ddei.flow.intermediatethrowevent',
  'code': 'ithrowevt',
  'desc': 'bpmn中的IntermediateThrowEvent',
  'from': '1000001',
  subject: 'bpmn',
  
  'define': {
    width: 40,
    height: 40,
    bpmnBaseType: 'Event',
    bpmnSubType: 1,
    bpmnType: 'IntermediateThrowEvent',
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': 'ddei.code',
          'desc': '编码，一般用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ithrowevt",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': 'ddei.name',
          'desc': '名称，一般用于显示',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ddei.flow.intermediatethrowevent",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'bpmnSubType',
          'name': 'ddei.type',
          'desc': '子类型，用于区分中间节点的不同作用',
          'controlType': 'combox',
          'dataType': 'integer',
          'dataSource': [
            { 'text': 'ddei.flow.property.ds.default', 'value': 1 },
            { 'text': 'ddei.flow.property.ds.message', 'value': 2 },
            { 'text': 'ddei.flow.property.ds.signal', 'value': 3 },
            { 'text': 'ddei.flow.property.ds.compensation', 'value': 4 },
            { 'text': 'ddei.flow.property.ds.multiple', 'value': 5 },
            { 'text': 'ddei.flow.property.ds.escalation', 'value': 6 },
            { 'text': 'ddei.flow.property.ds.link', 'value': 7 },
            
          ],
          'itemStyle': { width: 130, height: 25, col: 2, row: 0 },
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
          'defaultValue': "ddei.flow.intermediatethrowevent",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
      ]
    }
  },

  viewer: BpmnIntermediateThrowEventViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-intermediate-event-n"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
