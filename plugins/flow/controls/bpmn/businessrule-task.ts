import BpmnBusinessRuleTaskViewer from "../views/bpmn-businessrule-task-viewer.vue"


export default {
  id: '1000071',
  name: '业务规则',
  code: 'businessrule_task',
  desc: 'bpmn中的BusinessRuleTask',
  from: '100002',
  define: {
    width: 130,
    height: 80,
    border:{
      round:5
    }
  },
  viewer: BpmnBusinessRuleTaskViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-business-rule"></use>
      </svg>`
}
