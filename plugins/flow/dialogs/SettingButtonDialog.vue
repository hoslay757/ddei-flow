<template>
  <div :id="editor?.id + '_' + dialogId" :style="{ transform: 'scale(' + stageRatio + ')' }"
    class="ddei-flow-setting-button-dialog" v-if="forceRefresh">
    <div class="content" :style="{ 'flex-direction': model?.bpmnBaseType !='Event' ? 'column' : ''}">
      <svg class="icon-ddei-flow" @mouseenter="settingMouseEnter($el)" @mouseleave="settingMouseEnterLeave($el)"
        aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-setting"></use>
      </svg>
      <svg class="icon-ddei-flow" v-if="model?.bpmnType == 'SubProcess'" @click="expandSubProcess()"
        aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-sub-process-marker"></use>
      </svg>
      <svg class="icon-ddei-flow" @click="deleteElement($el)" aria-hidden="true">
        <use xlink:href="#icon-ddei-flow-trash"></use>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { DDeiEditorUtil } from "ddei-editor";
import DialogBase from "./dialog"
import { expandOrNotSubProcess } from "../controls/util"

export default {
  name: "ddei-flow-setting-button-dialog",
  mixins: [DialogBase],
  props: {
    //外部传入的插件扩展参数
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialogId: 'ddei-flow-setting-button-dialog',
      model:null,
      stageRatio:1,
    };
  },
  computed: {},
  components: {},
  watch: {},
  created() { },
  mounted() {
    this.editor.dialogs[this.dialogId].viewer = this
    this.refreshData()
  },
  methods: {

    forceRefreshView: function () {
      this.forceRefresh = false
      this.$nextTick(() => {
        this.forceRefresh = true;
        if (this.refreshData) {
          this.refreshData();
        }
      });
    },
    refreshData() {
      
      if (this.editor.tempPopData) {
        this.model = this.editor.tempPopData[this.dialogId]?.model
        
        if (this.model) {
          this.stageRatio = this.model.getStageRatio()
        }

      }
    },
    settingMouseEnter(srcElement) {
      this.showSettingDialog(srcElement)
    },

    settingMouseEnterLeave(srcElement) {
      delete this.editor.tempOperateModel
    },

    showSettingDialog(srcElement) {
      let editor = this.editor
      if (editor.tempOperateModel) {
        let model = editor.tempOperateModel
        if (model) {
          let left,top 
          if(this.model.bpmnBaseType == 'Event'){
            left = srcElement.offsetLeft  + ((-5.5) * (this.stageRatio - 1))
            top = srcElement.offsetTop + srcElement.clientHeight + ((5.5) * (this.stageRatio - 1))
          }else{
            left = srcElement.offsetLeft + srcElement.clientWidth + ((5.5) * (this.stageRatio - 1))
            top = srcElement.offsetTop + ((-5.5) * (this.stageRatio - 1))
          }
          DDeiEditorUtil.showDialog(editor, 'ddei-flow-element-setting-dialog', {
            group: "ddei-flow-element-setting",
            model: model
          }, { type: 99, left: left, top: top, hiddenMask: true }, null, true, true)

        }
      }
    },

    expandSubProcess() {
      expandOrNotSubProcess(this.model)
    },

    deleteElement(srcElement) {
      this.model.stage.removeModel(this.model,true)
      DDeiEditorUtil.closeDialog(this.editor, 'ddei-flow-setting-button-dialog')
      DDeiEditorUtil.closeDialog(this.editor, 'ddei-flow-element-setting-dialog')
    },
  }
};
</script>

<style lang="less" scoped>
.ddei-flow-setting-button-dialog {
  display: none;
  position: absolute;
  z-index: 99900;
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    
    justify-content: start;
    align-items: center;
    .icon-ddei-flow{
      width: 11px;
      height: 11px;
      opacity: 0.5;
      margin-bottom: 2px;
      margin-right: 2px;
      &:hover {
        opacity: 1.0;
      }

    }
    
  }
    
}
</style>
