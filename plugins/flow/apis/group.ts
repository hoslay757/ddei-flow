import DDeiFlowNode from "./node";
import { merge } from "lodash"
import { DDeiEnumBusCommandType } from "ddei-editor"
import { DDeiFlowAPI } from "..";

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
   * 所属API
   */
  api: DDeiFlowAPI;

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

  /**
   * 设置属性到图形对象中，并根据
   * @param data 属性对象
   * @param nodify 立即刷新
   */
  setNodesData(nodes: object | null, nodify: boolean = true) {
    if (nodes) {
      for (let nodeId in nodes){
        let nodeData = nodes[nodeId]
        if (nodeData){
          //已存在
          merge(this.shapeModel, data)
          merge(this, data)
        }
      }
      
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
      if (this[i] || this[i] === 0) {
        returnData[i] = this[i]
      }
    }
    delete returnData.shapeModel
    delete returnData.graph
    delete returnData.essBounds

    if (returnData.nodes?.size > 0) {
      let nodes = []
      returnData.nodes?.forEach((node) => {
        let key = node[this.api.jsonKeyField] ? node[this.api.jsonKeyField] : node.id
        nodes.push(key)
      });
      returnData.nodes = nodes
    } else {
      delete returnData.nodes
    }

    delete returnData.api

    return returnData
  }

}

export default DDeiFlowGroup;