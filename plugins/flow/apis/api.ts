import { DDeiModelArrtibuteValue,DDeiEditor, DDeiUtil, DDeiAbstractShape, DDeiStage, DDeiEnumBusCommandType, DDeiFile, DDeiActiveType, DDeiFileState } from "ddei-editor"
import { DDeiEditorState, DDeiEditorEnumBusCommandType, DDeiEditorUtil } from "ddei-editor"
import {getIncludeModels} from "../controls/util"
import DDeiFlowFile from "./file"
import DDeiFlowGraph from "./graph";
import DDeiFlowNode from "./node";
import DDeiFlowGroup from "./group";
import DDeiFlowSequence from "./sequence"
import DDeiFlowSubProcess from "./subprocess"
import DDeiFlowBpmnXmlNode from "./bpmnxmlnode"
import { merge } from "ddei-editor"
import { xml2graph, autolayout } from "./request"
import {Matrix3} from 'ddei-editor'
/**
 * DDeiFlow插件的API方法包，提供了API以及工具函数
 * 初始化时挂载到editor的flow属性上
 */
class DDeiFlowAPI {

  editor:DDeiEditor;

  /**
   * 配置的属性
   */
  jsonField: string[] = ["id", "name", "code", "text", "ep", "sp", "desc", "isUnlimited", "capacity", "condition", "default", "bpmnType", "bpmnSubType", "scriptFormat", "dataType", "customDataType", "isCollection", "loopCardinality", "script", "bpmnBaseType", "ordering", "activityId", "errorCode", "timeType", "timeValue", "potentialOwner", "humanPerformer", "notInterrupting","escalName", "messageName","signalName","isLoop", "isLoop","isTransaction", "multiInstance", "isParallel", "isCompensation","essBounds"]

  /**
   * json中以哪个字段作为key，默认为id，可以指定为code或其他字段
   */
  jsonKeyField:string = 'id'

  /**
   * 模型缓存
   */
  modelsCache = {}

  constructor(editor:DDeiEditor){
    this.editor = editor
  }

  /**
   * 转换为bpmn时的回调函数，每个元素转换为bpmn前都会调用此方法，用于接管bpmn元素的生成，如果返回false会触发原来的逻辑，返回其他值将不会调用原有的逻辑。
   */
  bpmnProcessorFN: Function | null = null

  /**
   * 转换为bpmn时的回调函数，每个元素转换为bpmn后都会调用此方法，用于接管bpmn元素的生成。
   */
  bpmnAfterProcessorFN: Function | null = null
  
  /**
   * 转换为bpmndi时的回调函数，每个元素转换为bpmndi前都会调用此方法，用于接管bpmn元素的生成，如果返回false会触发原来的逻辑，返回其他值将不会调用原有的逻辑。
   */
  bpmndiProcessorFN: Function | null = null


  /**
   * 设置键字段
   * @param field 字段名称
   */
  setJsonKeyField(field:string):void{
    if(field){
      this.jsonKeyField = field
    }
  }

  /**
   * 配置返回的json数据字段
   * @param fn 外部方法，用来修改jsonField
   */
  configJsonField(fn):void{
    fn(this.jsonField)
  }

  /**
   * 将模型转换为图片 并返回base64
   * @param models 
   */
  toImage(models:DDeiAbstractShape[],skipMark:boolean = false):Promise{
    return new Promise((resolve, reject) => {
      let imageMap = {}
      let allModels = []
      models.forEach(model=>{
        allModels.push(model)
        if (model.allowIncludeModel) {
          let subModels = getIncludeModels(model)
          subModels.forEach(sm=>{
            if (!DDeiUtil.isModelHidden(sm)){
              allModels.push(sm)
            }
          })
          
        }
        
      })
      let ddInstance = this.editor.ddInstance
      let rat1 = ddInstance?.render.ratio;
      let stage = ddInstance.stage
      let lines = []
      let doubleLines = []
      allModels.forEach(ims => {
        //获取连线
        let sublinks = stage.getSourceModelLinks(ims.id)
        sublinks?.forEach(slink => {
          if (!slink.disabled && slink.dm) {
            if (lines.indexOf(slink.dm) == -1) {
              lines.push(slink.dm)
            } else {
              doubleLines.push(slink.dm)
            }
          }
        });
      })
      lines = doubleLines;
      let promiseArr = []
      
      allModels.push(...lines)
      allModels.forEach(model => {
          promiseArr.push(new Promise((resolve, reject) => {
            let loadImage = false
            if(model.render.viewer){
              // let domElement = this.editor.viewerMap.get(model.id).el
              // let cloneElements = this.toSimpleSvg(domElement)
              // html2canvas(domElement,{
              //   useCORS: true,
              //   scale: rat1,
              //   quality: 1,
              //   logging:false,
              //   // foreignObjectRendering:true,
              //   ignoreElements: e=>{
              //     if (e.className == 'markers'){
              //       return true
              //     }
              //     return false
              //   },
              // }).then(canvas => {
              //   imageMap[model.id] = new Image()
              //   // 创建一个图片元素
              //   imageMap[model.id].src = canvas.toDataURL("image/png");
              //   imageMap[model.id].onload = () => {
              //     cloneElements.forEach(ce=>{
              //       ce.remove()
              //     })
              //     resolve()
              //   }
              // });
              loadImage = true
            }else if(model.render.tempCanvas){
              imageMap[model.id] = new Image()
              imageMap[model.id].src = model.render.tempCanvas.toDataURL("image/png")
              imageMap[model.id].onload = () => {
                resolve()
              }
              loadImage = true
            }
            if (!loadImage){
              resolve()
            }
          }));
      });
      //构造canvas，按照tempZIndex的顺序输出到同一个canvas上
      let canvas = document.createElement("canvas")
      
      let outRect = DDeiAbstractShape.getOutRectByPV(allModels);
      
      

      let width = outRect.width * rat1
      let height = outRect.height * rat1
      canvas.setAttribute("width", width)
      canvas.setAttribute("height", height)
      canvas.setAttribute("style", "pointer-events:none;z-index:100;position:absolute;-webkit-font-smoothing:antialiased;-moz-transform-origin:left top;-moz-transform:scale(" + (1 / rat1) + ");display:block;zoom:" + (1 / rat1));
      let ctx = canvas.getContext('2d', { willReadFrequently: true });
      
      ctx.translate(-outRect.x*rat1,-outRect.y*rat1)
      Promise.all(promiseArr).then(all => {
        //计算位置，正确输出
        for (let i = 0; i < allModels.length;i++){
          let model = allModels[i]
          let modelImage = imageMap[model.id]
          
          if (modelImage){
            let outRect = DDeiAbstractShape.getOutRectByPV([model]);
            if(model.baseModelType == 'DDeiLine'){
              ctx?.drawImage(modelImage, ((outRect.x + outRect.x1) / 2 - model.render.tempCanvas.offsetWidth / 2/rat1) * rat1, ((outRect.y + outRect.y1) / 2 - model.render.tempCanvas.offsetHeight / 2/rat1 )* rat1)
            }else{
              ctx?.drawImage(modelImage, outRect.x * rat1, outRect.y * rat1)
            }
          }
        }
        
        resolve(canvas.toDataURL())
      })
    });
  }

  private toSimpleSvg(dom) {
    // 获取所有iconfont的svg的use标签
    let useElements = dom.querySelectorAll('use');
    // 遍历每个svg中的use元素
    let arr = [...useElements]
    let cloneElements = []
    arr.forEach((useElement) => {
      // 获取use元素引用的ID
      let href = useElement.getAttribute('xlink:href');
      
      if (href && href.startsWith('#')) {
        let id = href.substring(1);
        // 查找对应的实际元素svg里面的path集合
        let paths = document.getElementById(id).querySelectorAll("path");
        // 获取SVG的实际宽度和高度
        let svgWidth = useElement.parentNode.width
        let svgHeight = useElement.parentNode.height
        // 计算所有path的包围框
        let totalBBox = { x: Infinity, y: Infinity, width: 0, height: 0 };
        paths.forEach(function (path) {
          //获取每个path的位置信息
          let bbox = path.getBBox();
          totalBBox.x = Math.min(totalBBox.x, bbox.x);
          totalBBox.y = Math.min(totalBBox.y, bbox.y);
          totalBBox.width = Math.max(totalBBox.width, bbox.x + bbox.width);
          totalBBox.height = Math.max(totalBBox.height, bbox.y + bbox.height);
        });
        // 计算缩放比例
        
        if (svgWidth.baseVal){
          svgWidth = svgWidth.baseVal.value
        }
        if (svgHeight.baseVal){
          svgHeight = svgHeight.baseVal.value
        }
        let scaleX = svgWidth / totalBBox.width;
        let scaleY = svgHeight / totalBBox.height;
        let scale = Math.min(scaleX, scaleY);

        // 平移path使其居中
        let translateX = (svgWidth - totalBBox.width * scale) / 2 - totalBBox.x * scale;
        let translateY = (svgHeight - totalBBox.height * scale) / 2 - totalBBox.y * scale;
        // 将原始path转化为等比例的普通svg
        paths.forEach((path) => {
          // 应用缩放和平移变换到每个path
          let transform = 'scale(' + scale + ') translate(' + translateX + ',' + translateY + ')';
          // 保存原始数据
          let clonedElement = path.cloneNode(true);
          // 缩放paht
          clonedElement.setAttribute('transform', transform);
          // 将path 放入到svg中转化为普通的svg
          cloneElements.push(clonedElement)
          useElement.parentNode.appendChild(clonedElement)
        });
      }
    });
    return cloneElements;
  }

  private settingSubModelsData(model,dataJson):void{
    let key = model[this.jsonKeyField] ? model[this.jsonKeyField] : model.id
    if (dataJson[key]) {
      merge(model, dataJson[key])
    }
    if(model.models){
      for (let id in model.models) {
        let subModel = model.models[id]
        this.settingSubModelsData(subModel, dataJson)
      }
    }
  }

