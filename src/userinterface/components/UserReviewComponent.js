import invertQuote from "../../assets/invertQuote.png"
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Paper,Stack,Rating } from "@mui/material";
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
    <div style={{width:matches?"100%":"30%", height:"475px",background:"#218c74"}} >
    <div >
    <img src={invertQuote} style={{width:"80px",height:"80px", marginLeft:"80px",marginTop:"35px"}}/>
    </div>
    <div style={{fontSize:28,fontWeight:'bolder',marginTop:"40px", fontFamily:"Ubuntu", color:"#fff",marginLeft:"80px", lineHeight:1.6}}>
   <p>
    Join the community of<br/>
     5 crore satisfied<br/> 
     job seekers...
    </p>
    </div>
    <div style={{fontSize:17,marginTop:"40px", fontFamily:"Ubuntu", color:"#fff",marginLeft:"80px" ,display:"flex", }}>
        <span>Play Store Ratings</span>
        <div style={{marginLeft:"7px"}}>
        <Stack spacing={1} style={{marginLeft:"10px"}}>
             
             <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
           </Stack>
        </div>
    </div>
</div>

<div style={{width:matches?"100%":"70%",backgroundColor:"#f4fdf6",display:'flex',justifyContent:'center',alignItems:'center'}}>
    <ReviewScroll  data={user_review}/>

</div>

 </div>
)

}

