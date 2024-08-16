import BpmnReceiveTaskViewer from "../views/bpmn-receive-task-viewer.vue"


export default {
  id: '1000061',
  name: '接收任务',
  code: 'receive_task',
  desc: 'bpmn中的ReceiveTask',
  from: '100002',
  define: {
    width: 110,
    height: 70,
    border:{
      round:5
    }
  },
  viewer: BpmnReceiveTaskViewer
}
