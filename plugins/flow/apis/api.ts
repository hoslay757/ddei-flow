import { DDeiEditor, DDeiUtil, DDeiAbstractShape, DDeiStage,DDeiFile,DDeiSheet,DDeiLayer } from "ddei-editor"
import {getIncludeModels} from "../controls/util"
import html2canvas from "html2canvas"
import DDeiFlowFile from "./file"
import DDeiFlowGraph from "./graph";
import DDeiFlowNode from "./node";
import DDeiFlowGroup from "./group";
import DDeiFlowSequence from "./sequence"
import DDeiFlowSubProcess from "./subprocess"
/**
 * DDeiFlow插件的API方法包，提供了API以及工具函数
 * 初始化时挂载到editor的flow属性上
 */
class DDeiFlowAPI {

  editor:DDeiEditor;

  /**
   * 配置的属性
   */
  jsonField: string[] = ["id", "name", "code", "text", "desc", "condition", "default", "bpmnType", "bpmnSubType", "bpmnBaseType", "isLoop", "isLoop", "multiInstance", "isParallel", "isCompensation","isAdHoc","essBounds"]


  constructor(editor:DDeiEditor){
    this.editor = editor
  }

  /**
   * 配置返回的json数据字段
   * @param fn 外部方法，用来修改jsonField
   */
  configJsonField(fn) {
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
      let modelsCache = {}
      for (; i < layerLen; i++) {
        let layer = layers[i];
        let graph = new DDeiFlowGraph({ id: singleLayer ?stage.id:stage.id+"_"+layer.id,name:stage.name});
        //获取当前图层所有元素，转换为json对象
        let models = stage.getLayerModels()
        models.forEach(model => {
          modelsCache[model.id] = model
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
          let model = modelsCache[node.id]
          
          if (model.includePModelId){
            
            let subProcessNode = this.getSubProcessNode(model.includePModelId,graph,modelsCache);
            if (subProcessNode){
              let subProcesses = this.getSubProcessNodes(subProcessNode.id, graph, modelsCache);
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
            let lineModel = modelsCache[node.id]
            let lineSequenceNode = node
            let lineLinks = stage.getDistModelLinks(lineSequenceNode.id)
            //获取另一端节点
            let includeSubProcess1, includeSubProcess2,lineNode1,lineNode2
            if (lineLinks?.length > 0) {
              let lineLink = lineLinks[0]
              if (lineLink.sm) {
                let distPV = lineLink.getDistPV()
                lineNode1 = graph.nodes.get(lineLink.sm.id)
                let lineNodeModel = modelsCache[lineNode1.id];
                includeSubProcess1 = this.getSubProcessNode(lineNodeModel.includePModelId,graph,modelsCache);
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
                let lineNodeModel = modelsCache[lineNode2.id];
                includeSubProcess2 = this.getSubProcessNode(lineNodeModel.includePModelId, graph, modelsCache);
                if (distPV == lineModel.startPoint) {
                  lineSequenceNode.prevNode = lineNode2
                } else if (distPV == lineModel.endPoint) {
                  lineSequenceNode.nextNode = lineNode2
                }
              }
            }
           
            // //如果不在同一层级，指向下一条线的记录其完整的层级
            // if (includeSubProcess1 != includeSubProcess2){
              
            //   if (includeSubProcess1 && lineNode1) {
            //     //将node转换为subprocessnode
            //     lineNode1.subProcesses = this.getSubProcessNodes(includeSubProcess1.id, graph, modelsCache);
            //   }
            //   if (includeSubProcess2 & lineNode2) {
                
            //     //将node转换为subprocessnode
            //     lineNode2.subProcesses = this.getSubProcessNodes(includeSubProcess2.id, graph, modelsCache);
            //   }
            // }
          } else if (node instanceof DDeiFlowGroup) {
            groups.push(node)
            let model = modelsCache[node.id]
            
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
          let model = modelsCache[node.id]
          if (node.bpmnType == 'StartEvent') {
            if (!model.includePModelId){
              graph.startNodes.push(node)
            }else{
              
              graph.nodes.get(model.includePModelId)?.startNodes.push(node)
            }
            
          } else if (node.bpmnType == 'EndEvent') {
            if (!model.includePModelId) {
              graph.endNodes.push(node)
            } else {
              
              graph.nodes.get(model.includePModelId)?.endNodes.push(node)
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

  private getSubProcessNodes(includePModelId, graph, modelsCache): DDeiFlowSubProcess[] {
    let returnNodes: DDeiFlowSubProcess[] = []
    while (includePModelId){
      let subProcessesNode = this.getSubProcessNode(includePModelId,graph,modelsCache)
      if (subProcessesNode){
        returnNodes.splice(0, 0, subProcessesNode)
        let subProcessModel = modelsCache[subProcessesNode.id]
        includePModelId = subProcessModel?.includePModelId
      }else{
        break;
      }
      
    }
    return returnNodes;
  }

  private getSubProcessNode(includePModelId, graph, modelsCache):DDeiFlowSubProcess|null{
    let pNode = graph.nodes.get(includePModelId);
    if(pNode){
      let pNodeModel = modelsCache[pNode.id]
      if (pNode.bpmnType == 'SubProcess'){
        return pNode;
      } else if (pNode.bpmnType == 'Group' && pNodeModel.includePModelId){
        return this.getSubProcessNode(pNodeModel.includePModelId, graph, modelsCache)
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
   */
  toBPMNXML(allSheets: boolean = false):string{
    let returnStr = `<?xml version="1.0" encoding="UTF-8"?>
    <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:activiti="http://activiti.org/bpmn"
      xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
      xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema"
      expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">`
    //转换为中间对象
    let flowObject = this.toFlowObject(true, allSheets)
    for (let gi = 0; gi < flowObject.graphics.length;gi++){
      let flowGraph = flowObject.graphics[gi];
      let processXML = this.flowGraph2BPMNXML(flowGraph)
      if (processXML){
        returnStr += processXML+"\n"
      }
    }

// 	<process id="my-process">
// 		<startEvent id="startEvent" name="startEvent"/>
// 		<userTask id="commonTask" name="Common Task"/>
// 		<boundaryEvent attachedToRef="commonTask" id="boundaryEvent"
// 					   name="Timer" cancelActivity="true">   <!-- 定义边界事件，并且可以取消这个流程 -->
// 			<timerEventDefinition>  <!-- 定义时间定义器 -->
// 				<timeDuration>PT5S</timeDuration>    <!-- 流程部署后5秒再执行 -->
// 			</timerEventDefinition>
// 		</boundaryEvent>
// 		<userTask id="timeoutTask" name="Timeout Task"></userTask>   <!-- 如果commonTask没有在规定时间内完成，则执行这个userTask -->
// 		<endEvent id="end1"></endEvent>
// 		<endEvent id="end2"></endEvent>
 
// 		<!-- 然后将事件相连，使用sequenceFlow -->
// 		<sequenceFlow sourceRef="startEvent" targetRef="commonTask"/>
// 		<sequenceFlow sourceRef="commonTask" targetRef="end1"/>
// 		<sequenceFlow sourceRef="boundaryEvent" targetRef="timeoutTask"/>
// 		<sequenceFlow sourceRef="timeoutTask" targetRef="end2"/>
// 	</process>
 
// </definitions>`
    
    returnStr += '</definitions>'
    return returnStr;
  }

  /**
   * 将舞台对象转换为bpmn规范的xml字符串
   * @param stage 舞台对象
   * @returns xml字符串
   */
  private flowGraph2BPMNXML(graph: DDeiFlowGraph): string {
    let returnStr = ''
    if (graph) {
      returnStr += '<process id="' + graph.id + '">'
      //遍历所有节点生成
      graph.nodes.forEach(node=>{
        let nodeXML = this.node2BPMNXML(node)
        if (nodeXML){
          returnStr += nodeXML+"\n"
        }
      })
      returnStr += '</process>\n'
    }
    return returnStr;
  }

  private node2BPMNXML(node): string {
    if (node){
      //连接线
      if(node instanceof DDeiFlowSequence){

      } 
      //节点
      else if (node instanceof DDeiFlowNode) {
        
        if(node.bpmnType == 'StartEvent'){
          return this.startEvent2BPMNXML(node);
        } else if (node.bpmnType == 'IntermediateEvent') {
          return this.intermediaEvent2BPMNXML(node);
        } else if (node.bpmnType == 'EndEvent') {
          return this.endEvent2BPMNXML(node);
        } else if (node.bpmnType == 'UserTask') {
          return this.userTask2BPMNXML(node);
        } else if (node.bpmnType == 'ServiceTask') {
          return this.serviceTask2BPMNXML(node);
        } else if (node.bpmnType == 'SendTask') {
          return this.sendTask2BPMNXML(node);
        } else if (node.bpmnType == 'ScriptTask') {
          return this.scriptTask2BPMNXML(node);
        } else if (node.bpmnType == 'ManualTask') {
          return this.manualTask2BPMNXML(node);
        } else if (node.bpmnType == 'ReceiveTask') {
          return this.receiveTask2BPMNXML(node);
        } else if (node.bpmnType == 'BusinessTask') {
          return this.businessTask2BPMNXML(node);
        } else if (node.bpmnType == 'SubProcess') {
          return this.subProcess2BPMNXML(node);
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
  private startEvent2BPMNXML(node: DDeiFlowNode): string {
    let returnStr = ''
    if (node) {
      returnStr += '<startEvent id="' + node.id + '"'
      if (node.name) {
        returnStr += 'name="' + node.name + '"'
      }
      returnStr += '>'
      if (node.bpmnSubType == 4 || node.bpmnSubType == 5) {
        returnStr += '<timerEventDefinition>'
        returnStr += '<timeCycle>R5/PT5M</timeCycle>'
        returnStr += '</timerEventDefinition>'
      }
      returnStr += '</startEvent>'
    }
    return returnStr;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private intermediaEvent2BPMNXML(node: DDeiFlowNode): string {
    let returnStr = ''

    return returnStr;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private endEvent2BPMNXML(node: DDeiFlowNode): string {
    let returnStr = ''
    if (node) {
      returnStr += '<endEvent id="' + node.id + '"'
      if (node.name) {
        returnStr += 'name="' + node.name + '"'
      }
      returnStr += '>'
      returnStr += '</endEvent>'
    }
    return returnStr;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private userTask2BPMNXML(node: DDeiFlowNode): string {
    let returnStr = ''
    if (node) {
      returnStr += '<userTask id="' + node.id + '"'
      if (node.name) {
        returnStr += 'name="' + node.name + '"'
      }
      returnStr += '>'
      returnStr += '</userTask>'
    }
    return returnStr;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private scriptTask2BPMNXML(node: DDeiFlowNode): string {
    let returnStr = ''
    if (node) {
      returnStr += '<scriptTask id="' + node.id + '"'
      if (node.name) {
        returnStr += 'name="' + node.name + '"'
      }
      returnStr += '>'
      returnStr += '</scriptTask>'
    }
    return returnStr;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private serviceTask2BPMNXML(node: DDeiFlowNode): string {
    let returnStr = ''
    if (node) {
      returnStr += '<serviceTask id="' + node.id + '"'
      if (node.name) {
        returnStr += 'name="' + node.name + '"'
      }
      returnStr += '>'
      returnStr += '</serviceTask>'
    }
    return returnStr;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private sendTask2BPMNXML(node: DDeiFlowNode): string {
    let returnStr = ''
    if (node) {
      returnStr += '<sendTask id="' + node.id + '"'
      if (node.name) {
        returnStr += 'name="' + node.name + '"'
      }
      returnStr += '>'
      returnStr += '</sendTask>'
    }
    return returnStr;
  }


  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private manualTask2BPMNXML(node: DDeiFlowNode): string {
    let returnStr = ''
    if (node) {
      returnStr += '<manualTask id="' + node.id + '"'
      if (node.name) {
        returnStr += 'name="' + node.name + '"'
      }
      returnStr += '>'
      returnStr += '</manualTask>'
    }
    return returnStr;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private receiveTask2BPMNXML(node: DDeiFlowNode): string {
    let returnStr = ''
    if (node) {
      returnStr += '<receiveTask id="' + node.id + '"'
      if (node.name) {
        returnStr += 'name="' + node.name + '"'
      }
      returnStr += '>'
      returnStr += '</receiveTask>'
    }
    return returnStr;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private businessTask2BPMNXML(node: DDeiFlowNode): string {
    let returnStr = ''
    if (node) {
      returnStr += '<businessTask id="' + node.id + '"'
      if (node.name) {
        returnStr += 'name="' + node.name + '"'
      }
      returnStr += '>'
      returnStr += '</businessTask>'
    }
    return returnStr;
  }

  /**
   * 将对象转换为bpmn规范的xml字符串
   * @param node 对象
   * @returns xml字符串
   */
  private subProcess2BPMNXML(node: DDeiFlowNode): string {
    let returnStr = ''
    if (node) {
      returnStr += '<subProcess id="' + node.id + '"'
      if (node.name) {
        returnStr += 'name="' + node.name + '"'
      }
      returnStr += '>'
      returnStr += '</subProcess>'
    }
    return returnStr;
  }

  
}

export { DDeiFlowAPI }
export default DDeiFlowAPI
