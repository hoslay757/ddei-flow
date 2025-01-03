<script lang="ts">
import { DDeiEditorUtil } from "ddei-editor"
export default {
  name: "ddei-quickflow-remove-btn-viewer",
  props: {
    model: {
      type: Object,
      default: null
    },
    editor: {
      type: Object,
      default: null
    }
  },

  methods:{
    deleteElement(id) {
      //删除数据节点后重新加载
      if (this.model.modelType != 'Sequence'){
        let stage = this.model.stage
        if (stage && stage.extData && stage.extData.flowDesignData?.data) {
          let flowDesignData = stage.extData.flowDesignData;
          let flowData = flowDesignData.data;
          let flowAPI = this.editor.flow
          if (!id){
            id = this.model.id
          }
          let nResult = flowAPI.getNodeById(id, flowData);
          //获取当前节点的父节点，对父节点进行操作，插入一个子节点，并维护link等关系
          if (nResult && nResult.node && nResult.node.type != 'start' && nResult.node.type != 'end') {
            let node = nResult.node;
            let parentNode = nResult.parentNode;
            let reload = false
            //删除条件
            if(node.type == 'condition'){
              //如果是最后一个条件，指向branch
              if(nResult.sibNodes?.length == 1){
                this.deleteElement(parentNode.id)
                return;
              }
              //终末节点的ID
              let convergeId = parentNode.converge;
              let lastMark = 0
              let lastNode = null
              //判断条件末尾是否是link还是children
              flowAPI.dfsData(node, (subNode) => {
                if (subNode){
                  if (subNode.link == convergeId){
                    lastMark = 1;
                    lastNode = subNode
                  }else if(subNode.children && subNode.children.length > 0 && subNode.children[0].id == convergeId){
                    lastMark = 2;
                    lastNode = subNode
                  }
                }
              })
              //如果为link直接删除
              if (lastMark == 1){
                parentNode.children.splice(nResult.index,1)
                reload = true
              }
              //如果为children，则和其他交换
              else if (lastMark == 2){
                let otherIndex = nResult.index == 0 ? nResult.index + 1 : nResult.index -1
                //另一个挂载的节点
                let otherNode = nResult.sibNodes[otherIndex];
                let otherLastNode = null
                flowAPI.dfsData(otherNode, (subNode) => {
                  if (subNode){
                    if (subNode.link == convergeId) {
                      otherLastNode = subNode
                    }
                  }
                })
                if (otherLastNode){
                  delete otherLastNode.link
                  otherLastNode.children = lastNode.children
                  parentNode.children.splice(nResult.index, 1)
                  reload = true
                }
              }
              
             


            }
            //删除分支
            else if (node.type == 'branch') {
              //上一级为condition
              let convergeResult = flowAPI.getNodeById(node.converge, flowData);
              if (parentNode.type == 'condition') {
                let branchResult = flowAPI.getNodeById(parentNode.id, flowData);
                
                //合并节点指向上一个Branch的合并节点，当前节点为condition的最后一个节点，删除condition
                if (convergeResult.node.children?.length > 0 && !convergeResult.node.link) {
                  //指向合并节点
                  if (convergeResult.node.children[0].branch == branchResult.parentNode.id) {
                    this.deleteElement(parentNode.id)
                    return;
                  }
                }
                //指向合并节点
                else if (convergeResult.node.link) {
                  this.deleteElement(parentNode.id)
                  return;
                }
              }
              //上级节点为非condition节点
              //将当前节点的下级转移到上级节点的下级
              if (convergeResult.node.children?.length > 0 && !convergeResult.node.link) {
                parentNode.children = convergeResult.node.children
                reload = true
              }
              //将当前节点的link转移到上级
              else if (convergeResult.node.link) {
                delete parentNode.children
                parentNode.link = convergeResult.node.link
                reload = true
              }
            }
            //删除普通节点
            else{
              //上一级为condition
              if (parentNode.type == 'condition'){
                let branchResult = flowAPI.getNodeById(parentNode.id, flowData);
                //下级节点指向合并节点，当前节点为condition的最后一个节点，删除condition
                if (node.children?.length > 0 && !node.link) {
                  //指向合并节点
                  if (node.children[0].branch == branchResult.parentNode.id){
                    this.deleteElement(parentNode.id)
                    return;
                  }
                }
                //指向合并节点
                else if(node.link){
                  this.deleteElement(parentNode.id)
                  return;
                }
              }
              //上级节点为非condition节点
              //将当前节点的下级转移到上级节点的下级
              if (node.children?.length > 0 && !node.link) {
                parentNode.children = node.children
                reload = true
              }
              //将当前节点的link转移到上级
              else if (node.link) {
                delete parentNode.children
                parentNode.link = node.link
                reload = true
              }

            }
            if (reload){
              //重新加载流程
              flowAPI.loadFromFlowData(flowDesignData, true, nResult.parentNode.id)
            }
          }
        }
      }

    },
  }
};
</script>
<template>
  <svg class="icon-ddei-flow"
    @click="deleteElement()" aria-hidden="true">
    <use xlink:href="#icon-ddei-flow-trash"></use>
  </svg>
</template>

<style lang="less" scoped>
.icon-ddei-flow {
  width: 11px;
  height: 11px;
  opacity: 0.5;
  margin-bottom: 2px;
  margin-right: 2px;

  &:hover {
    opacity: 1.0;
    cursor: pointer;
  }

}
</style>