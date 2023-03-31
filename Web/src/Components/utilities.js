const labelMap = { 
    1:{name:'Scissor', color:'white'},
    2:{name:'Knife', color:'white'},
    3:{name:'Battery Cell', color:'white'},
    4:{name:'Apple', color:'white'},
    5:{name:'Mouse', color:'white'},
    6:{name:'Mobile', color:'white'},
    7:{name:'Soda Bottle', color:'white'},
    8:{name:'Rubix Cube', color:'white'},
}

export const drawRect = (boxes, classes , scores, threshold, imgWidth, imgHeight, ctx,setName)=>{
    for (let i=0 ; i<=boxes.length; i++){
        // console.log(classes[i]);
        if(boxes[i] && classes[i] && scores[i]>threshold){
            
            const [y , x , height , width] = boxes[i]
            const text = classes[i]
            
            ctx.strokeStyle = labelMap[text]['color']
            ctx.linewidth = 20
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'      
            
            ctx.beginPath()
            
            setName(labelMap[text]['name'])    
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5);
            ctx.stroke()
        }
    }
}