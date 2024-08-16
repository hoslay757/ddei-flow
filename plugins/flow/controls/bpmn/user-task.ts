import BpmnUserTaskViewer from "../views/bpmn-user-task-viewer.vue"


export default {
  id: '1000011',
  name: '用户任务',
  code: 'user_task',
  desc: 'bpmn中的UserTask',
  from: '100002',
  define: {
    width: 110,
    height: 70,
    border:{
      round:5
    }
  },
  viewer: BpmnUserTaskViewer
}
