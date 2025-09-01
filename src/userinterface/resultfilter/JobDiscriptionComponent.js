import { Paper, Button, Divider, Accordion } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
export default function JobDiscription() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));


    const [showAll, setShowAll] = useState(false)
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
                    <div class="container">
                        <h2>Job Description</h2>
                        <div class="job-description">
                            <p>We are seeking a highly skilled and experienced Full Stack MERN Developer to lead our latest projects.
                                This role requires a strong background in MongoDB, Express.js, React, and Node.js, as well as experience
                                in product management.</p>
                            <h3>Key Responsibilities:</h3>
                            <ul>
                                <li>Design, develop, and maintain a full-stack web application using the MERN stack.</li>
                                <li>Collaborate with cross-functional teams to define, design, and ship new features.</li>
                                <li>Manage the entire product lifecycle from conception to launch.</li>
                                <li>Ensure high performance and responsiveness of the application.</li>
                                <li>Implement security and data protection measures.</li>
                                <li>Provide guidance and mentorship to junior developers.</li>
                                <li>Stay up to date with emerging trends in software development.</li>
                            </ul>

                        </div>
                        <Button
                            variant="text"
                            style={{ marginLeft: matches ? 310 : 600, fontSize: 12, fontWeight: 'bold' }}>
                            {showAll ? "View Less" : "View More"}
                            {showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </Button>
                    </div>
                </div>
            </Accordion>








        </Paper>

    )





}