export default {
  id: '1000603',
  name: '协会',
  code: 'assoc',
  desc: 'bpmn中的Association',
  from: '1000602',
  subject: 'bpmn',
  define: {
    bpmnBaseType: 'Line',
    ep: {
      type: 0
    },
    sp: {
      type: 0
    },
    dash:[4,4],
    ext: {
      attrs: [
        {
          'code': 'code',
          'name': '编码',
          'desc': '用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "assoc",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "协会",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'sp.type',
          'name': '起点类型',
          'desc': '起点的样式样式',
          'controlType': 'combox',
          'dataSource': [
            { 'text': '无', 'value': -1 },
            { 'text': '箭头', 'value': 1 }
          ],
          'itemStyle': { width: 80, height: 25, col: 2, row: 6 },
          'dataType': 'integer',
          'cascadeDisplay': { "-1": { hidden: ['startWeidht'] }, empty: { hidden: ['startWeidht'] }, notempty: { show: ['startWeidht'] } },
          'defaultValue': -1,
        },
        {
          'code': 'ep.type',
          'name': '终点类型',
          'desc': '终点的样式样式',
          'controlType': 'combox',
          'dataSource': [
            { 'text': '无', 'value': -1 },
            { 'text': '箭头', 'value': 1 }
          ],
          'itemStyle': { width: 80, height: 25, col: 2, row: 6 },
          'dataType': 'integer',
          'cascadeDisplay': { "-1": { hidden: ['startWeidht'] }, empty: { hidden: ['startWeidht'] }, notempty: { show: ['startWeidht'] } },
          'defaultValue': -1,
        },
        {
          'code': 'desc',
          'name': '备注',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "流程协会节点",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },

      ],
      groups: [
        {
          name: "数据",
          icon: 'icon-a-ziyuan409',
          subGroups: [
            {
              name: "基本信息",
              attrs: ["code", "name", "bpmnSubType", "desc"]
            }
          ]
        },
      ]
    }
  }
}
