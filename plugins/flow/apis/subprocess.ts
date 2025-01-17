import DDeiFlowNode from "./node";
import { merge } from "ddei-editor"
import { DDeiEnumBusCommandType } from "ddei-editor"

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
    let api = this.api
    let returnData = super.toJSON()

    let startNodes = []
    returnData.startNodes?.forEach(node => {
      let key = node[api.jsonKeyField] ? node[api.jsonKeyField] : node.id
      startNodes.push(key)
    });
    if (startNodes.length > 0) {
      returnData.startNodes = startNodes
    } else {
      delete returnData.startNodes
    }
    let endNodes = []
    returnData.endNodes?.forEach(node => {
      let key = node[api.jsonKeyField] ? node[api.jsonKeyField] : node.id
      endNodes.push(key)
    });
    if (endNodes.length > 0) {
      returnData.endNodes = endNodes
    } else {
      delete returnData.endNodes
    }
    let isolatedNodes = []
    returnData.isolatedNodes?.forEach(node => {
      let key = node[api.jsonKeyField] ? node[api.jsonKeyField] : node.id
      isolatedNodes.push(key)
    });
    if (isolatedNodes.length > 0) {
      returnData.isolatedNodes = isolatedNodes
    } else {
      delete returnData.isolatedNodes
    }

    if (returnData.nodes?.size > 0) {
      let nodes = {}
      returnData.nodes?.forEach((node) => {
        let key = node[api.jsonKeyField] ? node[api.jsonKeyField] : node.id
        nodes[key] = node.toJSON()
      });
      returnData.nodes = nodes
    } else {
      delete returnData.nodes
    }

    delete returnData.api
    
    return returnData
  }
}

export default DDeiFlowSubProcess;