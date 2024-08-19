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
  viewer: BpmnUserTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-user"></use>
      </svg>`
}
