import PptxGenJS from 'pptxgenjs'
import { useState } from 'react';
import ImageToBase64 from './components/ImageToBase64';
function App() {

  const [blockName,setBlockName] = useState('');
  const [officer,setOfficer] = useState({name:'',post:''});
  const [schoolName,setSchoolName] = useState('');
  const [supplier,setSupplier] = useState('');
  const [item,setItem] = useState('Iron');
  const[bench,setBench] = useState('');
  const[desk,setDesk] = useState('');
  const[finding,setFinding] = useState('')
  const[images,setImage] = useState({
     image1:'',
     image2:''
  })

  const handleData1 = (e) => {
    if (e.target.files.length < 1) return;
    ImageToBase64(e.target.files[0]).then(data => setImage(prev=>({
      ...prev,
       image1:data
    })));
  }

  const handleData2 = (e) => {
    if (e.target.files.length < 1) return;
    ImageToBase64(e.target.files[0]).then(data => setImage(prev=>({
      ...prev,
       image2:data
    })));
  }

  
   const apply =()=>{
     
     
    let pptx = new PptxGenJS();
    pptx.defineLayout({name:'Custom', width:13, height:8});
    let slide = pptx.addSlide();
  
    slide.addText( `BLOCK: ${blockName.toUpperCase()}`, {
      shape: pptx.ShapeType.roundRect,
      w: 12,
      h: 0.8,
      x: 0.5,
      y: 0.1,
      fontSize: 28,
      bold: true,
      fill: { color: '#953735' },
      align: "center",
      fontFace: "Aharoni",
      color:"#ffffff"
    })
    slide.addText( `Inspection Officer:${officer.name.toUpperCase()}, ${officer.post.toUpperCase()}`, {
      shape: pptx.ShapeType.roundRect,
      w: 6,
      h: 0.5,
      x: 0.5,
      y: 1,
      fontSize: 16,
      bold: true,
     // align: "center",
      fontFace: "Arial"
    })

    slide.addText( `School Name: ${schoolName.toUpperCase()}`, {
      shape: pptx.ShapeType.roundRect,
      w: 6,
      h: 0.5,
      x: 0.5,
      y: 1.3,
      fontSize: 16,
      bold: true,
  
     // align: "center",
      fontFace: "Arial"
    })

    slide.addText( `SUPPLIED BY ${supplier.toUpperCase()}`, {
      shape: pptx.ShapeType.roundRect,
      w: 5,
      h: 0.5,
      x: 7,
      y: 1.3,
      fontSize: 16,
      bold: true,
     // align: "center",
      fontFace: "Arial"
    })
   

   pptx.layout = 'Custom'
  slide.addImage({data:images.image1,x:0.5,y:1.8, w:4,h:2.9})
   slide.addImage({data:images.image2,x:0.5,y:4.8, w:4,h:2.9})
 
   
   const row = [
    [
        { text: "Item", options: { fontFace: "Arial",fill: "#f7d9c8"  } },
        { text: "BENCH (60''*18''*10'')", options: { fontFace: "Arial",fill: "#f7d9c8"  } },
        { text: "DISK  (60''*30''*10'')", options: { fill: "#f7d9c8" } },
        { text: 'FINDING', options: { fill: "#f7d9c8" } },
    ],
    [
      { text: `${item}`, options: { fontFace: "Arial",fill: "#f5c9ab"  } },
        { text: `${bench}`, options: { fontFace: "Arial",fill: "#f5c9ab"  } },
        { text: `${desk}`, options: { fill: "#f5c9ab" } },
        { text: `${finding}`, options: { fill: "#f5c9ab" } },
    ]
];
   slide.addTable(row,{
    x:5,
    y:2,
    w:7.5,
    fontSize:16,
    align:'center',
    border:{type:'solid',pt:1,color:'ff8636'},
    valign:'middle'
   })
   
  
  pptx.writeFile({fileName:`${schoolName}.pptx`})
   }

  return (
    <>
    <div>
       <div>
          Block Name: 
          <input type='text' value={blockName} onChange={e=> setBlockName(e.target.value)}/>
       </div>
       <div>
          Officer Name:<input type='text' value={officer.name} onChange={e=> setOfficer(prev=>({...prev,name:e.target.value}))}/>
       </div>
       <div>
          Post:<input type='text' value={officer.post} onChange={e=> setOfficer(prev=>({...prev,post:e.target.value}))}/>
       </div>
       <div>
          School Name:<input type='text' value={schoolName} onChange={e=> setSchoolName(e.target.value)}/>
       </div>
       <div>
          Supplier Name:<input type='text' value={supplier} onChange={e=> setSupplier(e.target.value)}/>
       </div>
       <div>
          Image-1:<input type='file' onChange={handleData1}/>
       </div>
       <div>
          Image-2:<input type='file' onChange={handleData2}/>
       </div>
       <div>
          Item
          <input type='radio' name="item" checked={true} onChange={()=>setItem('Iron')} /> Iron
          <input type='radio' name='item' onChange={()=> setItem('Wooden')} /> Wooden
       </div>
       <div>
          BENCH Details:<input type='text' value={bench} onChange={e=> setBench(e.target.value)}/>
       </div>
       <div>
          DESK Details:<input type='text' value={desk} onChange={e=> setDesk(e.target.value)}/>
       </div>
       <div>
          Finding:<input type='text' value={finding} onChange={e=> setFinding(e.target.value)}/>
       </div>

       
    </div>
      <div onClick={apply}>Test</div>
      
    </>
  )
}

export default App
