<script lang="ts">
import { DDeiEditorUtil } from "ddei-editor"
export default {
  name: "ddei-quickflow-addnode",
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
      controls:[]
    }
  },
  mounted() {
    let controlConfig = {
      "StartEvent": [
        {
          name: "ddei.flow.task",
          icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-user-task"></use>
          </svg>`,
          type: "UserTask"
        },
        {
          name: "ddei.flow.branch",
          icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-gateway-xor"></use>
          </svg>`,
          type: "ExclusiveGateway"
        }
      ],
      "UserTask": [
        {
          name: "ddei.flow.task",
          icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-user-task"></use>
          </svg>`,
          type: "UserTask"
        },
        {
          name: "ddei.flow.branch",
          icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-gateway-xor"></use>
          </svg>`,
          type: "ExclusiveGateway"
        }
      ],
      "ExclusiveGateway": [
        {
          name: "ddei.flow.condition",
          icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-user-task"></use>
          </svg>`,
          type: "ConditionItem"
        }
      ],
    }

    let stage = this.editor.ddInstance.stage;
    if (stage?.flowDesignData?.data) {
      let flowDesignData = stage.flowDesignData;
      let flowData = flowDesignData.data;
      let flowAPI = this.editor.flow
      let parentNode = flowAPI.getNodeById(this.model.smodel.id, flowData);
      if (parentNode?.type){
        let controlConfigs = controlConfig[parentNode.type];
        this.controls = controlConfigs;
      }
    }

  },

  methods:{
    createControl(control){
      
      let nodeData = {
        type: control.type
      }
      
      this.editor.flow.insertNode(this.model.smodel.id, nodeData,true)
    }
  }
};
</script>
<template>
  <div ref="addNodeDialog" class="ddei-quickflow-addnode">
    <div class="ddei-quickflow-addnode-content">
      <div class="ddei-quickflow-addnode-content-itempanel">
        <div
          :class="{ 'ddei-quickflow-addnode-content-itempanel-item': true }" :title="control.desc" @click="createControl(control)"
          v-for="control in controls">
          <img class="icon" v-if="!control.icon" :src="editor?.icons[control.id]" />
          <div class="icon-html" v-if="control.icon" v-html="control.icon"></div>
          <div class="text">{{ editor.i18n(control.name) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ddei-quickflow-addnode {
  font-size: 14px;
  height:78px;
  user-select: none;
  display: none;
  position: fixed;
  z-index: 99999;
  border: 1px solid var(--panel-border);
  box-shadow: 0px 2px 24px 0px hsl(0deg 0% 0% /0.25); 
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--panel-background);
  color: var(--panel-title);
  &-content {
      border: 1px solid var(--panel-border);
      background-color: var(--panel-background);
      box-shadow: 0px 2px 24px 0px hsl(0deg 0% 0% /0.25);
      border-radius: 6px;
      overflow-y: auto;
      overflow-x: hidden;
      user-select: none;
  
      &-itempanel {
        display: flex;
        flex-flow: row wrap;
        background: var(--toolbox-background);
        padding: 5px;
  
        &-item {
          height: 54px;
          margin: 5px 0px;
          display: flex;
          overflow: hidden;
          justify-content: center;
          align-items: center;
          flex-flow: column;
  
          &:hover {
            background: var(--toolbox-control-hover);
            outline: var(--toolbox-control-hover-outline);
            cursor: all-scroll;
          }
  
          .text {
            white-space: nowrap;
            text-align: center;
            font-size: 13px;
            font-weight: 400;
            color: var(--toolbox-control-title);
          }
  
  
          .icon-html {
            width: 60px;
            height: 54px;
            object-fit: contain;
            display: flex;
            justify-content: center;
            align-items: center;
  
           
          }
        }
      }
    }
}
</style>