import BpmnExclusiveGatewayViewer from "../views/bpmn-exclusive-gateway-viewer.vue"


export default {
  id: '1000202',
  name: '排他网关',
  code: 'exclusive_gateway',
  desc: 'bpmn中的ExclusiveGateway',
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
  viewer: BpmnExclusiveGatewayViewer
}
