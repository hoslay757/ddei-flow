import BpmnEndEventViewer from "../views/bpmn-end-event-viewer.vue"

export default {
  id: '1000003',
  name: '结束事件',
  code: 'end',
  desc: 'bpmn中的EndEvent',
  from: '100103',
  define: {
    width: 40,
    height: 40
  },
  viewer: BpmnEndEventViewer
}
