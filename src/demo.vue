<script setup lang="ts">
import DDeiEditorView from "ddei-editor";
import { DDeiCoreTopMenuSimplePanel, DDeiExtQuickStyle } from "ddei-editor";
import { getCurrentInstance, markRaw } from "vue";
import { DDeiFlowAPI } from "../plugins/index";
import DDeiFlow from "@ddei-flow";
import buttondemo from "./buttondemo.vue"
import menudemo from "./menudemo.vue"
import {DDeiFlowElementSettingDialog} from "@ddei-flow"
//获取主对象实例，代替this获取$refs
const { proxy } = getCurrentInstance()

const designDemoData = `
  {"name":"新建文件_NEW","desc":"","extData":{},"state":2,"publish":"0","lastUpdateTime":1731548992017,"path":"/新建文件_NEW","sheets":[{"name":"页面-1","desc":"页面-1","stage":{"id":"stage_1","layers":[{"id":"layer_default","name":"L-1","models":{"start_6":{"id":"start_6","modelCode":"1000001","modelType":"DDeiPolygon","cpv":{"x":25.204166666666676,"y":100.76666666666667,"z":1},"hpv":[{"x":25.204166666666676,"y":100.76666666666667,"z":1},{"x":51.66250000000001,"y":100.76666666666667,"z":1}],"exPvs":{"_1318136d75826bdda48f364047d9b1b6":{"x":30.495782586006687,"y":100.76666666666667,"z":1,"id":"_1318136d75826bdda48f364047d9b1b6","rate":0.5,"sita":0}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Event","bpmnType":"StartEvent","bpmnSubType":1,"bpv":{"x":35.78750000000001,"y":111.35,"z":1}},"user_task_8":{"id":"user_task_8","modelCode":"1000011","modelType":"DDeiPolygon","cpv":{"x":60.92286591934002,"y":100.76666666666667,"z":1},"hpv":[{"x":60.92286591934002,"y":100.76666666666667,"z":1},{"x":87.38119925267333,"y":100.76666666666667,"z":1}],"exPvs":{"_f1ccd10ace1160e2be4437d3b182fa08":{"x":46.37078258600671,"y":100.76666666666667,"z":1,"id":"_f1ccd10ace1160e2be4437d3b182fa08","index":1,"rate":0.5,"sita":180},"_8f0edf744d6e687aa03ee085ecee4739":{"x":75.47494925267331,"y":100.76666666666667,"z":1,"id":"_8f0edf744d6e687aa03ee085ecee4739","index":3,"rate":0.5,"sita":0}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Activity","bpmnType":"UserTask","border":{"round":5},"bpv":{"x":90.02703258600664,"y":119.2875,"z":1},"model":"1000011"},"line_9":{"id":"line_9","modelCode":"1000601","modelType":"DDeiLine","hpv":[{"x":30.495782586006687,"y":100.76666666666667,"z":1},{"x":56.95411591933998,"y":100.76666666666667,"z":1}],"pvs":[{"x":30.495782586006687,"y":100.76666666666667,"z":1,"isVector3":true},{"x":46.37078258600668,"y":100.76666666666667,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":685.5194932384505,"y":1571.4015748031497,"rate":0.15,"sita":0}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_9_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"cpv":{"x":32.877032586006685,"y":100.76666666666667,"z":1},"hpv":[{"x":32.877032586006685,"y":100.76666666666667,"z":1},{"x":59.33536591934001,"y":100.76666666666667,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":36.05203258600669,"y":103.94166666666666,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"model":"1000601","smodel":{"id":"start_6","x":698.5194932384505,"y":693.7007874015749,"rate":0.5,"sita":0},"emodel":{"id":"user_task_8","x":758.5194932384505,"y":693.7007874015749,"rate":0.5,"sita":180}},"script_task_10":{"id":"script_task_10","modelCode":"1000021","modelType":"DDeiPolygon","cpv":{"x":105.90203258600665,"y":100.76666666666667,"z":1},"hpv":[{"x":105.90203258600665,"y":100.76666666666667,"z":1},{"x":132.36036591934004,"y":100.76666666666667,"z":1}],"exPvs":{"_03e3ccb8189d6bafb97f1451317732a4":{"x":91.34994925267328,"y":100.76666666666667,"z":1,"id":"_03e3ccb8189d6bafb97f1451317732a4","index":1,"rate":0.5,"sita":180},"_f1a462fe4dc369378b9ca478e4dc1018":{"x":120.45411591934001,"y":100.76666666666667,"z":1,"id":"_f1a462fe4dc369378b9ca478e4dc1018","index":3,"rate":0.5,"sita":0},"_c03ff9846cea6bfcbea7ba1c74335ebb":{"x":105.90203258600665,"y":91.50625,"z":1,"id":"_c03ff9846cea6bfcbea7ba1c74335ebb","index":2,"rate":0.5,"sita":-90}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Activity","bpmnType":"ScriptTask","border":{"round":5},"bpv":{"x":135.00619925267335,"y":119.2875,"z":1},"model":"1000021","attachModels":["boundaryevent_43"]},"line_11":{"id":"line_11","modelCode":"1000601","modelType":"DDeiLine","hpv":[{"x":75.47494925267335,"y":100.76666666666667,"z":1},{"x":101.93328258600665,"y":100.76666666666667,"z":1}],"pvs":[{"x":75.47494925267335,"y":100.76666666666667,"z":1,"isVector3":true},{"x":91.34994925267335,"y":100.76666666666667,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":855.5194932384505,"y":1571.4015748031497,"rate":0.15,"sita":0}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_11_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"cpv":{"x":77.85619925267332,"y":100.76666666666667,"z":1},"hpv":[{"x":77.85619925267332,"y":100.76666666666667,"z":1},{"x":104.31453258600666,"y":100.76666666666667,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":81.03119925267333,"y":103.94166666666666,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"model":"1000601","smodel":{"id":"user_task_8","x":868.5194932384505,"y":693.7007874015749,"rate":0.5,"sita":0},"emodel":{"id":"script_task_10","x":928.5194932384505,"y":693.7007874015749,"rate":0.5,"sita":180}},"parallel_gateway_12":{"id":"parallel_gateway_12","modelCode":"1000201","modelType":"DDeiPolygon","cpv":{"x":142.94369925267338,"y":100.76666666666667,"z":1},"hpv":[{"x":142.94369925267338,"y":100.76666666666667,"z":1},{"x":169.40203258600673,"y":100.76666666666667,"z":1}],"exPvs":{"_c295e52aa04d67e79ae7f87c77006382":{"x":136.32911591934004,"y":100.76666666666667,"z":1,"id":"_c295e52aa04d67e79ae7f87c77006382","rate":0.5,"sita":180},"_e98a5c1f868160ec85e8a592ec902d6d":{"x":149.5582825860067,"y":100.76666666666667,"z":1,"id":"_e98a5c1f868160ec85e8a592ec902d6d","rate":0.5,"sita":0},"_e5c954cc9aa4653ab5239d7a9ba34238":{"x":142.94369925267338,"y":107.38125,"z":1,"id":"_e5c954cc9aa4653ab5239d7a9ba34238","sita":90},"_c3073727bf1b675186ecb5ac6da0ce60":{"x":142.94369925267338,"y":94.15208333333334,"z":1,"id":"_c3073727bf1b675186ecb5ac6da0ce60","sita":-90}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Gateway","bpmnType":"ParallelGateway","bpv":{"x":156.17286591934004,"y":113.99583333333332,"z":1},"model":"1000201"},"line_13":{"id":"line_13","modelCode":"1000601","modelType":"DDeiLine","hpv":[{"x":120.45411591934004,"y":100.76666666666667,"z":1},{"x":146.91244925267338,"y":100.76666666666667,"z":1}],"pvs":[{"x":120.45411591934004,"y":100.76666666666667,"z":1,"isVector3":true},{"x":136.32911591934004,"y":100.76666666666667,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":1025.5194932384507,"y":1571.4015748031497,"rate":0.15,"sita":0}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_13_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"cpv":{"x":122.83536591934003,"y":100.76666666666667,"z":1},"hpv":[{"x":122.83536591934003,"y":100.76666666666667,"z":1},{"x":149.29369925267338,"y":100.76666666666667,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":126.01036591934005,"y":103.94166666666666,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"model":"1000601","smodel":{"id":"script_task_10","x":1016.5194932384507,"y":777.7007874015749,"rate":0.5,"sita":0},"emodel":{"id":"parallel_gateway_12","x":1076.5194932384507,"y":777.7007874015749,"rate":0.5,"sita":180}},"subprocess_16":{"id":"subprocess_16","modelCode":"1000091","modelType":"DDeiPolygon","cpv":{"x":224.30312500000008,"y":100.79270833333328,"z":1},"hpv":[{"x":224.30312500000008,"y":100.79270833333328,"z":1},{"x":260.1982638888887,"y":100.79270833333328,"z":1}],"exPvs":{"_d235a379e29b6098b926463fb89afa0e":{"x":170.4604166666669,"y":100.79270833333328,"z":1,"id":"_d235a379e29b6098b926463fb89afa0e","index":1,"rate":0.5,"sita":180},"_fac98e0f05e66dcca4d3332856abad68":{"x":278.14583333333326,"y":100.79270833333328,"z":1,"id":"_fac98e0f05e66dcca4d3332856abad68","index":3,"rate":0.5,"sita":0}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Activity","bpmnSubType":3,"bpmnType":"SubProcess","allowIncludeModel":1,"otherWidth":110,"otherHeight":70,"isExpand":1,"border":{"round":5},"bpv":{"x":331.9885416666664,"y":175.66979166666664,"z":1},"includeModels":["start_18","end_25","user_task_23","user_task_21"]},"start_18":{"id":"start_18","modelCode":"1000001","modelType":"DDeiPolygon","zIndex":1,"cpv":{"x":177.07499999999993,"y":100.79270833333328,"z":1},"hpv":[{"x":177.07499999999993,"y":100.79270833333328,"z":1},{"x":203.53333333333327,"y":100.79270833333328,"z":1}],"exPvs":{"_e693f924fedb61ada74afd38aa7134c4":{"x":182.36661591933992,"y":100.79270833333328,"z":1,"id":"_e693f924fedb61ada74afd38aa7134c4","rate":0.5,"sita":0}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Event","bpmnType":"StartEvent","bpmnSubType":1,"bpv":{"x":187.65833333333325,"y":111.37604166666662,"z":1},"includePModelId":"subprocess_16"},"line_20":{"id":"line_20","modelCode":"1000601","modelType":"DDeiLine","zIndex":1,"hpv":[{"x":149.5582825860067,"y":100.76666666666667,"z":1},{"x":176.01661591934004,"y":100.76666666666667,"z":1}],"pvs":[{"x":149.5582825860067,"y":100.76666666666667,"z":1,"isVector3":true},{"x":170.4604166666669,"y":100.79270833333328,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":1138.3695226735485,"y":1571.4157948452976,"rate":0.15,"sita":0.0714,"len":11.850037967124235}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_20_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"rotate":0.0688,"cpv":{"x":152.69360287404302,"y":100.77042905281827,"z":1},"hpv":[{"x":152.69360287404302,"y":100.77042905281827,"z":1},{"x":179.15191715737862,"y":100.80217904519824,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":155.86479058895773,"y":103.94923676590416,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":2,"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"model":"1000601","smodel":{"id":"parallel_gateway_12","x":1126.5194932384507,"y":777.7007874015749,"rate":0.5,"sita":0},"emodel":{"id":"subprocess_16","x":1205.5196850393706,"y":777.7007874015749,"rate":0.5,"sita":180},"sp":{"type":4},"ep":{"type":51}},"user_task_21":{"id":"user_task_21","modelCode":"1000011","modelType":"DDeiPolygon","zIndex":1,"cpv":{"x":205.9145325860066,"y":100.79270833333328,"z":1},"hpv":[{"x":205.9145325860066,"y":100.79270833333328,"z":1},{"x":232.37286591933992,"y":100.79270833333328,"z":1}],"exPvs":{"_18f0a9df8fc268088f3a42b0211ac08a":{"x":191.36244925267323,"y":100.79270833333328,"z":1,"id":"_18f0a9df8fc268088f3a42b0211ac08a","index":1,"rate":0.5,"sita":180},"_85d0325774326916af7ed3c1551679f2":{"x":220.46661591933992,"y":100.79270833333328,"z":1,"id":"_85d0325774326916af7ed3c1551679f2","index":3,"rate":0.5,"sita":0}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Activity","bpmnType":"UserTask","border":{"round":5},"bpv":{"x":235.01869925267326,"y":119.31354166666664,"z":1},"model":"1000011","includePModelId":"subprocess_16"},"line_22":{"id":"line_22","modelCode":"1000601","modelType":"DDeiLine","zIndex":1,"hpv":[{"x":182.36661591933992,"y":100.76666666666667,"z":1},{"x":208.82494925267332,"y":100.76666666666667,"z":1}],"pvs":[{"x":182.36661591933992,"y":100.79270833333328,"z":1,"isVector3":true},{"x":191.36244925267323,"y":100.79270833333328,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":1255.61949323845,"y":1571.5,"rate":0.15,"sita":0,"len":5.1}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_22_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"cpv":{"x":183.71599091933987,"y":100.79270833333328,"z":1},"hpv":[{"x":183.71599091933987,"y":100.79270833333328,"z":1},{"x":210.17432425267316,"y":100.79270833333328,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":186.89099091933983,"y":103.96770833333329,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"model":"1000601","smodel":{"id":"start_18","x":1250.5194932384504,"y":777.7007874015749,"rate":0.5,"sita":0},"emodel":{"id":"user_task_21","x":1310.5194932384504,"y":777.7007874015749,"rate":0.5,"sita":180}},"user_task_23":{"id":"user_task_23","modelCode":"1000011","modelType":"DDeiPolygon","zIndex":1,"cpv":{"x":241.76562500000006,"y":100.79270833333328,"z":1},"hpv":[{"x":241.76562500000006,"y":100.79270833333328,"z":1},{"x":268.22395833333337,"y":100.79270833333328,"z":1}],"exPvs":{"_b2a80d7995f765aeb1261235011464af":{"x":227.2135416666667,"y":100.79270833333328,"z":1,"id":"_b2a80d7995f765aeb1261235011464af","index":1,"rate":0.5,"sita":180},"_bf438b7cb0456505882d9643c57f73fe":{"x":256.31770833333337,"y":100.79270833333328,"z":1,"id":"_bf438b7cb0456505882d9643c57f73fe","index":3,"rate":0.5,"sita":0}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Activity","bpmnType":"UserTask","border":{"round":5},"bpv":{"x":270.86979166666674,"y":119.31354166666664,"z":1},"model":"1000011","includePModelId":"subprocess_16"},"line_24":{"id":"line_24","modelCode":"1000601","modelType":"DDeiLine","zIndex":1,"hpv":[{"x":227.34578258600658,"y":100.76666666666667,"z":1},{"x":253.80411591933992,"y":100.76666666666667,"z":1}],"pvs":[{"x":220.46661591933992,"y":100.79270833333328,"z":1,"isVector3":true},{"x":227.2135416666667,"y":100.79270833333328,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":1398.3445220085882,"y":1571.5,"rate":0.15,"sita":0,"len":3.825028770138033}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_24_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"cpv":{"x":221.47865478143893,"y":100.79270833333328,"z":1},"hpv":[{"x":221.47865478143893,"y":100.79270833333328,"z":1},{"x":247.93698811477228,"y":100.79270833333328,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":224.65365478143895,"y":103.96770833333329,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"model":"1000601","smodel":{"id":"user_task_21","x":1420.5194932384504,"y":777.7007874015749,"rate":0.5,"sita":0},"emodel":{"id":"user_task_23","x":1480.5194932384504,"y":777.7007874015749,"rate":0.5,"sita":180}},"end_25":{"id":"end_25","modelCode":"1000003","modelType":"DDeiPolygon","zIndex":1,"cpv":{"x":270.86974091934,"y":100.79270833333328,"z":1},"hpv":[{"x":270.86974091934,"y":100.79270833333328,"z":1},{"x":297.32807425267333,"y":100.79270833333328,"z":1}],"exPvs":{"_0c839bb433216062a17894162bbf655c":{"x":265.57812500000006,"y":100.79270833333328,"z":1,"id":"_0c839bb433216062a17894162bbf655c","rate":0.5,"sita":180}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Event","bpmnType":"EndEvent","bpmnSubType":1,"bpv":{"x":281.45307425267333,"y":111.37604166666662,"z":1},"model":"1000003","includePModelId":"subprocess_16"},"line_26":{"id":"line_26","modelCode":"1000601","modelType":"DDeiLine","zIndex":1,"hpv":[{"x":253.40729166666674,"y":100.76666666666667,"z":1},{"x":279.865625,"y":100.76666666666667,"z":1}],"pvs":[{"x":256.31770833333337,"y":100.79270833333328,"z":1,"isVector3":true},{"x":265.57812500000006,"y":100.79270833333328,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":1535.2696850393704,"y":1571.5,"rate":0.15,"sita":0,"len":5.25}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_26_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"cpv":{"x":257.7067708333334,"y":100.79270833333328,"z":1},"hpv":[{"x":257.7067708333334,"y":100.79270833333328,"z":1},{"x":284.1651041666666,"y":100.79270833333328,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":260.8817708333334,"y":103.96770833333329,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"model":"1000601","smodel":{"id":"user_task_23","x":1519.0196850393704,"y":777.7007874015749,"rate":0.5,"sita":0},"emodel":{"id":"end_25","x":1579.0196850393704,"y":777.7007874015749,"rate":0.5,"sita":180}},"user_task_27":{"id":"user_task_27","modelCode":"1000011","modelType":"DDeiPolygon","zIndex":1,"cpv":{"x":185.01250000000013,"y":38.325,"z":1},"hpv":[{"x":185.01250000000013,"y":38.325,"z":1},{"x":211.4708333333334,"y":38.325,"z":1}],"exPvs":{"_edd94417f150656283b0fa8ab7d286bb":{"x":170.46041666666684,"y":38.325,"z":1,"id":"_edd94417f150656283b0fa8ab7d286bb","index":1,"rate":0.5,"sita":180},"_4e9f0b611cf96388bf8dbe8f3ec993c5":{"x":199.56458333333336,"y":38.325,"z":1,"id":"_4e9f0b611cf96388bf8dbe8f3ec993c5","index":3,"rate":0.5,"sita":0},"_c4a8ea255c3764b59b96b36d0f169e02":{"x":188.24863894455572,"y":29.06458333333334,"z":1,"id":"_c4a8ea255c3764b59b96b36d0f169e02","index":2,"rate":0.6111916029625408,"sita":-90}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Activity","bpmnType":"UserTask","border":{"round":5},"bpv":{"x":214.11666666666673,"y":56.84583333333333,"z":1},"model":"1000011"},"line_28":{"id":"line_28","modelCode":"1000601","modelType":"DDeiLine","zIndex":1,"hpv":[{"x":142.94369925267338,"y":94.15208333333334,"z":1},{"x":169.40203258600673,"y":94.15208333333334,"z":1}],"pvs":[{"x":142.94369925267338,"y":94.15208333333334,"z":1,"isVector3":true},{"x":142.94369925267338,"y":38.325,"z":1},{"x":170.46041666666684,"y":38.325,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":1101.5193769815091,"y":1514.7515748033632,"rate":0.15,"sita":-90}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_28_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"rotate":-90.0002,"cpv":{"x":142.94366849302426,"y":85.7780208333898,"z":1},"hpv":[{"x":142.94366849302426,"y":85.7780208333898,"z":1},{"x":142.9435713061393,"y":59.31968750023496,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":146.1186568305767,"y":82.60300917098499,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":2,"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"model":"1000601","smodel":{"id":"parallel_gateway_12","x":1101.5194932384507,"y":752.7007874015749,"rate":0.5,"sita":-90},"emodel":{"id":"user_task_27","x":1101.5194932384507,"y":692.7007874015749,"rate":0.5,"sita":90},"sp":{"type":4},"ep":{"type":51},"spvs":[null,null,null,{"x":2.2312681267994776,"y":0}]},"user_task_29":{"id":"user_task_29","modelCode":"1000011","modelType":"DDeiPolygon","zIndex":1,"cpv":{"x":185.01250000000013,"y":160.29791666666665,"z":1},"hpv":[{"x":185.01250000000013,"y":160.29791666666665,"z":1},{"x":211.4708333333334,"y":160.29791666666665,"z":1}],"exPvs":{"_7b6ba9d20b8f612484a8930bafc940ac":{"x":170.46041666666684,"y":160.29791666666665,"z":1,"id":"_7b6ba9d20b8f612484a8930bafc940ac","index":1,"rate":0.5,"sita":180},"_ec3b4e65b6796760a80a1bfa3bab09cf":{"x":199.56458333333336,"y":160.29791666666665,"z":1,"id":"_ec3b4e65b6796760a80a1bfa3bab09cf","index":3,"rate":0.5,"sita":0}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Activity","bpmnType":"UserTask","border":{"round":5},"bpv":{"x":214.11666666666673,"y":178.81874999999994,"z":1},"model":"1000011","oldId":"user_task_27"},"line_30":{"id":"line_30","modelCode":"1000601","modelType":"DDeiLine","zIndex":1,"hpv":[{"x":142.94369925267338,"y":107.38125,"z":1},{"x":169.40203258600673,"y":107.38125,"z":1}],"pvs":[{"x":142.94369925267338,"y":107.38125,"z":1,"isVector3":true},{"x":142.94369925267338,"y":160.29791666666665,"z":1},{"x":170.4604166666667,"y":160.29791666666665,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":1101.5193830422975,"y":1626.4015748029474,"rate":0.15,"sita":90,"ovi":{"x":null,"y":null,"z":1}}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_30_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"rotate":90.0002,"cpv":{"x":142.94367009660786,"y":115.31874999994645,"z":1},"hpv":[{"x":142.94367009660786,"y":115.31874999994645,"z":1},{"x":142.9435729097228,"y":141.77708333310125,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":139.7686584342031,"y":118.49373833749877,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":3,"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"ep":{"type":51}},"complex_gateway_33":{"id":"complex_gateway_33","modelCode":"1000204","modelType":"DDeiPolygon","zIndex":1,"cpv":{"x":295.33495741482943,"y":100.76666666666667,"z":1},"hpv":[{"x":295.33495741482943,"y":100.76666666666667,"z":1},{"x":321.79329074816303,"y":100.76666666666667,"z":1}],"exPvs":{"_881ccfc48fbc6cb3ae77d1998d55768c":{"x":288.72037408149635,"y":100.76666666666667,"z":1,"id":"_881ccfc48fbc6cb3ae77d1998d55768c","rate":0.5,"sita":180},"_3af5b4baada86643a16a0c366b2bf7a4":{"x":295.33495741482943,"y":94.15208333333334,"z":1,"id":"_3af5b4baada86643a16a0c366b2bf7a4","sita":-90},"_abe63832d14165dda23f0916b051c375":{"x":295.33495741482943,"y":107.38125,"z":1,"id":"_abe63832d14165dda23f0916b051c375","sita":90},"_efb7b1ad89426e3299bc37f84583211d":{"x":301.94954074816275,"y":100.76666666666667,"z":1,"id":"_efb7b1ad89426e3299bc37f84583211d","rate":0.5,"sita":0}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Gateway","bpmnType":"ComplexGateway","bpv":{"x":308.56412408149635,"y":113.99583333333332,"z":1}},"line_36":{"id":"line_36","modelCode":"1000601","modelType":"DDeiLine","zIndex":1,"hpv":[{"x":278.14583333333337,"y":100.76666666666667,"z":1},{"x":304.6041666666667,"y":100.76666666666667,"z":1}],"pvs":[{"x":278.14583333333326,"y":100.79270833333328,"z":1,"isVector3":true},{"x":288.72037408149635,"y":100.76666666666667,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":1618.5146997113798,"y":1571.4850124320958,"rate":0.15,"sita":-0.1411,"len":5.995033406479563}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_36_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"rotate":-0.1432,"cpv":{"x":279.7320142986358,"y":100.78874287265863,"z":1},"hpv":[{"x":279.7320142986358,"y":100.78874287265863,"z":1},{"x":306.1902649497206,"y":100.72259710822719,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":282.91494186849786,"y":103.95579545905706,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"model":"1000601","smodel":{"id":"subprocess_16","x":1612.5196850393702,"y":777.7007874015749,"rate":0.5,"sita":0},"emodel":{"id":"complex_gateway_33","x":1652.4864532214035,"y":777.7007874015749,"rate":0.5,"sita":180}},"line_37":{"id":"line_37","modelCode":"1000601","modelType":"DDeiLine","zIndex":1,"hpv":[{"x":199.56458333333333,"y":38.325,"z":1},{"x":226.02291666666673,"y":38.325,"z":1}],"pvs":[{"x":199.56458333333333,"y":38.325,"z":1,"isVector3":true},{"x":295.33495741482943,"y":38.325,"z":1},{"x":295.33495741482943,"y":94.15208333333334,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":1369.8147002666753,"y":1335.4015748031497,"rate":0.15,"sita":0,"ovi":{"x":null,"y":null,"z":1}}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_37_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"cpv":{"x":213.93013944555776,"y":38.325,"z":1},"hpv":[{"x":213.93013944555776,"y":38.325,"z":1},{"x":240.38847277889107,"y":38.325,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":217.10513944555774,"y":41.5,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0},"script_task_38":{"id":"script_task_38","modelCode":"1000021","modelType":"DDeiPolygon","zIndex":1,"cpv":{"x":229.9916666666667,"y":160.29791666666665,"z":1},"hpv":[{"x":229.9916666666667,"y":160.29791666666665,"z":1},{"x":256.45000000000005,"y":160.29791666666665,"z":1}],"exPvs":{"_44797b276841609cab2d1659ab3f29de":{"x":215.43958333333342,"y":160.29791666666665,"z":1,"id":"_44797b276841609cab2d1659ab3f29de","index":1,"rate":0.5,"sita":180},"_a5d36b4c1b226738889e8147ee5c25ef":{"x":244.54375,"y":160.29791666666665,"z":1,"id":"_a5d36b4c1b226738889e8147ee5c25ef","index":3,"rate":0.5,"sita":0}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Activity","bpmnType":"ScriptTask","border":{"round":5},"bpv":{"x":259.09583333333336,"y":178.81874999999994,"z":1},"model":"1000021"},"line_39":{"id":"line_39","modelCode":"1000601","modelType":"DDeiLine","zIndex":1,"hpv":[{"x":199.56458333333333,"y":160.29791666666665,"z":1},{"x":226.02291666666673,"y":160.29791666666665,"z":1}],"pvs":[{"x":199.56458333333333,"y":160.29791666666665,"z":1,"isVector3":true},{"x":215.4395833333334,"y":160.29791666666665,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":1324.5196850393706,"y":1796.4015748031497,"rate":0.15,"sita":0}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_39_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"cpv":{"x":201.94583333333338,"y":160.29791666666665,"z":1},"hpv":[{"x":201.94583333333338,"y":160.29791666666665,"z":1},{"x":228.40416666666673,"y":160.29791666666665,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":205.1208333333334,"y":163.47291666666666,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"model":"1000601","smodel":{"id":"user_task_29","x":1315.5196850393706,"y":1002.7007874015749,"rate":0.5,"sita":0},"emodel":{"id":"script_task_38","x":1375.5196850393706,"y":1002.7007874015749,"rate":0.5,"sita":180}},"line_40":{"id":"line_40","modelCode":"1000601","modelType":"DDeiLine","zIndex":1,"hpv":[{"x":244.54375000000005,"y":160.29791666666665,"z":1},{"x":271.0020833333335,"y":160.29791666666665,"z":1}],"pvs":[{"x":244.54375000000005,"y":160.29791666666665,"z":1,"isVector3":true},{"x":295.33495741482943,"y":160.29791666666665,"z":1},{"x":295.33495741482943,"y":107.38125,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":null,"y":null,"rate":0.15,"sita":0,"ovi":{"x":null,"y":null,"z":1}}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_40_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"cpv":{"x":252.16243111222454,"y":160.29791666666665,"z":1},"hpv":[{"x":252.16243111222454,"y":160.29791666666665,"z":1},{"x":278.6207644455576,"y":160.29791666666665,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":255.3374311122245,"y":163.47291666666666,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0},"end_41":{"id":"end_41","modelCode":"1000003","modelType":"DDeiPolygon","zIndex":1,"cpv":{"x":323.116156667503,"y":100.76666666666667,"z":1},"hpv":[{"x":323.116156667503,"y":100.76666666666667,"z":1},{"x":349.5744900008361,"y":100.76666666666667,"z":1}],"exPvs":{"_aacebfccef6560cc9fd06a10864a1c3b":{"x":317.82454074816303,"y":100.76666666666667,"z":1,"id":"_aacebfccef6560cc9fd06a10864a1c3b","rate":0.5,"sita":180}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Event","bpmnType":"EndEvent","bpmnSubType":1,"bpv":{"x":333.6994900008361,"y":111.35,"z":1},"model":"1000003"},"line_42":{"id":"line_42","modelCode":"1000601","modelType":"DDeiLine","zIndex":1,"hpv":[{"x":301.94954074816275,"y":100.76666666666667,"z":1},{"x":328.40787408149623,"y":100.76666666666667,"z":1}],"pvs":[{"x":301.94954074816275,"y":100.76666666666667,"z":1,"isVector3":true},{"x":317.82454074816303,"y":100.76666666666667,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":1711.4864532214035,"y":1571.4015748031497,"rate":0.15,"sita":0}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_42_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"cpv":{"x":304.3307907481629,"y":100.76666666666667,"z":1},"hpv":[{"x":304.3307907481629,"y":100.76666666666667,"z":1},{"x":330.7891240814961,"y":100.76666666666667,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":307.505790748163,"y":103.94166666666666,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"model":"1000601","smodel":{"id":"complex_gateway_33","x":1702.4864532214035,"y":777.7007874015749,"rate":0.5,"sita":0},"emodel":{"id":"end_41","x":1762.4864532214035,"y":777.7007874015749,"rate":0.5,"sita":180}},"boundaryevent_43":{"id":"boundaryevent_43","modelCode":"1000004","modelType":"DDeiPolygon","zIndex":1,"cpv":{"x":105.90203258600665,"y":110.02708333333332,"z":1},"hpv":[{"x":105.90203258600665,"y":110.02708333333332,"z":1},{"x":124.57589236390317,"y":110.02708333333332,"z":1}],"exPvs":{"_0bbf93e13cc4646dbe3bc01cc88cef83":{"x":105.90203258600665,"y":113.76185528891264,"z":1,"id":"_0bbf93e13cc4646dbe3bc01cc88cef83","sita":90}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Event","bpmnSubType":4,"bpmnType":"BoundaryEvent","bpv":{"x":113.37157649716528,"y":117.49662724449196,"z":1},"attachPModel":"script_task_10"},"subprocess_45":{"id":"subprocess_45","modelCode":"1000091","modelType":"DDeiPolygon","zIndex":1,"cpv":{"x":105.90203258600665,"y":149.58229166666666,"z":1},"hpv":[{"x":105.90203258600665,"y":149.58229166666666,"z":1},{"x":125.7457825860067,"y":149.58229166666666,"z":1}],"exPvs":{"_af0b90358e5f60ce85547bc0827f444e":{"x":105.90203258600665,"y":129.60625,"z":1,"id":"_af0b90358e5f60ce85547bc0827f444e","index":2,"rate":0.5,"sita":-90}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Activity","bpmnSubType":2,"bpmnType":"SubProcess","allowIncludeModel":1,"otherWidth":110,"otherHeight":70,"isExpand":1,"border":{"round":5},"bpv":{"x":165.4332825860067,"y":189.534375,"z":1},"includeModels":["script_task_47","script_task_50"],"name":"补偿"},"script_task_47":{"id":"script_task_47","modelCode":"1000021","modelType":"DDeiPolygon","zIndex":3,"cpv":{"x":91.34994925267333,"y":149.58229166666666,"z":1},"hpv":[{"x":91.34994925267333,"y":149.58229166666666,"z":1},{"x":112.27608561630984,"y":149.58229166666666,"z":1}],"exPvs":{"_6f2996ee787f61cbb7707a58fafaca53":{"x":102.85932425267332,"y":149.58229166666666,"z":1,"id":"_6f2996ee787f61cbb7707a58fafaca53","index":3,"rate":0.5,"sita":0}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Activity","bpmnType":"ScriptTask","border":{"round":5},"bpv":{"x":114.36869925267331,"y":167.44166666666666,"z":1},"model":"1000021","oldId":"script_task_10","includePModelId":"subprocess_45","name":"补偿脚本"},"line_49":{"id":"line_49","modelCode":"1000601","modelType":"DDeiLine","zIndex":2,"hpv":[{"x":105.90203258600665,"y":113.76185528891264,"z":1},{"x":132.36036591934004,"y":113.76185528891264,"z":1}],"pvs":[{"x":105.90203258600665,"y":113.76185528891264,"z":1,"isVector3":true},{"x":105.90203258600665,"y":129.60625,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":null,"y":null,"rate":0.15,"sita":90,"ovi":{"x":null,"y":null,"z":1}}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_49_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"rotate":90.0002,"cpv":{"x":105.90202385604995,"y":116.13851449555972,"z":1},"hpv":[{"x":105.90202385604995,"y":116.13851449555972,"z":1},{"x":105.90192666916492,"y":142.59684782871454,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":102.72701219364518,"y":119.31350283311207,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0},"script_task_50":{"id":"script_task_50","modelCode":"1000021","modelType":"DDeiPolygon","zIndex":5,"cpv":{"x":120.45411591934004,"y":149.58229166666666,"z":1},"hpv":[{"x":120.45411591934004,"y":149.58229166666666,"z":1},{"x":141.3802522829765,"y":149.58229166666666,"z":1}],"exPvs":{"_f51e09dcc6ee68a08599802e230db912":{"x":108.94474091934003,"y":149.58229166666666,"z":1,"id":"_f51e09dcc6ee68a08599802e230db912","index":1,"rate":0.5,"sita":180}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Activity","bpmnType":"ScriptTask","border":{"round":5},"bpv":{"x":143.47286591934005,"y":167.44166666666666,"z":1},"model":"1000021","oldId":"script_task_47","name":"补偿脚本","includePModelId":"subprocess_45"},"line_52":{"id":"line_52","modelCode":"1000601","modelType":"DDeiLine","zIndex":5,"hpv":[{"x":102.85932425267332,"y":149.58229166666666,"z":1},{"x":129.31765758600665,"y":149.58229166666666,"z":1}],"pvs":[{"x":102.85932425267332,"y":149.58229166666666,"z":1,"isVector3":true},{"x":108.94474091934003,"y":149.58229166666666,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":953.4694932384505,"y":1755.9015748031497,"rate":0.15,"sita":0}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_52_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"cpv":{"x":103.77213675267333,"y":149.58229166666666,"z":1},"hpv":[{"x":103.77213675267333,"y":149.58229166666666,"z":1},{"x":130.23047008600665,"y":149.58229166666666,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":106.94713675267326,"y":152.75729166666667,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":2,"bpmnBaseType":"Sequence","bpmnSubType":1,"ep":{"type":51},"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"model":"1000601","smodel":{"id":"script_task_47","x":950.0194932384504,"y":962.2007874015749,"rate":0.5,"sita":0},"emodel":{"id":"script_task_50","x":973.0194932384507,"y":962.2007874015749,"rate":0.5,"sita":180}},"comment_53":{"id":"comment_53","modelCode":"1000701","modelType":"DDeiPolygon","zIndex":5,"cpv":{"x":112.25203258600669,"y":68.65286458333333,"z":1},"hpv":[{"x":112.25203258600669,"y":68.65286458333333,"z":1},{"x":167.45125743761307,"y":68.65286458333333,"z":1}],"exPvs":{"_5e06d03fff106056a3ca8609e15982e8":{"x":112.25203258600669,"y":73.97760416666667,"z":1,"id":"_5e06d03fff106056a3ca8609e15982e8","sita":90}},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"text":"自动执行脚本","bpmnBaseType":"Comment","bpmnType":"Comment","borderType":0,"border":{"type":0,"selected":{"type":1,"dash":[5,5],"width":1}},"fill":{"type":0},"bpv":{"x":140.16557425267337,"y":79.30234375,"z":1}},"line_55":{"id":"line_55","modelCode":"1000601","modelType":"DDeiLine","zIndex":5,"hpv":[{"x":105.90203258600665,"y":91.50625,"z":1},{"x":132.36036591934004,"y":91.50625,"z":1}],"pvs":[{"x":105.90203258600665,"y":91.50625,"z":1,"isVector3":true},{"x":105.90203258600665,"y":82.74192708333332,"z":1},{"x":112.25203258600669,"y":82.74192708333332,"z":1},{"x":112.25203258600669,"y":73.97760416666667,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":961.5194749872126,"y":1531.4328248031832,"rate":0.15,"sita":-90,"ovi":{"x":null,"y":null,"z":1}}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_55_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"rotate":-90.0002,"cpv":{"x":105.90202775703324,"y":90.19160156250878,"z":1},"hpv":[{"x":105.90202775703324,"y":90.19160156250878,"z":1},{"x":105.90193057014827,"y":63.73326822935394,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":109.07701609458567,"y":87.01658990010398,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":3,"bpmnBaseType":"Sequence","bpmnSubType":5,"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"ep":{"type":0},"sp":{"type":0},"dash":[4,4]},"data_56":{"id":"data_56","modelCode":"1000501","modelType":"DDeiPolygon","zIndex":5,"cpv":{"x":142.94369925267338,"y":51.091145833333336,"z":1},"hpv":[{"x":142.94369925267338,"y":51.091145833333336,"z":1},{"x":163.43238711450354,"y":51.091145833333336,"z":1}],"exPvs":{},"poly":2,"linkModels":{"lsm_57":{"type":8,"dmid":"lsm_57"}},"mirrorX":false,"mirrorY":false,"sptStyle":{},"dataType":1,"bpmnBaseType":"Other","bpmnType":"DataObject","bpmnSubType":1,"name":"数据","bpv":{"x":149.0903056112224,"y":57.83802083333334,"z":1}},"lsm_57":{"id":"lsm_57","modelCode":"100200","modelType":"DDeiPolygon","zIndex":5,"cpv":{"x":142.94369925267338,"y":56.74661458333333,"z":1},"hpv":[{"x":142.94369925267338,"y":56.74661458333333,"z":1},{"x":159.14942841934004,"y":56.74661458333333,"z":1}],"exPvs":{},"poly":2,"depModel":{"id":"data_56","modelCode":"1000501","modelType":"DDeiPolygon","zIndex":5,"cpv":{"x":142.94369925267338,"y":51.091145833333336,"z":1},"hpv":[{"x":142.94369925267338,"y":51.091145833333336,"z":1},{"x":163.43238711450354,"y":51.091145833333336,"z":1}],"exPvs":{},"poly":2,"linkModels":{"lsm_57":{"type":8,"dmid":"lsm_57"}},"mirrorX":false,"mirrorY":false,"sptStyle":{},"dataType":1,"bpmnBaseType":"Other","bpmnType":"DataObject","bpmnSubType":1,"name":"数据","bpv":{"x":149.0903056112224,"y":57.83802083333334,"z":1}},"mirrorX":false,"mirrorY":false,"sptStyle":{},"borderType":0,"border":{"type":0,"selected":{"type":1,"dash":[5,5],"width":1}},"fill":{"type":0},"text":"数据","font":{"size":12},"textStyle":{"paddingWeight":0},"bpv":{"x":155.9082825860067,"y":61.31067708333334,"z":1}},"ds_59":{"id":"ds_59","modelCode":"1000507","modelType":"DDeiPolygon","zIndex":5,"cIndex":2,"cpv":{"x":210.54479166666658,"y":18.382031250000004,"z":1},"hpv":[{"x":210.54479166666658,"y":18.382031250000004,"z":1},{"x":237.00312500000007,"y":18.382031250000004,"z":1}],"exPvs":{"_7b656261b39e6a4ba075693ef6d751e1":{"x":203.93020833333338,"y":18.382031250000004,"z":1,"id":"_7b656261b39e6a4ba075693ef6d751e1","sita":180}},"poly":2,"linkModels":{"lsm_60":{"type":8,"dmid":"lsm_60"}},"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"DataStore","name":"数据存储","bpv":{"x":223.77395833333338,"y":26.319531250000008,"z":1}},"lsm_60":{"id":"lsm_60","modelCode":"100200","modelType":"DDeiPolygon","zIndex":5,"cpv":{"x":210.54479166666658,"y":25.585312499999983,"z":1},"hpv":[{"x":210.54479166666658,"y":25.585312499999983,"z":1},{"x":226.75052083333338,"y":25.585312499999983,"z":1}],"exPvs":{},"poly":2,"depModel":{"id":"ds_59","modelCode":"1000507","modelType":"DDeiPolygon","zIndex":5,"cIndex":2,"cpv":{"x":210.54479166666658,"y":18.382031250000004,"z":1},"hpv":[{"x":210.54479166666658,"y":18.382031250000004,"z":1},{"x":237.00312500000007,"y":18.382031250000004,"z":1}],"exPvs":{"_7b656261b39e6a4ba075693ef6d751e1":{"x":203.93020833333338,"y":18.382031250000004,"z":1,"id":"_7b656261b39e6a4ba075693ef6d751e1","sita":180}},"poly":2,"linkModels":{"lsm_60":{"type":8,"dmid":"lsm_60"}},"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"DataStore","name":"数据存储","bpv":{"x":223.77395833333338,"y":26.319531250000008,"z":1}},"mirrorX":false,"mirrorY":false,"sptStyle":{},"borderType":0,"border":{"type":0,"selected":{"type":1,"dash":[5,5],"width":1}},"fill":{"type":0},"text":"数据存储","font":{"size":12},"textStyle":{"paddingWeight":0},"bpv":{"x":223.50937500000003,"y":30.14937499999998,"z":1}},"line_62":{"id":"line_62","modelCode":"1000601","modelType":"DDeiLine","zIndex":5,"hpv":[{"x":188.24863894455572,"y":29.06458333333334,"z":1},{"x":214.70697227788907,"y":29.06458333333334,"z":1}],"pvs":[{"x":188.24863894455572,"y":29.06458333333334,"z":1,"isVector3":true},{"x":203.93020833333338,"y":18.382031250000004,"z":1,"isVector3":true}],"exPvs":{},"ovs":[{"x":1281.64115078599,"y":1294.3453994784427,"rate":0.15,"sita":-34.2634,"ovi":{"x":null,"y":null,"z":1}}],"mirrorX":false,"mirrorY":false,"composes":[{"id":"line_62_comp_0","modelCode":"100060101","modelType":"DDeiPolygon","cIndex":1,"rotate":-34.2629,"cpv":{"x":190.60088781212642,"y":27.462220278671264,"z":1},"hpv":[{"x":190.60088781212642,"y":27.462220278671264,"z":1},{"x":212.46772792691445,"y":12.566425362921548,"z":1}],"exPvs":{},"poly":2,"mirrorX":false,"mirrorY":false,"sptStyle":{},"bpmnBaseType":"Other","bpmnType":"ICON","bpv":{"x":195.01240401579113,"y":28.298745702555852,"z":1}}],"sptStyle":{},"from":"100401","subject":"bpmn","type":1,"bpmnBaseType":"Sequence","bpmnSubType":5,"sample":{"depPos":{"type":3},"depProps":{"3":"name"}},"freeze":0,"ep":{"type":0},"sp":{"type":0},"dash":[4,4]}},"midList":["start_6","user_task_8","line_9","script_task_10","line_11","parallel_gateway_12","line_13","subprocess_16","start_18","line_20","user_task_21","line_22","user_task_23","line_24","end_25","line_26","user_task_27","line_28","user_task_29","line_30","complex_gateway_33","line_36","line_37","script_task_38","line_39","line_40","end_41","line_42","boundaryevent_43","subprocess_45","line_49","script_task_47","script_task_50","line_52","comment_53","line_55","data_56","lsm_57","ds_59","lsm_60","line_62"],"modelType":"DDeiLayer","baseModelType":"DDeiLayer","index":-1,"background":null,"display":1,"lock":false,"print":true,"centerOpPoints":[],"modelCode":"DDeiLayer","modelChanged":true,"modelNumber":41}],"layerIndex":0,"idIdx":65,"modelType":"DDeiStage","ratio":1,"width":3367.559055118111,"height":2381.1023622047246,"wpv":{"x":-458.7507613652502,"y":-1136.4015748031497,"z":0},"links":[{"smpath":"exPvs._1318136d75826bdda48f364047d9b1b6","dmpath":"startPoint","smid":"start_6","dmid":"line_9"},{"smpath":"exPvs._f1ccd10ace1160e2be4437d3b182fa08","dmpath":"endPoint","smid":"user_task_8","dmid":"line_9"},{"smpath":"exPvs._8f0edf744d6e687aa03ee085ecee4739","dmpath":"startPoint","smid":"user_task_8","dmid":"line_11"},{"smpath":"exPvs._03e3ccb8189d6bafb97f1451317732a4","dmpath":"endPoint","smid":"script_task_10","dmid":"line_11"},{"smpath":"exPvs._f1a462fe4dc369378b9ca478e4dc1018","dmpath":"startPoint","smid":"script_task_10","dmid":"line_13"},{"smpath":"exPvs._c295e52aa04d67e79ae7f87c77006382","dmpath":"endPoint","smid":"parallel_gateway_12","dmid":"line_13"},{"smpath":"exPvs._e98a5c1f868160ec85e8a592ec902d6d","dmpath":"startPoint","smid":"parallel_gateway_12","dmid":"line_20"},{"smpath":"exPvs._d235a379e29b6098b926463fb89afa0e","dmpath":"endPoint","smid":"subprocess_16","dmid":"line_20"},{"smpath":"exPvs._e693f924fedb61ada74afd38aa7134c4","dmpath":"startPoint","smid":"start_18","dmid":"line_22"},{"smpath":"exPvs._18f0a9df8fc268088f3a42b0211ac08a","dmpath":"endPoint","smid":"user_task_21","dmid":"line_22"},{"smpath":"exPvs._85d0325774326916af7ed3c1551679f2","dmpath":"startPoint","smid":"user_task_21","dmid":"line_24"},{"smpath":"exPvs._b2a80d7995f765aeb1261235011464af","dmpath":"endPoint","smid":"user_task_23","dmid":"line_24"},{"smpath":"exPvs._bf438b7cb0456505882d9643c57f73fe","dmpath":"startPoint","smid":"user_task_23","dmid":"line_26"},{"smpath":"exPvs._0c839bb433216062a17894162bbf655c","dmpath":"endPoint","smid":"end_25","dmid":"line_26"},{"smpath":"exPvs._edd94417f150656283b0fa8ab7d286bb","dmpath":"endPoint","smid":"user_task_27","dmid":"line_28"},{"smpath":"exPvs._e5c954cc9aa4653ab5239d7a9ba34238","dmpath":"startPoint","smid":"parallel_gateway_12","dmid":"line_30"},{"smpath":"exPvs._7b6ba9d20b8f612484a8930bafc940ac","dmpath":"endPoint","smid":"user_task_29","dmid":"line_30"},{"smpath":"exPvs._c3073727bf1b675186ecb5ac6da0ce60","dmpath":"startPoint","smid":"parallel_gateway_12","dmid":"line_28"},{"smpath":"exPvs._fac98e0f05e66dcca4d3332856abad68","dmpath":"startPoint","smid":"subprocess_16","dmid":"line_36"},{"smpath":"exPvs._881ccfc48fbc6cb3ae77d1998d55768c","dmpath":"endPoint","smid":"complex_gateway_33","dmid":"line_36"},{"smpath":"exPvs._4e9f0b611cf96388bf8dbe8f3ec993c5","dmpath":"startPoint","smid":"user_task_27","dmid":"line_37"},{"smpath":"exPvs._3af5b4baada86643a16a0c366b2bf7a4","dmpath":"endPoint","smid":"complex_gateway_33","dmid":"line_37"},{"smpath":"exPvs._ec3b4e65b6796760a80a1bfa3bab09cf","dmpath":"startPoint","smid":"user_task_29","dmid":"line_39"},{"smpath":"exPvs._44797b276841609cab2d1659ab3f29de","dmpath":"endPoint","smid":"script_task_38","dmid":"line_39"},{"smpath":"exPvs._a5d36b4c1b226738889e8147ee5c25ef","dmpath":"startPoint","smid":"script_task_38","dmid":"line_40"},{"smpath":"exPvs._abe63832d14165dda23f0916b051c375","dmpath":"endPoint","smid":"complex_gateway_33","dmid":"line_40"},{"smpath":"exPvs._efb7b1ad89426e3299bc37f84583211d","dmpath":"startPoint","smid":"complex_gateway_33","dmid":"line_42"},{"smpath":"exPvs._aacebfccef6560cc9fd06a10864a1c3b","dmpath":"endPoint","smid":"end_41","dmid":"line_42"},{"smpath":"exPvs._0bbf93e13cc4646dbe3bc01cc88cef83","dmpath":"startPoint","smid":"boundaryevent_43","dmid":"line_49"},{"smpath":"exPvs._af0b90358e5f60ce85547bc0827f444e","dmpath":"endPoint","smid":"subprocess_45","dmid":"line_49"},{"smpath":"exPvs._6f2996ee787f61cbb7707a58fafaca53","dmpath":"startPoint","smid":"script_task_47","dmid":"line_52"},{"smpath":"exPvs._f51e09dcc6ee68a08599802e230db912","dmpath":"endPoint","smid":"script_task_50","dmid":"line_52"},{"smpath":"exPvs._c03ff9846cea6bfcbea7ba1c74335ebb","dmpath":"startPoint","smid":"script_task_10","dmid":"line_55"},{"smpath":"exPvs._c4a8ea255c3764b59b96b36d0f169e02","dmpath":"startPoint","smid":"user_task_27","dmid":"line_62"},{"smpath":"exPvs._7b656261b39e6a4ba075693ef6d751e1","dmpath":"endPoint","smid":"ds_59","dmid":"line_62"},{"smpath":"exPvs._5e06d03fff106056a3ca8609e15982e8","dmpath":"endPoint","smid":"comment_53","dmid":"line_55"}],"spv":{"x":561.2598425196851,"y":1190.5511811023623,"z":1},"modelCode":"DDeiStage","unit":"mm"},"active":1,"modelType":"DDeiSheet","unicode":"beeb4e5023b1666e8d462ef5b3d0aff9"}],"currentSheetIndex":0,"modelType":"DDeiFile","modelNumber":41,"unicode":"a64c99d8afd16c2c87e56de23c7094ca","ddeiVersion":1242}
`



