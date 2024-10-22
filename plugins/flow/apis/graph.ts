import DDeiFlowFile from "./file";
import DDeiFlowGroup from "./group";
import DDeiFlowNode from "./node";

/**
 * DDeiFlowGraph表示图形设计器被解析后的一个图形
 * 一般用于解析或生成的中间文件，相对于xml具有更小的体积和更便捷的遍历结构
 * 一个流程图包含了自身的所有节点以及连线，流程图该流程的所有节点以及连线，并单独引用了开始、结束、孤立节点，以便于遍历
 */
class DDeiFlowGraph {

  constructor(props){
    for(let i in props){
      this[i] = props[i]
    }
  }

  /**
   * 所属文件
   */
  file:DDeiFlowFile;

  /**
   * id
   */
  id: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 所有节点
   */
  nodes: Map<string, DDeiFlowNode> = new Map();

  /**
   * 所有分组
   */
  groups: DDeiFlowGroup[];

  /**
   * 开始节点
   */
  startNodes: DDeiFlowNode[] = [];
  /**
   * 结束节点
   */
  endNodes: DDeiFlowNode[] = [];

  /**
   * 孤立节点
   */
  isolatedNodes: DDeiFlowNode[] = [];
}

export default DDeiFlowGraph;