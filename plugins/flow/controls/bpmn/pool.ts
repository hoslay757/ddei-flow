import BpmnPoolViewer from "../views/bpmn-pool-viewer.vue"


export default {
  id: '1000101',
  name: 'Pool',
  code: 'pool',
  desc: 'bpmn中的Pool',
  from: '100002',
  define: {
    width: 130,
    height: 80,
    border:{
      round:5
    }
  },
  viewer: BpmnPoolViewer
}
