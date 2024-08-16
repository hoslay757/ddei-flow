import BpmnSubProcessViewer from "../views/bpmn-subprocess-viewer.vue"


export default {
  id: '1000091',
  name: '嵌入子流程',
  code: 'subprocess',
  desc: 'bpmn中的SubProcess',
  from: '100002',
  define: {
    width: 130,
    height: 80,
    border:{
      round:5
    }
  },
  viewer: BpmnSubProcessViewer
}
