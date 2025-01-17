import { showSettingButton } from "../util"
import BpmnSequenceFlowIconViewer from "../views/bpmn-sequence-flow-icon-viewer.vue"

export default {
  id: '100060101',
  name: '控制流图标',
  code: 'seqicon',
  desc: 'bpmn中控制流的子图标',
  from: '100103',
  subject: 'bpmn',
  define: {
    width: 12,
    height: 12,
    bpmnBaseType: 'Other',
    bpmnType: "ICON",
  },
  viewer: BpmnSequenceFlowIconViewer,
  EVENT_MOUSE_MOVE_IN_CONTROL: showSettingButton
}

