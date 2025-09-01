
export default function TitleComponent({title})
{
  return(<div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
   <div style={{display:'flex',flexDirection:'column'}}>
    <div style={{display:'flex',alignItems:'center'}} >
    <div style={{marginLeft:5,marginTop:5}}>
        <img src='/spider.png' style={{width:40}}/>
    </div>
    <div style={{fontWeight:700,fontSize:24}}  >
      JobsSpider
    </div>
    </div>
    <div style={{fontWeight:500, fontSize:16,marginLeft:5}}>
        {title}
    </div> 
    </div>


    <div style={{margin:5}}>
        <img src='/report.png' style={{width:40}}/>
    </div>
    

  </div>)

}