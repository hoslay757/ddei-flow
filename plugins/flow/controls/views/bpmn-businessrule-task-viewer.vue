<script lang="ts">
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

export default {
  name: "ddei-flow-bpmn-viewer-businessrule-task",
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
  <div ref="divElement" class="ddei-flow-bpmn-viewer-businessrule-task">
    <div class="title">
      <svg class="icon-ddei-flow" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-business-rule"></use>
      </svg>
      <div class="text">
        {{ model.name ? model.name : "业务规则" }}
      </div>
    </div>
    <div class="desc">
      {{ model.text }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.ddei-flow-bpmn-viewer-businessrule-task {
  
  background: var(--fillColor);
  position: absolute;
  color: var(--text);
  font-size: 14px;
  border:var(--borderWidth) var(--borderType) var(--borderColor);
  border-radius: var(--borderRound);
  pointer-events:none;
  user-select: none;

  .title{
    height:24px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-ddei-flow {
      position: absolute;
      left:0px;
      top:0px;
      width: 24px;
      height:24px;
    }

    .text {
      flex: 1;
      white-space: nowrap;
      padding:2px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

  }
  .desc {
    font-size: 13px;
    height:calc(100% - 24px);
    display:flex;
    border-top: var(--borderWidth) var(--borderType) var(--borderColor);
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding:0 2px;
    word-break: break-word;
    text-overflow: ellipsis;
  }
}
</style>