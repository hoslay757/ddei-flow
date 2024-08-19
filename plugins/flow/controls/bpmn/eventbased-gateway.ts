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
  viewer: BpmnEventBasedGatewayViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-gateway-eventbased"></use>
      </svg>`
}
