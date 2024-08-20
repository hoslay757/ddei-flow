import BpmnComplexGatewayViewer from "../views/bpmn-complex-gateway-viewer.vue"


export default {
  id: '1000204',
  name: '复杂网关',
  code: 'complex_gateway',
  desc: 'bpmn中的ComplexGateway',
  from: '100040',
  subject: 'bpmn',
  define: {
    width: 50,
    height: 50,
    ext:{
      sample: {
        eqrat: true
      }
    }
  },
  viewer: BpmnComplexGatewayViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-gateway-complex"></use>
      </svg>`
}
