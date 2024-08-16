import BpmnScriptTaskViewer from "../views/bpmn-script-task-viewer.vue"


export default {
  id: '1000021',
  name: '脚本任务',
  code: 'script_task',
  desc: 'bpmn中的ScriptTask',
  from: '100002',
  define: {
    width: 110,
    height: 70,
    border:{
      round:5
    }
  },
  viewer: BpmnScriptTaskViewer
}
