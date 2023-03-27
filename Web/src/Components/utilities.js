const labelMap = { 
    1:{name:'Scissor', color:'red'},
    2:{name:'Knife', color:'yellow'},
    3:{name:'Book', color:'lime'},
    4:{name:'Battery Cell', color:'blue'},
    5:{name:'Apple', color:'purple'},
    6:{name:'Mouse', color:'green'},
    7:{name:'Mobile', color:'violet'},
    8:{name:'Soda Bottle', color:'orange'},
    9:{name:'Rubix Cube', color:'yellow'},
    10:{name:'Matchbox', color:'red'},
}

export const drawRect = (boxes, classes , scores, threshold, imgWidth, imgHeight, ctx,setName)=>{
    for (let i=0 ; i<=boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            console.log("hello");
            const [y , x , height , width] = boxes[i]
            const text = classes[i]
            
            ctx.strokeStyle = labelMap[text]['color']
            ctx.linewidth = 10
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