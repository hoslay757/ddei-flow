import BpmnParallelGatewayViewer from "../views/bpmn-parallel-gateway-viewer.vue"


export default {
  id: '1000201',
  name: '并行网关',
  code: 'parallel_gateway',
  desc: 'bpmn中的ParallelGateway',
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
  viewer: BpmnParallelGatewayViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-gateway-parallel"></use>
      </svg>`
}
