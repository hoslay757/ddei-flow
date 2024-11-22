import { DDeiFlowAPI } from "./api";
import DDeiFlowFile from "./file";
import DDeiFlowGroup from "./group";
import DDeiFlowNode from "./node";
import {DDeiEnumBusCommandType} from "ddei-editor"
import { clone, merge } from "ddei-editor"

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
   * 所属API
   */
  api: DDeiFlowAPI;

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

  /**
   * 获取流程节点
   * @param key key字段 
   */
  getFlowNode(key:string):DDeiFlowNode|null{
    let nodes = Array.from(this.nodes.values())
    for (let i = 0; i < nodes.length;i++){
      let node = nodes[i]
      if (node[this.api.jsonKeyField] == key){
        return node
      }
    }
  }

  /**
   * 批量设置节点属性
   * @param data 属性对象
   * @param nodify 立即刷新
   */
  setNodesData(nodes: object | null, nodify: boolean = true) {
    if (nodes) {
      let nodesModels = []
      for (let nodeId in nodes) {
        let nodeData = nodes[nodeId]
        let node = this.getFlowNode(nodeId)
        if (node && nodeData) {
          //已存在
          nodesModels.push(node.shapeModel)
          node.setData(nodeData,false)
        }
      }

    }
    if (nodify && nodesModels.length > 0) {
      let ddInstance = nodesModels[0].stage.ddInstance
      nodesModels.forEach(shapeModel => {
        shapeModel.render.clearCachedValue()
        shapeModel.render.enableRefreshShape()
      });
      
      ddInstance.bus.push(DDeiEnumBusCommandType.RefreshShape);
      ddInstance.bus.executeAll()
    }
  }

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

  toJSON(){
    let returnData = clone(this)
    delete returnData.shapeModel
    delete returnData.file
    let startNodes = []
    returnData.startNodes?.forEach(node => {
      let key = node[this.api.jsonKeyField] ? node[this.api.jsonKeyField] : node.id
      startNodes.push(key)
    });
    if (startNodes.length > 0) {
      returnData.startNodes = startNodes
    }else{
      delete returnData.startNodes
    }
    let endNodes = []
    returnData.endNodes?.forEach(node => {
      let key = node[this.api.jsonKeyField] ? node[this.api.jsonKeyField] : node.id
      endNodes.push(key)
    });
    if (endNodes.length > 0){
      returnData.endNodes = endNodes
    }else{
      delete returnData.endNodes
    }
    let isolatedNodes = []
    returnData.isolatedNodes?.forEach(node => {
      let key = node[this.api.jsonKeyField] ? node[this.api.jsonKeyField] : node.id
      isolatedNodes.push(key)
    });
    if (isolatedNodes.length > 0) {
      returnData.isolatedNodes = isolatedNodes
    }else{
      delete returnData.isolatedNodes
    }

    let groups = []
    returnData.groups?.forEach(node => {
      let key = node[this.api.jsonKeyField] ? node[this.api.jsonKeyField] : node.id
      groups.push(key)
    });
    if (groups.length > 0) {
      returnData.groups = groups
    }else{
      delete returnData.groups
    }

    if (returnData.nodes?.size > 0){
      let nodes = {}
      returnData.nodes?.forEach((node) => {
        let key = node[this.api.jsonKeyField] ? node[this.api.jsonKeyField] : node.id
        nodes[key] = node.toJSON()
      });
      returnData.nodes = nodes
    }else{
      delete returnData.nodes
    }

    delete returnData.api
    return returnData
  }
}

export default DDeiFlowGraph;