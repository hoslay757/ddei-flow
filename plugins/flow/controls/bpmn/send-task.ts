import BpmnSendTaskViewer from "../views/bpmn-send-task-viewer.vue"


export default {
  id: '1000041',
  name: '发送任务',
  code: 'send_task',
  desc: 'bpmn中的SendTask',
  from: '100002',
  subject: 'bpmn',
  define: {
    width: 110,
    height: 70,
    border:{
      round:5
    }
  },
  viewer: BpmnSendTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-send-task"></use>
      </svg>`
}
