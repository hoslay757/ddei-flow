import BpmnInclusiveGatewayViewer from "../views/bpmn-inclusive-gateway-viewer.vue"


export default {
  id: '1000203',
  name: 'ddei.flow.inclusivegateway',
  code: 'inclusive_gateway',
  desc: 'bpmn中的InclusiveGateway',
  from: '100040',
  subject: 'bpmn',
  define: {
    width: 50,
    height: 50,
    bpmnBaseType: 'Gateway',
    bpmnType: 'InclusiveGateway',
    ext:{
      sample: {
        eqrat: true
      },
      attrs: [
        {
          'code': 'border.color',
          'name': 'ddei.color',
          'desc': '图形的边框显示颜色，在高级设置中，可以分别设置不同方向边框的样式',
          'controlType': 'color-combo',
          'dataType': 'string',
          'defaultValue': 'black',
        },
      ]
    }
  },
  viewer: BpmnInclusiveGatewayViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-gateway-or"></use>
      </svg>`
}
