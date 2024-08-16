import BpmnIntermediateEventViewer from "../views/bpmn-intermediate-event-viewer.vue"

export default {
  'id': '1000002',
  'name': '中间事件',
  'code': 'intermediate',
  'desc': 'bpmn中的IntermediateEvent',
  'from': '100103',

  'define': {
    width: 40,
    height: 40,
  },

  viewer: BpmnIntermediateEventViewer
}
