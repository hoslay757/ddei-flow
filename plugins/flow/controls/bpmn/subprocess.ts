import BpmnSubProcessViewer from "../views/bpmn-subprocess-viewer.vue"


export default {
  id: '1000091',
  name: '嵌入子流程',
  code: 'subprocess',
  desc: 'bpmn中的SubProcess',
  from: '100002',
  define: {
    width: 130,
    height: 80,
    border:{
      round:5
    }
  },
  viewer: BpmnSubProcessViewer,
  icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-sub-process-marker"></use>
      </svg>`
}
