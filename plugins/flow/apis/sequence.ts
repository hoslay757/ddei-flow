import DDeiFlowGraph from "./graph";
import DDeiFlowNode from "./node";
import { merge } from "ddei-editor"
import { DDeiEnumBusCommandType } from "ddei-editor"
import { DDeiFlowAPI } from "./api";

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
   * 所属API
   */
  api: DDeiFlowAPI;

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

  /**
   * 设置属性到图形对象中，并根据
   * @param data 属性对象
   * @param nodify 立即刷新
   */
  setData(data: object | null, nodify: boolean = true) {
    if (data) {
      //已存在
      merge(this.shapeModel, data)
      merge(this, data)
    }
    if (nodify) {
      let ddInstance = this.shapeModel.stage.ddInstance
      this.shapeModel.render.clearCachedValue()
      this.shapeModel.render.enableRefreshShape()
      ddInstance.bus.push(DDeiEnumBusCommandType.RefreshShape);
      ddInstance.bus.executeAll()
    }
  }

  toJSON() {
    let returnData = {}
    for (let i in this) {
      if (this[i] || this[i] === 0){
        returnData[i] = this[i]
      }
    }
    delete returnData.shapeModel
    delete returnData.graph

    if (returnData.prevNode){
      let key = returnData.prevNode[this.api.jsonKeyField] ? returnData.prevNode[this.api.jsonKeyField] : returnData.prevNode.id
      returnData.prevNode = key
    }else{
      delete returnData.prevNode
    }
    if (returnData.nextNode) {
      let key = returnData.nextNode[this.api.jsonKeyField] ? returnData.nextNode[this.api.jsonKeyField] : returnData.nextNode.id
      returnData.nextNode = key
    } else {
      delete returnData.nextNode
    }

    delete returnData.api
    return returnData
  }

}

export default DDeiFlowSequence;