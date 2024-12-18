<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-quickflow-operate-view",
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
    refreshDragState(type){
      if (type == 1){
        this.$refs['rectSvg'].children[0].style.stroke = "green"
      }else{
        this.$refs['rectSvg'].children[0].style.stroke = ""
      }
    }
  }
};
</script>
<template>
  <div ref="divElement" class="ddei-flow-bpmn-viewer-group">
    <svg class="border-svg" ref="rectSvg">
      <rect rx="10" ry="10" width="100%" height="100%" x="0" y="0"></rect>
    </svg>
    <div v-if="model?.name" :class="{ 'title': !model.isExpand, 'title-expand': model.isExpand }">
      {{ model.name}}
    </div>
    <svg class="icon-ddei-flow content-header-locked" v-if="model.lock == 1" aria-hidden="true">
      <use xlink:href="#icon-ddei-flow-lock"></use>
    </svg>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-group {
  
  
  position: absolute;
  color: black;
  font-size: 14px;
  pointer-events:none;
  user-select: none;
  display: none;
  color: black;
  font-family: var(--fontFamily);
  font-style: var(--fontStyle);
  font-weight: var(--fontWeight);
  text-decoration: var(--textDecoration);

  .content-header-locked {
    width: 12px;
    height: 12px;
    font-size: 12px;
    opacity: 0.5;
    color: var(--fontColor);
    position: absolute;
    right:5px;
    top:5px;
  }

  .border-svg{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    rect{
      fill: none;
      stroke: var(--borderColor);
      stroke-width: 2px;
      stroke-dasharray: 10,5,1,5;
    }
  }
  
  .title {
    font-size: 16px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 0 5px;
    word-break: break-word;
    text-overflow: ellipsis;
  }

  .title-expand {
    font-size: 16px;
    width:100%;
    height: 24px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
    
}
</style>