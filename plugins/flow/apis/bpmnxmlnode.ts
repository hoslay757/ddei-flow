/**
 * DDeiFlowBpmnXmlNode表示生成xml的一个节点
 * 改节点包含了拼接在各个不同地方的字符串
 */
class DDeiFlowBpmnXmlNode {

  constructor(contentStr: string | null, defineStr: string | null, processStr: string | null, currentProcessStr: string | null){
    this.contentStr = contentStr
    this.defineStr = defineStr
    this.processStr = processStr
    this.currentProcessStr = currentProcessStr
  }

  /**
   * 追加在当前位置
   */
  contentStr: string | null = null

  /**
   * 追加在定义级，与当前流程process节点平级
   */
  defineStr: string | null = null

  /**
   * 追加当前最外层流程
   */
  processStr: string | null = null

  /**
   * 追加当前子流程内部
   */
  currentProcessStr: string | null = null

}

export default DDeiFlowBpmnXmlNode;