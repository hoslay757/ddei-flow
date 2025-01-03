<script lang="ts">
import { getCurrentInstance, render, createVNode } from "vue"
export default {
  name: "ddei-quickflow-add-condition-view",
  props: {
    model: {
      type: Object,
      default: null
    },
    editor: {
      type: Object,
      default: null
    },
    direct:{
      type:Number,
      default:null
    }
  },

  methods:{
    appendCondition() {

      let stage = this.editor.ddInstance.stage
      if (stage && stage.extData && stage.extData.flowDesignData?.data) {
        let flowDesignData = stage.extData.flowDesignData;
        let flowData = flowDesignData.data;
        let flowAPI = this.editor.flow
        let nResult = flowAPI.getNodeById(this.model.id, flowData);
        //获取当前节点的父节点，对父节点进行操作，插入一个子节点，并维护link等关系
        if (nResult && nResult.node && nResult.parentNode){
          let parentNode = nResult.parentNode;
          let conditionIdx = stage.idIdx;
          let taskIdx = stage.idIdx + 1;
          stage.idIdx += 2;
          //当前节点在父节点的下标
          let sibIndex = nResult.index;
          let insertNode = {
            type: 'condition',
            id: parentNode.id + '_cond_' + conditionIdx,
            text:'条件',
            children: [
              {
                id: 'task_' + taskIdx,
                name: '任务',
                type: 'task',
              }
            ]
          }
          //向左插入
          if(this.direct == 1){
            insertNode.children[0].link = parentNode.converge
            parentNode.children.splice(sibIndex, 0, insertNode);
            //重新加载流程
            flowAPI.loadFromFlowData(flowDesignData, true, parentNode.id + '_cond_' + conditionIdx)
          }else if (this.direct == 2) {
            insertNode.children[0].link = parentNode.converge
            parentNode.children.splice(sibIndex+1, 0, insertNode);
            //重新加载流程
            flowAPI.loadFromFlowData(flowDesignData, true, parentNode.id + '_cond_' + conditionIdx)
          }
          
        }
       
      }

    }
  }
};
</script>
<template>
  <div ref="operateGroupDiv" class="ddei-quickflow-operate-group">
    <svg class="icon extbtn" aria-hidden="true" @click="appendCondition()">
      <use xlink:href="#icon-add-layer"></use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-quickflow-operate-group {
  font-size: 14px;
  user-select: none;
  pointer-events: none;
  display: block;
  position: fixed;
  z-index: 99999;
  .icon{
      fill: var(--dot);
  }
  svg{
    pointer-events: initial;
  }
}
</style>