<template>
  <div :id="editor?.id + '_' + dialogId" class="ddei-flow-element-setting-dialog" v-if="forceRefresh">
    <div class="content">
      <div v-for="item in options?.items" style="display: contents;">
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-change-bpmnsubtype' && validItemCondition(item) && bpmnSubTypeDataSource?.length > 0">
          <div class="change-bpmn-sub-type">
            <svg class="icon-ddei-flow" @click="changeBpmnSubType(-1)" style="width:16px;height:16px;"
              aria-hidden="true">
              <use xlink:href="#icon-ddei-flow-left"></use>
            </svg>
            <div class="change-bpmn-sub-type-text">
              {{ editor.i18n(bpmnSubTypeDataSource[bpmnSubTypeIndex].text) }}
            </div>
            <svg class="icon-ddei-flow" @click="changeBpmnSubType(1)" style="width:16px;height:16px;"
              aria-hidden="true">
              <use xlink:href="#icon-ddei-flow-right"></use>
            </svg>
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-dataobject-setting' && model.bpmnType == 'DataObject' && validItemCondition(item)">
          <div class="change-bpmn-sub-type">
            <svg class="icon-ddei-flow" @click="changeDataType(-1)" style="width:16px;height:16px;" aria-hidden="true">
              <use xlink:href="#icon-ddei-flow-left"></use>
            </svg>
            <div class="change-bpmn-sub-type-text">
              {{ editor.i18n(dataTypeDataSource[dataTypeIndex].text) }}
            </div>
            <svg class="icon-ddei-flow" @click="changeDataType(1)" style="width:16px;height:16px;" aria-hidden="true">
              <use xlink:href="#icon-ddei-flow-right"></use>
            </svg>
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-dataobject-setting' && model.bpmnType == 'DataObject' && model.dataType == 8 && validItemCondition(item)">
          <div class="change-property-text" :title="item.desc">
            <div class="change-property-text-title">
              {{editor.i18n('ddei.flow.busicls')}}
            </div>
            <div class="change-property-text-input">
              <input v-model="model.customDataType" @change="changeInput('customDataType')"
                :placeholder="editor.i18n('ddei.flow.busicls')">
            </div>
          </div>
        </div>

        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-time-setting' && ((model.bpmnType == 'StartEvent' && model.bpmnSubType == 3) || (model.bpmnType == 'IntermediateCatchEvent' && (model.bpmnSubType == 1 || !model.bpmnSubType)) || (model.bpmnType == 'BoundaryEvent' && model.bpmnSubType == 2)) && validItemCondition(item)">
          <div class="change-bpmn-sub-type">
            <svg class="icon-ddei-flow" @click="changeTimeType(-1)" style="width:16px;height:16px;" aria-hidden="true">
              <use xlink:href="#icon-ddei-flow-left"></use>
            </svg>
            <div class="change-bpmn-sub-type-text">
              {{ editor.i18n(timeTypeDataSource[timeTypeIndex].text) }}
            </div>
            <svg class="icon-ddei-flow" @click="changeTimeType(1)" style="width:16px;height:16px;" aria-hidden="true">
              <use xlink:href="#icon-ddei-flow-right"></use>
            </svg>
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-time-setting' && model.timeType != 'timeDuration' && model.timeType != 'CRON' && ((model.bpmnType == 'StartEvent' && model.bpmnSubType == 3) || (model.bpmnType == 'IntermediateCatchEvent' && (model.bpmnSubType == 1 || !model.bpmnSubType)) || (model.bpmnType == 'BoundaryEvent' && model.bpmnSubType == 2)) && validItemCondition(item)">
          <div class="change-property-text" :title="item.desc">
            <div class="change-property-text-title">
              {{ editor.i18n('ddei.flow.time') }}
            </div>
            <div class="change-property-text-input">
              <input v-model="model.timeValue" @change="changeInput('timeValue')" placeholder="2011-03-11T12:13:14">
            </div>
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-time-setting' && model.timeType == 'timeDuration' && ((model.bpmnType == 'StartEvent' && model.bpmnSubType == 3) || (model.bpmnType == 'IntermediateCatchEvent' && (model.bpmnSubType == 1 || !model.bpmnSubType)) || (model.bpmnType == 'BoundaryEvent' && model.bpmnSubType == 2)) && validItemCondition(item)">
          <div class="change-property-text" :title="item.desc">
            <div class="change-property-text-title">
              {{ editor.i18n('ddei.flow.timeduration') }}
            </div>
            <div class="change-property-text-input">
              <input v-model="model.timeValue" @change="changeInput('timeValue')" placeholder="R3/PT10H/${EndDate}">
            </div>
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-time-setting' && model.timeType == 'CRON' && ((model.bpmnType == 'StartEvent' && model.bpmnSubType == 3) || (model.bpmnType == 'IntermediateCatchEvent' && (model.bpmnSubType == 1 || !model.bpmnSubType)) || (model.bpmnType == 'BoundaryEvent' && model.bpmnSubType == 2)) && validItemCondition(item)">
          <div class="change-property-text" :title="item.desc">
            <div class="change-property-text-title">
              {{ editor.i18n('ddei.flow.timecron') }}
            </div>
            <div class="change-property-text-input">
              <input v-model="model.timeValue" @change="changeInput('timeValue')" placeholder="0 0/5* * *？">
            </div>
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-message-setting' && ((model.bpmnType == 'StartEvent' && model.bpmnSubType == 2) || (model.bpmnType == 'IntermediateCatchEvent' && model.bpmnSubType == 2) || (model.bpmnType == 'IntermediateThrowEvent' && model.bpmnSubType == 2) || (model.bpmnType == 'EndEvent' && model.bpmnSubType == 2) || (model.bpmnType == 'BoundaryEvent' && (model.bpmnSubType == 1 || !model.bpmnSubType))) && validItemCondition(item)">
          <div class="change-property-text" :title="item.desc">
            <div class="change-property-text-title">
              {{ editor.i18n('ddei.flow.message') }}
            </div>
            <div class="change-property-text-input">
              <input v-model="model.messageName" @change="changeInput('messageName')"
                :placeholder="editor.i18n('ddei.flow.messagename') ">
            </div>
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-signal-setting' && ((model.bpmnType == 'StartEvent' && model.bpmnSubType == 5) || (model.bpmnType == 'IntermediateCatchEvent' && model.bpmnSubType == 3) || (model.bpmnType == 'IntermediateThrowEvent' && model.bpmnSubType == 3) || (model.bpmnType == 'EndEvent' && model.bpmnSubType == 3) || (model.bpmnType == 'BoundaryEvent' && model.bpmnSubType == 3)) && validItemCondition(item)">
          <div class="change-property-text" :title="item.desc">
            <div class="change-property-text-title">
              {{ editor.i18n('ddei.flow.signal') }}
            </div>
            <div class="change-property-text-input">
              <input v-model="model.signalName" @change="changeInput('signalName')"
                :placeholder="editor.i18n('ddei.flow.signalname')">
            </div>
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-escal-setting' && ((model.bpmnType == 'StartEvent' && model.bpmnSubType == 8) || (model.bpmnType == 'EndEvent' && model.bpmnSubType == 5) || (model.bpmnType == 'BoundaryEvent' && model.bpmnSubType == 7) || (model.bpmnType == 'IntermediateThrowEvent' && model.bpmnSubType == 6)) && validItemCondition(item)">
          <div class="change-property-text" :title="item.desc">
            <div class="change-property-text-title">
              {{ editor.i18n('ddei.flow.escalation') }}
            </div>
            <div class="change-property-text-input">
              <input v-model="model.escalName" @change="changeInput('escalName')"
                :placeholder="editor.i18n('ddei.flow.escalname')">
            </div>
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-error-setting' && ((model.bpmnType == 'StartEvent' && model.bpmnSubType == 9) || (model.bpmnType == 'IntermediateEvent' && model.bpmnSubType == 27) || (model.bpmnType == 'EndEvent' && model.bpmnSubType == 6) || (model.bpmnType == 'BoundaryEvent' && model.bpmnSubType == 4)) && validItemCondition(item)">
          <div class="change-property-text" :title="item.desc">
            <div class="change-property-text-title">
              {{ editor.i18n('ddei.flow.errorcode') }}
            </div>
            <div class="change-property-text-input">
              <input v-model="model.errorCode" @change="changeInput('errorCode')"
                :placeholder="editor.i18n('ddei.flow.errorcode')">
            </div>
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-condition-setting' && ((model.bpmnBaseType == 'Sequence' && model.bpmnSubType == 2) || (model.bpmnType == 'StartEvent' && model.bpmnSubType == 4) || (model.bpmnType == 'StartEvent' && model.bpmnSubType == 4) ) && validItemCondition(item)">
          <div class="change-property-text" :title="item.desc">
            <div class="change-property-text-title">
              {{ editor.i18n('ddei.flow.condition') }}
            </div>
            <div class="change-property-text-input">
              <input v-model="model.condition" @change="changeInput('condition')"
                :placeholder="'${' + editor.i18n('ddei.flow.conditionexpress') +'}'">
            </div>
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-change-linetype' && validItemCondition(item) && lineTypeDataSource?.length > 0">
          <div class="change-bpmn-sub-type">
            <svg class="icon-ddei-flow" @click="changeLineType(-1)" style="width:16px;height:16px;" aria-hidden="true">
              <use xlink:href="#icon-ddei-flow-left"></use>
            </svg>
            <div class="change-bpmn-sub-type-text">
              {{ editor.i18n(lineTypeDataSource[lineTypeIndex].text) }}
            </div>
            <svg class="icon-ddei-flow" @click="changeLineType(1)" style="width:16px;height:16px;" aria-hidden="true">
              <use xlink:href="#icon-ddei-flow-right"></use>
            </svg>
          </div>
        </div>

        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-change-linepointtype' && validItemCondition(item) && model?.bpmnSubType == 5 && startPointTypeDataSource?.length > 0">
          <div class="change-point-type">
            <div class="change-point-type-title">
              {{ editor.i18n('ddei.flow.startnode') }}
            </div>
            <svg class="icon-ddei-flow" @click="changePointType(1,-1)" aria-hidden="true">
              <use xlink:href="#icon-ddei-flow-left"></use>
            </svg>
            <div class="change-point-type-text">
              {{ editor.i18n(startPointTypeDataSource[startPointTypeIndex].text) }}
            </div>
            <svg class="icon-ddei-flow" @click="changePointType(1,1)" aria-hidden="true">
              <use xlink:href="#icon-ddei-flow-right"></use>
            </svg>
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-change-linepointtype' && validItemCondition(item) && model?.bpmnBaseType == 'Sequence'">
          <div class="quick-button" @click="exchangePoints()">
            <div class="quick-button-text">
              {{ editor.i18n('ddei.flow.exchange') }}
            </div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhihuan"></use>
            </svg>
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-change-linepointtype' && validItemCondition(item) && model?.bpmnSubType == 5 && endPointTypeDataSource?.length > 0">
          <div class="change-point-type">
            <div class="change-point-type-title">
              {{ editor.i18n('ddei.flow.endnode') }}
            </div>
            <svg class="icon-ddei-flow" @click="changePointType(2,-1)" aria-hidden="true">
              <use xlink:href="#icon-ddei-flow-left"></use>
            </svg>
            <div class="change-point-type-text">
              {{ editor.i18n(endPointTypeDataSource[endPointTypeIndex].text) }}
            </div>
            <svg class="icon-ddei-flow" @click="changePointType(2,1)" aria-hidden="true">
              <use xlink:href="#icon-ddei-flow-right"></use>
            </svg>
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-callactivity-review' && validItemCondition(item) && model?.bpmnType == 'CallActivityTask'">
          <div class="change-bpmn-marker" @click="changeBpmnLabel('displayView')">
            <div :class="{ 'chk_state': model?.displayView != 1, 'chk_state_checked': model?.displayView == 1 }">
              <span>{{ model?.displayView == 1 ? '✓' : '' }}</span>
            </div>
            {{ editor.i18n('ddei.flow.overview') }}
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-change-activity-labels' && validItemCondition(item) && model?.bpmnType == 'DataStore'">
          <div class="change-bpmn-marker" @click="changeBpmnLabel('isUnlimited')">
            <div :class="{ 'chk_state': model?.isUnlimited != 1, 'chk_state_checked': model?.isUnlimited == 1 }">
              <span>{{ model?.isUnlimited == 1 ? '✓' : '' }}</span>
            </div>
            {{ editor.i18n('ddei.flow.unlimited') }}
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-change-activity-labels' && validItemCondition(item) && model.bpmnType == 'SubProcess' && model.bpmnSubType == 4">
          <div class="change-bpmn-marker" @click="changeBpmnLabel('ordering')">
            <div :class="{ 'chk_state': model?.ordering != 1, 'chk_state_checked': model?.ordering == 1 }">
              <span>{{ model?.ordering == 1 ? '✓' : '' }}</span>
            </div>
            {{ editor.i18n('ddei.flow.ordering') }}
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-change-activity-labels' && validItemCondition(item) && (model.bpmnType == 'SubProcess' || model.bpmnType == 'ChoreographySubProcess')">
          <div class="change-bpmn-marker" @click="changeBpmnLabel('isLoop')">
            <div :class="{ 'chk_state': model?.isLoop != 1, 'chk_state_checked': model?.isLoop == 1 }">
              <span>{{ model?.isLoop == 1 ? '✓' :''}}</span>
            </div>
            {{ editor.i18n('ddei.flow.loop') }}
          </div>
        </div>

        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-change-activity-labels' && validItemCondition(item) && model?.bpmnBaseType == 'Activity'">
          <div class="change-bpmn-marker" @click="changeBpmnLabel('multiInstance')">
            <div :class="{ 'chk_state': model?.multiInstance != 1, 'chk_state_checked': model?.multiInstance == 1 }">
              <span>{{ model?.multiInstance == 1 ? '✓' : '' }}</span>
            </div>
            {{ editor.i18n('ddei.flow.multiins') }}

          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-change-activity-labels' && validItemCondition(item) && (model.multiInstance || (model.bpmnType == 'StartEvent' && model.bpmnSubType == 6) || (model.bpmnType == 'BoundaryEvent' && model.bpmnSubType == 9) || (model.bpmnType == 'EndEvent' && model.bpmnSubType == 4) || (model.bpmnType == 'IntermediateCatchEvent' && model.bpmnSubType == 6) || (model.bpmnType == 'IntermediateThrowEvent' && model.bpmnSubType == 5))">
          <div class="change-property-text" :title="item.desc">
            <div class="change-property-text-title">
              {{ editor.i18n('ddei.flow.insnum') }}
            </div>
            <div class="change-property-text-input">
              <input v-model="model.loopCardinality" @change="changeInput('loopCardinality')"
                :placeholder="editor.i18n('ddei.flow.insnum')">
            </div>
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-change-activity-labels' && validItemCondition(item) && model?.bpmnBaseType == 'Activity' && model?.multiInstance == 1">
          <div class="change-bpmn-marker" @click="changeBpmnLabel('isParallel')">
            <div :class="{ 'chk_state': model?.isParallel != 1, 'chk_state_checked': model?.isParallel == 1 }">
              <span>{{ model?.isParallel == 1 ? '✓' : '' }}</span>
            </div>
            {{ editor.i18n('ddei.flow.parallel') }}
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-change-activity-labels' && validItemCondition(item) && model.bpmnType == 'ChoreographySubProcess'">
          <div class=" change-bpmn-marker" @click="changeBpmnLabel('isAdHoc')">
            <div :class="{ 'chk_state': model?.isAdHoc != 1, 'chk_state_checked': model?.isAdHoc == 1 }">
              <span>{{ model?.isAdHoc == 1 ? '✓' : '' }}</span>
            </div>
            {{ editor.i18n('ddei.flow.property.custom') }}
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-change-activity-labels' && validItemCondition(item) && ((model.bpmnType == 'BoundaryEvent' && (model.bpmnSubType == 1 || !model.bpmnSubType || model.bpmnSubType == 2 || model.bpmnSubType == 7 || model.bpmnSubType == 8 || model.bpmnSubType == 9)) || (model.bpmnType == 'StartEvent' && (model.bpmnSubType >= 2 && model.bpmnSubType <=8) || model.bpmnSubType == 10))">
          <div class="change-bpmn-marker" @click="changeBpmnLabel('notInterrupting')">
            <div
              :class="{ 'chk_state': model?.notInterrupting != 1, 'chk_state_checked': model?.notInterrupting == 1 }">
              <span>{{ model?.notInterrupting == 1 ? '✓' : '' }}</span>
            </div>
            {{ editor.i18n('ddei.flow.notInterrupting') }}
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-change-activity-labels' && validItemCondition(item) && model?.bpmnBaseType == 'Activity'">
          <div class="change-bpmn-marker" @click="changeBpmnLabel('isCompensation')">
            <div :class="{ 'chk_state': model?.isCompensation != 1, 'chk_state_checked': model?.isCompensation == 1 }">
              <span>{{ model?.isCompensation == 1 ? '✓' : '' }}</span>
            </div>

            {{ editor.i18n('ddei.flow.compensation') }}
          </div>
        </div>
        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-change-activity-labels' && validItemCondition(item) && model?.bpmnType == 'DataObject'">
          <div class="change-bpmn-marker" @click="changeBpmnLabel('isCollection')">
            <div :class="{ 'chk_state': model?.isCollection != 1, 'chk_state_checked': model?.isCollection == 1 }">
              <span>{{ model?.isCollection == 1 ? '✓' : '' }}</span>
            </div>
            {{ editor.i18n('ddei.flow.datacoll') }}
          </div>
        </div>
        <div class="row" v-if="!item.viewer && item.id == 'ddei-flow-property-editor-text' && validItemCondition(item)">
          <div class="change-property-text" :title="item.desc">
            <div class="change-property-text-title">
              {{ editor.i18n(item.label) }}
            </div>
            <div class="change-property-text-input">
              <input v-model="model[item.property]" @change="modelChangeProperty(item.property)"
                :placeholder="editor.i18n(item.desc)">
            </div>
          </div>
        </div>

        <div class="row"
          v-if="!item.viewer && item.id == 'ddei-flow-property-editor-textarea' && validItemCondition(item) ">
          <div class="change-property-textarea" :title="item.desc">
            <div class="change-property-textarea-title">
              {{ editor.i18n(item.label) }}
            </div>
            <div class="change-property-textarea-input">
              <textarea v-model="model[item.property]" @change="modelChangeProperty( item.property)"
                :placeholder="editor.i18n(item.desc) "></textarea>
            </div>
          </div>
        </div>
        <component v-if="item.viewer && validItemCondition(item) " :is="item.viewer" :editor="editor" :options="options"
          :model="model" v-bind="item">
        </component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DDeiEditorUtil, DDeiEnumBusCommandType, DDeiEnumOperateType, DDeiUtil, DDeiEditorEnumBusCommandType } from "ddei-editor";
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
      bpmnSubTypeIndex:-1,
      startPointTypeDataSource: null,
      startPointTypeIndex: -1,
      endPointTypeDataSource: null,
      endPointTypeIndex: -1,
      lineTypeDataSource: null,
      lineTypeIndex: -1,
      timeTypeIndex: -1,
      timeTypeDataSource: [
        { text: "ddei.flow.property.ds.timedate", value: "timeDate" },
        { text: "ddei.flow.property.ds.timeduration", value: "timeDuration" },
        { text: "ddei.flow.property.ds.timecron", value: "CRON" },
      ],
      dataTypeDataSource: null,
      dataTypeIndex: -1,
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

    changeInput(property) {
      DDeiUtil.invokeCallbackFunc("EVENT_CONTROL_EDIT_AFTER", DDeiEnumOperateType.EDIT, { models: [this.model], propName: property }, this.editor.ddInstance, null)
    },
    modelChangeProperty(property){
      if (!property) {
        return;
      }
      let mds = [this.model];
      if (
        this.editBefore &&
        !this.editBefore(
          DDeiEnumOperateType.EDIT,
          mds,
          this.attrDefine?.code,
          this.editor.ddInstance,
          null
        )
      ) {
        return;
      }
      //获取属性路径
      let paths = [property];
    

      //推送信息进入总线
      this.editor.bus.push(
        DDeiEnumBusCommandType.ModelChangeValue,
        {
          mids: [this.model.id],
          paths: paths,
          value: this.model[property]
        },
        null,
        true
      );
      
      
      this.editor.bus.push(DDeiEditorEnumBusCommandType.RefreshEditorParts, {
        parts: ["topmenu"],
      });
      this.editor.bus.push(DDeiEnumBusCommandType.RefreshShape);
      this.editor.bus.executeAll();
      //编辑完成后的回调函数
      DDeiUtil.invokeCallbackFunc("EVENT_CONTROL_EDIT_AFTER", DDeiEnumOperateType.EDIT, { models: mds, propName: this.attrDefine?.code }, this.editor.ddInstance, null)
    },
    validItemCondition(item){
      if (!item.condition){
        return true;
      }else{
        let func = new Function("model","item","editor","component","return "+item.condition)
        let rs = func(this.model, item, this.editor, this)
        return rs
      }
    },

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
          {
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
          {
            let ds = controlDefine.attrDefineMap.get("dataType")?.dataSource
            if (ds?.length > 0) {
              for (let i = 0; i < ds.length; i++) {
                if (ds[i].value == this.model.dataType) {
                  this.dataTypeIndex = i
                  break;
                }
              }
            }
            this.dataTypeDataSource = ds
          }
          this.refreshPointType()
          {
            let ds = controlDefine.attrDefineMap.get("type")?.dataSource
            if (ds?.length > 0) {
              let value = this.model.type ? this.model.type : 1
              for (let i = 0; i < ds.length; i++) {
                if (ds[i].value == value) {
                  this.lineTypeIndex = i
                  break;
                }
              }
            }
            this.lineTypeDataSource = ds
          }
          {
            let ds = this.timeTypeDataSource
            if (ds?.length > 0) {
              let value = this.model.timeType ? this.model.timeType : 'timeDate'
              for (let i = 0; i < ds.length; i++) {
                if (ds[i].value == value) {
                  this.timeTypeIndex = i
                  break;
                }
              }
            }
          }
        }

      }
    },

    refreshPointType(){
      let controlDefine = DDeiEditorUtil.getControlDefine(this.model);
      {
        
        let ds = controlDefine.attrDefineMap.get("sp.type")?.dataSource
        if (ds?.length > 0) {
          let value = this.model.sp?.type ? this.model.sp.type : -1
          for (let i = 0; i < ds.length; i++) {
            if (ds[i].value == value) {
              this.startPointTypeIndex = i
              break;
            }
          }
        }
        this.startPointTypeDataSource = ds
      }
      {
        let ds = controlDefine.attrDefineMap.get("ep.type")?.dataSource
        if (ds?.length > 0) {
          let value = this.model.ep?.type ? this.model.ep.type : -1
          for (let i = 0; i < ds.length; i++) {
            if (ds[i].value == value) {
              this.endPointTypeIndex = i
              break;
            }
          }
        }
        this.endPointTypeDataSource = ds
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
      if (this.model.bpmnBaseType == 'Sequence') {
        this.changeLineBySubType()
      }

      this.model.render.clearCachedValue()
      this.model.initPVS()
      this.model.render.enableRefreshShape()
      editor.bus.push(DDeiEnumBusCommandType.RefreshShape);
      editor.bus.executeAll();
      DDeiUtil.invokeCallbackFunc("EVENT_CONTENT_CHANGE_AFTER", "CHANGE", null, this.editor.ddInstance)

    },

    /**
     * 切换数据类型
     */
    changeDataType(delta) {
      let ds = this.dataTypeDataSource
      this.dataTypeIndex += delta
      if (this.dataTypeIndex >= ds.length) {
        this.model.dataType = ds[0].value
        this.dataTypeIndex = 0
      } else if (this.dataTypeIndex == -1) {
        this.model.dataType = ds[ds.length - 1].value
        this.dataTypeIndex = ds.length - 1
      } else {
        this.model.dataType = ds[this.dataTypeIndex].value
      }
      DDeiUtil.invokeCallbackFunc("EVENT_CONTENT_CHANGE_AFTER", "CHANGE", null, this.editor.ddInstance)
    },

    /**
     * 切换时间类型
     */
    changeTimeType(delta) {
      let ds = this.timeTypeDataSource
      this.timeTypeIndex += delta
      if (this.timeTypeIndex >= ds.length) {
        this.model.timeType = ds[0].value
        this.timeTypeIndex = 0
      } else if (this.timeTypeIndex == -1) {
        this.model.timeType = ds[ds.length - 1].value
        this.timeTypeIndex = ds.length - 1
      } else {
        this.model.timeType = ds[this.timeTypeIndex].value
      }
      DDeiUtil.invokeCallbackFunc("EVENT_CONTENT_CHANGE_AFTER", "CHANGE", null, this.editor.ddInstance)
    },

    /**
     * 根据线段的bpmnSubType修改线的样式以及部分选项的范围值
     */
    changeLineBySubType(){
      let subType = this.model.bpmnSubType ? this.model.bpmnSubType : 1
      delete this.model.sp
      delete this.model.ep
      delete this.model.dash
      switch(subType){
        case 1: {
          this.model.ep = { type: 51 }
          break;
        }
        case 2: {
          this.model.sp = { type: 4 }
          this.model.ep = { type: 51 }
          break;
        }
        case 3: {
          this.model.ep = { type: 51 }
          break;
        }
        case 4: {
          this.model.ep = {
            type: 5
          }
          this.model.sp = {
            type: 2
          }
          this.model.dash = [10, 5]
          break;
        }
        case 5: {
          this.model.ep = {
            type: 0
          }
          this.model.sp = {
            type: 0
          }
          this.model.dash = [4, 4]
          break;
        }
      }
      this.refreshPointType()
      DDeiUtil.invokeCallbackFunc("EVENT_CONTENT_CHANGE_AFTER", "CHANGE", null, this.editor.ddInstance)
    },

    /**
     * 切换连线类型
     */
    changeLineType(delta) {
      let editor = this.editor
      let ds = this.lineTypeDataSource
      this.lineTypeIndex += delta
      if (this.lineTypeIndex >= ds.length) {
        this.model.type = ds[0].value
        this.lineTypeIndex = 0
      } else if (this.lineTypeIndex == -1) {
        this.model.type = ds[ds.length - 1].value
        this.lineTypeIndex = ds.length - 1
      } else {
        this.model.type = ds[this.lineTypeIndex].value
      }
      this.model.render.clearCachedValue()
      this.model.initPVS()
      this.model.render.enableRefreshShape()
      editor.bus.push(DDeiEnumBusCommandType.RefreshShape);
      editor.bus.executeAll();
      DDeiUtil.invokeCallbackFunc("EVENT_CONTENT_CHANGE_AFTER", "CHANGE", null, this.editor.ddInstance)
    },

    /**
     * 切换点的类型
     */
    changePointType(type,delta) {
      let editor = this.editor
      //开始点
      if (type == 1){
        let ds = this.startPointTypeDataSource
        this.startPointTypeIndex += delta
        if (!this.model.sp){
          this.model.sp = {}
        }
        if (this.startPointTypeIndex >= ds.length) {
          this.model.sp.type = ds[0].value
          this.startPointTypeIndex = 0
        } else if (this.startPointTypeIndex == -1) {
          this.model.sp.type = ds[ds.length - 1].value
          this.startPointTypeIndex = ds.length - 1
        } else {
          this.model.sp.type = ds[this.startPointTypeIndex].value
        }
      }
      //结束点
      else if(type == 2){
        let ds = this.endPointTypeDataSource
        this.endPointTypeIndex += delta
        if (!this.model.ep) {
          this.model.ep = {}
        }
        if (this.endPointTypeIndex >= ds.length) {
          this.model.ep.type = ds[0].value
          this.endPointTypeIndex = 0
        } else if (this.endPointTypeIndex == -1) {
          this.model.ep.type = ds[ds.length - 1].value
          this.endPointTypeIndex = ds.length - 1
        } else {
          this.model.ep.type = ds[this.endPointTypeIndex].value
        }
      }
     
      this.model.initPVS()
      this.model.render.enableRefreshShape()
      editor.bus.push(DDeiEnumBusCommandType.RefreshShape);
      editor.bus.executeAll();
      DDeiUtil.invokeCallbackFunc("EVENT_CONTENT_CHANGE_AFTER", "CHANGE", null, this.editor.ddInstance)
    },

    /**
     * 交换起点和终点
     */
    exchangePoints(){
      let editor = this.editor
      this.model.exchangeStartAndEnd();
      this.model.render.enableRefreshShape()
      editor.bus.push(DDeiEnumBusCommandType.RefreshShape);
      editor.bus.executeAll();
      DDeiUtil.invokeCallbackFunc("EVENT_CONTENT_CHANGE_AFTER", "CHANGE", null, this.editor.ddInstance)
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
      if (label == 'displayView'){
        delete this.model.upActivityId
      }

      this.model.render.clearCachedValue()
      this.model.initPVS()
      this.model.render.enableRefreshShape()
      editor.bus.push(DDeiEnumBusCommandType.RefreshShape);
      editor.bus.executeAll();
      DDeiUtil.invokeCallbackFunc("EVENT_CONTROL_EDIT_AFTER", DDeiEnumOperateType.EDIT, { models: [this.model], propName: label }, this.editor.ddInstance, null)
      DDeiUtil.invokeCallbackFunc("EVENT_CONTENT_CHANGE_AFTER", "CHANGE", null, this.editor.ddInstance)
    }
  }
};
</script>

