import BpmnCallActivityTaskViewer from "../views/bpmn-callactivity-task-viewer.vue"
import {  lineObiCheck } from "../util"

export default {
  id: '1000081',
  name: 'ddei.flow.calltask',
  code: 'call',
  desc: 'bpmn中的CallaAtivityTask',
  from: '100002',
  subject: 'bpmn',
  define: {
    bpmnBaseType: 'Activity',
    bpmnType: 'CallActivityTask',
    width: 130,
    height: 80,
    border:{
      round:5
    },
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': 'ddei.code',
          'desc': '用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "call",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': 'ddei.name',
          'desc': '调用',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ddei.flow.calltask",
          'type': [1, 2] //类别，1图形，2业务，3事件
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
          'code': 'borderWidth',
          'name': 'ddei.property.width',
          'desc': '图形的边框的粗细，0为无边框',
          'controlType': 'range',
          'min': 0,
          'max': 10,
          'step': 0.1,
          'mapping': ["border.width"],
          'dataType': 'integer',
          'defaultValue': 5,
        },
        
        {
          'code': 'borderRound',
          'name': 'ddei.property.round',
          'desc': '图形的边框的是否为为圆角的弧度',
          'controlType': 'range',
          'mapping': ["border.round"],
          'min': 0,
          'max': 30,
          'step': 1,
          'defaultValue': 5,
          'dataType': 'integer',
        },
        {
          'code': 'desc',
          'name': 'ddei.description',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "ddei.flow.calltask",
          'type': [1, 2] //类别，1图形，2业务，3事件
        }
      ],
      groups: [
        {
          'name': 'ddei.data',
          icon: 'icon-a-ziyuan409',
          subGroups: [
            {
              'name': 'ddei.basic',
              attrs: ["code", "name", "desc"]
            }
          ]
        },
      ]
    }
  },
  filters: {
    LINE_OBI_FILTER: lineObiCheck
  },
  viewer: BpmnCallActivityTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-call-activity"></use>
      </svg>`
}
