export default {
  id: '1000602',
  name: '消息流',
  code: 'msgflow',
  desc: 'bpmn中的MessageFlow',
  from: '100401',
  subject: 'bpmn',
  define: {
    bpmnBaseType: 'Line',
    type: 2,
    ep: {
      type: 5
    },
    sp: {
      type: 2
    },
    dash:[10,5],
    pvs: [
      { x: -75, y: 0, z: 1 },
      { x: 0, y: 0, z: 1 },
      { x: 75, y: 0, z: 1 },
    ],
    cpv: {
      x: 0, y: 0
    }

  }
}
