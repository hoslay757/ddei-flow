<template>
  <div :id="editor?.id + '_' + dialogId" class="ddei-flow-element-setting-dialog" v-if="forceRefresh">
    <div class="content">
      <div class="row" v-if="bpmnSubTypeDataSource?.length > 0">
        <div class="change-bpmn-sub-type">
          <svg class="icon-ddei-flow" @click="changeBpmnSubType(-1)" style="width:16px;height:16px;" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-left"></use>
          </svg>
          <div class="change-bpmn-sub-type-text">
            {{ bpmnSubTypeDataSource[bpmnSubTypeIndex].text }}
          </div>
          <svg class="icon-ddei-flow" @click="changeBpmnSubType(1)" style="width:16px;height:16px;" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-right"></use>
          </svg>
        </div>
      </div>
      <div class="row" v-if="model?.bpmnBaseType == 'Activity'">
        <div class="change-bpmn-marker" @click="changeBpmnLabel('isLoop')">
          <div :class="{ 'chk_state': model?.isLoop != 1, 'chk_state_checked': model?.isLoop == 1 }">
            <span>{{ model?.isLoop == 1 ? '✓' :''}}</span>
          </div>
          循环
        </div>
      </div>
      <div class="row" v-if="model?.bpmnBaseType == 'Activity'">
        <div class="change-bpmn-marker" @click="changeBpmnLabel('multiInstance')">
          <div :class="{ 'chk_state': model?.multiInstance != 1, 'chk_state_checked': model?.multiInstance == 1 }">
            <span>{{ model?.multiInstance == 1 ? '✓' : '' }}</span>
          </div>
          多实例
        </div>
      </div>
      <div class="row" v-if="model?.bpmnBaseType == 'Activity' && model?.multiInstance == 1">
        <div class="change-bpmn-marker" @click="changeBpmnLabel('isParallel')">
          <div :class="{ 'chk_state': model?.isParallel != 1, 'chk_state_checked': model?.isParallel == 1 }">
            <span>{{ model?.isParallel == 1 ? '✓' : '' }}</span>
          </div>
          并行
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DDeiEditorUtil, DDeiEnumBusCommandType } from "ddei-editor";
import DialogBase from "./dialog"

export default {
  name: "ddei-flow-element-setting-dialog",
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
      dialogId: 'ddei-flow-element-setting-dialog',
      model:null,
      bpmnSubTypeDataSource:null,
      bpmnSubTypeIndex:-1
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
          let controlDefine = DDeiEditorUtil.getControlDefine(this.model);
          let ds = controlDefine.attrDefineMap.get("bpmnSubType")?.dataSource
          if (ds?.length > 0) {
            for (let i = 0; i < ds.length; i++) {
              if (ds[i].value == this.model.bpmnSubType) {
                this.bpmnSubTypeIndex = i
                break;
              }
            }
          }
          this.bpmnSubTypeDataSource = ds
        }

      }
    },
    /**
     * 切换BPMN类型
     */
    changeBpmnSubType(delta) {
      let editor = this.editor
      let ds = this.bpmnSubTypeDataSource
      this.bpmnSubTypeIndex += delta
      if (this.bpmnSubTypeIndex >= ds.length) {
        this.model.bpmnSubType = ds[0].value
        this.bpmnSubTypeIndex = 0
      } else if (this.bpmnSubTypeIndex == -1) {
        this.model.bpmnSubType = ds[ds.length - 1].value
        this.bpmnSubTypeIndex = ds.length - 1
      } else {
        this.model.bpmnSubType = ds[this.bpmnSubTypeIndex].value
      }
      editor.bus.push(DDeiEnumBusCommandType.RefreshShape);
      editor.bus.executeAll();
    },

    /**
     * 切换BPMN类型
     */
    changeBpmnLabel(label) {
      let editor = this.editor
      if(!this.model[label]){
        this.model[label] = 1
      }else{
        this.model[label] = 0
      }
      
      editor.bus.push(DDeiEnumBusCommandType.RefreshShape);
      editor.bus.executeAll();
    }
  }
};
</script>

<style lang="less" scoped>
.ddei-flow-element-setting-dialog {
  width: 160px;
  background: var(--panel-background);
  display: none;
  position: absolute;
  z-index: 99901;
  border: 1px solid var(--panel-border); 
  box-shadow: 0px 2px 24px 0px hsl(0deg 0% 0% /0.25); 
  border-radius: 6px;

  .content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    .row {
      height:20px;
      flex:0 0 20px;
      margin:0 5px;
      width:100%;
      &:hover{
        background: rgb(230, 228, 228);
      }
      .icon-ddei-flow{
        opacity: 0.5;
        &:hover{
          opacity: 1.0;
        }
      }
      .change-bpmn-sub-type{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        height:20px;
        &-text{
          flex:1;
          text-wrap: nowrap;
        }
        .icon-ddei-flow {
          flex: 0 0 12px;
          margin:0 10px;
        }
      }

      .change-bpmn-marker{
        font-size: 12px;
        height: 20px;
        width:60px;
        margin-left:25%;
        .chk_state {
            border: 1px solid var(--panel-title);
            width: 12px;
            height: 12px;
            margin-right: 10px;
            margin-top: 4px;
            float: left;
            box-sizing: border-box;
            background: var(--panel-background);
          }
        
          .chk_state_checked {
            border: 1px solid var(--panel-title);
            width: 12px;
            height: 12px;
            margin-right: 10px;
            margin-top: 4px;
            float: left;
            background-color: var(--dot);
            box-sizing: border-box;
            color: #fff;
        
            span{
              margin-top: -3.5px;
              margin-left: 0.5px;
              display: block;
              font-size: 11px;
            }
          }
      }

      
    }
    
  }
}
</style>
