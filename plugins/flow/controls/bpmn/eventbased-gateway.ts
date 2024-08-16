import BpmnEventBasedGatewayViewer from "../views/bpmn-eventbased-gateway-viewer.vue"


export default {
  id: '1000205',
  name: '事件网关',
  code: 'eventbased_gateway',
  desc: 'bpmn中的EventBasedGateway',
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
  viewer: BpmnEventBasedGatewayViewer
}
