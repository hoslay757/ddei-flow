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
  viewer: BpmnInclusiveGatewayViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-gateway-or"></use>
      </svg>`
}
