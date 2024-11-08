import { showSettingButton } from "../util"

export default {
  id: '1000506',
  name: 'ddei.flow.datastore',
  code: 'ds',
  desc: 'bpmn中的数据存储',
  from: '103010',
  subject: 'bpmn',
  define: {
    width: 50,
    height: 30,
    bpmnBaseType: 'Other',
    bpmnType:"DataStore",
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
          'defaultValue': "ds",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': 'ddei.name',
          'desc': '名称，一般用于显示',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "数据存储",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'isUnlimited',
          'name': 'ddei.flow.unlimited',
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
          'name': 'ddei.flow.property.capacity',
          'desc': '数据存储的大小',
          'controlType': 'text',
          'dataType': 'integer',
          'defaultValue': 1,
          'type': [2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'desc',
          'name': 'ddei.description',
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

