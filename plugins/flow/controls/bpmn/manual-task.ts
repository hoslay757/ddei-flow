import BpmnManualTaskViewer from "../views/bpmn-manual-task-viewer.vue"


export default {
  id: '1000051',
  name: '手工任务',
  code: 'manual_task',
  desc: 'bpmn中的ManualTask',
  from: '100002',
  define: {
    width: 110,
    height: 70,
    border:{
      round:5
    }
  },
  viewer: BpmnManualTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-manual"></use>
      </svg>`
}
