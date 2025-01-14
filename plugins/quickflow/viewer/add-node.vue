<script lang="ts">
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
    },
    controlConfig: {
      type: Object,
      default: {
        "start": [
          {
            group: "taskGroup"
          }
        ],
        "taskGroup": [
          {
            group: "taskGroup"
          }
        ],
        "branch": [
          {
            name: "ddei.flow.condition",
            icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-user-task"></use>
          </svg>`,
            type: "condition"
          }
        ],
        "condition": [
          {
            group: "taskGroup"
          }
        ],
        "converge": [
          {
            group: "taskGroup"
          }
        ],
      }
    },
    groupConfig: {
      type: Object,
      default: {
        "taskGroup": [
          {
            name: "ddei.flow.task",
            icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-user-task"></use>
          </svg>`,
            type: "task"
          },
          {
            name: "ddei.flow.branch",
            icon: `<svg class="icon-ddei-flow" style="width:34px;height:34px;" aria-hidden="true">
            <use xlink:href="#icon-ddei-flow-gateway-xor"></use>
          </svg>`,
            type: "branch"
          }
        ]
      }
    }
  },
  data(){
    return {
      controls:[]
    }
  },
  mounted() {
    let stage = this.editor.ddInstance.stage;
    if (stage && stage.extData && stage.extData.flowDesignData?.data) {
      let flowDesignData = stage.extData.flowDesignData;
      let flowData = flowDesignData.data;
      let flowAPI = this.editor.flow
      let nResult = flowAPI.getNodeById(this.model.smodel.id, flowData);
      let parentNode = nResult?.node;
      let controlConfig = this.editor.options?.nodeControlConfig ? this.editor.options.nodeControlConfig : this.controlConfig
      if (parentNode?.type){
        let controlConfigs = controlConfig[parentNode.type];
        if (!controlConfigs){
          //根据parentNode.type去寻找当前是在哪个分组下
          let groupName = this.getGroupByNode(parentNode.type)
          controlConfigs = controlConfig[groupName];
        }
        let controls = []
        controlConfigs.forEach(conf => {
          if(conf.group){
            let groupConfig = this.editor.options?.nodeGroupConfig ? this.editor.options.nodeGroupConfig : this.groupConfig
            let groupControls = groupConfig[conf.group];
            controls.push(...groupControls)
          }else{
            controls.push(conf);
          }
        });
        this.controls = controls;
      }
    }

  },

  methods:{

    getGroupByNode(nodeName){
      let groupConfig = this.editor.options?.nodeGroupConfig ? this.editor.options.nodeGroupConfig : this.groupConfig

      for (let groupName in groupConfig){
        
        let controls = groupConfig[groupName];
        for (let i = 0; i < controls.length;i++){
          if(controls[i]?.type == nodeName){
            return groupName
          }
        }
        
      }
    },

    createControl(control){
      
      let stage = this.editor.ddInstance.stage
      let newIdIdx = stage.idIdx;
      stage.idIdx++;
      let nodeData = {
        id:'task_'+newIdIdx,
        type: control.type
      }
      
      
      if(nodeData.type == 'branch'){
        stage.idIdx+=3;
        nodeData.id = 'branch_' + newIdIdx
        
        let t1id = newIdIdx + 1
        let t2id = newIdIdx + 2
        let convid = newIdIdx + 3
        nodeData.converge = 'conv_' + convid,
        nodeData.name = "条件判断"
        nodeData.children = [
          {
            type:'condition',
            id: 'branch_' + newIdIdx +'_cond_1',
            text:'条件1',
            children:[
              {
                id: 'task_' + t1id,
                name: '任务1',
                type:'task',
                children:[
                  {
                    id: 'conv_' + convid,
                    name: '汇聚',
                    type: 'converge',
                    branch: nodeData.id
                  }
                ]
              }
            ]
          },
          {
            type: 'condition',
            id: 'branch_' + newIdIdx + '_cond_2',
            text: '条件2',
            children: [
              {
                id: 'task_' + t2id,
                name: '任务2',
                type: 'task',
                link: 'conv_' + convid
              }
            ]
          }
        ]
        this.editor.flow.insertNode(this.model.smodel.id, nodeData,false,true, true)
      }else{
        this.editor.flow.insertNode(this.model.smodel.id, nodeData,false,false, true)
      }
      
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
  position: absolute;
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