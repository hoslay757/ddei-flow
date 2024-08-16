import BpmnComplexGatewayViewer from "../views/bpmn-complex-gateway-viewer.vue"


export default {
  id: '1000204',
  name: '复杂网关',
  code: 'complex_gateway',
  desc: 'bpmn中的ComplexGateway',
  from: '100040',
  define: {
    width: 50,
    height: 50,
    ext:{
      sample: {
        eqrat: true
      }
    }
  },
  viewer: BpmnComplexGatewayViewer
}