<style lang="less" scoped>
.ddei-flow-element-setting-dialog {
  width: 200px;
  background: var(--panel-background);
  display: none;
  position: absolute;
  z-index: 99901;
  border: 1px solid var(--panel-border); 
  box-shadow: 0px 2px 24px 0px hsl(0deg 0% 0% /0.25); 
  border-radius: 6px;
  color: black;

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
      flex:0 1 20px;
      margin:0 5px;
      width:100%;
      &:hover{
        background: rgb(230, 228, 228);
        cursor: pointer;
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
        width:150px;
        margin-left:18px;
        .chk_state {
            border: 1px solid var(--panel-title);
            width: 12px;
            height: 12px;
            margin-top: 4px;
            float: left;
            box-sizing: border-box;
            background: var(--panel-background);
          }
        
          .chk_state_checked {
            border: 1px solid var(--panel-title);
            width: 12px;
            height: 12px;
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

      .quick-button{
        height: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon{
          width: 14px;
          height: 14px;
          opacity: 0.5;
          
          &:hover {
            opacity: 1.0;
          }
        }
        &-text{
          margin-right:5px;
          color:black;
          font-size: 12px;
        }
        
      }


      .change-point-type {
        height: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon-ddei-flow {
          width: 14px;
          height: 14px;
        }

        &-title {
          margin-right: 5px;
          color: black;
          font-size: 12px;
        }

        &-text {
          color: black;
          font-size: 12px;
        }

      }

      .change-property-text {
        height: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &-title {
          flex: 0 0 40px;
          color: black;
          font-size: 12px;
        }

        &-input {
          flex: 1;
          color: black;
          font-size: 12px;
          text-align: left;

          input {
            width: 95%;
            height: 18px;
            background: white;
            color: black;
            &::placeholder {
              color: grey;
              
            }
          }
        }

      }


      .change-property-textarea {
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &-title {
          flex: 0 0 40px;
          color: black;
          font-size: 12px;
        }

        &-input {
          flex: 1;
          color: black;
          font-size: 12px;
          text-align: left;

          textarea {
            background: white;
            color: black;
            &::placeholder{
              color:grey;
            }
            width: 95%;
            height: 55px;
          }
        }

      }


    }
    
  }
}
</style>
