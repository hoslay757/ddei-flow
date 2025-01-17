<script lang="ts">
export default {
  name: "ddei-quickflow-condition-left-operate-view",
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
  data(){
    return {
      sibIndex:-1
    }
  },

  mounted(){
    let stage = this.editor.ddInstance.stage
    if (stage && stage.extData && stage.extData.flowDesignData?.data) {
      let flowDesignData = stage.extData.flowDesignData;
      let flowData = flowDesignData.data;
      let flowAPI = this.editor.flow
      let nResult = flowAPI.getNodeById(this.model.id, flowData);
      this.sibIndex = nResult && (nResult.index || nResult.index == 0) ? nResult.index : -1;
    }
  },

  methods:{
    moveCondition() {

      let stage = this.editor.ddInstance.stage
      if (stage && stage.extData && stage.extData.flowDesignData?.data) {
        let flowDesignData = stage.extData.flowDesignData;
        let flowData = flowDesignData.data;
        let flowAPI = this.editor.flow
        let nResult = flowAPI.getNodeById(this.model.id, flowData);
        //获取当前节点的父节点，对父节点进行操作，插入一个子节点，并维护link等关系
        if (nResult && nResult.node && nResult.parentNode) {
          let parentNode = nResult.parentNode;
          //向左移动
          parentNode.children[this.sibIndex] = parentNode.children[this.sibIndex - 1];
          parentNode.children[this.sibIndex - 1] = nResult.node
          flowAPI.loadFromFlowData(flowDesignData, true, this.model.id)

        }

      }

    }
  }
};
</script>
<template>
  <div ref="operateGroupDiv" class="ddei-quickflow-operate-group">
    <svg v-if="sibIndex > 0" class="icon extbtn" aria-hidden="true" @click="moveCondition()">
      <use xlink:href="#icon-left"></use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-quickflow-operate-group {
  font-size: 14px;
  user-select: none;
  pointer-events: none;
  display: block;
  position: absolute;
  z-index: 99999;
  .icon{
      fill: var(--dot);
  }
  svg{
    pointer-events: initial;
  }
}
</style>