import { Button,Paper } from "@mui/material"
import {serverURL} from "../../services/FetchNodeServices"
import {useState} from "react"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function JobComponent({item})
{ 
   const theme = useTheme();
      const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [bk,setBk]=useState('#f1f2f6')
  const  [btnProps,setBtnProps]=useState({v:'text',bk:'',c:"#b03a84"})  
    const handleColorChangeOver=()=>{
        setBk('#ffff')
        setBtnProps({v:'contained',bk:"#b03a84",c:'#ffff'})
    }

    const handleColorChangeLeave=()=>{
        setBk('#f1f2f6')
        setBtnProps({v:'text',bk:'',c:"#b03a84"})
    }
    
  return(
    <div style={{display:'flex'}} >
        <Paper  onMouseLeave={handleColorChangeLeave}  onMouseOver={handleColorChangeOver} elevation={0} style={{padding:'30px 20px 30px 20px',width:matches?320:360,height:280,borderRadius:18,background:bk,border:'0.5px solid #f1f2f6'}}>
            <img src={`${serverURL}/images/${item.logo}`} style={{width:150}} />
            <div style={{display:'flex',flexDirection:'column'}}>
                <div style={{ marginTop:40,fontSize:20,fontWeight:'bold',marginBottom:10}}>
                  
                  {(item.companyname).length>28?(item.companyname).substring(0,25)+"...":item.companyname}</div>
                <div>{item.description}</div>
            </div>
            <div style={{marginTop:60}}>
                <Button variant={btnProps.v}  style={{color:btnProps.c,textTransform:'capitalize',fontSize:18,fontWeight:'bold',background:btnProps.bk}}>{`View Jobs >`}</Button>
            </div>

  
        </Paper>

    </div>
  )
}