  /**
   * 通过flowData加载流程图
   * @param flowData 流程流转数据
   */
  loadFromFlowData(flowData: string | object, centerModel:boolean = true,ratio:number = 1){
    if (flowData) {
      let flowDataObj = flowData
      if (typeof (flowData) == 'string') {
        flowDataObj = JSON.parse(flowData);
      }
      if (flowDataObj){
        if (flowDataObj.config){
          for(let key in flowDataObj.config){
            let configObj = flowDataObj.config[key]
            if (configObj.model && (!configObj.width || !configObj.height)){
              
              let controlDefine = DDeiEditorUtil.getControlDefine({modelCode:configObj.model});
              if (controlDefine?.define){
                if (!configObj.width) {
                  configObj.width = controlDefine.define.width;
                }
                if (!configObj.height) {
                  configObj.height = controlDefine.define.height;
                }
              }
            }
            
          }
        }
        autolayout(JSON.stringify(flowDataObj), (res) => {
          
          if (res.status == 200) {
            try {
              let layoutData = eval(res.data);

              if (layoutData.state == 'success') {
                
                //获取编辑器实例
                let editor: DDeiEditor = this.editor;

                editor.clearModels(true, false);
                // //创建图层
                let stage = editor.ddInstance.stage
                // //添加图层，默认在0位置
                stage.removeLayer(0, false)
                //以下代码读取layoutData生成可视化图形控件，用于查看效果
                //第一个控件，用于初始化定位
                let firstModel = null
                layoutData.tasks?.forEach(task => {
                  let model = "1000011"
                  let sconfig = flowDataObj.config[task.type] ? flowDataObj.config[task.type] : flowDataObj.config['default']
                  if(sconfig.model){
                    model = sconfig.model;
                  }
                  
                  let initJSON = {
                    id: "task_" + task.id,
                    model: model,
                    code: task.id,
                    width: task.width,
                    height: task.height,
                    font: sconfig.font,
                    border: sconfig.border,
                    textStyle: sconfig.textStyle,
                    fill: sconfig.fill,
                    x: task.x,
                    y: task.y
                  }
                  if (sconfig.fields){
                    sconfig.fields.forEach(field => {
                      if (task[field.field] != undefined){
                        initJSON[field.key] = task[field.field]
                      }
                    });
                  }
                  
                  let models = editor.addControls([
                    initJSON
                  ], true, false)
                  
                  if (task == layoutData.root || task.id == layoutData.root.id) {
                    
                    firstModel = models[0]
                  }
                });
                //建立连接
                let promiseArr = []
                for (let i = 0; i < layoutData.lines?.length; i++) {
                  promiseArr.push(new Promise((resolve, reject) => {
                    let line = layoutData.lines[i]

                    //将points换算为spvs
                    let spvs = null
                    if (line.points.length > 2) {
                      spvs = []
                      //只保留中间的点，忽略开始和结束点
                      let startP = line.points[0]
                      for (let pi = 1; pi < line.points.length - 1; pi++) {
                        let point = line.points[pi]
                        spvs.push({ x: point.x - startP.x, y: point.y - startP.y })
                      }

                    }
                    //建立连线
                    editor.addLines([
                      {
                        model: '1000601',
                        type: line.lineType ? line.lineType : 2,
                        dash: line.dash ? line.dash : null,
                        round: 5, //圆角5
                        startPoint: { x: line.sx, y: line.sy },
                        endPoint: { x: line.ex, y: line.ey },
                        pvs: line.points,
                        spvs: spvs,
                        smodel: { id: "task_" + line.startId, x: line.sx, y: line.sy, rate: line.rate, sita: line.startSita },
                        emodel: { id: "task_" + line.endId, x: line.ex, y: line.ey, rate: line.rate, sita: line.endSita }
                      },
                    ], false, true, false)
                    resolve(true)
                  }))

                }
                
                //根据返回的信息创建groups,用一个新的图层来展示group
                if (layoutData.groups?.length > 0) {
                  //添加图层，默认在0位置
                  let groupLayer = stage.addLayer({ bg: { type: -1 } }, 0, false)
                  //获取最小x、y、最大x1、y1
                  let minX = Infinity, minY = Infinity, maxX1 = -Infinity, maxY1 = -Infinity
                  layoutData.groups.forEach(group => {
                    let x1 = group.x + group.width
                    let y1 = group.y + group.height
                    minX = Math.min(minX, group.x)
                    minY = Math.min(minY, group.y)
                    maxX1 = Math.max(maxX1, x1)
                    maxY1 = Math.max(maxY1, y1)
                  });
                  groupLayer.initRender()
                  
                  layoutData.groups.forEach(group => {
                    if (flowDataObj.direct == 1) {
                      group.x = minX
                      group.width = maxX1 - minX
                    } else if (flowDataObj.direct == 2) {
                      group.y = minY
                      group.height = maxY1 - minY
                    } else if (flowDataObj.direct == 3) {
                      group.x = minX
                      group.width = maxX1 - minX
                    } else if (flowDataObj.direct == 4) {
                      group.y = minY
                      group.height = maxY1 - minY
                    }
                    //在图层下创建分组甬道
                    let gw = group.width, gh = group.height, gx = group.x, gy = group.y
                    
                    if (flowDataObj.direct == 1) {
                      gw = 30
                      gx = group.x - group.width / 2 - 15
                    } else if (flowDataObj.direct == 2) {
                      gh = 30
                      gy = group.y - group.height / 2 - 15
                    } else if (flowDataObj.direct == 3) {
                      gw = 30
                      gx = group.x - group.width / 2 - 15
                    } else if (flowDataObj.direct == 4) {
                      gh = 30
                      gy = group.y - group.height / 2 - 15
                    }
                    
                    editor.addControlsToLayer([
                      {

                        model: '100002',
                        code: group.id,
                        width: group.width,
                        height: group.height,
                        x: group.x,
                        y: group.y,
                        fill: {
                          color: "blue", opacity: 0.2
                        },
                        border: {
                          width: 1,
                          dash: [10, 5]
                        }
                      }
                      , {
                        model: '100002',
                        code: group.id,
                        width: gw,
                        height: gh,
                        text: group.name,
                        x: gx,
                        y: gy,
                        font: { size: 16 }
                      }
                    ], 0, true, false)
                  });
                  stage.changeLayer(1);
                  stage.displayLayer(null, true);
                }
                if (ratio != 1 && ratio > 0) {
                  editor.ddInstance.stage.setStageRatio(ratio);
                }
                Promise.all(promiseArr).then(all => {
                  let stage = editor.ddInstance.stage
                  let models = stage.getLayerModels(null,100);
                  let outRect = DDeiAbstractShape.getOutRectByPV(models);
                  
                  let moveMatrix = new Matrix3(
                    1,
                    0,
                    -outRect.x,
                    0,
                    1,
                    -outRect.y,
                    0,
                    0,
                    1
                  );
                  models.forEach(model => {
                    model.transVectors(moveMatrix);
                  })
                  
                  stage.spv.applyMatrix3(moveMatrix)

                  outRect = DDeiAbstractShape.getOutRectByPV(models);
                  let ox = -(outRect.x + outRect.width / 2) + stage.width / 2 + outRect.width / 2;
                  let oy = -(outRect.y + outRect.height / 2) + stage.height / 2 + outRect.height / 2;
                  //修正位置根据position和margin属性
                  let wpvX = Infinity, wpvY = Infinity
                  if(flowDataObj.position){
                    //获取纸张配置
                    let paperType
                    if (stage.paper?.type) {
                      paperType = stage.paper.type;
                    } else if (stage.ddInstance.paper) {
                      if (typeof (stage.ddInstance.paper) == 'string') {
                        paperType = stage.ddInstance.paper;
                      } else {
                        paperType = stage.ddInstance.paper.type;
                      }
                    } else {
                      paperType = DDeiModelArrtibuteValue.getAttrValueByState(stage, "paper.type", true);
                    }
                    let paperArea = null;
                    if (paperType){
                      paperArea = stage.getPaperArea(paperType);
                    }
                    let outerRect = null;
                    //有纸张
                    if (paperArea){
                      outerRect = { x: paperArea.unitWidth / 2, y: paperArea.unitHeight / 2,w:paperArea.w-paperArea.unitWidth, h:paperArea.h-paperArea.unitHeight};
                    }
                    //无纸张
                    else{
                      outerRect = {x:0,y:0,w:stage.width,h:stage.height};
                    }
                    
                    switch (flowDataObj.position){
                      //顶
                      case 1:
                        oy = oy - stage.height / 2 +outRect.height/2 + outerRect.y
                        wpvY = outerRect.y - 100
                        break
                      ;
                      //右
                      case 2: 
                        ox = ox + stage.width / 2 - outRect.width / 2 - outerRect.x

                        wpvX = stage.width - outerRect.x - stage.ddInstance.render.canvas.width / stage.ddInstance.render.ratio+100
                        
                        break;
                      ;
                      //底
                      case 3: 
                        oy = oy + stage.height / 2 - outRect.height / 2 - outerRect.y
                        wpvY = stage.height - outerRect.y - stage.ddInstance.render.canvas.height / stage.ddInstance.render.ratio + 100
                        break
                      ;
                      //左
                      case 4: 
                        ox = ox - stage.width / 2 + outRect.width / 2 + outerRect.x
                        wpvX = outerRect.x - 100;
                        break
                      ;
                    }
                  }
                  //横向修正
                  if (flowDataObj.marginX) {
                    ox += flowDataObj.marginX
                  }
                  //纵向修正
                  if (flowDataObj.marginY) {
                    oy += flowDataObj.marginY
                  }

                  let moveMatrix1 = new Matrix3(
                    1,
                    0,
                    ox,
                    0,
                    1,
                    oy,
                    0,
                    0,
                    1
                  );
                  models.forEach(model => {
                    model.transVectors(moveMatrix1);
                  })
                  
                  editor.notifyChange();
                  if (firstModel && centerModel){
                    editor.centerModels(stage,firstModel.id)
                    
                    if (wpvY != Infinity) {
                      stage.wpv.y = -wpvY;
                    }
                    if (wpvX != Infinity) {
                      stage.wpv.x = -wpvX;
                    }
                    
                  }
                  
                })
                
              }
            }catch(e){
              console.error(e)
            }
          }
        });
      }
    }
  }


  /**
   * 通过BpmnXML加载并刷新流程图
   * @param designJson 设计器json
   * @param dataJson 数据json
   */
  loadFromBpmnXML(xml: string, dataJson: string | object | null = null, ratio: number = 1):void {
    if (xml){
      xml2graph(xml,(res)=>{
        
        if(res.status == 200){
          try{
            let data = eval(res.data);
            
            if (data.state == 'success' && data.graphs.length > 0){
              //生成流程图
              let graph = data.graphs[0];
              if (dataJson) {
                dataJson = typeof (dataJson) == 'string' ? JSON.parse(dataJson) : dataJson;
                graph.controls?.forEach(control => {
                  let key = control[this.jsonKeyField] ? control[this.jsonKeyField] : control.id
                  if (dataJson[key]) {
                    merge(control, dataJson[key])
                  }
                });
                graph.lines?.forEach(control => {
                  let key = control[this.jsonKeyField] ? control[this.jsonKeyField] : control.id
                  if (dataJson[key]) {
                    merge(control, dataJson[key])
                  }
                });
                

              }
              let ddInstance = this.editor.ddInstance;
              //清空已有的数据
              ddInstance.stage?.destroyRender()

              let file = this.editor.files[this.editor.currentFileIndex];
              let sheet = file.sheets[file.currentSheetIndex];
              sheet.name = graph.name
              sheet.desc = graph.desc
              let stage = DDeiStage.initByJSON({ id: graph.id, ratio: ratio }, { currentDdInstance: ddInstance })
              sheet.stage = stage;

              //刷新页面  
              ddInstance.stage = stage;
              //加载场景渲染器
              stage.initRender();

              graph.controls.forEach(control => {
                if (!control[this.jsonKeyField]){
                  control[this.jsonKeyField] = control.id
                }
              });
              
              this.editor.addControls(graph.controls, true, false)
        
              this.editor.addLines(graph.lines)
              

              
      
              this.editor.changeState(DDeiEditorState.DESIGNING);
              ddInstance.bus.push(
                DDeiEditorEnumBusCommandType.ClearTemplateUI
              );
              ddInstance.bus.push(
                DDeiEditorEnumBusCommandType.RefreshEditorParts
              );
              ddInstance?.bus?.push(DDeiEnumBusCommandType.RefreshShape);
              ddInstance?.bus?.executeAll();
                
              DDeiEditorUtil.invokeCallbackFunc("EVENT_ADD_FILE_AFTER", "LOAD_FILE", { file: file }, this.editor.ddInstance)
              
            }
          }catch(e){
            console.error(e)
          }
        }
        
      })
    }
  }
  
