import { lineObiCheck, showSettingButton } from "../util"
import BpmnSubProcessViewer from "../views/bpmn-subprocess-viewer.vue"


export default {
  id: '1000091',
  name: 'ddei.flow.subprocess',
  code: 'subprocess',
  desc: 'bpmn中的SubProcess',
  from: '1000011',
  subject: 'bpmn',
  define: {
    bpmnBaseType: 'Activity',
    bpmnSubType:1,
    bpmnType: 'SubProcess',
    allowIncludeModel:1,
    width: 300,
    height: 200,
    otherWidth: 110,
    otherHeight: 70,
    isExpand:1,
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
          'defaultValue': "subprocess",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': 'ddei.name',
          'desc': '任务的名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ddei.flow.subprocess",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
      
        {
          'code': 'bpmnSubType',
          'name': 'ddei.type',
          'desc': '控件的主体显示文本',
          'controlType': 'combox',
          'dataType': 'integer',
          'dataSource': [
            { 'text': 'ddei.flow.property.ds.default', 'value': 1 }, { 'text': 'ddei.flow.property.ds.event', 'value': 2 },
            { 'text': 'ddei.flow.property.ds.transaction', 'value': 3 }, { 'text': 'ddei.flow.property.ds.custom', 'value': 4 }
          ],
          'itemStyle': { width: 100, height: 25, col: 2, row: 0 },
          'defaultValue': 1,
          'type': [1, 2], //类别，1图形，2业务，3事件
        },        
        {
          'code': 'desc',
          'name': 'ddei.description',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "ddei.flow.subprocess",
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
      ],
      groups: [
        {
          'name': 'ddei.data',
          icon: 'icon-a-ziyuan409',
          subGroups: [
            {
              'name': 'ddei.basic',
              attrs: ["code", "name", "isLoop", "isTransaction", "multiInstance", "isParallel", "isCompensation", "desc"]
            }
          ]
        },
      ]
    }
  },
  viewer: BpmnSubProcessViewer,
  filters:{
    LINE_OBI_FILTER: lineObiCheck
  },
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-sub-process-marker"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
