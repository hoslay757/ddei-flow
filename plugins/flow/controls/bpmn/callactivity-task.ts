import BpmnCallActivityTaskViewer from "../views/bpmn-callactivity-task-viewer.vue"


export default {
  id: '1000081',
  name: '调用活动',
  code: 'callactivity_task',
  desc: 'bpmn中的CallaAtivityTask',
  from: '100002',
  define: {
    width: 130,
    height: 80,
    border:{
      round:5
    }
  },
  viewer: BpmnCallActivityTaskViewer
}
