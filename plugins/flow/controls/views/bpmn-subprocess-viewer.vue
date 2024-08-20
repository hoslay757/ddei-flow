<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-subprocess",
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
  <div ref="divElement" class="ddei-flow-bpmn-viewer-subprocess">
    <div class="title">
      {{ model.name ? model.name : "嵌入子流程" }}
    </div>
    <div class="icon">
      <svg class="icon-ddei-flow" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-sub-process-marker"></use>
      </svg>
    </div>

  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-subprocess {
  
  background: var(--fillColor);
  position: absolute;
  color: var(--text);
  font-size: 14px;
  border:var(--borderWidth) var(--borderType) var(--borderColor);
  border-radius: var(--borderRound);
  pointer-events:none;
  user-select: none;

  .icon{
    height:24px;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-ddei-flow {
      width: 24px;
      height: 24px;
    }
  }
  
  .title {
    font-size: 13px;
    height:calc(100% - 24px);
    display:flex;
    border-bottom: var(--borderWidth) var(--borderType) var(--borderColor);
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding:0 2px;
    word-break: break-word;
    text-overflow: ellipsis;
    color: var(--fontColor);
    font-family: var(--fontFamily);
    font-size: var(--fontSize);
    font-style: var(--fontStyle);
    font-weight: var(--fontWeight);
    text-decoration: var(--textDecoration);
  }
}
</style>