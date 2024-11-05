export default {
  id: '1000601',
  name: '控制流',
  code: 'seq',
  desc: 'bpmn中的SequenceFlow',
  from: '100401',
  subject: 'bpmn',
  define: {
    type: 2,
    bpmnBaseType: 'Sequence',
    bpmnSubType: 1,
    ep: {
      type: 51
    },
    pvs: [
      { x: -75, y: 0, z: 1 },
      { x: 0, y: 0, z: 1 },
      { x: 75, y: 0, z: 1 },
    ],
    cpv: {
      x: 0, y: 0
    },
    
    //组合控件
    composes: [
      {
        width: 12,
        height: 12,
        id: '100060101',
        cIndex: 1,
        initCPV: {
          x: 0, y: 0, z: 1
        }
      },
    ],
    //操作点
    ovs: [
      {
        //约束，控制点的移动路径和位置
        constraint: {
          type: 5, //不允许移动，固定路径位置，沿路径方向，固定在等比例或者等长度位置（长度不足则按照0.5比例位置）
          pvs: ["pvs[0]","pvs[1]"],//定义路径
          rate:0.15, //固定比例
          // len: 30       //固定长度
        },
        //联动，点移动后控制的其它点
        links: [
          {
            type: 2,//同步中心点
            pvs: ["composes[0]"]
          }
        ]
      }
    ],
    ext: {
      sample: {
        //依附图形的初始化配置，如果产生依附图形，则会在配置的位置生成
        depPos: {
          type: 3  //位置5中心点，6789上右下左
        },
        depProps: {
          "3": "name"   //映射属性
        },
      },
      attrs: [
        {
          'code': 'code',
          'name': '编码',
          'desc': '用于业务标识',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "seq",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'name',
          'name': '名称',
          'desc': '名称',
          'controlType': 'text',
          'dataType': 'string',
          'defaultValue': "顺序流",
          'type': [1, 2] //类别，1图形，2业务，3事件
        },
        {
          'code': 'bpmnSubType',
          'name': '类型',
          'desc': '控件的主体显示文本',
          'controlType': 'combox',
          'dataType': 'integer',
          'dataSource': [
            { 'text': '默认', 'value': 1 }, { 'text': '条件', 'value': 2 }, { 'text': '缺省条件', 'value': 3 }
            , { 'text': '消息', 'value': 4 }, { 'text': '协会', 'value': 5 }
          ],
          'itemStyle': { width: 100, height: 25, col: 2, row: 0 },
          'defaultValue': 1,
          'type': [1, 2], //类别，1图形，2业务，3事件
        },
        {
          'code': 'desc',
          'name': '备注',
          'desc': '备注说明',
          'controlType': 'textarea',
          'dataType': 'string',
          'defaultValue': "流程顺序流节点",
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
  },
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-sequence"></use>
      </svg>`
  
}
