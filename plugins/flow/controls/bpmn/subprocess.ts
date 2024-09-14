import { showSettingButton } from "../util"
import BpmnSubProcessViewer from "../views/bpmn-subprocess-viewer.vue"


export default {
  id: '1000091',
  name: '嵌入子流程',
  code: 'subprocess',
  desc: 'bpmn中的SubProcess',
  from: '1000011',
  subject: 'bpmn',
  define: {
    bpmnBaseType: 'Activity',
    bpmnType: 'SubProcess',
    width: 110,
    height: 70,
    border:{
      round:5
    },
    ext: {
      attrs: [
       
        {
          'code': 'code',
          'name': '编码',
          'desc': '用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "subprocess",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '任务的名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "子流程",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        
        {
          'code': 'isAdHoc',
          'name': '自定义',
          'desc': '是否为自定义流程',
          'controlType': 'switch-checkbox',
          'dataType': 'integer',
          'display': 'column',
          'hiddenTitle': true,
          'defaultValue': 0,
          'type': [1, 2], //类别，1图形，2业务，3事件
        },
        
        {
          'code': 'desc',
          'name': '备注',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "子流程节点",
          'type': [1, 2] //类别，1图形，2业务，3事件
        }
      ],
      groups: [
        {
          name: "数据",
          icon: 'icon-a-ziyuan409',
          subGroups: [
            {
              name: "基本信息",
              attrs: ["code", "name", "isLoop", "multiInstance", "isParallel", "isCompensation", "isAdHoc", "desc"]
            }
          ]
        },
      ]
    }
  },
  viewer: BpmnSubProcessViewer,
  filters:{
    LINE_OBI_FILTER: (model, param) => {
      let line = param.line
      //如果线的开始和结束节点之一是subprocess的子元素，则本subprocess不作为寻路障碍物
      return false
    }
  },
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-sub-process-marker"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