const options = markRaw({
  config: {
    EXT_STAGE_WIDTH: false,
    initData: { // [!code focus:8]
      controls: [
        {
          model: "1000001",
          text: "1"
        }
      ]
    }
  },
  //配置扩展插件
  extensions: [

    DDeiFlow,
    DDeiCoreTopMenuSimplePanel.configuration({
      direct: 2,//方向，1纵向，2横向
      position: 2,//位置1-9顺时针，1为左上角，9为中心
      drag: 1,//是否允许拖拽位置
      items: [//自定义菜单
        {
          id: "ddei-core-new",
          name: "ddei.new"
        },
        {
          id: "ddei-core-open",
          name: "ddei.open"
        },
        {
          id: "ddei-core-save",
          name: "ddei.save"
        },
        {
          id: "ddei-core-download",
          name: "ddei.download"
        },
        {
          name: "导入",
          action: function (editor) {
            let bpmnXMLDemo = `<?xml version="1.0" encoding="UTF-8"?>
<definitions
    xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:flowable="http://flowable.org/bpmn"
    xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
    xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
    xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef" exporter="Flowable Open Source Modeler" exporterVersion="6.8.0">
    <process id="demo_qjlc" name="案例-请假申请流程" isExecutable="true">
        <documentation>测试案例1</documentation>
        <startEvent id="startEvent1" name="启动" flowable:initiator="INITIATOR" flowable:formFieldValidation="true"></startEvent>
        <userTask id="sqr" name="申请人" flowable:formFieldValidation="true">
            <documentation>流程发起人</documentation>
            <extensionElements>
                <modeler:initiator-can-complete
                    xmlns:modeler="http://flowable.org/modeler">
                    <![CDATA[false]]>
                </modeler:initiator-can-complete>
            </extensionElements>
        </userTask>
        <sequenceFlow id="sid-EEF0DA1F-554E-4439-920E-0382841D7DE2" sourceRef="startEvent1" targetRef="sqr"></sequenceFlow>
        <userTask id="leader" name="主管" flowable:assignee="#{leader}" flowable:formFieldValidation="true">
            <extensionElements>
                <modeler:initiator-can-complete
                    xmlns:modeler="http://flowable.org/modeler">
                    <![CDATA[false]]>
                </modeler:initiator-can-complete>
            </extensionElements>
            <multiInstanceLoopCharacteristics isSequential="false"  flowable:elementVariable="leader">
                <extensionElements></extensionElements>
                <completionCondition></completionCondition>
            </multiInstanceLoopCharacteristics>
        </userTask>
        <sequenceFlow id="sid-5DE8C566-4721-456A-9240-CF4BF3DC7A61" sourceRef="sqr" targetRef="leader"></sequenceFlow>
        <userTask id="hr" name="HR" flowable:assignee="lisi" flowable:formFieldValidation="true">
            <extensionElements>
                <modeler:initiator-can-complete
                    xmlns:modeler="http://flowable.org/modeler">
                    <![CDATA[false]]>
                </modeler:initiator-can-complete>
            </extensionElements>
        </userTask>
        <endEvent id="sid-B951D5DB-EA64-4CD3-8F35-6463CA83A154" name="归档"></endEvent>
        <exclusiveGateway id="sid-38DE5F46-A270-4060-87D2-3DB97997B861"></exclusiveGateway>
        <sequenceFlow id="sid-D0666311-783F-49EC-95F7-13C648383566" sourceRef="leader" targetRef="sid-38DE5F46-A270-4060-87D2-3DB97997B861"></sequenceFlow>
        <sequenceFlow id="sid-ADD2E384-E8CC-4136-B881-93CFDC340A4E" sourceRef="hr" targetRef="sid-B951D5DB-EA64-4CD3-8F35-6463CA83A154"></sequenceFlow>
        <userTask id="leader2" name="最高主管" flowable:assignee="wangwu" flowable:formFieldValidation="true">
            <extensionElements>
                <modeler:initiator-can-complete
                    xmlns:modeler="http://flowable.org/modeler">
                    <![CDATA[false]]>
                </modeler:initiator-can-complete>
            </extensionElements>
        </userTask>
        <sequenceFlow id="sid-753BBA2E-1D21-41EA-B44F-E8A0CDEE3D17" name="请假天数&lt;7" sourceRef="sid-38DE5F46-A270-4060-87D2-3DB97997B861" targetRef="hr">
            <conditionExpression xsi:type="tFormalExpression">
                <![CDATA[#{days < 7}]]>
            </conditionExpression>
        </sequenceFlow>
        <sequenceFlow id="sid-5F44C7A8-94DB-4EA3-A77F-5DF3092F1C56" name="请假天数&gt;=7" sourceRef="sid-38DE5F46-A270-4060-87D2-3DB97997B861" targetRef="leader2">
            <conditionExpression xsi:type="tFormalExpression">
                <![CDATA[days >= 7]]>
            </conditionExpression>
        </sequenceFlow>
        <sequenceFlow id="sid-6A8F54F5-165A-430F-A218-F8B6A054B784" sourceRef="leader2" targetRef="hr"></sequenceFlow>
    </process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_demo_qjlc">
        <bpmndi:BPMNPlane bpmnElement="demo_qjlc" id="BPMNPlane_demo_qjlc">
            <bpmndi:BPMNShape bpmnElement="startEvent1" id="BPMNShape_startEvent1">
                <omgdc:Bounds height="30.0" width="30.0" x="120.0" y="145.625"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="sqr" id="BPMNShape_sqr">
                <omgdc:Bounds height="80.0" width="100.0" x="195.0" y="120.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="leader" id="BPMNShape_leader">
                <omgdc:Bounds height="80.0" width="100.0" x="330.0" y="120.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="hr" id="BPMNShape_hr">
                <omgdc:Bounds height="80.0" width="100.0" x="645.0" y="120.625"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="sid-B951D5DB-EA64-4CD3-8F35-6463CA83A154" id="BPMNShape_sid-B951D5DB-EA64-4CD3-8F35-6463CA83A154">
                <omgdc:Bounds height="28.0" width="28.0" x="870.0" y="146.625"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="sid-38DE5F46-A270-4060-87D2-3DB97997B861" id="BPMNShape_sid-38DE5F46-A270-4060-87D2-3DB97997B861">
                <omgdc:Bounds height="40.0" width="40.0" x="475.0" y="140.625"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="leader2" id="BPMNShape_leader2">
                <omgdc:Bounds height="80.0" width="100.0" x="445.0" y="315.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNEdge bpmnElement="sid-EEF0DA1F-554E-4439-920E-0382841D7DE2" id="BPMNEdge_sid-EEF0DA1F-554E-4439-920E-0382841D7DE2" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
                <omgdi:waypoint x="149.94976375101032" y="160.53977407408564"></omgdi:waypoint>
                <omgdi:waypoint x="194.99999999999565" y="160.28380681818183"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="sid-D0666311-783F-49EC-95F7-13C648383566" id="BPMNEdge_sid-D0666311-783F-49EC-95F7-13C648383566" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="20.0" flowable:targetDockerY="20.0">
                <omgdi:waypoint x="429.95000000000005" y="160.27146739130436"></omgdi:waypoint>
                <omgdi:waypoint x="475.0672391445236" y="160.5168918918919"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="sid-5F44C7A8-94DB-4EA3-A77F-5DF3092F1C56" id="BPMNEdge_sid-5F44C7A8-94DB-4EA3-A77F-5DF3092F1C56" flowable:sourceDockerX="20.0" flowable:sourceDockerY="20.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
                <omgdi:waypoint x="495.0" y="180.5698708060162"></omgdi:waypoint>
                <omgdi:waypoint x="495.0" y="315.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="sid-ADD2E384-E8CC-4136-B881-93CFDC340A4E" id="BPMNEdge_sid-ADD2E384-E8CC-4136-B881-93CFDC340A4E" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
                <omgdi:waypoint x="744.9499999999675" y="160.625"></omgdi:waypoint>
                <omgdi:waypoint x="870.0" y="160.625"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="sid-753BBA2E-1D21-41EA-B44F-E8A0CDEE3D17" id="BPMNEdge_sid-753BBA2E-1D21-41EA-B44F-E8A0CDEE3D17" flowable:sourceDockerX="20.0" flowable:sourceDockerY="20.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
                <omgdi:waypoint x="514.9450149924147" y="160.625"></omgdi:waypoint>
                <omgdi:waypoint x="645.0" y="160.625"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="sid-5DE8C566-4721-456A-9240-CF4BF3DC7A61" id="BPMNEdge_sid-5DE8C566-4721-456A-9240-CF4BF3DC7A61" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
                <omgdi:waypoint x="294.9499999999527" y="160.0"></omgdi:waypoint>
                <omgdi:waypoint x="329.99999999997203" y="160.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="sid-6A8F54F5-165A-430F-A218-F8B6A054B784" id="BPMNEdge_sid-6A8F54F5-165A-430F-A218-F8B6A054B784" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
                <omgdi:waypoint x="536.1061093247588" y="315.0"></omgdi:waypoint>
                <omgdi:waypoint x="653.8424437299035" y="200.575"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
</definitions>`

            bpmnXMLDemo = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions id="5b998cd6006e65c687237399493c452f" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:escalation id="start_91_escal" name="up1" />
  <bpmn:signal id="start_84_signal" name="sig02" />
  <bpmn:message id="start_83_msg" name="msg02" />
  <bpmn:escalation id="start_79_escal" name="upgread" />
  <bpmn:error id="start_71_error" errorCode="err01" />
  <bpmn:signal id="start_69_signal" name="sig01" />
  <bpmn:message id="start_68_msg" name="msg01" />
  <bpmn:signal id="ithrowevt_96_signal" name="sign222" />
  <bpmn:message id="ithrowevt_93_msg" name="throw1" />
  <bpmn:escalation id="ithrowevt_100_escal" name="els1111" />
  <bpmn:signal id="icatchevt_86_signal" name="icsign" />
  <bpmn:message id="icatchevt_85_msg" name="icmsg" />
  <bpmn:escalation id="end_99_escal" name="erroresc" />
  <bpmn:signal id="end_95_signal" name="errsign" />
  <bpmn:message id="end_94_msg" name="errormsg" />
  <bpmn:error id="end_101_error" errorCode="errend" />
  <bpmn:message id="boundaryevent_98_msg" name="" />
  <bpmn:escalation id="boundaryevent_133_escal" name="bound_esc1" />
  <bpmn:message id="boundaryevent_127_msg" name="bound_msg1" />
  <bpmn:escalation id="boundaryevent_119_escal" name="bound_esc" />
  <bpmn:error id="boundaryevent_116_error" errorCode="bound_err" />
  <bpmn:signal id="boundaryevent_115_signal" name="bound_sign" />
  <bpmn:message id="boundaryevent_111_msg" name="bound_msg" />
  <bpmn:process id="stage_1" isExecutable="true">
   <bpmn:userTask id="user_task_8">
    <bpmn:incoming>line_9</bpmn:incoming>
    <bpmn:outgoing>line_11</bpmn:outgoing>
   </bpmn:userTask>
   <bpmn:userTask id="user_task_29">
    <bpmn:incoming>line_30</bpmn:incoming>
    <bpmn:outgoing>line_39</bpmn:outgoing>
   </bpmn:userTask>
   <bpmn:userTask id="user_task_27">
    <bpmn:incoming>line_28</bpmn:incoming>
    <bpmn:outgoing>line_37</bpmn:outgoing>
    <bpmn:outgoing>line_62</bpmn:outgoing>
   </bpmn:userTask>
   <bpmn:transaction id="subprocess_45" name="补偿" isForCompensation="true">
    <bpmn:multiInstanceLoopCharacteristics>
    </bpmn:multiInstanceLoopCharacteristics>
    <bpmn:scriptTask id="script_task_50" name="补偿脚本"/>
    <bpmn:scriptTask id="script_task_47" name="补偿脚本"/>
   </bpmn:transaction>
   <bpmn:transaction id="subprocess_16">
    <bpmn:userTask id="user_task_23"/>
    <bpmn:userTask id="user_task_21"/>
    <bpmn:startEvent id="start_18"/>
    <bpmn:endEvent id="end_25"/>
   </bpmn:transaction>
   <bpmn:startEvent id="start_96"/>
   <bpmn:startEvent id="start_91">
    <bpmn:escalationEventDefinition escalationRef="start_91_escal"/>
   <bpmn:nonInterrupting>true</bpmn:nonInterrupting>
   </bpmn:startEvent>
   <bpmn:startEvent id="start_90">
    <bpmn:conditionalEventDefinition>
     <bpmn:condition xsi:type="bpmn:tFormalExpression">       <![CDATA[]]>
     </bpmn:condition>
    </bpmn:conditionalEventDefinition>
   <bpmn:nonInterrupting>true</bpmn:nonInterrupting>
   </bpmn:startEvent>
   <bpmn:startEvent id="start_89" parallelMultiple="true">
   <bpmn:nonInterrupting>true</bpmn:nonInterrupting>
   </bpmn:startEvent>
   <bpmn:startEvent id="start_88">
    <bpmn:timerEventDefinition>
      <bpmn:timeDate></bpmn:timeDate>
    </bpmn:timerEventDefinition>
   <bpmn:nonInterrupting>true</bpmn:nonInterrupting>
   </bpmn:startEvent>
   <bpmn:startEvent id="start_87">
    <bpmn:compensateEventDefinition />
   <bpmn:nonInterrupting>true</bpmn:nonInterrupting>
   </bpmn:startEvent>
   <bpmn:startEvent id="start_85">
    <bpmn:multiInstanceLoopCharacteristics isSequential="false">
    </bpmn:multiInstanceLoopCharacteristics>
   <bpmn:nonInterrupting>true</bpmn:nonInterrupting>
   </bpmn:startEvent>
   <bpmn:startEvent id="start_84">
    <bpmn:signalEventDefinition id="start_84_signal_def" signalRef="start_84_signal"/>
   <bpmn:nonInterrupting>true</bpmn:nonInterrupting>
   </bpmn:startEvent>
   <bpmn:startEvent id="start_83">
    <bpmn:messageEventDefinition messageRef="start_83_msg" />
   <bpmn:nonInterrupting>true</bpmn:nonInterrupting>
   </bpmn:startEvent>
   <bpmn:startEvent id="start_79">
    <bpmn:escalationEventDefinition escalationRef="start_79_escal"/>
   </bpmn:startEvent>
   <bpmn:startEvent id="start_78">
    <bpmn:conditionalEventDefinition>
     <bpmn:condition xsi:type="bpmn:tFormalExpression">       <![CDATA[aa>00]]>
     </bpmn:condition>
    </bpmn:conditionalEventDefinition>
   </bpmn:startEvent>
   <bpmn:startEvent id="start_75" parallelMultiple="true"/>
   <bpmn:startEvent id="start_74">
    <bpmn:timerEventDefinition>
      <bpmn:timeDate></bpmn:timeDate>
    </bpmn:timerEventDefinition>
   </bpmn:startEvent>
   <bpmn:startEvent id="start_73">
    <bpmn:compensateEventDefinition />
   </bpmn:startEvent>
   <bpmn:startEvent id="start_71">
    <bpmn:errorEventDefinition errorRef="start_71_error" />
   </bpmn:startEvent>
   <bpmn:startEvent id="start_70">
    <bpmn:multiInstanceLoopCharacteristics isSequential="false">
     <bpmn:loopCardinality xsi:type="bpmn:tFormalExpression">      <![CDATA[10]]>
     </bpmn:loopCardinality>
    </bpmn:multiInstanceLoopCharacteristics>
   </bpmn:startEvent>
   <bpmn:startEvent id="start_69">
    <bpmn:signalEventDefinition id="start_69_signal_def" signalRef="start_69_signal"/>
   </bpmn:startEvent>
   <bpmn:startEvent id="start_68">
    <bpmn:messageEventDefinition messageRef="start_68_msg" />
   </bpmn:startEvent>
   <bpmn:startEvent id="start_66"/>
   <bpmn:startEvent id="start_6"/>
   <bpmn:scriptTask id="script_task_38">
    <bpmn:incoming>line_39</bpmn:incoming>
    <bpmn:outgoing>line_40</bpmn:outgoing>
   </bpmn:scriptTask>
   <bpmn:scriptTask id="script_task_10">
    <bpmn:incoming>line_11</bpmn:incoming>
    <bpmn:outgoing>line_13</bpmn:outgoing>
    <bpmn:outgoing>line_55</bpmn:outgoing>
   </bpmn:scriptTask>
   <bpmn:parallelGateway id="parallel_gateway_12">
    <bpmn:incoming>line_13</bpmn:incoming>
    <bpmn:outgoing>line_20</bpmn:outgoing>
    <bpmn:outgoing>line_28</bpmn:outgoing>
    <bpmn:outgoing>line_30</bpmn:outgoing>
   </bpmn:parallelGateway>
   <bpmn:intermediateThrowEvent id="ithrowevt_99">
    <bpmn:multiInstanceLoopCharacteristics isSequential="false">
     <bpmn:loopCardinality xsi:type="bpmn:tFormalExpression">      <![CDATA[11]]>
     </bpmn:loopCardinality>
    </bpmn:multiInstanceLoopCharacteristics>
   </bpmn:intermediateThrowEvent>
   <bpmn:intermediateThrowEvent id="ithrowevt_98">
    <bpmn:compensateEventDefinition />
   </bpmn:intermediateThrowEvent>
   <bpmn:intermediateThrowEvent id="ithrowevt_96">
    <bpmn:signalEventDefinition id="ithrowevt_96_signal_def" signalRef="ithrowevt_96_signal" />
   </bpmn:intermediateThrowEvent>
   <bpmn:intermediateThrowEvent id="ithrowevt_93">
    <bpmn:messageEventDefinition messageRef="ithrowevt_93_msg" />
   </bpmn:intermediateThrowEvent>
   <bpmn:intermediateThrowEvent id="ithrowevt_91"/>
   <bpmn:intermediateThrowEvent id="ithrowevt_101">
   <bpmn:linkEventDefinition/>
   </bpmn:intermediateThrowEvent>
   <bpmn:intermediateThrowEvent id="ithrowevt_100">
    <bpmn:escalationEventDefinition escalationRef="ithrowevt_100_escal"/>
   </bpmn:intermediateThrowEvent>
   <bpmn:intermediateCatchEvent id="icatchevt_89">
    <bpmn:multiInstanceLoopCharacteristics isSequential="false">
     <bpmn:loopCardinality xsi:type="bpmn:tFormalExpression">      <![CDATA[5]]>
     </bpmn:loopCardinality>
    </bpmn:multiInstanceLoopCharacteristics>
   </bpmn:intermediateCatchEvent>
   <bpmn:intermediateCatchEvent id="icatchevt_88" parallelMultiple="true"/>
   <bpmn:intermediateCatchEvent id="icatchevt_87">
   <bpmn:linkEventDefinition/>
   </bpmn:intermediateCatchEvent>
   <bpmn:intermediateCatchEvent id="icatchevt_86">
    <bpmn:signalEventDefinition id="icatchevt_86_signal_def" signalRef="icatchevt_86_signal" />
   </bpmn:intermediateCatchEvent>
   <bpmn:intermediateCatchEvent id="icatchevt_85">
    <bpmn:messageEventDefinition messageRef="icatchevt_85_msg" />
   </bpmn:intermediateCatchEvent>
   <bpmn:intermediateCatchEvent id="icatchevt_83">
    <bpmn:timerEventDefinition>
      <bpmn:timeDate></bpmn:timeDate>
    </bpmn:timerEventDefinition>
   </bpmn:intermediateCatchEvent>
   <bpmn:endEvent id="end_99">
    <bpmn:escalationEventDefinition escalationRef="end_99_escal"/>
   </bpmn:endEvent>
   <bpmn:endEvent id="end_97">
    <bpmn:multiInstanceLoopCharacteristics isSequential="false">
     <bpmn:loopCardinality xsi:type="bpmn:tFormalExpression">      <![CDATA[5]]>
     </bpmn:loopCardinality>
    </bpmn:multiInstanceLoopCharacteristics>
   </bpmn:endEvent>
   <bpmn:endEvent id="end_95">
    <bpmn:signalEventDefinition id="end_95_signal_def" signalRef="end_95_signal"/>
   </bpmn:endEvent>
   <bpmn:endEvent id="end_94">
    <bpmn:messageEventDefinition messageRef="end_94_msg" />
   </bpmn:endEvent>
   <bpmn:endEvent id="end_92"/>
   <bpmn:endEvent id="end_41"/>
   <bpmn:endEvent id="end_107">
    <bpmn:terminateEventDefinition/>
   </bpmn:endEvent>
   <bpmn:endEvent id="end_105">
    <bpmn:cancelEventDefinition/>
   </bpmn:endEvent>
   <bpmn:endEvent id="end_103">
    <bpmn:compensateEventDefinition />
   </bpmn:endEvent>
   <bpmn:endEvent id="end_101">
    <bpmn:errorEventDefinition errorRef="end_101_error"/>
   </bpmn:endEvent>
   <bpmn:task id="lsm_58"/>
   <bpmn:dataStore id="ds_59" name="数据存储"/>
   <bpmn:task id="lsm_60"/>
   <bpmn:dataObject id="data_56" name="数据" itemSubjectRef="xsd:string"/>
   <bpmn:complexGateway id="complex_gateway_33">
    <bpmn:incoming>line_36</bpmn:incoming>
    <bpmn:incoming>line_37</bpmn:incoming>
    <bpmn:incoming>line_40</bpmn:incoming>
    <bpmn:outgoing>line_42</bpmn:outgoing>
   </bpmn:complexGateway>
   <bpmn:textAnnotation id="comment_53">
     <bpmn:text>自动执行脚本</bpmn:text>
   </bpmn:textAnnotation>
   <bpmn:boundaryEvent id="boundaryevent_98" cancelActivity="true">
    <bpmn:messageEventDefinition messageRef="boundaryevent_98_msg" />
   </bpmn:boundaryEvent>
   <bpmn:boundaryEvent id="boundaryevent_43" cancelActivity="true" attachedToRef="script_task_10">
    <bpmn:errorEventDefinition/>
   </bpmn:boundaryEvent>
   <bpmn:boundaryEvent id="boundaryevent_135" cancelActivity="false">
    <bpmn:multiInstanceLoopCharacteristics isSequential="false">
     <bpmn:loopCardinality xsi:type="bpmn:tFormalExpression">      <![CDATA[2]]>
     </bpmn:loopCardinality>
    </bpmn:multiInstanceLoopCharacteristics>
   <bpmn:nonInterrupting>true</bpmn:nonInterrupting>
   </bpmn:boundaryEvent>
   <bpmn:boundaryEvent id="boundaryevent_134" cancelActivity="false" parallelMultiple="true">
   <bpmn:nonInterrupting>true</bpmn:nonInterrupting>
   </bpmn:boundaryEvent>
   <bpmn:boundaryEvent id="boundaryevent_133" cancelActivity="false">
    <bpmn:escalationEventDefinition escalationRef="boundaryevent_133_escal"/>
   <bpmn:nonInterrupting>true</bpmn:nonInterrupting>
   </bpmn:boundaryEvent>
   <bpmn:boundaryEvent id="boundaryevent_128" cancelActivity="false">
    <bpmn:timerEventDefinition>
      <bpmn:timeCycle>12342</bpmn:timeCycle>
    </bpmn:timerEventDefinition>
   <bpmn:nonInterrupting>true</bpmn:nonInterrupting>
   </bpmn:boundaryEvent>
   <bpmn:boundaryEvent id="boundaryevent_127" cancelActivity="false">
    <bpmn:messageEventDefinition messageRef="boundaryevent_127_msg" />
   <bpmn:nonInterrupting>true</bpmn:nonInterrupting>
   </bpmn:boundaryEvent>
   <bpmn:boundaryEvent id="boundaryevent_122" cancelActivity="true">
    <bpmn:multiInstanceLoopCharacteristics isSequential="false">
     <bpmn:loopCardinality xsi:type="bpmn:tFormalExpression">      <![CDATA[5]]>
     </bpmn:loopCardinality>
    </bpmn:multiInstanceLoopCharacteristics>
   </bpmn:boundaryEvent>
   <bpmn:boundaryEvent id="boundaryevent_120" cancelActivity="true" parallelMultiple="true"/>
   <bpmn:boundaryEvent id="boundaryevent_119" cancelActivity="true">
    <bpmn:escalationEventDefinition escalationRef="boundaryevent_119_escal"/>
   </bpmn:boundaryEvent>
   <bpmn:boundaryEvent id="boundaryevent_118">
    <bpmn:cancelEventDefinition />
   </bpmn:boundaryEvent>
   <bpmn:boundaryEvent id="boundaryevent_117">
    <bpmn:compensateEventDefinition />
   </bpmn:boundaryEvent>
   <bpmn:boundaryEvent id="boundaryevent_116" cancelActivity="true">
    <bpmn:errorEventDefinition errorRef="boundaryevent_116_error" />
   </bpmn:boundaryEvent>
   <bpmn:boundaryEvent id="boundaryevent_115" cancelActivity="true">
    <bpmn:signalEventDefinition id="boundaryevent_115_signal_def" signalRef="boundaryevent_115_signal" />
   </bpmn:boundaryEvent>
   <bpmn:boundaryEvent id="boundaryevent_113" cancelActivity="true">
    <bpmn:timerEventDefinition>
      <bpmn:timeCycle>1234</bpmn:timeCycle>
    </bpmn:timerEventDefinition>
   </bpmn:boundaryEvent>
   <bpmn:boundaryEvent id="boundaryevent_111" cancelActivity="true">
    <bpmn:messageEventDefinition messageRef="boundaryevent_111_msg" />
   </bpmn:boundaryEvent>
   <bpmn:sequenceFlow id="line_9" sourceRef="start_6" targetRef="user_task_8"/>
   <bpmn:sequenceFlow id="line_11" sourceRef="user_task_8" targetRef="script_task_10"/>
   <bpmn:sequenceFlow id="line_13" sourceRef="script_task_10" targetRef="parallel_gateway_12"/>
   <bpmn:sequenceFlow id="line_20" sourceRef="parallel_gateway_12" targetRef="subprocess_16"/>
   <bpmn:sequenceFlow id="line_22" sourceRef="start_18" targetRef="user_task_21"/>
   <bpmn:sequenceFlow id="line_24" sourceRef="user_task_21" targetRef="user_task_23"/>
   <bpmn:sequenceFlow id="line_26" sourceRef="user_task_23" targetRef="end_25"/>
   <bpmn:sequenceFlow id="line_28" sourceRef="parallel_gateway_12" targetRef="user_task_27"/>
   <bpmn:sequenceFlow id="line_30" sourceRef="parallel_gateway_12" targetRef="user_task_29"/>
   <bpmn:sequenceFlow id="line_36" sourceRef="subprocess_16" targetRef="complex_gateway_33"/>
   <bpmn:sequenceFlow id="line_37" sourceRef="user_task_27" targetRef="complex_gateway_33"/>
   <bpmn:sequenceFlow id="line_39" sourceRef="user_task_29" targetRef="script_task_38"/>
   <bpmn:sequenceFlow id="line_40" sourceRef="script_task_38" targetRef="complex_gateway_33"/>
   <bpmn:sequenceFlow id="line_42" sourceRef="complex_gateway_33" targetRef="end_41"/>
   <bpmn:sequenceFlow id="line_49" sourceRef="boundaryevent_43" targetRef="subprocess_45"/>
   <bpmn:sequenceFlow id="line_52" sourceRef="script_task_47" targetRef="script_task_50"/>
   <bpmn:association id="line_55" targetRef="comment_53" sourceRef="script_task_10" associationDirection="None"/>
   <bpmn:association id="line_62" sourceRef="user_task_27" targetRef="ds_59" associationDirection="None"/>
   <bpmn:callActivity id="call_98" calledElement="subprocess_16">
    <bpmn:multiInstanceLoopCharacteristics isSequential="true">
    </bpmn:multiInstanceLoopCharacteristics>
   </bpmn:callActivity>
   <bpmn:businessRuleTask id="busisrule_task_100" isForCompensation="true">
    <bpmn:documentation><![CDATA[1111]]></bpmn:documentation>
    <bpmn:multiInstanceLoopCharacteristics>
    </bpmn:multiInstanceLoopCharacteristics>
   </bpmn:businessRuleTask>
  </bpmn:process>

  <bpmndi:BPMNDiagram id="Diagram_5b998cd6006e65c687237399493c452f">
   <bpmndi:BPMNPlane id="Plane_stage_1" bpmnElement="stage_1">
    <bpmndi:BPMNShape id="user_task_8_id" bpmnElement="user_task_8">
     <dc:Bounds x="880.3697850393701" y="1495.9394148031497" width="110" height="70"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="user_task_29_id" bpmnElement="user_task_29">
     <dc:Bounds x="1349.3699050393698" y="1720.9394148031497" width="110.00000000000045" height="70"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="user_task_27_id" bpmnElement="user_task_27">
     <dc:Bounds x="1349.3699050393698" y="1259.9394148031497" width="110.00000000000045" height="70"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="subprocess_45_id" bpmnElement="subprocess_45">
     <dc:Bounds x="992.8697830393698" y="1639.9394148031497" width="225" height="151"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="script_task_50_id" bpmnElement="script_task_50">
     <dc:Bounds x="1116.8697830393703" y="1681.6894148031497" width="87" height="67.5"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="script_task_47_id" bpmnElement="script_task_47">
     <dc:Bounds x="1006.8697850393701" y="1681.6894148031497" width="87" height="67.5"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="subprocess_16_id" bpmnElement="subprocess_16">
     <dc:Bounds x="1349.3699050393702" y="1389.5378048031498" width="407" height="283"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="user_task_23_id" bpmnElement="user_task_23">
     <dc:Bounds x="1563.8699050393698" y="1496.0378048031498" width="110" height="70"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="user_task_21_id" bpmnElement="user_task_21">
     <dc:Bounds x="1428.36978503937" y="1496.0378048031498" width="110" height="70"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_18_id" bpmnElement="start_18">
     <dc:Bounds x="1354.36997753937" y="1511.0377533031499" width="39.999615000000176" height="39.99961499999972"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="end_25_id" bpmnElement="end_25">
     <dc:Bounds x="1708.8697275393695" y="1511.0377533031499" width="39.999615000000176" height="39.99961499999972"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_96_id" bpmnElement="start_96">
     <dc:Bounds x="502.7032775393702" y="1455.40188730315" width="39.99961499999995" height="39.99961499999972"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_91_id" bpmnElement="start_91">
     <dc:Bounds x="1850.6010775393695" y="1193.51431730315" width="39.999615000000176" height="39.99961499999972"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_90_id" bpmnElement="start_90">
     <dc:Bounds x="1850.6010775393695" y="1110.3642873031497" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_89_id" bpmnElement="start_89">
     <dc:Bounds x="1777.3697275393695" y="1193.51431730315" width="39.999615000000176" height="39.99961499999972"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_88_id" bpmnElement="start_88">
     <dc:Bounds x="1777.3697275393695" y="1110.3642873031497" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_87_id" bpmnElement="start_87">
     <dc:Bounds x="1626.6010775393695" y="1110.3642873031497" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_85_id" bpmnElement="start_85">
     <dc:Bounds x="1699.60107753937" y="1193.51431730315" width="39.999615000000176" height="39.99961499999972"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_84_id" bpmnElement="start_84">
     <dc:Bounds x="1612.60105753937" y="1193.51431730315" width="39.999615000000176" height="39.99961499999972"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_83_id" bpmnElement="start_83">
     <dc:Bounds x="1699.60107753937" y="1110.3642873031497" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_79_id" bpmnElement="start_79">
     <dc:Bounds x="988.6012975393701" y="1309.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_78_id" bpmnElement="start_78">
     <dc:Bounds x="988.6012975393701" y="1226.7892173031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_75_id" bpmnElement="start_75">
     <dc:Bounds x="915.3700375393702" y="1309.9392473031496" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_74_id" bpmnElement="start_74">
     <dc:Bounds x="915.3700375393702" y="1226.7892173031496" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_73_id" bpmnElement="start_73">
     <dc:Bounds x="837.60123753937" y="1377.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_71_id" bpmnElement="start_71">
     <dc:Bounds x="750.6012375393702" y="1377.9392473031496" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_70_id" bpmnElement="start_70">
     <dc:Bounds x="837.60123753937" y="1309.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_69_id" bpmnElement="start_69">
     <dc:Bounds x="750.6012375393702" y="1309.9392473031496" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_68_id" bpmnElement="start_68">
     <dc:Bounds x="837.60123753937" y="1226.7892173031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_66_id" bpmnElement="start_66">
     <dc:Bounds x="750.6012375393702" y="1226.7892173031496" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="start_6_id" bpmnElement="start_6">
     <dc:Bounds x="780.3702175393702" y="1510.9392433031496" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="script_task_38_id" bpmnElement="script_task_38">
     <dc:Bounds x="1519.3699050393705" y="1720.9394148031497" width="109.99999999999955" height="70"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="script_task_10_id" bpmnElement="script_task_10">
     <dc:Bounds x="1050.3697830393698" y="1495.9394148031497" width="110" height="70"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="parallel_gateway_12_id" bpmnElement="parallel_gateway_12">
     <dc:Bounds x="1220.36978503937" y="1505.9394148031497" width="50" height="50"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="ithrowevt_99_id" bpmnElement="ithrowevt_99">
     <dc:Bounds x="536.9493175393702" y="1831.4017673031497" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="ithrowevt_98_id" bpmnElement="ithrowevt_98">
     <dc:Bounds x="442.9493175393702" y="1831.4017673031497" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="ithrowevt_96_id" bpmnElement="ithrowevt_96">
     <dc:Bounds x="615.9493175393702" y="1757.4017673031497" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="ithrowevt_93_id" bpmnElement="ithrowevt_93">
     <dc:Bounds x="518.9493175393702" y="1756.4017673031497" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="ithrowevt_91_id" bpmnElement="ithrowevt_91">
     <dc:Bounds x="440.9493175393702" y="1752.4017673031497" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="ithrowevt_101_id" bpmnElement="ithrowevt_101">
     <dc:Bounds x="665.9493175393702" y="1752.4017673031497" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="ithrowevt_100_id" bpmnElement="ithrowevt_100">
     <dc:Bounds x="624.9493175393702" y="1824.4017673031497" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="icatchevt_89_id" bpmnElement="icatchevt_89">
     <dc:Bounds x="611.9493175393702" y="1617.4017673031497" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="icatchevt_88_id" bpmnElement="icatchevt_88">
     <dc:Bounds x="536.9493175393702" y="1619.9393653031495" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="icatchevt_87_id" bpmnElement="icatchevt_87">
     <dc:Bounds x="466.9493175393702" y="1617.4017673031497" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="icatchevt_86_id" bpmnElement="icatchevt_86">
     <dc:Bounds x="592.9493175393702" y="1560.05496550315" width="39.99961499999995" height="39.99961499999972"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="icatchevt_85_id" bpmnElement="icatchevt_85">
     <dc:Bounds x="536.9493175393702" y="1560.05496550315" width="39.99961499999995" height="39.99961499999972"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="icatchevt_83_id" bpmnElement="icatchevt_83">
     <dc:Bounds x="474.9493175393702" y="1560.05496550315" width="39.99961499999995" height="39.99961499999972"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="end_99_id" bpmnElement="end_99">
     <dc:Bounds x="938.6012975393702" y="1892.9392473031496" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="end_97_id" bpmnElement="end_97">
     <dc:Bounds x="832.60123753937" y="1892.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="end_95_id" bpmnElement="end_95">
     <dc:Bounds x="1030.3700375393698" y="1842.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="end_94_id" bpmnElement="end_94">
     <dc:Bounds x="938.6012975393702" y="1842.9392473031496" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="end_92_id" bpmnElement="end_92">
     <dc:Bounds x="832.60123753937" y="1842.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="end_41_id" bpmnElement="end_41">
     <dc:Bounds x="1906.3365275393696" y="1510.9392433031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="end_107_id" bpmnElement="end_107">
     <dc:Bounds x="1030.3700375393698" y="1948.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="end_105_id" bpmnElement="end_105">
     <dc:Bounds x="938.6012975393702" y="1948.9392473031496" width="39.99961499999995" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="end_103_id" bpmnElement="end_103">
     <dc:Bounds x="832.60123753937" y="1948.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="end_101_id" bpmnElement="end_101">
     <dc:Bounds x="1030.3700375393698" y="1892.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="lsm_58_id" bpmnElement="lsm_58">
     <dc:Bounds x="1476.3699050393702" y="1243.5394148031498" width="49" height="17.25"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="ds_59_id" bpmnElement="ds_59">
     <dc:Bounds x="1475.8699050393702" y="1200.9644148031498" width="50" height="37.19999999999982"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="lsm_60_id" bpmnElement="lsm_60">
     <dc:Bounds x="1205.3696610393702" y="1355.9394148031497" width="80" height="28"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="data_56_id" bpmnElement="data_56">
     <dc:Bounds x="1233.7540270393702" y="1330.4394148031497" width="23.231268" height="25.5"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="complex_gateway_33_id" bpmnElement="complex_gateway_33">
     <dc:Bounds x="1796.3366850393706" y="1505.9394148031497" width="49.999999999999545" height="50"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="comment_53_id" bpmnElement="comment_53">
     <dc:Bounds x="1076.6197827393703" y="1389.4394148031497" width="105.5" height="40.25"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_98_id" bpmnElement="boundaryevent_98">
     <dc:Bounds x="298.7032275393703" y="1560.05496550315" width="39.99961499999995" height="39.99961499999972"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_43_id" bpmnElement="boundaryevent_43">
     <dc:Bounds x="1091.25424453937" y="1551.8235123031498" width="28.231076999999914" height="28.231076999999914"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_135_id" bpmnElement="boundaryevent_135">
     <dc:Bounds x="1691.5290375393695" y="2024.4393673031498" width="39.999615000000176" height="39.99961499999995"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_134_id" bpmnElement="boundaryevent_134">
     <dc:Bounds x="1623.52903753937" y="2024.4393673031498" width="39.999615000000176" height="39.99961499999995"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_133_id" bpmnElement="boundaryevent_133">
     <dc:Bounds x="1561.52903753937" y="2024.4393673031498" width="39.999615000000176" height="39.99961499999995"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_128_id" bpmnElement="boundaryevent_128">
     <dc:Bounds x="1561.52903753937" y="1963.4392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_127_id" bpmnElement="boundaryevent_127">
     <dc:Bounds x="1486.52903753937" y="1963.4392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_122_id" bpmnElement="boundaryevent_122">
     <dc:Bounds x="1691.5290375393695" y="1892.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_120_id" bpmnElement="boundaryevent_120">
     <dc:Bounds x="1623.52903753937" y="1892.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_119_id" bpmnElement="boundaryevent_119">
     <dc:Bounds x="1561.52903753937" y="1892.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_118_id" bpmnElement="boundaryevent_118">
     <dc:Bounds x="1481.52903753937" y="1892.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_117_id" bpmnElement="boundaryevent_117">
     <dc:Bounds x="1755.5290375393695" y="1831.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_116_id" bpmnElement="boundaryevent_116">
     <dc:Bounds x="1691.5290375393695" y="1831.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_115_id" bpmnElement="boundaryevent_115">
     <dc:Bounds x="1623.52903753937" y="1831.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_113_id" bpmnElement="boundaryevent_113">
     <dc:Bounds x="1561.52903753937" y="1831.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="boundaryevent_111_id" bpmnElement="boundaryevent_111">
     <dc:Bounds x="1486.52903753937" y="1831.9392473031496" width="39.999615000000176" height="39.999615000000176"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNEdge id="line_9_id" bpmnElement="line_9">
      <di:waypoint x="820.3697850393701" y="1530.9394148031497"/>
      <di:waypoint x="880.3697850393701" y="1530.9394148031497"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_11_id" bpmnElement="line_11">
      <di:waypoint x="990.3697850393701" y="1530.9394148031497"/>
      <di:waypoint x="1050.36978503937" y="1530.9394148031497"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_13_id" bpmnElement="line_13">
      <di:waypoint x="1160.3697830393703" y="1530.9394148031497"/>
      <di:waypoint x="1220.36978503937" y="1530.9394148031497"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_20_id" bpmnElement="line_20">
      <di:waypoint x="1270.36978503937" y="1530.9394148031497"/>
      <di:waypoint x="1349.3699050393702" y="1531.0378048031498"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_22_id" bpmnElement="line_22">
      <di:waypoint x="1394.3697850393698" y="1531.0378048031498"/>
      <di:waypoint x="1428.36978503937" y="1531.0378048031498"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_24_id" bpmnElement="line_24">
      <di:waypoint x="1538.36978503937" y="1531.0378048031498"/>
      <di:waypoint x="1563.8699050393702" y="1531.0378048031498"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_26_id" bpmnElement="line_26">
      <di:waypoint x="1673.8698850393703" y="1531.0378048031498"/>
      <di:waypoint x="1708.8698850393698" y="1531.0378048031498"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_28_id" bpmnElement="line_28">
      <di:waypoint x="1245.36978503937" y="1505.9394148031497"/>
      <di:waypoint x="1245.36978503937" y="1294.9394148031497"/>
      <di:waypoint x="1349.3699050393702" y="1294.9394148031497"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_30_id" bpmnElement="line_30">
      <di:waypoint x="1245.36978503937" y="1555.9394168031497"/>
      <di:waypoint x="1245.36978503937" y="1755.9394148031497"/>
      <di:waypoint x="1349.3699050393702" y="1755.9394148031497"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_36_id" bpmnElement="line_36">
      <di:waypoint x="1756.3698850393703" y="1531.0378048031498"/>
      <di:waypoint x="1796.33668503937" y="1530.9394148031497"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_37_id" bpmnElement="line_37">
      <di:waypoint x="1459.3699050393702" y="1294.9394148031497"/>
      <di:waypoint x="1821.3366850393704" y="1294.9394148031497"/>
      <di:waypoint x="1821.3366850393704" y="1505.9394148031497"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_39_id" bpmnElement="line_39">
      <di:waypoint x="1459.3699050393702" y="1755.9394148031497"/>
      <di:waypoint x="1519.3699050393702" y="1755.9394148031497"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_40_id" bpmnElement="line_40">
      <di:waypoint x="1629.3699050393702" y="1755.9394148031497"/>
      <di:waypoint x="1821.3366850393704" y="1755.9394148031497"/>
      <di:waypoint x="1821.3366850393704" y="1555.9394168031497"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_42_id" bpmnElement="line_42">
      <di:waypoint x="1846.33668503937" y="1530.9394148031497"/>
      <di:waypoint x="1906.3366850393704" y="1530.9394148031497"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_49_id" bpmnElement="line_49">
      <di:waypoint x="1105.3697830393698" y="1580.0550172031499"/>
      <di:waypoint x="1105.3697830393698" y="1639.9394148031497"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_52_id" bpmnElement="line_52">
      <di:waypoint x="1093.8697830393698" y="1715.4394148031497"/>
      <di:waypoint x="1116.8697827393703" y="1715.4394148031497"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_55_id" bpmnElement="line_55">
     <di:waypoint x="1105.3697830393698" y="1495.9394148031497"/>
     <di:waypoint x="1129.3697827393703" y="1429.6894148031497"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNEdge id="line_62_id" bpmnElement="line_62">
     <di:waypoint x="1416.6009850393702" y="1259.9394148031497"/>
     <di:waypoint x="1475.8699050393702" y="1219.5644148031497"/>
    </bpmndi:BPMNEdge>
    <bpmndi:BPMNShape id="call_98_id" bpmnElement="call_98">
     <dc:Bounds x="570.5196850393702" y="1206.7890248031497" width="130" height="80"/>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="busisrule_task_100_id" bpmnElement="busisrule_task_100">
     <dc:Bounds x="580.5196850393702" y="1319.5378048031498" width="110" height="70"/>
    </bpmndi:BPMNShape>
   </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`

            //获取流程API
            let flowAPI = editor.flow
            flowAPI.setJsonKeyField("code");
            flowAPI.loadFromBpmnXML(bpmnXMLDemo)
          }
        },
        {
          viewer: menudemo
        }
      ]
    }),
    DDeiFlowElementSettingDialog.modify((plugin)=>{
      let newItems = [
        {
          id: 'ddei-flow-property-editor-text',
          label: "自定义",
          desc: "自定义",
          property: 'newField',
        },
      ]
      plugin.options.items.push(...newItems)
    }),
    DDeiExtQuickStyle,
    // DDeiFlowSettingButtonDialog.configuration({
    //   buttons:[
    //     {
    //       id: 'ddei-flow-change-bpmnsubtype'
    //     },
    //     {
    //       id: 'ddei-flow-choose-activity'
    //     },
    //     {
    //       id: 'ddei-flow-expand-or-not'
    //     },
    //     {
    //       id: 'ddei-flow-lock-or-unlock'
    //     },
    //     {
    //       viewer: buttondemo
    //     },
    //     {
    //       id: 'ddei-flow-remove-control'
    //     }
    //   ],
    // }),
  ],
  onMounted: (editor)=> {
    //获取编辑器 
    // let editor = proxy.$refs["ddei_editor_1"].editor;
    // editor.setEditable(false)
    //获取流程API
    let flowAPI = editor.flow
    //设置以code作为key字段,默认以id作为key字段
    flowAPI.setJsonKeyField("code")
    let busiData = {
      st1: {
        border: {
          color: "green",
          width: 5
        },
        fill: {
          type: 0
        },
        name: "已加载"
      },
      userTest1: {
        border: {
          color: "green",
          width: 5
        },
        fill: {
          type: 0
        }
      }
    }
    //加载数据
    flowAPI.loadData(designDemoData, busiData)
  }
})


</script>

<template>
  <DDeiEditorView ref="ddei_editor_1" :options="options" id="ddei_editor_1"></DDeiEditorView>
</template>