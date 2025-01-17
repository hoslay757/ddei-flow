<script lang="ts">
import { DDeiUtil, DDeiEditorUtil } from 'ddei-editor'

export default {
  name: "ddei-flow-bpmn-viewer-user-task",
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
  methods: {
    refreshDragState(type) {
      if (type == 1) {
        this.$refs['divElement'].style.borderColor = "green"
      } else {
        this.$refs['divElement'].style.borderColor = ""
      }
    }
  }


};
</script>
<template>
  <div ref="divElement" class="ddei-flow-bpmn-viewer-user-task">
    <div class="title">
      <svg class="icon-ddei-flow" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-user"></use>
      </svg>
      <div class="text">
        自定义:{{ editor.i18n(model.name ? model.name : "ddei.flow.usertask") }}
      </div>

    </div>
  </div>
</template>

<style scoped>
.ddei-flow-bpmn-viewer-user-task {

  background: var(--fillColor);
  position: absolute;
  color: var(--text);
  font-size: 14px;
  border: var(--borderWidth) var(--borderType) var(--borderColor);
  border-radius: var(--borderRound);
  pointer-events: none;
  user-select: none;
  display: none;
}
</style>