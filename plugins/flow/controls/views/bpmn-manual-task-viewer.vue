<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-manual-task",
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

  mounted() {
    this.editor.renderViewerIns[this.model.id] = this
    this.editor.renderViewerElements[this.model.id] = this.$refs['divElement']
    this.editor.bus.push("refresh-shape");
    this.editor.bus.executeAll();
  }
};
</script>
<template>
  <div ref="divElement" class="ddei-flow-bpmn-viewer-manual-task">
    <div class="title">
      <svg class="icon-ddei-flow" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-manual"></use>
      </svg>
      <div class="text">
        {{ model.name ? model.name : "手工任务" }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-manual-task {
  
  background: var(--fillColor);
  position: absolute;
  color: var(--text);
  font-size: 14px;
  border:var(--borderWidth) var(--borderType) var(--borderColor);
  border-radius: var(--borderRound);
  pointer-events:none;
  user-select: none;

  .title{
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--fontColor);
    font-family: var(--fontFamily);
    font-size: var(--fontSize);
    font-style: var(--fontStyle);
    font-weight: var(--fontWeight);
    text-decoration: var(--textDecoration);
    .icon-ddei-flow {
      position: absolute;
      left:0px;
      top:0px;
      width: 24px;
      height:24px;
    }

    .text {
      flex: 1;
      text-align: center;
      white-space: nowrap;
      padding:2px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

  }
}
</style>