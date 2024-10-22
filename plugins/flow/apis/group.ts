import DDeiFlowNode from "./node";

/**
 *DDeiFlowGroup表示图形设计器被解析后的一个分组
 * 一般用于解析或生成的中间文件，相对于xml具有更小的体积和更便捷的遍历结构
 * 分组位于graph之上，用于在设计上切割节点作用。分组不真正持有节点，只保存引用
 */
class DDeiFlowGroup {

  constructor(props) {
    for (let i in props) {
      this[i] = props[i]
    }
  }
  /**
   * 分组ID
   */
  id: string;

  /**
   * 分组名称
   */
  name: string;

  /**
   * 分组备注
   */
  desc: string;

  /**
   * 分组中的所有节点引用
   */
  nodes: Map<string, DDeiFlowNode> = new Map();

}

export default DDeiFlowGroup;