import { showSettingButton, lineObiCheck } from "../util"
import BpmnMessageViewer from "../views/bpmn-message-viewer.vue"

export default {
  id: '1000505',
  name: 'ddei.flow.message',
  code: 'msg',
  desc: 'bpmn中的消息',
  from: '100103',
  subject: 'bpmn',
  define: {
    width: 32,
    height: 24,
    bpmnBaseType: 'Other',
    bpmnType:"Message",
    bpmnSubType:1,
    name:'ddei.flow.message',
    ext: {
      sample: {
        //依附图形的初始化配置，如果产生依附图形，则会在配置的位置生成
        depPos: {
          type: 8  //位置5中心点，6789上右下左
        },
        depProps: {
          "8": "name"   //映射属性
        },
      },
      attrs: [
        {
          'code': 'code',
          'name': 'ddei.code',
          'desc': '编码，一般用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "msg",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': 'ddei.name',
          'desc': '名称，一般用于显示',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ddei.flow.message",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'bpmnSubType',
          'name': 'ddei.type',
          'desc': '',
          'controlType': 'combox',
          'dataType': 'integer',
          'dataSource': [
            { 'text': 'ddei.flow.property.ds.default', 'value': 1 }, { 'text': 'ddei.flow.property.ds.noninit', 'value': 2 }
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
          'defaultValue': "ddei.flow.message",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
      ]
    }
  },
  viewer: BpmnMessageViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-receive"></use>
      </svg>`,
  filters: {
    LINE_OBI_FILTER: lineObiCheck
  },
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}

