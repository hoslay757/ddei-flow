import BpmnEndEventViewer from "../views/bpmn-end-event-viewer.vue"

export default {
  id: '1000003',
  name: '结束事件',
  code: 'end',
  desc: 'bpmn中的EndEvent',
  from: '100103',
  define: {
    width: 40,
    height: 40
  },
  viewer: BpmnEndEventViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-end-event-none"></use>
      </svg>`
}
