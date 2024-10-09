import BpmnCallActivityTaskViewer from "../views/bpmn-callactivity-task-viewer.vue"


export default {
  id: '1000081',
  name: '调用活动',
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
          'name': '编码',
          'desc': '用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "call",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '标题',
          'desc': '调用活动',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "调用",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'border.color',
          'name': '颜色',
          'desc': '图形的边框显示颜色，在高级设置中，可以分别设置不同方向边框的样式',
          'controlType': 'color-combo',
          'dataType': 'string',
          'defaultValue': 'black',
        },
        {
          'code': 'borderWidth',
          'name': '粗细',
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
          'name': '圆角',
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
          'name': '备注',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "调用活动节点",
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
  viewer: BpmnCallActivityTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-call-activity"></use>
      </svg>`
}
