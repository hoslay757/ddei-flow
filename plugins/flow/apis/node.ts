import DDeiFlowGraph from "./graph";
import DDeiFlowSubProcess from "./subprocess"
import {  merge } from "ddei-editor"
import { DDeiEnumBusCommandType } from "ddei-editor"
import { DDeiFlowAPI } from "./api";

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
   * 所属API
   */
  api:DDeiFlowAPI;

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
   * 附着节点
   */
  attachNodes: DDeiFlowNode[] = [];

  /**
   * 所有层级子流程，按照最外层到最里层的顺序排序
   */
  subProcesses: DDeiFlowSubProcess[];



  /**
   * 设置属性到图形对象中，并根据
   * @param data 属性对象
   * @param nodify 立即刷新
   */
  setData(data:object|null,nodify:boolean = true){
    if(data){
      //已存在
      merge(this.shapeModel,data)
      merge(this, data)
    }
    if (nodify){
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
    
    let prevNodes = []
    returnData.prevNodes?.forEach(node => {
      let key = node[this.api.jsonKeyField] ? node[this.api.jsonKeyField] : node.id
      prevNodes.push(key)
    });
    if (prevNodes.length > 0){
      returnData.prevNodes = prevNodes
    }else{
      delete returnData.prevNodes
    }

    let nextNodes = []
    returnData.nextNodes?.forEach(node => {
      let key = node[this.api.jsonKeyField] ? node[this.api.jsonKeyField] : node.id
      nextNodes.push(key)
    });
    if (nextNodes.length > 0) {
      returnData.nextNodes = nextNodes
    } else {
      delete returnData.nextNodes
    }

    let subProcesses = []
    returnData.subProcesses?.forEach(node => {
      let key = node[this.api.jsonKeyField] ? node[this.api.jsonKeyField] : node.id
      subProcesses.push(key)
    });
    if (subProcesses.length > 0) {
      returnData.subProcesses = subProcesses
    } else {
      delete returnData.subProcesses
    }

    let attachNodes = []
    returnData.attachNodes?.forEach(node => {
      let key = node[this.api.jsonKeyField] ? node[this.api.jsonKeyField] : node.id
      attachNodes.push(key)
    });
    if (attachNodes.length > 0) {
      returnData.attachNodes = attachNodes
    } else {
      delete returnData.attachNodes
    }

    if(returnData.attachPNode){
      let key = returnData.attachPNode[this.api.jsonKeyField] ? returnData.attachPNode[this.api.jsonKeyField] : returnData.attachPNode.id
      returnData.attachPNode = key
    }else{
      delete returnData.attachPNode
    }

    
    delete returnData.api
    
    
    return returnData
  }

}

export default DDeiFlowNode;