  /**
   * 加载并刷新流程图
   * @param designJson 设计器json
   * @param dataJson 数据json
   */
  loadData(designJson:string|object,dataJson:string|object|null = null) {

    let resultJSON = typeof (designJson) == 'string' ? JSON.parse(designJson) : designJson;
    if (dataJson){
      dataJson = typeof (dataJson) == 'string' ? JSON.parse(dataJson) : dataJson;
      resultJSON.sheets.forEach(sheet => {
        sheet.stage.layers.forEach(layer => {
          this.settingSubModelsData(layer, dataJson)
        });
        
        
      });
      
      
    }
    //合并数据与设计器

    let ddInstance = this.editor.ddInstance;
    let file = DDeiFile.loadFromJSON(resultJSON, {
      currentDdInstance: ddInstance,
    });
    let openedFiles = this.editor.files;
    let openedFileIndex = -1
    if (!file.id) {
      file.id = DDeiUtil.getUniqueCode()
    }
    for (let fi = 0; fi < openedFiles.length; fi++) {
      if ((openedFiles[fi].id && openedFiles[fi].id == file.id)) {
        openedFileIndex = fi
        break;
      }
    }
    ddInstance.stage.destroyRender()
    if (openedFileIndex == -1) {
      this.editor.addFile(file);
      for (let x = 0; x < this.editor.files.length; x++) {
        this.editor.files[x].active = DDeiActiveType.NONE;
      }
      this.editor.currentFileIndex = this.editor.files.length - 1;
      file.state = DDeiFileState.NONE;
      file.active = DDeiActiveType.ACTIVE;
      let sheets = file?.sheets;

      if (file && sheets && ddInstance) {
        file.changeSheet(file.currentSheetIndex);

        let stage = sheets[file.currentSheetIndex].stage;

        stage.ddInstance = ddInstance;
        ddInstance.disabled = false
        //记录文件初始日志
        file.initHistroy();
        file.histroy[0].isNew = true;
        //刷新页面
        ddInstance.stage = stage;
        //加载场景渲染器
        stage.initRender();
        //设置视窗位置到中央
        if (!stage.wpv) {
          //缺省定位在画布中心点位置
          stage.wpv = {
            x:
              -(
                stage.width -
                ddInstance.render.container.clientWidth
              ) / 2,
            y:
              -(
                stage.height -
                ddInstance.render.container.clientHeight
              ) / 2,
            z: 0,
          };
        }
        this.editor.changeState(DDeiEditorState.DESIGNING);
        ddInstance.bus.push(
          DDeiEditorEnumBusCommandType.ClearTemplateUI
        );
        ddInstance.bus.push(
          DDeiEditorEnumBusCommandType.RefreshEditorParts
        );
        ddInstance?.bus?.push(DDeiEnumBusCommandType.RefreshShape);
        ddInstance?.bus?.executeAll();
      }
    } else {

      file = this.editor.files[openedFileIndex]
      if (file && ddInstance) {
        for (let x = 0; x < this.editor.files.length; x++) {
          this.editor.files[x].active = DDeiActiveType.NONE;
        }
        file.active = DDeiActiveType.ACTIVE
        this.editor.currentFileIndex = openedFileIndex;
        let stage = file.sheets[file.currentSheetIndex].stage;
        stage.ddInstance = ddInstance;

        //刷新页面
        ddInstance.stage = stage;
        ddInstance.disabled = false
        //加载场景渲染器
        stage.initRender();
        this.editor.changeState(DDeiEditorState.DESIGNING);
        ddInstance.bus.push(
          DDeiEditorEnumBusCommandType.ClearTemplateUI
        );
        ddInstance.bus.push(
          DDeiEditorEnumBusCommandType.RefreshEditorParts
        );
        ddInstance?.bus?.push(DDeiEnumBusCommandType.RefreshShape);
        ddInstance?.bus?.executeAll();
      }
    }
    DDeiEditorUtil.invokeCallbackFunc("EVENT_ADD_FILE_AFTER", "LOAD_FILE", { file: file }, this.editor.ddInstance)
  
  }

  /**
   * 刷新视图
   */
  refresh(): void {
    let ddInstance = this.editor.ddInstance
    for (let i in this.modelsCache) {
      let shapeModel = this.modelsCache[i]
      shapeModel?.render?.clearCachedValue()
      shapeModel?.render?.enableRefreshShape()
    }

    ddInstance.bus.push(DDeiEnumBusCommandType.RefreshShape);
    ddInstance.bus.executeAll()
  }


  /**
   * 获取当前的流程图
   */
  getFlowGraphs(): DDeiFlowGraph[]|null{
    let file = this.editor.files[this.editor.currentFileIndex];
    if (file) {
      let sheet = file.sheets[file.currentSheetIndex];
      let graphics = this.stage2FlowGraphs(sheet.stage)
      return graphics
    }
    return null
  }

  /**
   * 将当前文档转换为易于识别和解析的json对象
   */
  toFlowObject(fileObj:boolean = false,allSheets: boolean = false): DDeiFlowFile|DDeiFlowGraph | null {
    let file = this.editor.files[this.editor.currentFileIndex];
    if (file) {
      let returnFile = new DDeiFlowFile({ id: file.id, name: file.name })
      let sheets = file.sheets;
      let sheetLen = sheets.length;
      let i = 0
      
      if (!allSheets) {
        i = file.currentSheetIndex;
        sheetLen = i + 1;
      }
      for (; i < sheetLen; i++) {
        let sheet = sheets[i];
        let graphics = this.stage2FlowGraphs(sheet.stage, fileObj)
        if (!fileObj){
          return graphics[0]
        }
        graphics?.forEach(graph=>{
          graph.file = returnFile
          returnFile.graphics.push(graph)
        })
      }
    
      return returnFile
    } else {
      return null;
    }
  }

  /**
   * 将舞台对象转换为易于解析和遍历的json对象
   * @param stage 舞台对象
   * @returns json对象
   */
  stage2FlowGraphs(stage: DDeiStage, allLayers: boolean = true): DDeiFlowGraph[]|null {
    if (stage) {
      let layers = stage.layers;
      if (!(layers?.length > 0)) {
        return null;
      }
      let layerLen = layers.length;
      let i = 0;
      let singleLayer = false
      if (!allLayers) {
        i = stage.layerIndex;
        layerLen = i + 1;
      }
      if (!allLayers || layerLen == 1) {
        singleLayer = true
      }
      //每个图层生成一个流程
      let returnArray = []
      this.modelsCache = {}
      for (; i < layerLen; i++) {
        let layer = layers[i];
        let graph = new DDeiFlowGraph({ id: singleLayer ? stage.id : stage.id + "_" + layer.id, name: stage.name, shapeModel :stage,api:this});
        //获取当前图层所有元素，转换为json对象
        let models = stage.getLayerModels()
        models.forEach(model => {
          this.modelsCache[model.id] = model
          let node =  this.parseModelToFlowNode(model);
          if(node){
            node.graph = graph
            graph.nodes.set(node[this.jsonKeyField] ? node[this.jsonKeyField] : node.id,node)
          }
        });
        let deletedNodes = []
        //根据包含关系，建立正确的subprocess关系
        graph.nodes.forEach(node=>{
          //如果当前节点的includePModelId不为空，且最终指向一个subprocess，则建立子流程关系
          let model = this.modelsCache[node.id]
          
          if (model.includePModelId){

            let subProcessNode = this.getSubProcessNode(model.includePModelId,graph);
            if (subProcessNode){
              let subProcesses = this.getSubProcessNodes(subProcessNode.id, graph);
              node.graph = subProcessNode;
              
              node.subProcesses = subProcesses;
              subProcessNode.nodes.set(node[this.jsonKeyField] ? node[this.jsonKeyField] : node.id, node)
              
              deletedNodes.push(node.id)
            }
          }
        });
        //根据依附关系，建立attachNodes关系
        graph.nodes.forEach(node => {
          //如果当前节点的includePModelId不为空，且最终指向一个subprocess，则建立子流程关系
          let model = this.modelsCache[node.id]
          let attachNodes = []
          model.attachModels?.forEach(amid => {
            let attachModel = this.modelsCache[amid]
            if (attachModel) {
              let attachNode = graph.nodes.get(attachModel[this.jsonKeyField] ? attachModel[this.jsonKeyField] : attachModel.id)
              
              attachNode.attachPNode = node
              attachNodes.push(attachNode)
            }
          });
          if (attachNodes.length > 0){
            node.attachNodes = attachNodes
          }
        });

        let isolatedNodes = []
        let groups = []
        //建立整个图网络
        graph.nodes.forEach(node => {
          
          if (node instanceof DDeiFlowSequence) {
            //如果为连接线，则建立两边的关系
            //线图形对应的json对象
            let lineModel = this.modelsCache[node.id]
            let lineSequenceNode = node
            let lineLinks = stage.getDistModelLinks(lineSequenceNode.id)
            //获取另一端节点
            let includeSubProcess1, includeSubProcess2,lineNode1,lineNode2
            if (lineLinks?.length > 0) {
              let lineLink = lineLinks[0]
              if (lineLink.sm) {
                let distPV = lineLink.getDistPV()
                lineNode1 = graph.nodes.get(lineLink.sm[this.jsonKeyField] ? lineLink.sm[this.jsonKeyField] : lineLink.sm.id)
                let lineNodeModel = this.modelsCache[lineNode1.id];
                includeSubProcess1 = this.getSubProcessNode(lineNodeModel.includePModelId,graph);
                if (distPV == lineModel.startPoint) {
                  lineSequenceNode.prevNode = lineNode1
                } else if (distPV == lineModel.endPoint) {
                  lineSequenceNode.nextNode = lineNode1
                }
              }
            }
           
            if (lineLinks?.length > 0) {
              let lineLink = lineLinks[1]
              if (lineLink.sm) {
                let distPV = lineLink.getDistPV()
                lineNode2 = graph.nodes.get(lineLink.sm[this.jsonKeyField] ? lineLink.sm[this.jsonKeyField] : lineLink.sm.id)
                let lineNodeModel = this.modelsCache[lineNode2.id];
                includeSubProcess2 = this.getSubProcessNode(lineNodeModel.includePModelId, graph);
                if (distPV == lineModel.startPoint) {
                  lineSequenceNode.prevNode = lineNode2
                } else if (distPV == lineModel.endPoint) {
                  lineSequenceNode.nextNode = lineNode2
                }
              }
            }
          
          } else if (node instanceof DDeiFlowGroup) {
            groups.push(node)
            let model = this.modelsCache[node.id]
            
            model.includeModels?.forEach(im => {
              let md = this.modelsCache[im]
              let key = md[this.jsonKeyField] ? md[this.jsonKeyField] :  md.id
              node.nodes.set(key, graph.nodes.get(key))
            });
          } else {
            //获取连线,连线区分方向，以开始->结束为方向
            let nodeLinks = stage.getSourceModelLinks(node.id)
            nodeLinks?.forEach(link => {
              //连线上的pv
              let linePV = link.getDistPV();
              //线图形对应的json对象
              let key = link.dm[this.jsonKeyField] ? link.dm[this.jsonKeyField] : link.dm.id
              let lineSequenceNode = graph.nodes.get(key)
              //线的开始节点在图形上
              if (linePV == link.dm.startPoint) {
                node.nextNodes.push(lineSequenceNode)
              }
              //线的结束节点在图形上
              else if (linePV == link.dm.endPoint) {
                node.prevNodes.push(lineSequenceNode)
              }

            })
          } 
        });
        graph.groups = groups;

        
        //识别开始于结束节点
        graph.nodes.forEach(node => {
          let model = this.modelsCache[node.id]
          if (node.bpmnType == 'StartEvent') {
            if(!node.attachPNode){
              if (!model.includePModelId){
                graph.startNodes.push(node)
              }else{
                let subProcessNode = this.getSubProcessNode(model.includePModelId, graph);
                if (subProcessNode){
                  subProcessNode.startNodes.push(node)
                }else{
                  graph.startNodes.push(node)
                }
                
              }
            }
            
          } else if (node.bpmnType == 'EndEvent') {
            if (!model.includePModelId) {
              graph.endNodes.push(node)
            } else {
              let subProcessNode = this.getSubProcessNode(model.includePModelId, graph);
              if (subProcessNode) {
                subProcessNode.endNodes.push(node)
              } else {
                graph.endNodes.push(node)
              }
            }
          }
        })
        //识别出孤立节点
        graph.nodes.forEach(node => {
          if (node instanceof DDeiFlowSequence ){
            if (!node.prevNode && !node.nextNode){
              isolatedNodes.push(node)
            }
          }
          else if (!node.attachPNode && node.prevNodes?.length == 0 && node.bpmnType != 'StartEvent' && node.bpmnType != 'Group' && node.bpmnType != 'Comment') {
            if (node.bpmnType != 'SubProcess') {
              isolatedNodes.push(node)
            } else {
              //寻找subprocess是否被引用
              let isolated = true
              graph.nodes.forEach(n1 => {
                if (n1.subProcesses && n1.subProcesses.indexOf(node) != -1) {
                  isolated = false
                }
              })
              if (isolated) {
                isolatedNodes.push(node)
              }
            }
          } 
          else if (!node.attachPNode && node.prevNodes?.length == 0 && node.nextNodes?.length == 0) {
            if (node.bpmnType != 'SubProcess'){
              isolatedNodes.push(node)
            }else{
              //寻找subprocess是否被引用
              let isolated = true
              graph.nodes.forEach(n1 => {
                if (n1.subProcesses && n1.subProcesses.indexOf(node) != -1){
                  isolated = false
                }
              })
              if (isolated){
                isolatedNodes.push(node)
              }
            }
            
          }
        })
        graph.isolatedNodes = isolatedNodes

        deletedNodes.forEach(id=>{
          graph.nodes.delete(id)
        })

        returnArray.push(graph)
      }

      return returnArray;
    } else {
      return null;
    }
  }

