import { getIncludeModels, showSettingButton } from "../util"
import BpmnGroupViewer from "../views/bpmn-group-viewer.vue"


export default {
  id: '1000401',
  name: '分组',
  code: 'group',
  desc: 'bpmn中的Group',
  from: '1000011',
  subject: 'bpmn',
  define: {
    bpmnBaseType: 'Group',
    bpmnType: 'Group',
    width: 400,
    height: 320,
    otherWidth:110,
    otherHeight:70,
    isExpand:1,
    border: {
      round: 10
    },
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': '编码',
          'desc': '用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "group",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '标题',
          'desc': '分组标题',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "分组1",
          'type': [1, 2] //类别，1图形，2业务，3事件
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
              attrs: ["code", "name", "desc"]
            }
          ]
        },
      ]
    }
  },
  viewer: BpmnGroupViewer,
  filters: {
    LINE_OBI_FILTER: (model, param) => {
      let line = param.line
      let distLinks = line.stage.getDistModelLinks(line.id);
      let includeModels = getIncludeModels(model)
      //如果线的开始点和结束点之一是本subprocess，则作为障碍物
      for (let i = 0; i < distLinks.length; i++) {
        if (!distLinks[i].disabled) {
          if (distLinks[i].sm == model) {
            return true;
          }
          //如果线的开始和结束节点之一是subprocess的子元素，则本subprocess不作为寻路障碍物
          else if (includeModels.indexOf(distLinks[i].sm) != -1) {
            return false
          }
        }
      }


      return true
    }
  },
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-lane"></use>
      </svg>`,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}
