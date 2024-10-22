import DDeiFlowGraph from "./graph";
import DDeiSubProcess from "./subprocess"

/**
 * DDeiFlowNode表示图形设计器被解析后的一个节点
 * 一般用于解析或生成的中间文件，相对于xml具有更小的体积和更便捷的遍历结构
 * 一个节点包含其自身的所有属性
 */
class DDeiFlowNode {

  constructor(props) {
    for (let i in props) {
      this[i] = props[i]
    }
  }

  /**
   * 所属图形
   */
  graph: DDeiFlowGraph;

  /**
   * id
   */
  id: string;

  /**
   * code
   */
  code: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 备注
   */
  desc: string;

  /**
   * 直接前置节点
   */
  prevNodes: DDeiFlowNode[] = [];

  /**
   * 直接后续节点
   */
  nextNodes: DDeiFlowNode[] = [];

  /**
   * 所有层级子流程，按照最外层到最里层的顺序排序
   */
  subProcesses: DDeiSubProcess[];

}

export default DDeiFlowNode;