  private getSubProcessNodes(includePModelId, graph): DDeiFlowSubProcess[] {
    let returnNodes: DDeiFlowSubProcess[] = []
    while (includePModelId){
      let subProcessesNode = this.getSubProcessNode(includePModelId,graph)
      if (subProcessesNode){
        returnNodes.splice(0, 0, subProcessesNode)
        let subProcessModel = this.modelsCache[subProcessesNode.id]
        includePModelId = subProcessModel?.includePModelId
      }else{
        break;
      }
      
    }
    return returnNodes;
  }

  private getSubProcessNode(includePModelId, graph):DDeiFlowSubProcess|null{
    let pNodeModel = this.modelsCache[includePModelId]
    if (pNodeModel){
      let pNode = graph.nodes.get(pNodeModel[this.jsonKeyField] ? pNodeModel[this.jsonKeyField] : pNodeModel.id);
      if(pNode){
        
        if (pNode.bpmnType == 'SubProcess'){
          return pNode;
        } else if (pNode.bpmnType == 'Group' && pNodeModel.includePModelId){
          return this.getSubProcessNode(pNodeModel.includePModelId, graph)
        }
      }
    }
    return null;
  }


  /**
   * 转换model为node
   * @param model model
   * @returns node
   */
  private parseModelToFlowNode(model:DDeiAbstractShape):DDeiFlowNode{
    let returnNode = null;
    let modelJson = {}
    this.jsonField.forEach(field=>{
      if (model[field] != undefined && model[field] != null){
        modelJson[field] = model[field];
      }
    })
    modelJson.shapeModel = model
    modelJson.api = this
    switch (model.bpmnBaseType){
      case 'Event':{
        returnNode = new DDeiFlowNode(modelJson)
      }
        break;
      case 'Activity':{
        if(model.bpmnType == 'SubProcess'){
          returnNode = new DDeiFlowSubProcess(modelJson)
        }else{
          returnNode = new DDeiFlowNode(modelJson)
        }

      }
        break;
      case 'Group':{
        returnNode = new DDeiFlowGroup(modelJson)
      }
        break;
      case 'Sequence':{
        returnNode = new DDeiFlowSequence(modelJson)
      }
        break;
      case 'Comment':{
        returnNode = new DDeiFlowNode(modelJson)
      }
        break;
    }

    if (!returnNode){
      returnNode = new DDeiFlowNode(modelJson)
    }
    //缺省类型
    return returnNode;
  }

  /**
   * 将当前文档转换为符合bpmn规范的xml文档
   * @param allSheets 输出所有sheet，默认false
   * @param diagram 输出bpmndi图形定义
   */
  toBPMNXML(allSheets: boolean = false, diagram: boolean = false):string{
    //转换为中间对象
    let flowObject = this.toFlowObject(true, allSheets)
    //生成xml
    let returnStr
    if (this.bpmnProcessorFN){
      let fnResult = this.bpmnProcessorFN(flowObject,0);
      if (fnResult !== false){
        returnStr = fnResult
      }
    }
    if (!returnStr){
      if (!flowObject.id){
        flowObject.id = DDeiUtil.getUniqueCode();
      }
      returnStr = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions id="`+ flowObject.id + `" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" targetNamespace="http://bpmn.io/schema/bpmn">\n`
      let contentStr = ''
      let defineStr = ''
      for (let gi = 0; gi < flowObject.graphics.length;gi++){
        let flowGraph = flowObject.graphics[gi];
        let processResult:DDeiFlowBpmnXmlNode = this.flowGraph2BPMNXML(flowGraph)
        if (processResult?.contentStr) {
          contentStr += processResult.contentStr+"\n"
        }
        if (processResult?.defineStr){
          defineStr += processResult.defineStr
        }
      }
      returnStr += defineStr
      returnStr += contentStr
      if (diagram){
        let skip = false
        if (this.bpmndiProcessorFN) {
          let fnResult = this.bpmndiProcessorFN(flowGraph,2);
          if (fnResult !== false) {
            returnStr += fnResult + "\n"
            skip = true;
          }
        }
        if (!skip) {
          returnStr += '  <bpmndi:BPMNDiagram id="Diagram_' + flowObject.id +'">\n'
          for (let gi = 0; gi < flowObject.graphics.length; gi++) {
            let flowGraph = flowObject.graphics[gi];
            let bpmndiXML = this.flowGraph2BPMNDIXML(flowGraph)
            if (bpmndiXML) {
              returnStr += bpmndiXML + "\n"
            }
          }
          returnStr += '  </bpmndi:BPMNDiagram>\n'
        }
      }
      returnStr += '</bpmn:definitions>'
    }
    return returnStr;
  }

  /**
   * 将舞台对象转换为bpmn规范的xml字符串
   * @param stage 舞台对象
   * @returns xml字符串
   */
  private flowGraph2BPMNXML(graph: DDeiFlowGraph): DDeiFlowBpmnXmlNode {
    let returnData;
    let contentStr = ''
    let defineStr = ''
    let skip = false
    if (this.bpmnProcessorFN) {
      let fnResult = this.bpmnProcessorFN(graph,0);
      if (fnResult !== false) {
        returnData = fnResult
        skip = true; 
      }
    }
    if (!skip){
      if (graph) {
        contentStr += '  <bpmn:process id="' + graph.id + '" isExecutable="true">\n'
        //遍历所有节点生成
        let innerStr = ''
        let processStr = ''
        graph.nodes.forEach(node=>{
          let nodeResult: DDeiFlowBpmnXmlNode = this.node2BPMNXML(node, 3)
          if (nodeResult) {
            if (nodeResult.contentStr) {
              innerStr += nodeResult.contentStr
            }
            if (nodeResult.defineStr) {
              defineStr += nodeResult.defineStr
            }
            if (nodeResult.processStr) {
              processStr += nodeResult.processStr
            }
          }
        })
        contentStr += processStr
        contentStr += innerStr
        contentStr += '  </bpmn:process>\n'
      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, null,null)
    }
    if (this.bpmnAfterProcessorFN) {
      returnData = this.bpmnAfterProcessorFN(graph,0 , returnData)
    }
    return returnData;
  }

