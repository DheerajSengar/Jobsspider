import { Paper, Button, Divider, Accordion } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
 
import { useState } from "react";
import parse from 'html-react-parser';
export default function JobDiscription({data}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));


    const [showAll, setShowAll] = useState(false)

    const boxList=(data)=>{
        return data.map((item, index) => {
          return <div
            key={index}
            style={{
              display: 'flex',
              padding: '5px 5px',
              alignItems: 'center',
              borderRadius: 3,
              marginRight: 5,
              marginBottom: 5,
              backgroundColor: 'rgb(242 242 243)',
            }}
          >
           
            <p style={{ fontSize: 12, margin: 0, color: 'rgb(131, 133, 143)' }}>{item.title}</p>
          </div>
       })
  
       } 


       const boxListCity=(data)=>{
        return data.map((item, index) => {
          return <div
            key={index}
            style={{
              display: 'flex',
              padding: '5px 5px',
              alignItems: 'center',
              borderRadius: 3,
              marginRight: 5,
              marginBottom: 5,
              backgroundColor: 'rgb(242 242 243)',
            }}
          >
           
            <p style={{ fontSize: 12, margin: 0, color: 'rgb(131, 133, 143)' }}>{item.cityname}</p>
          </div>
       })
  
       } 


    return (

        <Paper elevation={0}
            style={{
                backgroundColor: '#ffff',
                padding:0,
                width: matches ? '100%':'50VW',
                height: 'auto',
                borderRadius: matches ? '':18,

            }}>

            <div style={{ width: '100%', height: 'auto', background: ' rgb(245 249 254 / var(--tw-bg-opacity, 5))', borderRadius: 15, border: '1px solid rgb(193 219 251 / var(--tw-border-opacity, 1))' }}>

                <div style={{ fontSize: 20, fontWeight: 'bold', margin: 15 }}>
                    Job highlights
                </div>
                <div style={{ display: 'flex', flexDirection: matches ? 'column' : 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }} >
                        <div style={{ display: 'flex', flexDirection: 'row', padding: 10, gap: 5 }}>
                            <img src="flame.png" style={{ width: 20, height: 20 }} />
                            <div>Urgently hiring</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', padding: 10, gap: 5 }}>
                            <img src="usergroup.png" style={{ width: 20, height: 20 }} />
                            <div>48 applicants</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', padding: 10, gap: 5, marginLeft: matches ? '' : 150 }}>
                        <img src="fast.png" style={{ width: 20, height: 20, }} />
                        <div>Fast HR reply</div>
                    </div>
                </div>
            </div>


            <Accordion elevation={0} style={{ border: 'none', }}>
                <div style={{ width: matches ? '90%':'50vw', fontSize: 14, borderRadius: 15, height: 'auto', background: '#ffff' }}>
                    <div >
                      {parse(""+data?.jobdetails)}
                    </div>
                    <div>
                      <p><b>Qualification</b></p>  
                      <div style={{display:'flex'}}>
                      {boxList(JSON.parse(data?.qualification))}
                      </div>
                    </div>
                    <div>
                      <p><b>Perks</b></p>  
                       {parse(data?.supplementalpay)}
                      
                    </div>
                    <div>
                      <p><b>Benifits</b></p>  
                      
                      {parse(data?.benifits)}
                      
                    </div>
                    <div>
                      <p><b>Work Location City</b></p>  
                      
                      <div style={{display:'flex'}}>
                      {boxListCity(JSON.parse(data?.worklocationcity))}
                      </div>
                    </div>
                        
                    
                </div>
            </Accordion>








        </Paper>

    )





}