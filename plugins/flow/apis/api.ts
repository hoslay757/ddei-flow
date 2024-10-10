import { DDeiEditor, DDeiUtil, DDeiAbstractShape } from "ddei-editor"
import {getIncludeModels} from "../controls/util"
import html2canvas from "html2canvas"
/**
 * DDeiFlow插件的API方法包，提供了API以及工具函数
 * 初始化时挂载到editor的flow属性上
 */
class DDeiFlowAPI {

  editor:DDeiEditor;

  constructor(editor:DDeiEditor){
    this.editor = editor
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
      let promiseArr = []
      let ddInstance = this.editor.ddInstance
      let rat1 = ddInstance?.render.ratio;
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
        
            ctx?.drawImage(modelImage, model.essBounds.x * rat1, model.essBounds.y * rat1)
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
}

export { DDeiFlowAPI }
export default DDeiFlowAPI