  private node2BPMNXML(node, tabLevel: number = 0): DDeiFlowBpmnXmlNode {
    if (node){
      //连接线
      if(node instanceof DDeiFlowSequence){
        return this.sequence2BPMNXML(node,3)
      } 
      //节点
      else if (node instanceof DDeiFlowNode) {
      
        if(node.bpmnType == 'StartEvent'){
          return this.startEvent2BPMNXML(node, tabLevel);
        } else if (node.bpmnType == 'BoundaryEvent') {
          return this.boundaryEvent2BPMNXML(node, tabLevel);
        } else if (node.bpmnType == 'IntermediateCatchEvent') {
          return this.intermediaCatchEvent2BPMNXML(node, tabLevel);
        } else if (node.bpmnType == 'IntermediateThrowEvent') {
          return this.intermediaThrowEvent2BPMNXML(node, tabLevel);
        } else if (node.bpmnType == 'EndEvent') {
          return this.endEvent2BPMNXML(node, tabLevel);
        } else if (node.bpmnType == 'SubProcess') {
          return this.subProcess2BPMNXML(node, tabLevel);
        } else if (node.bpmnBaseType == 'Gateway'){
          return this.gateway2BPMNXML(node, tabLevel)
        } else if (node.bpmnType == 'Comment') {
          return this.comment2BPMNXML(node, tabLevel)
        } else if (node.bpmnBaseType == 'Other') {
          return this.other2BPMNXML(node, tabLevel)
        } else {
          return this.task2BPMNXML(node,tabLevel)
        }
      }
      //分组
      else if (node instanceof DDeiFlowGroup) {

      }
      
    }
    return null;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private startEvent2BPMNXML(node: DDeiFlowNode, tabLevel: number = 0): DDeiFlowBpmnXmlNode {
    let returnData;
    let contentStr = ''
    let defineStr = ''
    let processStr = ''
    let currentProcessStr = ''
    let skip = false
    if (this.bpmnProcessorFN) {
      let fnResult = this.bpmnProcessorFN(node, tabLevel);
      if (fnResult !== false) {
        returnData = fnResult
        skip = true;
      }
    }
    if (!skip) {
      let tabStr = ""
      for (let i = 0; i < tabLevel; i++) {
        tabStr += " "
      }
      if (node) {
        contentStr += tabStr + '<bpmn:startEvent id="' + (node[this.jsonKeyField] ? node[this.jsonKeyField] : node.id) + '"'
        if (node.name) {
          contentStr += 'name="' + node.name + '"'
        }
        //依附的taskid
        if (node.attachPNode) {
          contentStr += ' attachedToRef="' + (node.attachPNode[this.jsonKeyField] ? node.attachPNode[this.jsonKeyField] : node.attachPNode.id) + '"'
        }

        if (node.bpmnSubType != 9 && node.notInterrupting) {
          //事件子流程
          if (node.subProcesses?.length > 0 && node.subProcesses[0]?.bpmnSubType == 2) {
            contentStr += ' isInterrupting="false"'
          }
          
        }
        
        let childXML = ''
        //消息
        if (node.bpmnSubType == 2) {
          defineStr += '  <bpmn:message id="' + node.id + '_msg" name="' + (node.messageName ? node.messageName : '') +'" />\n'
          childXML += tabStr + ' <bpmn:messageEventDefinition messageRef="'+node.id+'_msg" />\n'
        }
        //定时器
        else if (node.bpmnSubType == 3) {
          childXML += tabStr + ' <bpmn:timerEventDefinition>\n'
          if (node.timeType == 'timeDuration') {
            childXML += tabStr + '   <bpmn:timeCycle>' + (node.timeValue ? node.timeValue : '') + '</bpmn:timeCycle>\n'
          } else if (node.timeType == 'CRON') {
            childXML += tabStr + '   <bpmn:timeCycle>' + (node.timeValue ? node.timeValue : '') + '</bpmn:timeCycle>\n'
          } else {
            childXML += tabStr + '   <bpmn:timeDate>' + (node.timeValue ? node.timeValue : '') +'</bpmn:timeDate>\n'
          }
          childXML += tabStr + ' </bpmn:timerEventDefinition>\n'
        }
        //条件
        else if (node.bpmnSubType == 4) {
          childXML += tabStr + ' <bpmn:conditionalEventDefinition>\n'
          childXML += tabStr + '  <bpmn:condition xsi:type="bpmn:tFormalExpression">'
          childXML += tabStr + '    <![CDATA[' + (node.condition ? node.condition : '') + ']]>\n'
          childXML += tabStr + '  </bpmn:condition>\n'
          childXML += tabStr + ' </bpmn:conditionalEventDefinition>\n'
        }
        //信号
        else if (node.bpmnSubType == 5) {
          defineStr += '  <bpmn:signal id="' + node.id + '_signal" name="' + (node.signalName ? node.signalName : '') + '" />\n'
          childXML += tabStr + ' <bpmn:signalEventDefinition id="'+node.id+'_signal_def" signalRef="'+node.id+'_signal"/>\n'
        }
        //错误
        else if (node.bpmnSubType == 9) {
          if (node.errorCode) {
            defineStr += '  <bpmn:error id="' + node.id + '_error" errorCode="' + node.errorCode + '" />\n'
            childXML += tabStr + ' <bpmn:errorEventDefinition errorRef="' + node.id + '_error" />\n'
          } else {
            childXML += tabStr + ' <bpmn:errorEventDefinition/>\n'
          }
        }//补偿
        else if (node.bpmnSubType == 10) {
          childXML += tabStr + ' <bpmn:compensateEventDefinition />\n'
        }
        //升级
        else if (node.bpmnSubType == 8) {
          defineStr += '  <bpmn:escalation id="' + node.id + '_escal" name="' + node.escalName + '" />\n'
          childXML += tabStr + ' <bpmn:escalationEventDefinition escalationRef="' + node.id + '_escal"/>\n'
        }
        //并行
        else if (node.bpmnSubType == 7) {
          contentStr += ' parallelMultiple="true"'
        }
        //多次
        else if (node.bpmnSubType == 6) {
          childXML += tabStr + ' <bpmn:multiInstanceLoopCharacteristics isSequential="false">\n'
          //实例数量
          if (node.loopCardinality) {
            childXML += tabStr + '  <bpmn:loopCardinality xsi:type="bpmn:tFormalExpression">'
            childXML += tabStr + '   <![CDATA[' + (node.loopCardinality ? node.loopCardinality : '') + ']]>\n'
            childXML += tabStr + '  </bpmn:loopCardinality>\n'
          }
          childXML += tabStr + ' </bpmn:multiInstanceLoopCharacteristics>\n'
        }
        //非中断
        if (node.notInterrupting){
          childXML += tabStr + '<bpmn:nonInterrupting>true</bpmn:nonInterrupting>\n'
        }
        if (childXML){
          contentStr += '>\n' + childXML + tabStr +'</bpmn:startEvent>\n'
        }else{
          contentStr += '/>\n'
        }
        
      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, currentProcessStr)
    }
    if (this.bpmnAfterProcessorFN) {
      returnData = this.bpmnAfterProcessorFN(node, tabLevel, returnData)
    }
    return returnData;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private boundaryEvent2BPMNXML(node: DDeiFlowNode, tabLevel: number = 0): DDeiFlowBpmnXmlNode {
    let returnData;
    let contentStr = ''
    let defineStr = ''
    let processStr = ''
    let currentProcessStr = ''
    let skip = false
    if (this.bpmnProcessorFN) {
      let fnResult = this.bpmnProcessorFN(node, tabLevel);
      if (fnResult !== false) {
        returnData = fnResult
        skip = true;
      }
    }
    if (!skip) {
      let tabStr = ""
      for (let i = 0; i < tabLevel; i++) {
        tabStr += " "
      }
      if (node) {
        contentStr += tabStr + '<bpmn:boundaryEvent id="' + (node[this.jsonKeyField] ? node[this.jsonKeyField] : node.id) + '"'
        if (node.name) {
          contentStr += 'name="' + node.name + '"'
        }
        if ((!node.bpmnSubType || node.bpmnSubType == 1 || node.bpmnSubType == 2 || node.bpmnSubType == 7 || node.bpmnSubType == 8 || node.bpmnSubType == 9)  && node.notInterrupting == 1) {
          contentStr += ' cancelActivity="false"'
        } else if (node.bpmnSubType == 6 || node.bpmnSubType == 5){

        } else {
          contentStr += ' cancelActivity="true"'
        }
        
        //依附的taskid
        if (node.attachPNode){
          contentStr += ' attachedToRef="' + (node.attachPNode[this.jsonKeyField] ? node.attachPNode[this.jsonKeyField] : node.attachPNode.id) +'"'
        }

        let childXML = ''
        //消息
        if (!node.bpmnSubType || node.bpmnSubType == 1) {
          defineStr += '  <bpmn:message id="' + (node[this.jsonKeyField] ? node[[this.jsonKeyField]] : node.id) + '_msg" name="' + (node.messageName ? node.messageName : '') + '" />\n'
          childXML += tabStr + ' <bpmn:messageEventDefinition messageRef="' + node.id + '_msg" />\n'
          
        }
        //定时器
        else if (node.bpmnSubType == 2) {
          childXML += tabStr + ' <bpmn:timerEventDefinition>\n'
          if (node.timeType == 'timeDuration') {
            childXML += tabStr + '   <bpmn:timeCycle>' + (node.timeValue ? node.timeValue : '')  + '</bpmn:timeCycle>\n'
          } else if (node.timeType == 'CRON') {
            childXML += tabStr + '   <bpmn:timeCycle>' + (node.timeValue ? node.timeValue : '') + '</bpmn:timeCycle>\n'
          } else {
            childXML += tabStr + '   <bpmn:timeDate>' + (node.timeValue ? node.timeValue : '') + '</bpmn:timeDate>\n'
          }
          childXML += tabStr + ' </bpmn:timerEventDefinition>\n'
        }
        //信号
        else if (node.bpmnSubType == 3) {
          defineStr += '  <bpmn:signal id="' + node.id + '_signal" name="' + (node.signalName ? node.signalName : '' )+ '" />\n'
          childXML += tabStr + ' <bpmn:signalEventDefinition id="' + node.id + '_signal_def" signalRef="' + node.id + '_signal" />\n'
        }
        //错误
        else if (node.bpmnSubType == 4) {
          if (node.errorCode){
            defineStr += '  <bpmn:error id="' + node.id + '_error" errorCode="' + node.errorCode + '" />\n'
            childXML += tabStr + ' <bpmn:errorEventDefinition errorRef="' + node.id + '_error" />\n'
          }else{
            childXML += tabStr + ' <bpmn:errorEventDefinition/>\n'
          }
          
        }
        //取消
        else if (node.bpmnSubType == 6) {
          childXML += tabStr + ' <bpmn:cancelEventDefinition />\n'
        }
        //补偿
        else if (node.bpmnSubType == 5) {
          childXML += tabStr + ' <bpmn:compensateEventDefinition />\n'
        }
        //并行
        else if (node.bpmnSubType == 8) {
          contentStr += ' parallelMultiple="true"'
        }
        //多次
        else if (node.bpmnSubType == 9) {
          childXML += tabStr + ' <bpmn:multiInstanceLoopCharacteristics isSequential="false">\n'
          //实例数量
          if (node.loopCardinality) {
            childXML += tabStr + '  <bpmn:loopCardinality xsi:type="bpmn:tFormalExpression">'
            childXML += tabStr + '   <![CDATA[' + (node.loopCardinality ? node.loopCardinality : '') + ']]>\n'
            childXML += tabStr + '  </bpmn:loopCardinality>\n'
          }
          childXML += tabStr + ' </bpmn:multiInstanceLoopCharacteristics>\n'
        }
        
        //升级
        else if (node.bpmnSubType == 7) {
          defineStr += '  <bpmn:escalation id="' + node.id + '_escal" name="' + node.escalName + '" />\n'
          childXML += tabStr + ' <bpmn:escalationEventDefinition escalationRef="' + node.id + '_escal"/>\n'
        }
      
        //非中断
        if (node.notInterrupting) {
          childXML += tabStr + '<bpmn:nonInterrupting>true</bpmn:nonInterrupting>\n'
        }

        if (childXML) {
          contentStr += '>\n' + childXML + tabStr + '</bpmn:boundaryEvent>\n'
        } else {
          contentStr += '/>\n'
        }

      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, currentProcessStr)
    }
    if (this.bpmnAfterProcessorFN) {
      returnData = this.bpmnAfterProcessorFN(node, tabLevel, returnData)
    }
    return returnData;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private intermediaCatchEvent2BPMNXML(node: DDeiFlowNode, tabLevel: number = 0): DDeiFlowBpmnXmlNode {
    let returnData;
    let contentStr = ''
    let defineStr = ''
    let processStr = ''
    let currentProcessStr = ''
    let skip = false
    if (this.bpmnProcessorFN) {
      let fnResult = this.bpmnProcessorFN(node, tabLevel);
      if (fnResult !== false) {
        returnData = fnResult
        skip = true;
      }
    }
    if (!skip) {
      let tabStr = ""
      for (let i = 0; i < tabLevel; i++) {
        tabStr += " "
      }
      if (node) {
        contentStr += tabStr + '<bpmn:intermediateCatchEvent id="' + node.id + '"'
        if (node.name) {
          contentStr += 'name="' + node.name + '"'
        }

        let childXML = ''
        //消息
        if (node.bpmnSubType == 2) {
          defineStr += '  <bpmn:message id="' + node.id + '_msg" name="' + (node.messageName ? node.messageName : '') + '" />\n'
          childXML += tabStr + ' <bpmn:messageEventDefinition messageRef="' + node.id + '_msg" />\n'

        }
        //定时器
        else if (!node.bpmnSubType || node.bpmnSubType == 1) {
          childXML += tabStr + ' <bpmn:timerEventDefinition>\n'
          if (node.timeType == 'timeDuration') {
            childXML += tabStr + '   <bpmn:timeCycle>' + (node.timeValue ? node.timeValue : '') + '</bpmn:timeCycle>\n'
          } else if (node.timeType == 'CRON') {
            childXML += tabStr + '   <bpmn:timeCycle>' + (node.timeValue ? node.timeValue : '') + '</bpmn:timeCycle>\n'
          } else {
            childXML += tabStr + '   <bpmn:timeDate>' + (node.timeValue ? node.timeValue : '') + '</bpmn:timeDate>\n'
          }
          childXML += tabStr + ' </bpmn:timerEventDefinition>\n'
        }
        //信号
        else if (node.bpmnSubType == 3) {
          defineStr += '  <bpmn:signal id="' + node.id + '_signal" name="' + (node.signalName ? node.signalName : '') + '" />\n'
          childXML += tabStr + ' <bpmn:signalEventDefinition id="' + node.id + '_signal_def" signalRef="' + node.id + '_signal" />\n'
        }
        //并行
        else if (node.bpmnSubType == 5) {
          contentStr += ' parallelMultiple="true"'
        }
        //链接
        if (node.bpmnSubType == 4) {
          childXML += tabStr + '<bpmn:linkEventDefinition/>\n'
        }
        //多次
        else if (node.bpmnSubType == 6) {
          childXML += tabStr + ' <bpmn:multiInstanceLoopCharacteristics isSequential="false">\n'
          //实例数量
          if (node.loopCardinality) {
            childXML += tabStr + '  <bpmn:loopCardinality xsi:type="bpmn:tFormalExpression">'
            childXML += tabStr + '   <![CDATA[' + (node.loopCardinality ? node.loopCardinality : '') + ']]>\n'
            childXML += tabStr + '  </bpmn:loopCardinality>\n'
          }
          childXML += tabStr + ' </bpmn:multiInstanceLoopCharacteristics>\n'
        }


        if (childXML) {
          contentStr += '>\n' + childXML + tabStr + '</bpmn:intermediateCatchEvent>\n'
        } else {
          contentStr += '/>\n'
        }

      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, currentProcessStr)
    }
    if (this.bpmnAfterProcessorFN) {
      returnData = this.bpmnAfterProcessorFN(node, tabLevel, returnData)
    }
    return returnData;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private intermediaThrowEvent2BPMNXML(node: DDeiFlowNode, tabLevel: number = 0): DDeiFlowBpmnXmlNode {
    let returnData;
    let contentStr = ''
    let defineStr = ''
    let processStr = ''
    let currentProcessStr = ''
    let skip = false
    if (this.bpmnProcessorFN) {
      let fnResult = this.bpmnProcessorFN(node, tabLevel);
      if (fnResult !== false) {
        returnData = fnResult
        skip = true;
      }
    }
    if (!skip) {
      let tabStr = ""
      for (let i = 0; i < tabLevel; i++) {
        tabStr += " "
      }
      if (node) {
        contentStr += tabStr + '<bpmn:intermediateThrowEvent id="' + node.id + '"'
        if (node.name) {
          contentStr += 'name="' + node.name + '"'
        }

        let childXML = ''
        //消息
        if (node.bpmnSubType == 2) {
          defineStr += '  <bpmn:message id="' + node.id + '_msg" name="' + (node.messageName ? node.messageName : '') + '" />\n'
          childXML += tabStr + ' <bpmn:messageEventDefinition messageRef="' + node.id + '_msg" />\n'
        }
        //信号
        else if (node.bpmnSubType == 3) {
          defineStr += '  <bpmn:signal id="' + node.id + '_signal" name="' + (node.signalName ? node.signalName : '') + '" />\n'
          childXML += tabStr + ' <bpmn:signalEventDefinition id="' + node.id + '_signal_def" signalRef="' + node.id + '_signal" />\n'
        }
        //补偿
        else if (node.bpmnSubType == 4) {
          childXML += tabStr + ' <bpmn:compensateEventDefinition />\n'
        }

        //非中断
        if (node.notInterrupting) {
          childXML += tabStr + '<bpmn:nonInterrupting>true</bpmn:nonInterrupting>\n'
        }
        //链接
        if (node.bpmnSubType == 7) {
          childXML += tabStr + '<bpmn:linkEventDefinition/>\n'
        }

        //升级
        else if (node.bpmnSubType == 6) {
          defineStr += '  <bpmn:escalation id="' + node.id + '_escal" name="' + node.escalName + '" />\n'
          childXML += tabStr + ' <bpmn:escalationEventDefinition escalationRef="' + node.id + '_escal"/>\n'
        }
        //多次
        else if (node.bpmnSubType == 5) {
          childXML += tabStr + ' <bpmn:multiInstanceLoopCharacteristics isSequential="false">\n'
          //实例数量
          if (node.loopCardinality) {
            childXML += tabStr + '  <bpmn:loopCardinality xsi:type="bpmn:tFormalExpression">'
            childXML += tabStr + '   <![CDATA[' + (node.loopCardinality ? node.loopCardinality : '') + ']]>\n'
            childXML += tabStr + '  </bpmn:loopCardinality>\n'
          }
          childXML += tabStr + ' </bpmn:multiInstanceLoopCharacteristics>\n'
        }

        if (childXML) {
          contentStr += '>\n' + childXML + tabStr + '</bpmn:intermediateThrowEvent>\n'
        } else {
          contentStr += '/>\n'
        }

      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, currentProcessStr)
    }
    if (this.bpmnAfterProcessorFN) {
      returnData = this.bpmnAfterProcessorFN(node, tabLevel, returnData)
    }
    return returnData;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private endEvent2BPMNXML(node: DDeiFlowNode, tabLevel: number = 0): DDeiFlowBpmnXmlNode {
    let returnData;
    let contentStr = ''
    let defineStr = ''
    let processStr = ''
    let currentProcessStr = ''
    let skip = false
    if (this.bpmnProcessorFN) {
      let fnResult = this.bpmnProcessorFN(node, tabLevel);
      if (fnResult !== false) {
        returnData = fnResult
        skip = true;
      }
    }
    if (!skip) {
      let tabStr = ""
      for (let i = 0; i < tabLevel; i++) {
        tabStr += " "
      }
      if (node) {
        contentStr += tabStr + '<bpmn:endEvent id="' + node.id + '"'
        if (node.name) {
          contentStr += 'name="' + node.name + '"'
        }
        let childXML = ''
        //错误
        if (node.bpmnSubType == 6) {
          if (node.errorCode){
            defineStr += '  <bpmn:error id="' + node.id + '_error" errorCode="' + node.errorCode + '" />\n'
            childXML += tabStr + ' <bpmn:errorEventDefinition errorRef="' + node.id + '_error"/>\n'
          } else {
            childXML += tabStr + ' <bpmn:errorEventDefinition/>\n'
          }
        }
        //中断
        else if (node.bpmnSubType == 9) {
          childXML += tabStr + ' <bpmn:terminateEventDefinition/>\n'
        }
        //取消
        else if (node.bpmnSubType == 8) {
          childXML += tabStr + ' <bpmn:cancelEventDefinition/>\n'
        }
        //信号
        else if (node.bpmnSubType == 3) {
          defineStr += '  <bpmn:signal id="' + node.id + '_signal" name="' + (node.signalName ? node.signalName : '') + '" />\n'
          childXML += tabStr + ' <bpmn:signalEventDefinition id="' + node.id + '_signal_def" signalRef="' + node.id + '_signal"/>\n'
        }
       
        //补偿
        else if (node.bpmnSubType == 7) {
          childXML += tabStr + ' <bpmn:compensateEventDefinition />\n'
        }
        //消息
        else if (node.bpmnSubType == 2) {
            defineStr += '  <bpmn:message id="' + node.id + '_msg" name="' + (node.messageName ? node.messageName : '') + '" />\n'
            childXML += tabStr + ' <bpmn:messageEventDefinition messageRef="' + node.id + '_msg" />\n'
        }
        //升级
        else if (node.bpmnSubType == 5) {
          defineStr += '  <bpmn:escalation id="' + node.id + '_escal" name="' + node.escalName + '" />\n'
          childXML += tabStr + ' <bpmn:escalationEventDefinition escalationRef="' + node.id + '_escal"/>\n'
        }

        //多次
        else if (node.bpmnSubType == 4) {
          childXML += tabStr + ' <bpmn:multiInstanceLoopCharacteristics isSequential="false">\n'
          //实例数量
          if (node.loopCardinality) {
            childXML += tabStr + '  <bpmn:loopCardinality xsi:type="bpmn:tFormalExpression">'
            childXML += tabStr + '   <![CDATA[' + (node.loopCardinality ? node.loopCardinality : '') + ']]>\n'
            childXML += tabStr + '  </bpmn:loopCardinality>\n'
          }
          childXML += tabStr + ' </bpmn:multiInstanceLoopCharacteristics>\n'
        }
        //非中断
        if (node.notInterrupting) {
          childXML += tabStr + '<bpmn:nonInterrupting>true</bpmn:nonInterrupting>\n'
        }
        if (childXML) {
          contentStr += '>\n' + childXML + tabStr + '</bpmn:endEvent>\n'
        } else {
          contentStr += '/>\n'
        }
      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr,defineStr,processStr,currentProcessStr)
    }
    if (this.bpmnAfterProcessorFN) {
      returnData = this.bpmnAfterProcessorFN(node, tabLevel, returnData)
    }
    return returnData;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private task2BPMNXML(node: DDeiFlowNode, tabLevel: number = 0): DDeiFlowBpmnXmlNode {
    let returnData;
    let contentStr = ''
    let defineStr = ''
    let processStr = ''
    let currentProcessStr = ''
    let skip = false
    if (this.bpmnProcessorFN) {
      let fnResult = this.bpmnProcessorFN(node, tabLevel);
      if (fnResult !== false) {
        returnData = fnResult
        skip = true;
      }
    }
    if (!skip) {
      let tabStr = ""
      for (let i = 0; i < tabLevel; i++) {
        tabStr += " "
      }
      if (node) {
        let childXML = ''
        let nodeTag = "bpmn:task"
        if (node.bpmnType == 'UserTask') {
          nodeTag = "bpmn:userTask"
        } else if (node.bpmnType == 'ServiceTask') {
          nodeTag = "bpmn:serviceTask"
        } else if (node.bpmnType == 'SendTask') {
          nodeTag = "bpmn:sendTask"
        } else if (node.bpmnType == 'ScriptTask') {
          nodeTag = "bpmn:scriptTask"
        } else if (node.bpmnType == 'ManualTask') {
          nodeTag = "bpmn:manualTask"
        } else if (node.bpmnType == 'ReceiveTask') {
          nodeTag = "bpmn:receiveTask"
        } else if (node.bpmnType == 'CallActivityTask') {
          nodeTag = "bpmn:callActivity"
        } else if (node.bpmnType == 'ChoreographyTask') {
          nodeTag = "bpmn:choreography"
        } else if (node.bpmnType == 'BusinessTask') {
          nodeTag = "bpmn:businessRuleTask"
        }

        
        contentStr += tabStr + '<' + nodeTag + ' id="' + (node[this.jsonKeyField] ? node[this.jsonKeyField] : node.id) + '"'
        if (node.name) {
          contentStr += ' name="' + node.name + '"'
        }
        //补偿
        
        if (node.isCompensation){
          contentStr += ' isForCompensation="true"'
        }
        if (node.bpmnType == 'ScriptTask') {
          nodeTag = "bpmn:scriptTask"
          if (node.scriptFormat) {
            contentStr += ' scriptFormat="' + node.scriptFormat + '"'
          } else if (node.script) {
            contentStr += ' scriptFormat="groovy"'
          }
          if (node.script) {
            let scriptArr = node.script.split("\n")
            childXML += tabStr + " <script><![CDATA[\n"
            for (let i = 0; i < scriptArr.length; i++) {
              childXML += tabStr + " " + scriptArr[i] + "\n"
            }
            childXML += tabStr + " ]]></script>\n"
          }
        } else if (node.bpmnType == 'UserTask') {
          nodeTag = "bpmn:userTask"
          if (node.humanPerformer) {
            childXML += tabStr + ' <humanPerformer>\n'
            childXML += tabStr + '  <resourceAssignmentExpression>\n'
            childXML += tabStr + '   <formalExpression>' + node.humanPerformer.trim() + '</formalExpression>\n'
            childXML += tabStr + '  </resourceAssignmentExpression>\n'
            childXML += tabStr + ' </humanPerformer>\n'
          }
          if (node.potentialOwner) {
            let potentArr = node.potentialOwner.split(",")

            childXML += tabStr + ' <potentialOwner>\n'
            childXML += tabStr + '  <resourceAssignmentExpression>\n'
            childXML += tabStr + '   <formalExpression>'
            for (let i = 0; i < potentArr.length; i++) {
              if (i != 0) {
                childXML += ','
              }
              if (potentArr[i].trim()) {
                childXML += 'user(' + potentArr[i].trim() + ')'
              }
            }

            childXML += '</formalExpression>\n'
            childXML += tabStr + '  </resourceAssignmentExpression>\n'
            childXML += tabStr + ' </potentialOwner>\n'
          }
        }

        if (node.activityId){
          contentStr += ' calledElement="' + node.activityId + '"'
        }

        

        //描述
        childXML += this.bpmnXmlSubDocumentation(node, tabLevel + 1)
        //进出属性
        childXML += this.bpmnXmlSubInOut(node, tabLevel + 1)
        //多实例
        childXML += this.bpmnXmlSubMultiInstance(node, tabLevel + 1)
        if (childXML) {
          contentStr += '>\n' + childXML + tabStr + '</' + nodeTag + '>\n'
        } else {
          contentStr += '/>\n'
        }
      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, currentProcessStr)
    }
    if (this.bpmnAfterProcessorFN) {
      returnData = this.bpmnAfterProcessorFN(node, tabLevel, returnData)
    }
    return returnData;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private other2BPMNXML(node: DDeiFlowNode, tabLevel: number = 0): DDeiFlowBpmnXmlNode {
    let returnData;
    let contentStr = ''
    let defineStr = ''
    let processStr = ''
    let currentProcessStr = ''
    let skip = false
    if (this.bpmnProcessorFN) {
      let fnResult = this.bpmnProcessorFN(node, tabLevel);
      if (fnResult !== false) {
        returnData = fnResult
        skip = true;
      }
    }
    if (!skip) {
      let tabStr = ""
      for (let i = 0; i < tabLevel; i++) {
        tabStr += " "
      }
      if (node) {
        let nodeTag = "bpmn:dataObject"
        if (node.bpmnType == 'DataObject') {
          if (node.bpmnSubType == 2){
            nodeTag = "bpmn:dataInput"
          } else if (node.bpmnSubType == 3) {
            nodeTag = "bpmn:dataOutput"
          }
        } else if (node.bpmnType == 'User') {
  
        } else if (node.bpmnType == 'Message') {
          nodeTag = "bpmn:message"
        } else if (node.bpmnType == 'DataStore') {
          nodeTag = "bpmn:dataStore"
        }
        contentStr += tabStr + '<' + nodeTag + ' id="' + (node[this.jsonKeyField] ? node[this.jsonKeyField] : node.id) + '"'
        if (node.name) {
          contentStr += ' name="' + node.name + '"'
        }
        if (node.bpmnType == 'DataObject') {
          switch(node.dataType){
            case 2: {
              contentStr += ' itemSubjectRef="xsd:int"'
            } break;
            case 3: {
              contentStr += ' itemSubjectRef="xsd:long"'
            } break;
            case 4: {
              contentStr += ' itemSubjectRef="xsd:float"'
            } break;
            case 5: {
              contentStr += ' itemSubjectRef="xsd:double"'
            } break;
            case 6: {
              contentStr += ' itemSubjectRef="xsd:boolean"'
            } break;
            case 7: {
              contentStr += ' itemSubjectRef="xsd:datetime"'
            } break;
            case 8: {
              if (node.customDataType?.trim()){
                contentStr += ' itemSubjectRef="' + node.customDataType.trim() +'"'
              }
            } break;
            default: {
              contentStr += ' itemSubjectRef="xsd:string"'
            } break;
          }
          if (node.isCollection){
            contentStr += ' isCollection="true"'
          }
        } else if (node.bpmnType == 'DataStore') {
          if (node.isUnlimited) {
            contentStr += ' isUnlimited="true"'
          } else if (node.capacity){
            contentStr += ' capacity="' + node.capacity +'"'
          }
        }
       

        let childXML = ''

        //描述
        childXML += this.bpmnXmlSubDocumentation(node, tabLevel + 1)

        if (childXML) {
          contentStr += '>\n' + childXML + tabStr + '</' + nodeTag + '>\n'
        } else {
          contentStr += '/>\n'
        }
      }
      if (node.bpmnType == 'Message') {
        defineStr = contentStr.replace(tabStr,"  ")
        contentStr = ''
        
      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, currentProcessStr)
    }
    if (this.bpmnAfterProcessorFN) {
      returnData = this.bpmnAfterProcessorFN(node, tabLevel, returnData)
    }
    return returnData;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private comment2BPMNXML(node: DDeiFlowNode, tabLevel: number = 0): DDeiFlowBpmnXmlNode {
    let returnData;
    let contentStr = ''
    let defineStr = ''
    let processStr = ''
    let currentProcessStr = ''
    let skip = false
    if (this.bpmnProcessorFN) {
      let fnResult = this.bpmnProcessorFN(node, tabLevel);
      if (fnResult !== false) {
        returnData = fnResult
        skip = true;
      }
    }
    if (!skip) {
      let tabStr = ""
      for (let i = 0; i < tabLevel; i++) {
        tabStr += " "
      }
      if (node) {
        let nodeTag = "bpmn:textAnnotation"
        
        contentStr += tabStr + '<' + nodeTag + ' id="' + (node[this.jsonKeyField] ? node[this.jsonKeyField] : node.id) + '"'
        let childXML = ''
        if(node.text){
          childXML += tabStr +'  <bpmn:text>'+node.text+'</bpmn:text>\n'
        }
        
        if (childXML) {
          contentStr += '>\n' + childXML + tabStr + '</' + nodeTag + '>\n'
        } else {
          contentStr += '/>\n'
        }
      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, currentProcessStr)
    }
    if (this.bpmnAfterProcessorFN) {
      returnData = this.bpmnAfterProcessorFN(node, tabLevel, returnData)
    }
    return returnData;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private gateway2BPMNXML(node: DDeiFlowNode, tabLevel: number = 0): DDeiFlowBpmnXmlNode {
    let returnData;
    let contentStr = ''
    let defineStr = ''
    let processStr = ''
    let currentProcessStr = ''
    let skip = false
    if (this.bpmnProcessorFN) {
      let fnResult = this.bpmnProcessorFN(node, tabLevel);
      if (fnResult !== false) {
        returnData = fnResult
        skip = true;
      }
    }
    if (!skip) {
      let tabStr = ""
      for (let i = 0; i < tabLevel; i++) {
        tabStr += " "
      }
      if (node) {
        let nodeTag = ""
        if (node.bpmnType == 'ExclusiveGateway') {
          nodeTag = "bpmn:exclusiveGateway"
        } else if (node.bpmnType == 'ParallelGateway') {
          nodeTag = "bpmn:parallelGateway"
        } else if (node.bpmnType == 'ComplexGateway') {
          nodeTag = "bpmn:complexGateway"
        } else if (node.bpmnType == 'EventBasedGateway') {
          nodeTag = "bpmn:eventBasedGateway"
        } else if (node.bpmnType == 'InclusiveGateway') {
          nodeTag = "bpmn:inclusiveGateway"
        } 
        contentStr += tabStr + '<' + nodeTag + ' id="' + (node[this.jsonKeyField] ? node[this.jsonKeyField] : node.id) + '"'
        if (node.name) {
          contentStr += ' name="' + node.name + '"'
        }

        //默认
        if (node.bpmnType == 'ExclusiveGateway') {
          let defSeqs = this.getDefaultSequenceNodes(node)
          if (defSeqs?.length > 0){
            contentStr += ' default="' + (defSeqs[0][this.jsonKeyField] ? defSeqs[0][this.jsonKeyField] : defSeqs[0].id) + '"'
          }
        }

        let childXML = ''

        //描述
        childXML += this.bpmnXmlSubDocumentation(node, tabLevel + 1)
        //进出属性
        childXML += this.bpmnXmlSubInOut(node, tabLevel + 1)
    
        if (childXML) {
          contentStr += '>\n' + childXML + tabStr + '</' + nodeTag + '>\n'
        } else {
          contentStr += '/>\n'
        }
      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, currentProcessStr)
    }
    if (this.bpmnAfterProcessorFN) {
      returnData = this.bpmnAfterProcessorFN(node, tabLevel, returnData)
    }
    return returnData;
  }


  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private subProcess2BPMNXML(node: DDeiFlowNode, tabLevel: number = 0): DDeiFlowBpmnXmlNode {
    let returnData;
    let contentStr = ''
    let defineStr = ''
    let processStr = ''
    let skip = false
    if (this.bpmnProcessorFN) {
      let fnResult = this.bpmnProcessorFN(node, tabLevel);
      if (fnResult !== false) {
        returnData = fnResult
        skip = true;
      }
    }
    if (!skip) {
      let tabStr = ""
      for (let i = 0; i < tabLevel; i++) {
        tabStr += " "
      }
      if (node) {
        let nodeTag = "bpmn:subProcess"
        if (node.bpmnSubType == 3) {
          nodeTag = "bpmn:transaction"
        } else if (node.bpmnSubType == 4) {
          nodeTag = "bpmn:adHocSubProcess"
        }
        contentStr += tabStr + '<' + nodeTag + ' id="' + (node[this.jsonKeyField] ? node[this.jsonKeyField] : node.id) + '"'
        if (node.name) {
          contentStr += ' name="' + node.name + '"'
        }
        if (node.bpmnSubType == 4 && node.ordering == 1) {
          //执行顺序Sequential，默认并行Parallel
          contentStr += ' ordering="Sequential"'
        }
        //补偿
        if (node.isCompensation) {
          contentStr += ' isForCompensation="true"'
        }
        if(node.bpmnSubType == 2){
          contentStr += ' triggeredByEvent="true"'
        }
        let childXML = ''
        let currentProcessStr = ''
        //描述
        
        childXML += this.bpmnXmlSubDocumentation(node, tabLevel + 1)
        //多实例
        childXML += this.bpmnXmlSubMultiInstance(node, tabLevel + 1)
        node.nodes?.forEach(subNode => {
          let nodeResult: DDeiFlowBpmnXmlNode = this.node2BPMNXML(subNode, tabLevel + 1)
          if (nodeResult) {
            if (nodeResult.contentStr){
              childXML += nodeResult.contentStr
            }
            if (nodeResult.defineStr){
              defineStr += nodeResult.defineStr
            }
            if (nodeResult.processStr){
              processStr += nodeResult.processStr
            }
            if (nodeResult.currentProcessStr){
              currentProcessStr += nodeResult.currentProcessStr
            }
          }
        })
        if (currentProcessStr){
          childXML = currentProcessStr + childXML
        }
        if (childXML) {
          contentStr += '>\n' + childXML + tabStr + '</' + nodeTag +'>\n'
        } else {
          contentStr += '/>\n'
        }
      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, null)
    }
    if (this.bpmnAfterProcessorFN) {
      returnData = this.bpmnAfterProcessorFN(node, tabLevel, returnData)
    }
    return returnData;
  }



  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private sequence2BPMNXML(sequence: DDeiFlowSequence, tabLevel: number = 0): DDeiFlowBpmnXmlNode {
    let returnData;
    let contentStr = ''
    let defineStr = ''
    let processStr = ''
    let currentProcessStr = ''
    let skip = false
    if (this.bpmnProcessorFN) {
      let fnResult = this.bpmnProcessorFN(sequence);
      if (fnResult !== false) {
        returnData = fnResult
        skip = true;
      }
    }
    if (!skip) {
      let tabStr = ""
      for (let i = 0; i < tabLevel; i++) {
        tabStr += " "
      }
      if (sequence) {
        let noneDirection = false
        let nodeTag = "bpmn:sequenceFlow"
        if (sequence.bpmnSubType == 5 || (sequence.prevNode?.bpmnType == 'Comment' || sequence.nextNode.bpmnType == 'Comment')){
          nodeTag = "bpmn:association"
          noneDirection = true
        }
        contentStr += tabStr + '<' + nodeTag + ' id="' + (sequence[this.jsonKeyField] ? sequence[this.jsonKeyField] : sequence.id) + '"' 
        if (sequence.name) {
          contentStr += ' name="' + sequence.name + '"'
        }
        //对注释的特别处理
        if (sequence.prevNode?.bpmnType == 'Comment' || sequence.nextNode.bpmnType == 'Comment'){
          let commentNode,otherNode
          if (sequence.prevNode && sequence.nextNode){
            if (sequence.prevNode.bpmnType == 'Comment') {
              commentNode = sequence.prevNode
              otherNode = sequence.nextNode
            } else {
              commentNode = sequence.nextNode
              otherNode = sequence.prevNode
            }
          } else if (sequence.prevNode?.bpmnType == 'Comment'){
            commentNode = sequence.prevNode
            otherNode = sequence.nextNode
          } else if (sequence.nextNode?.bpmnType == 'Comment') {
            commentNode = sequence.nextNode
            otherNode = sequence.prevNode
          }
          contentStr += ' targetRef="' + (commentNode[this.jsonKeyField] ? commentNode[this.jsonKeyField] : commentNode.id)+'"'
          if(otherNode){
            contentStr += ' sourceRef="' + (otherNode[this.jsonKeyField] ? otherNode[this.jsonKeyField] : otherNode.id)+'"'
          }
          noneDirection = true
        }else{
          if (sequence.prevNode) {
            contentStr += ' sourceRef="' + (sequence.prevNode[this.jsonKeyField] ? sequence.prevNode[this.jsonKeyField] : sequence.prevNode.id) + '"'
          }
          if (sequence.nextNode) {
            contentStr += ' targetRef="' + (sequence.nextNode[this.jsonKeyField] ? sequence.nextNode[this.jsonKeyField] : sequence.nextNode.id) + '"'
          }
        }
        //TODO 对依附Message的处理

        if (!noneDirection){
          //判定箭头是否都为空，如果都是空则noneDirection=true
          let spNone = !(sequence.sp && sequence.sp.type != 0)
          let epNone = !(sequence.ep && sequence.ep.type != 0)
          if (spNone && epNone){
            noneDirection = true
          }
        }
        if(noneDirection){
          contentStr += ' associationDirection="None"'
        }
      
        let childXML = ''
        //条件
        if (sequence.bpmnSubType == 2 && sequence.condition){
          childXML += tabStr + ' <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">\n'
          childXML += tabStr + '  <![CDATA[' + (sequence.condition ? sequence.condition : '') +']]>\n'
          childXML += tabStr + ' </bpmn:conditionExpression>\n'
        }
        if (childXML){
          contentStr += '>\n' + childXML + tabStr + '</' + nodeTag +'>\n'
        }else{
          contentStr += '/>\n'
        }
      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, currentProcessStr)
    }
    if (this.bpmnAfterProcessorFN) {
      returnData = this.bpmnAfterProcessorFN(sequence, tabLevel, returnData)
    }
    return returnData;
  }


  /**
   * 处理多实例
   * @param node 
   * @param tabLevel 
   * @returns 
   */
  private bpmnXmlSubMultiInstance(node,tabLevel:number = 0):string{
    let returnStr = ''
    let tabStr = ""
    for (let i = 0; i < tabLevel; i++) {
      tabStr += " "
    }
    if (node.isLoop && !node.multiInstance){
      returnStr += tabStr + '<bpmn:loopCharacteristics isSequential="true"/>\n'
    }else if (node.multiInstance){
      returnStr += tabStr + '<bpmn:multiInstanceLoopCharacteristics'
      if (!node.isParallel){
        returnStr += ' isSequential="true"'
      }
      returnStr += '>\n'
      //实例数量
      if (node.loopCardinality){
        returnStr += tabStr + ' <bpmn:loopCardinality xsi:type="bpmn:tFormalExpression">'
        returnStr += tabStr + '    <![CDATA[' + (node.loopCardinality ? node.loopCardinality : '') + ']]>\n'
        returnStr += tabStr + '</bpmn:loopCardinality>\n'
      }
      returnStr += tabStr + '</bpmn:multiInstanceLoopCharacteristics>\n'
    }

    return returnStr
  }

  

  /**
   * 处理进出引用
   * @param node 
   * @param tabLevel 
   * @returns 
   */
  private bpmnXmlSubInOut(node, tabLevel: number = 0):string {
    let returnStr = ''
    let tabStr = ""
    for (let i = 0; i < tabLevel; i++) {
      tabStr += " "
    }
    node.graph.nodes.forEach(subNode => {
      if (subNode instanceof DDeiFlowSequence) {
        if (subNode.nextNode == node) {
          returnStr += tabStr + '<bpmn:incoming>' + (subNode[this.jsonKeyField] ? subNode[this.jsonKeyField] : subNode.id) + '</bpmn:incoming>\n'
        }
        if (subNode.prevNode == node) {
          returnStr += tabStr + '<bpmn:outgoing>' + (subNode[this.jsonKeyField] ? subNode[this.jsonKeyField] : subNode.id) + '</bpmn:outgoing>\n'
        }
      }
    });


    return returnStr
  }

  /**
   * 处理进出引用
   * @param node 
   * @param tabLevel 
   * @returns 
   */
  private bpmnXmlSubDocumentation(node, tabLevel: number = 0):string {
    let returnStr = ''
    let tabStr = ""
    for (let i = 0; i < tabLevel; i++) {
      tabStr += " "
    }
    if (node.desc?.trim()){
      returnStr += tabStr +'<bpmn:documentation><![CDATA['+node.desc.trim()+']]></bpmn:documentation>\n'
    }

    return returnStr
  }


  /**
   * 将舞台对象转换为bpmndi规范的xml字符串
   * @param stage 舞台对象
   * @returns xml字符串
   */
  private flowGraph2BPMNDIXML(graph: DDeiFlowGraph): string {
    let returnStr = ''
    let skip = false
    if (this.bpmndiProcessorFN) {
      let fnResult = this.bpmndiProcessorFN(graph, 3);
      if (fnResult !== false) {
        returnStr += fnResult + "\n"
        skip = true;
      }
    }
    if (!skip) {
      if (graph) {
        returnStr += '   <bpmndi:BPMNPlane id="Plane_'+graph.id+'" bpmnElement="'+graph.id+'">\n'
        //遍历所有节点生成
        graph.nodes.forEach(node => {
          let nodeXML = this.node2BPMNDIXML(node, 4)
          if (nodeXML) {
            returnStr += nodeXML
          }
        })
        returnStr += '   </bpmndi:BPMNPlane>'
      }
    }
    return returnStr;
  }

  private node2BPMNDIXML(node, tabLevel: number = 0): string {
    if (node) {
      //连接线
      if (node instanceof DDeiFlowSequence) {
        return this.sequence2BPMNDIXML(node, tabLevel)
      }
      //其他节点
      else{
        let returnStr = ''
        let skip = false
        if (this.bpmndiProcessorFN) {
          let fnResult = this.bpmndiProcessorFN(node, tabLevel);
          if (fnResult !== false) {
            returnStr += fnResult + "\n"
            skip = true;
          }
        }
        if (!skip) {
          let tabStr = ""
          for (let i = 0; i < tabLevel; i++) {
            tabStr += " "
          }
          if (node) {
            let nodeTag = "bpmndi:BPMNShape"
            let key = node[this.jsonKeyField] ? node[this.jsonKeyField] : node.id
            returnStr += tabStr + '<' + nodeTag + ' id="' + key + '_id" bpmnElement="' +key + '"'

            //图形大小的处理
            
            let nodeModel = this.modelsCache[node.id];
            let childXML = tabStr + ' <dc:Bounds x="' + nodeModel.essBounds.x + '" y="' + nodeModel.essBounds.y + '" width="' + nodeModel.essBounds.width + '" height="' + nodeModel.essBounds.height+'"/>\n'
            returnStr += '>\n' + childXML + tabStr + '</' + nodeTag + '>\n'
            if (node.bpmnType == 'SubProcess') {
              node.nodes.forEach(subNode => {
                let nodeXML = this.node2BPMNDIXML(subNode, 4)
                if (nodeXML) {
                  returnStr += nodeXML
                }
              })
            }
          }
        }
        return returnStr;
      }
      
    }
    return null;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private sequence2BPMNDIXML(sequence: DDeiFlowSequence, tabLevel: number = 0): string {
    let returnStr = ''
    let skip = false
    if (this.bpmndiProcessorFN) {
      let fnResult = this.bpmndiProcessorFN(sequence, tabLevel);
      if (fnResult !== false) {
        returnStr += fnResult + "\n"
        skip = true;
      }
    }
    if (!skip) {
      let tabStr = ""
      for (let i = 0; i < tabLevel; i++) {
        tabStr += " "
      }
      if (sequence) {
        let nodeTag = "bpmndi:BPMNEdge"
        let key = sequence[this.jsonKeyField] ? sequence[this.jsonKeyField] : sequence.id
        returnStr += tabStr + '<' + nodeTag + ' id="' + key + '_id" bpmnElement="' + key +'"'

        //连线的途径点处理
        let childXML = ''
        let sequenceModel = this.modelsCache[sequence.id];
        //直线、曲线
        if (sequenceModel.type == 1 || sequenceModel.type == 3){
          childXML += tabStr+' <di:waypoint x="' + sequenceModel.startPoint.x + '" y="' + sequenceModel.startPoint.y + '"/>\n'
          childXML += tabStr+' <di:waypoint x="' + sequenceModel.endPoint.x + '" y="' + sequenceModel.endPoint.y + '"/>\n'
        }else{
          sequenceModel.pvs.forEach(pvs => {
            childXML += tabStr+'  <di:waypoint x="'+pvs.x+'" y="'+pvs.y+'"/>\n'
          });
        }
        
        if (childXML) {
          returnStr += '>\n' + childXML + tabStr + '</' + nodeTag + '>\n'
        } else {
          returnStr += '/>\n'
        }
      }
    }
    return returnStr;
  }

  /**
   * 获取缺省连线节点
   * @param gateway 网关
   * @returns 缺省连线
   */
  private getDefaultSequenceNodes(gateway) {
    let returnSequences = []
    gateway.graph.nodes.forEach(subNode => {
      if (subNode instanceof DDeiFlowSequence) {
        if (subNode.prevNode == gateway && subNode.bpmnSubType == 3) {
          returnSequences.push(subNode)
        }
      }
    });
    return returnSequences
  }
  
}

export { DDeiFlowAPI, DDeiFlowFile, DDeiFlowGraph, DDeiFlowGroup, DDeiFlowNode, DDeiFlowSequence, DDeiFlowSubProcess,DDeiFlowBpmnXmlNode }
export default DDeiFlowAPI
