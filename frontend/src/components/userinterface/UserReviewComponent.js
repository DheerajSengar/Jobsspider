import invertQuote from "../../assets/invertQuote.png"
import { Stack,Rating } from "@mui/material";
import ReviewScroll from "./ReviewScroll";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function UserReviewComponent(){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    var user_review=[{userreviewid:1, username:"Pranita Sapre", userrating:4, userpicture:"shiwangi-singla.webp",userreview:"Thanks Apna for helping me find a job without much hassle. If you are a fresher or a skilled person with expert knowledge in a specific field, you can easily find a job through the JobSpider app." },
        {userreviewid:1, username:"Vicky", userrating:2.5, userpicture:"vicky.jpg", userreview:"This app is very helpful if you are looking for a job and the team is also very supportive and friendly. They guided me through every stage. It is very easy to find a job on JobSpider because there are a lot of job options here for everyone. I got a job interview call very quickly after applying."},
        {userreviewid:1, username:"Moon Rai", userrating:4.5, userpicture:"rekha.webp" ,userreview:"It is definitely a great app with correct and true information on the job details. I am happy to use it and I would also recommend my friends to use it for their career development."},
        {userreviewid:1, username:"Siddharth shivhare", userrating:4.5, userpicture:"Siddharth_shivhare.jpg",userreview:"Good and helpful app, even for freshers who don't have good qualifications. There are jobs for Caretakers, Househelp and many more. It's very easy to find jobs here. Thank you, JobSpider app!" },
        {userreviewid:1, username:"Anjali Saxsena", userrating:3.5, userpicture:"kaynat-mansuri.webp" ,userreview:"Good and helpful app, even for freshers who don't have good qualifications. There are jobs for Caretakers, Househelp and many more. It's very easy to find jobs here. Thank you, JobSpider app!"},
      ]
 return(
 <div style={{width:"100%", display:'flex',flexDirection:matches?'column':'row' , height:"auto"}}>
    <div style={{width:matches?"100%":"30%", height:"475px",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)", position: 'relative', overflow: 'hidden'}} >
    <div style={{position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', filter: 'blur(40px)'}}></div>
    <div style={{position: 'absolute', bottom: -30, left: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.08)', filter: 'blur(30px)'}}></div>
    <div style={{position: 'relative', zIndex: 1}}>
    <img src={invertQuote} style={{width:"90px",height:"90px", marginLeft:matches?"20px":"80px",marginTop:"45px", opacity: 0.9}} alt="Quote Icon" />
    </div>
    <div style={{fontSize:matches?"24px":"32px",fontWeight:900,marginTop:"50px", fontFamily:"Ubuntu", color:"#fff",marginLeft:matches?"20px":"80px", lineHeight:1.4, position: 'relative', zIndex: 1}}>
   <p>
    Join the community of<br/>
     5 crore satisfied<br/> 
     job seekers...
    </p>
    </div>
    <div style={{fontSize:matches?"15px":"18px",marginTop:"50px", fontFamily:"Ubuntu", color:"rgba(255, 255, 255, 0.9)",marginLeft:matches?"20px":"80px" ,display:"flex", alignItems: 'center', position: 'relative', zIndex: 1}}>
        <span style={{fontWeight: 600}}>Play Store Ratings</span>
        <div style={{marginLeft:"12px"}}>
        <Stack spacing={1}>
             <Rating 
               name="half-rating-read" 
               defaultValue={5} 
               precision={0.5} 
               readOnly 
               sx={{
                 '& .MuiRating-iconFilled': {
                   color: '#ffd700',
                 },
                 '& .MuiRating-iconEmpty': {
                   color: 'rgba(255, 255, 255, 0.3)',
                 }
               }}
             />
           </Stack>
        </div>
    </div>
</div>

<div style={{width:matches?"100%":"70%",backgroundColor:"linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)",display:'flex',justifyContent:'center',alignItems:'center', padding: matches ? '20px' : '40px'}}>
    <ReviewScroll  data={user_review}/>

</div>

 </div>
)

}


