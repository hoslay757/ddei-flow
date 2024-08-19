import BpmnStartEventViewer from "../views/bpmn-start-event-viewer.vue"

export default {
  'id': '1000001',
  'name': '开始事件',
  'code': 'start',
  'desc': 'bpmn中的StartEvent',
  'from': '100103',

  'define': {
    width: 40,
    height: 40,
  },

  viewer: BpmnStartEventViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-start-event-none"></use>
      </svg>`
}
