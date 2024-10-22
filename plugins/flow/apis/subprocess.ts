import DDeiFlowNode from "./node";

/**
 * DDeiFlowSubProcess表示图形设计器被解析后的一个子流程
 * 一般用于解析或生成的中间文件，相对于xml具有更小的体积和更便捷的遍历结构
 * 一个流程图包含了自身的所有节点以及连线，流程图该流程的所有节点以及连线，并单独引用了开始、结束、孤立节点，以便于遍历
 */
class DDeiFlowSubProcess extends DDeiFlowNode {

  /**
   * 子流程所有节点
   */
  nodes: Map<string, DDeiFlowNode> = new Map();

  /**
   * 子流程开始节点
   */
  startNodes: DDeiFlowNode[] = [];
  /**
   * 子流程结束节点
   */
  endNodes: DDeiFlowNode[] = [];

  /**
   * 子流程孤立节点
   */
  isolatedNodes: DDeiFlowNode[] = [];
}

export default DDeiFlowSubProcess;