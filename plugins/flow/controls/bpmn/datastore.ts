import { showSettingButton } from "../util"

export default {
  id: '1000506',
  name: '数据存储',
  code: 'ds',
  desc: 'bpmn中的消息',
  from: '103010',
  subject: 'bpmn',
  define: {
    width: 50,
    height: 30,
    bpmnBaseType: 'Other',
    bpmnType:"DataStore",
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': '编码',
          'desc': '编码，一般用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "ds",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '名称，一般用于显示',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "数据存储",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'isUnlimited',
          'name': '无限容量',
          'desc': '是否无限容量',
          'controlType': 'switch-checkbox',
          'dataType': 'integer',
          'display': 'column',
          'hiddenTitle': true,
          'defaultValue': 0,
          'type': [2], //类别，1图形，2业务，3事件
        },
        {
          'code': 'capacity',
          'name': '容量',
          'desc': '数据存储的大小',
          'controlType': 'text',
          'dataType': 'integer',
          'defaultValue': 1,
          'type': [2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'desc',
          'name': '备注',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "消息节点",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
      ]
    }
  },
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}

