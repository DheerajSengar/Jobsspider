import StarIcon from '@mui/icons-material/Star';
import DownloadIcon from '@mui/icons-material/Download';
import { serverURL } from '../../services/FetchNodeServices';
export default function DownloadSpider(){
 return(
    <div style={{width:'81%',height:430,backgroundColor:'#f6e3fc',borderRadius:25, display:'flex',flexDirection:'row',  border: `0.5px solid #dfe6e9`}}>
        <div style={{width:700,marginLeft:50}}>
            <div style={{fontSize:50,fontWeight:'bolder',marginTop:35,color:'#512194'}}>
            Download JobSpider app!
            </div>
            <div style={{fontSize:18,fontWeight:'bold',marginTop:20}}>
            Unlimited job applications | HRs contact you directly | Track your Applications
            </div>
            <div style={{width:300,height:150,backgroundColor:'white',marginTop:60,borderRadius:10,display:'flex',flexDirection:'row',padding:20}}>
          <div style={{width:200,fontSize:18,fontWeight:'bold',marginTop:42}}>
          Scan QR to download JobSpider app
          </div>
          <div style={{border:"greay solid",padding:2}}>
          <img
                src={`${serverURL}/images/qrcode.png`}
                style={{ width: "130px", height: "140px",borderRadius:"8px" }}
              />
          </div>
            </div>
        </div>
        <div style={{width:548,display:'flex',flexDirection:'row'}}>
        
          <img
                src={`${serverURL}/images/mobileimage.png`}
                style={{border:"greay solid",marginTop:66,borderRadius:"8px"}}
              />
              <div>
             
              <div style={{padding:10,width:'80%',height:'18%',backgroundColor:'#e9d2f0',marginTop:170,fontSize:26,fontWeight:'bold',color:'#6d0090',alignItems:'center',borderRadius:5}}>
             <div style={{display:'flex',justifyContent:'left',flexDirection:'column'}}>
             <div style={{display:'flex',alignItems:'center'}}>
             <StarIcon style={{color:'#ffd166',width:30,height:35}}/> 
             <div>4.4</div>
             </div>
             <div style={{fontSize:18,fontWeight:500,marginLeft:8,marginTop:5}}>
              5L reviews
              </div>
              </div>
             
          </div> 
          <div style={{padding:10,width:'80%',height:'18%',backgroundColor:'#e9d2f0',marginTop:20,fontSize:26,fontWeight:'bold',color:'#6d0090',alignItems:'center',borderRadius:5}}>
          
          <div style={{display:'flex',alignItems:'center'}}>
            <DownloadIcon style={{width:30,height:30}}/>
              <div style={{ fontSize:22,fontWeight:'bold'}}>1 cr+</div>
             </div>
          
          <div style={{fontSize:16,fontWeight:500,marginLeft:8,marginTop:5}}>
            App download
              </div>
          </div>
          </div>
        </div>
    </div>
 )
}