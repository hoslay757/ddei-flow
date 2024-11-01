import { DDeiEditor, DDeiUtil, DDeiAbstractShape, DDeiStage,DDeiFile,DDeiSheet,DDeiLayer } from "ddei-editor"
import {getIncludeModels} from "../controls/util"
import html2canvas from "html2canvas"
import DDeiFlowFile from "./file"
import DDeiFlowGraph from "./graph";
import DDeiFlowNode from "./node";
import DDeiFlowGroup from "./group";
import DDeiFlowSequence from "./sequence"
import DDeiFlowSubProcess from "./subprocess"
import DDeiFlowBpmnXmlNode from "./bpmnxmlnode"
/**
 * DDeiFlow插件的API方法包，提供了API以及工具函数
 * 初始化时挂载到editor的flow属性上
 */
class DDeiFlowAPI {

  editor:DDeiEditor;

  /**
   * 配置的属性
   */
  jsonField: string[] = ["id", "name", "code", "text", "ep", "sp", "desc", "isUnlimited","capacity", "condition", "default", "bpmnType", "bpmnSubType", "scriptFormat", "dataType", "customDataType","isCollection", "loopCardinality", "script", "bpmnBaseType","ordering", "activityId", "errorCode", "timeType", "timeValue", "potentialOwner","humanPerformer","notInterrupting", "messageName","signalName","isLoop", "isLoop","isTransaction", "multiInstance", "isParallel", "isCompensation","essBounds"]

  /**
   * json中以哪个字段作为key，默认为id，可以指定为code或其他字段
   */
  jsonKeyField:string = 'id'

  static modelsCache = {}

  constructor(editor:DDeiEditor){
    this.editor = editor
  }

  /**
   * 转换为bpmn时的回调函数，每个元素转换为bpmn时都会调用此方法，用于接管bpmn元素的生成，如果返回false会触发原来的逻辑，返回其他值将不会调用原有的逻辑。
   */
  bpmnProcessorFN: Function | null = null
  
