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
  viewer: BpmnParallelGatewayViewer
}
