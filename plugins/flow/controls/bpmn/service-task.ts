import BpmnServiceTaskViewer from "../views/bpmn-service-task-viewer.vue"


export default {
  id: '1000031',
  name: '服务任务',
  code: 'service_task',
  desc: 'bpmn中的ServiceTask',
  from: '100002',
  define: {
    width: 110,
    height: 70,
    border:{
      round:5
    }
  },
  viewer: BpmnServiceTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-send"></use>
      </svg>`
}
