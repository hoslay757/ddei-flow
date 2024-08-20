import BpmnScriptTaskViewer from "../views/bpmn-script-task-viewer.vue"


export default {
  id: '1000021',
  name: '脚本任务',
  code: 'script_task',
  desc: 'bpmn中的ScriptTask',
  from: '100002',
  subject: 'bpmn',
  define: {
    width: 110,
    height: 70,
    border:{
      round:5
    }
  },
  viewer: BpmnScriptTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-script-task"></use>
      </svg>`
}