  /**
   * 转换为bpmndi时的回调函数，每个元素转换为bpmndi时都会调用此方法，用于接管bpmn元素的生成，如果返回false会触发原来的逻辑，返回其他值将不会调用原有的逻辑。
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
              let domElement = this.editor.viewerMap.get(model.id).el
              let cloneElements = this.toSimpleSvg(domElement)
              html2canvas(domElement,{
                useCORS: true,
                scale: rat1,
                quality: 1,
                logging:false,
                // foreignObjectRendering:true,
                ignoreElements: e=>{
                  if (e.className == 'markers'){
                    return true
                  }
                  return false
                },
              }).then(canvas => {
                imageMap[model.id] = new Image()
                // 创建一个图片元素
                imageMap[model.id].src = canvas.toDataURL("image/png");
                imageMap[model.id].onload = () => {
                  cloneElements.forEach(ce=>{
                    ce.remove()
                  })
                  resolve()
                }
              });
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
        let graphics = this.stage2FlowObj(sheet.stage, fileObj)
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
  stage2FlowObj(stage: DDeiStage, allLayers: boolean = true): DDeiFlowGraph[]|null {
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
      DDeiFlowAPI.modelsCache = {}
      for (; i < layerLen; i++) {
        let layer = layers[i];
        let graph = new DDeiFlowGraph({ id: singleLayer ?stage.id:stage.id+"_"+layer.id,name:stage.name});
        //获取当前图层所有元素，转换为json对象
        let models = stage.getLayerModels()
        models.forEach(model => {
          DDeiFlowAPI.modelsCache[model.id] = model
          let node =  this.parseModelToFlowNode(model);
          if(node){
            node.graph = graph
            graph.nodes.set(node.id,node)
          }
        });
        let deletedNodes = []
        //根据包含关系，建立正确的subprocess关系
        graph.nodes.forEach(node=>{
          //如果当前节点的includePModelId不为空，且最终指向一个subprocess，则建立子流程关系
          let model = DDeiFlowAPI.modelsCache[node.id]
          
          if (model.includePModelId){
            
            let subProcessNode = this.getSubProcessNode(model.includePModelId,graph);
            if (subProcessNode){
              let subProcesses = this.getSubProcessNodes(subProcessNode.id, graph);
              node.graph = subProcessNode;
              
              node.subProcesses = subProcesses;
              subProcessNode.nodes.set(node.id, node)
              
              deletedNodes.push(node.id)
            }
          }
        });
        let isolatedNodes = []
        let groups = []
        //建立整个图网络
        graph.nodes.forEach(node => {
          
          if (node instanceof DDeiFlowSequence) {
            //如果为连接线，则建立两边的关系
            //线图形对应的json对象
            let lineModel = DDeiFlowAPI.modelsCache[node.id]
            let lineSequenceNode = node
            let lineLinks = stage.getDistModelLinks(lineSequenceNode.id)
            //获取另一端节点
            let includeSubProcess1, includeSubProcess2,lineNode1,lineNode2
            if (lineLinks?.length > 0) {
              let lineLink = lineLinks[0]
              if (lineLink.sm) {
                let distPV = lineLink.getDistPV()
                lineNode1 = graph.nodes.get(lineLink.sm.id)
                let lineNodeModel = DDeiFlowAPI.modelsCache[lineNode1.id];
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
                lineNode2 = graph.nodes.get(lineLink.sm.id)
                let lineNodeModel = DDeiFlowAPI.modelsCache[lineNode2.id];
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
            let model = DDeiFlowAPI.modelsCache[node.id]
            
            model.includeModels?.forEach(im => {
              node.nodes.set(im, graph.nodes.get(im))
            });
          } else {
            //获取连线,连线区分方向，以开始->结束为方向
            let nodeLinks = stage.getSourceModelLinks(node.id)
            nodeLinks?.forEach(link => {
              //连线上的pv
              let linePV = link.getDistPV();
              //线图形对应的json对象
              let lineSequenceNode = graph.nodes.get(link.dm.id)
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
          let model = DDeiFlowAPI.modelsCache[node.id]
          if (node.bpmnType == 'StartEvent') {
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
          else if (node.prevNodes?.length == 0 && node.bpmnType != 'StartEvent' && node.bpmnType != 'Group' && node.bpmnType != 'Comment') {
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
          else if (node.prevNodes?.length == 0 && node.nextNodes?.length == 0) {
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
        let subProcessModel = DDeiFlowAPI.modelsCache[subProcessesNode.id]
        includePModelId = subProcessModel?.includePModelId
      }else{
        break;
      }
      
    }
    return returnNodes;
  }

  private getSubProcessNode(includePModelId, graph):DDeiFlowSubProcess|null{
    let pNode = graph.nodes.get(includePModelId);
    if(pNode){
      let pNodeModel = DDeiFlowAPI.modelsCache[pNode.id]
      if (pNode.bpmnType == 'SubProcess'){
        return pNode;
      } else if (pNode.bpmnType == 'Group' && pNodeModel.includePModelId){
        return this.getSubProcessNode(pNodeModel.includePModelId, graph)
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
      let fnResult = this.bpmnProcessorFN(graph);
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
        contentStr += tabStr +'<bpmn:startEvent id="' + node.id + '"'
        if (node.name) {
          contentStr += 'name="' + node.name + '"'
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
            childXML += tabStr + '   <bpmn:timeCycle>' + (node.timeValue ? node.timeValue : '') + '</timeCycle>\n'
          } else if (node.timeType == 'CRON') {
            childXML += tabStr + '   <bpmn:timeCycle>' + (node.timeValue ? node.timeValue : '') + '</timeCycle>\n'
          } else {
            childXML += tabStr + '   <bpmn:timeDate>' + (node.timeValue ? node.timeValue : '') +'</timeDate>\n'
          }
          childXML += tabStr + ' </bpmn:timerEventDefinition>\n'
        }
        //条件
        else if (node.bpmnSubType == 4) {
          childXML += tabStr + ' <bpmn:conditionalEventDefinition>\n'
          childXML += tabStr + '  <bpmn:condition xsi:type="bpmn:tFormalExpression">${1+1&gt;2}</bpmn:condition>\n'
          childXML += tabStr + ' </bpmn:conditionalEventDefinition>\n'
        }
        //信号
        else if (node.bpmnSubType == 5) {
          defineStr += '  <bpmn:signal id="' + node.id + '_signal" name="' + (node.signalName ? node.signalName : '') + '" />\n'
          childXML += tabStr + ' <bpmn:signalEventDefinition id="'+node.id+'_signal_def" signalRef="'+node.id+'_signal">\n'
        }
        //错误
        else if (node.bpmnSubType == 9) {
          if (node.errorCode) {
            defineStr += '  <bpmn:error id="' + node.id + '_error" errorCode="' + node.errorCode + '" />\n'
            childXML += tabStr + ' <bpmn:errorEventDefinition errorRef="' + node.id + '_error" />\n'
          } else {
            childXML += tabStr + ' <bpmn:errorEventDefinition />\n'
          }
        }//补偿
        else if (node.bpmnSubType == 10) {
          childXML += tabStr + ' <bpmn:compensateEventDefinition />\n'
        }
        
        if (childXML){
          contentStr += '>\n' + childXML + tabStr +'</bpmn:startEvent>\n'
        }else{
          contentStr += '/>\n'
        }
        
      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, currentProcessStr)
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
        contentStr += tabStr + '<bpmn:boundaryEvent id="' + node.id + '"'
        if (node.name) {
          contentStr += 'name="' + node.name + '"'
        }
        if ((!node.bpmnSubType || node.bpmnSubType == 1 || node.bpmnSubType == 2 || node.bpmnSubType == 7 || node.bpmnSubType == 8 || node.bpmnSubType == 9)  && node.notInterrupting == 1) {
          contentStr += ' cancelActivity="false"'
        } else if (node.bpmnSubType == 6 || node.bpmnSubType == 5){

        } else {
          contentStr += ' cancelActivity="true"'
        }
        //TODO 依附的taskid   attachedToRef="firstLineSupport"
        let childXML = ''
        //消息
        if (!node.bpmnSubType || node.bpmnSubType == 1) {
          defineStr += '  <bpmn:message id="' + node.id + '_msg" name="' + (node.messageName ? node.messageName : '') + '" />\n'
          childXML += tabStr + ' <bpmn:messageEventDefinition messageRef="' + node.id + '_msg" />\n'
          
        }
        //定时器
        else if (node.bpmnSubType == 2) {
          childXML += tabStr + ' <bpmn:timerEventDefinition>\n'
          if (node.timeType == 'timeDuration') {
            childXML += tabStr + '   <bpmn:timeCycle>' + (node.timeValue ? node.timeValue : '')  + '</timeCycle>\n'
          } else if (node.timeType == 'CRON') {
            childXML += tabStr + '   <bpmn:timeCycle>' + (node.timeValue ? node.timeValue : '') + '</timeCycle>\n'
          } else {
            childXML += tabStr + '   <bpmn:timeDate>' + (node.timeValue ? node.timeValue : '') + '</timeDate>\n'
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
            childXML += tabStr + ' <bpmn:errorEventDefinition />\n'
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
        //多次
        else if (node.bpmnSubType == 9) {
          contentStr += ' parallelMultiple="true"'
        }
        
        
      

        if (childXML) {
          contentStr += '>\n' + childXML + tabStr + '</bpmn:boundaryEvent>\n'
        } else {
          contentStr += '/>\n'
        }

      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, currentProcessStr)
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
            childXML += tabStr + '   <bpmn:timeCycle>' + (node.timeValue ? node.timeValue : '') + '</timeCycle>\n'
          } else if (node.timeType == 'CRON') {
            childXML += tabStr + '   <bpmn:timeCycle>' + (node.timeValue ? node.timeValue : '') + '</timeCycle>\n'
          } else {
            childXML += tabStr + '   <bpmn:timeDate>' + (node.timeValue ? node.timeValue : '') + '</timeDate>\n'
          }
          childXML += tabStr + ' </bpmn:timerEventDefinition>\n'
        }
        //信号
        else if (node.bpmnSubType == 3) {
          defineStr += '  <bpmn:signal id="' + node.id + '_signal" name="' + (node.signalName ? node.signalName : '') + '" />\n'
          childXML += tabStr + ' <bpmn:signalEventDefinition id="' + node.id + '_signal_def" signalRef="' + node.id + '_signal" />\n'
        }
        //多次
        else if (node.bpmnSubType == 6) {
          contentStr += ' parallelMultiple="true"'
        }


        if (childXML) {
          contentStr += '>\n' + childXML + tabStr + '</bpmn:intermediateCatchEvent>\n'
        } else {
          contentStr += '/>\n'
        }

      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, currentProcessStr)
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


        if (childXML) {
          contentStr += '>\n' + childXML + tabStr + '</bpmn:intermediateCatchEvent>\n'
        } else {
          contentStr += '/>\n'
        }

      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, currentProcessStr)
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
            childXML += tabStr + ' <bpmn:errorEventDefinition errorRef="' + node.id + '_error">\n'
          } else {
            childXML += tabStr + ' <bpmn:errorEventDefinition />\n'
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
          childXML += tabStr + ' <bpmn:signalEventDefinition id="' + node.id + '_signal_def" signalRef="' + node.id + '_signal">\n'
        }
       
        //补偿
        else if (node.bpmnSubType == 7) {
          childXML += tabStr + ' <bpmn:compensateEventDefinition />\n'
        }
        //多次
        else if (node.bpmnSubType == 4) {
          contentStr += ' parallelMultiple="true"'
        } 
        //消息
        else if (node.bpmnSubType == 2) {
            defineStr += '  <bpmn:message id="' + node.id + '_msg" name="' + (node.messageName ? node.messageName : '') + '" />\n'
            childXML += tabStr + ' <bpmn:messageEventDefinition messageRef="' + node.id + '_msg" />\n'
          }

        

        if (childXML) {
          contentStr += '>\n' + childXML + tabStr + '</bpmn:endEvent>\n'
        } else {
          contentStr += '/>\n'
        }
      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr,defineStr,processStr,currentProcessStr)
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
        }
        contentStr += tabStr + '<' + nodeTag + ' id="' + node[this.jsonKeyField] + '"'
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

        } else if (node.bpmnType == 'DataStore') {
          nodeTag = "bpmn:dataStore"
        }
        contentStr += tabStr + '<' + nodeTag + ' id="' + node[this.jsonKeyField] + '"'
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
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, currentProcessStr)
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
        
        contentStr += tabStr + '<' + nodeTag + ' id="' + node[this.jsonKeyField] + '"'
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
        contentStr += tabStr + '<' + nodeTag + ' id="' + node[this.jsonKeyField] + '"'
        if (node.name) {
          contentStr += ' name="' + node.name + '"'
        }

        //默认
        if (node.bpmnType == 'ExclusiveGateway') {
          let defSeqs = this.getDefaultSequenceNodes(node)
          if (defSeqs?.length > 0){
            contentStr += ' default="' + defSeqs[0][this.jsonKeyField] + '"'
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
        contentStr += tabStr + '<' + nodeTag +' id="' + node[this.jsonKeyField] + '"'
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
          contentStr += '>\n' + childXML + tabStr + '<' + nodeTag +'/>\n'
        } else {
          contentStr += '/>\n'
        }
      }
      returnData = new DDeiFlowBpmnXmlNode(contentStr, defineStr, processStr, null)
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
        if (sequence.bpmnSubType == 5) {
          nodeTag = "bpmn:association"
          noneDirection = true
        }
        contentStr += tabStr + '<' + nodeTag +' id="' + sequence[this.jsonKeyField] + '"' 
        if (sequence.name) {
          contentStr += ' name="' + sequence.name + '"'
        }
        // <bpmn:association id = "Association_14lyaze" associationDirection = "None" sourceRef = "Activity_0vhc61s" targetRef = "TextAnnotation_0u08dx5" />
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
          contentStr += ' targetRef="' + commentNode[this.jsonKeyField]+'"'
          if(otherNode){
            contentStr += ' sourceRef="'+otherNode[this.jsonKeyField]+'"'
          }
          noneDirection = true
        }else{
          if (sequence.prevNode) {
            contentStr += ' sourceRef="' + sequence.prevNode[this.jsonKeyField] + '"'
          }
          if (sequence.nextNode) {
            contentStr += ' targetRef="' + sequence.nextNode[this.jsonKeyField] + '"'
          }
        }
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
          childXML += tabStr + '  <![CDATA[' + sequence.condition +']]>\n'
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
    if (node.multiInstance){
      returnStr += tabStr + '<bpmn:multiInstanceLoopCharacteristics'
      if (!node.isParallel){
        returnStr += ' isSequential="true"'
      }
      returnStr += '>\n'
      //实例数量
      if (node.loopCardinality){
        returnStr += tabStr + ' <bpmn:loopCardinality xsi:type="bpmn:tFormalExpression">' + node.loopCardinality +'</bpmn:loopCardinality>\n'
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
          returnStr += tabStr + '<bpmn:incoming>' + subNode[this.jsonKeyField] + '</bpmn:incoming>\n'
        }
        if (subNode.prevNode == node) {
          returnStr += tabStr + '<bpmn:outgoing>' + subNode[this.jsonKeyField] + '</bpmn:outgoing>\n'
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

            returnStr += tabStr + '<' + nodeTag + ' id="' + node[this.jsonKeyField] + '_id" bpmnElement="' + node[this.jsonKeyField] + '"'

            //图形大小的处理
            
            let nodeModel = DDeiFlowAPI.modelsCache[node[this.jsonKeyField]];
            let childXML = tabStr + ' <dc:Bounds x="' + nodeModel.essBounds.x + '" y="' + nodeModel.essBounds.y + '" width="' + nodeModel.essBounds.width + '" height="' + nodeModel.essBounds.height+'"/>\n'
            returnStr += '>\n' + childXML + tabStr + '</' + nodeTag + '>\n'
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
        
        returnStr += tabStr + '<' + nodeTag + ' id="' + sequence[this.jsonKeyField] + '_id" bpmnElement="' + sequence[this.jsonKeyField] +'"'

        //连线的途径点处理
        let childXML = ''
        let sequenceModel = DDeiFlowAPI.modelsCache[sequence[this.jsonKeyField]];
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

export { DDeiFlowAPI }
export default DDeiFlowAPI
