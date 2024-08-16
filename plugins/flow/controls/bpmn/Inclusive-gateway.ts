import BpmnInclusiveGatewayViewer from "../views/bpmn-inclusive-gateway-viewer.vue"


export default {
  id: '1000203',
  name: '包容网关',
  code: 'inclusive_gateway',
  desc: 'bpmn中的InclusiveGateway',
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
  viewer: BpmnInclusiveGatewayViewer
}
