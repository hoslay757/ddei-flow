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
  viewer: BpmnExclusiveGatewayViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-gateway-xor"></use>
      </svg>`
}
