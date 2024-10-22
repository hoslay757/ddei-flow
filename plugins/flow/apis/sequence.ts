import DDeiFlowGraph from "./graph";
import DDeiFlowNode from "./node";

/**
 * DDeiFlowSequence表示图形设计器被解析后的一个连线
 * 一般用于解析或生成的中间文件，相对于xml具有更小的体积和更便捷的遍历结构
 * 一个节点包含其自身的所有属性
 */
class DDeiFlowSequence{
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
   * 条件,默认无条件
   */
  condition: string|null = null;

  /**
   * 是否默认
   */
  default: boolean = false;

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
   * 文本
   */
  text:string;

  /**
   * 直接前置节点
   */
  prevNode: DDeiFlowNode;

  /**
   * 直接后续节点
   */
  nextNode: DDeiFlowNode;

}

export default DDeiFlowSequence;