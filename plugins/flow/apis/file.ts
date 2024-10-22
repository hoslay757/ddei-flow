import DDeiFlowGraph from "./graph"
/**
 * DDeiFlowFile表示图形设计器被解析后的一个文件对象
 * 一般用于解析或生成的中间文件，相对于xml具有更小的体积和更便捷的遍历结构
 * 一个文件包含多张流程图
 */
class DDeiFlowFile {

  constructor(props:object){
    for(let i in props){
      this[i] = props[i]
    }
  }
  /**
   * id
   */
  id:string;
  /**
   * 名称
   */
  name: string;

  /**
   * 文件包含的所有流程图
   */
  graphics: DDeiFlowGraph[] = []
}
export default DDeiFlowFile;