import React from 'react';
import Grow from '@mui/material/Grid2';
import { Grid, Typography, Link,List,ListItem,} from '@mui/material';

const jobData = {
  jobs: [
    { title: 'Sales Executive', link: 'https://www.simplyhired.co.in/search?q=Sales+Executive&l=&from=homepage_trending' },
    { title: 'Business Development Executive', link: 'https://www.simplyhired.co.in/search?q=Business+Development+Executive&l=&from=homepage_trending' },
    { title: 'Php Developer', link: 'https://www.simplyhired.co.in/search?q=Php+Develope&l=&from=homepage_trending' },
    { title: 'Sales Manage', link: 'https://www.simplyhired.co.in/search?q=Sales+Manage&l=&from=homepage_trending' },
    { title: 'Freshers', link: 'https://www.simplyhired.co.in/search?q=Freshers&l=&from=homepage_trending' },
    { title: 'Marketing Executive', link: 'https://www.simplyhired.co.in/search?q=Marketing+Executive&l=&from=homepage_trending' },
    { title: 'Business Development Manage', link: 'https://www.simplyhired.co.in/search?q=Business+Development+Manage&l=&from=homepage_trending' },
    { title: 'Graphic Designe', link: 'https://www.simplyhired.co.in/search?q=Graphic+Designe&l=&from=homepage_trending' },
    { title: 'Software Develope', link: 'https://www.simplyhired.co.in/search?q=Software+Develope&l=&from=homepage_trending' },
    { title: 'Java Develope', link: 'https://www.simplyhired.co.in/search?q=Java+Develope&l=&from=homepage_trending' },
    { title: 'Web Designe', link: 'https://www.simplyhired.co.in/search?q=Web+Designe&l=&from=homepage_trending' },
    { title: 'Android Develope', link: 'https://www.simplyhired.co.in/search?q=Android+Develope&l=&from=homepage_trending' },
    { title: 'Hr Executive', link: 'https://www.simplyhired.co.in/search?q=Hr+Executive&l=&from=homepage_trending' },
    { title: 'Area Sales Manage', link: 'https://www.simplyhired.co.in/search?q=Area+Sales+Manage&l=&from=homepage_trending' },
    { title: 'Customer Care Executive', link: 'https://www.simplyhired.co.in/search?q=Customer+Care+Executive&l=&from=homepage_trending' },
    { title: 'Browse All Jobs', link: 'https://www.simplyhired.co.in/browse-jobs/titles' },
  ],

  cities: [
    { name: 'Maharashtra', link: 'https://www.simplyhired.co.in/search?q=&l=Maharashtra&from=homepage_trending' },
    { name: 'Karnataka', link: 'https://www.simplyhired.co.in/search?q=&l=Karnataka&from=homepage_trending' },
    { name: 'Andhra Pradesh', link: 'https://www.simplyhired.co.in/search?q=&l=Andhra+Pradesh&from=homepage_trending' },
    { name: 'Tamil Nadu', link: 'https://www.simplyhired.co.in/search?q=&l=Tamil+Nadu&from=homepage_trending' },
    { name: 'Haryana', link: 'https://www.simplyhired.co.in/search?q=&l=Haryana&from=homepage_trending' },
    { name: 'Uttar Pradesh', link: 'https://www.simplyhired.co.in/search?q=&l=Uttar+Pradesh&from=homepage_trending' },
    { name: 'Gujarat', link: 'https://www.simplyhired.co.in/search?q=&l=Gujarat&from=homepage_trending' },
    { name: 'Delhi', link: 'https://www.simplyhired.co.in/search?q=&l=Delhi&from=homepage_trending' },
    { name: 'Rajasthan', link: 'https://www.simplyhired.co.in/search?q=&l=Rajasthan&from=homepage_trending' },
    { name: 'West Bengal', link: 'https://www.simplyhired.co.in/search?q=&l=West+Bengal&from=homepage_trending' },
    { name: 'Madhya Pradesh', link: 'https://www.simplyhired.co.in/search?q=&l=Madhya+Pradesh&from=homepage_trending' },
    { name: 'Chandigarh', link: 'https://www.simplyhired.co.in/search?q=&l=Chandigarh&from=homepage_trending' },
    { name: 'Kerala', link: 'https://www.simplyhired.co.in/search?q=&l=Kerala&from=homepage_trending' },
    { name: 'Punjab', link: 'https://www.simplyhired.co.in/search?q=&l=Punjab&from=homepage_trending' },
    { name: 'Orissa', link: 'https://www.simplyhired.co.in/search?q=&l=Orissa&from=homepage_trending' },
    { name: 'Jammu And Kashmi', link: 'https://www.simplyhired.co.in/search?q=&l=Jammu+And+Kashmi&from=homepage_trending' },
    { name: 'Uttarakhand', link: 'https://www.simplyhired.co.in/search?q=&l=Uttarakhand&from=homepage_trending' },
    { name: 'Biha', link: 'https://www.simplyhired.co.in/search?q=&l=Biha&from=homepage_trending' },
    { name: 'Jharkhand', link: 'https://www.simplyhired.co.in/search?q=&l=Jharkhand&from=homepage_trending' },
    { name: 'Chhattisgarh', link: 'https://www.simplyhired.co.in/search?q=&l=Chhattisgarh&from=homepage_trending' },
    { name: 'Assam', link: 'https://www.simplyhired.co.in/search?q=&l=Assam&from=homepage_trending' },
    { name: 'Himachal Pradesh', link: 'https://www.simplyhired.co.in/search?q=&l=Himachal+Pradesh&from=homepage_trending' },
    { name: 'Goa', link: 'https://www.simplyhired.co.in/search?q=&l=Goa&from=homepage_trending' },
    { name: 'Nagaland', link: 'https://www.simplyhired.co.in/search?q=&l=Nagaland&from=homepage_trending' },
    { name: 'Daman And Diu', link: 'https://www.simplyhired.co.in/search?q=&l=Daman+And+Diu&from=homepage_trending' },
    
  ],
  companies: [
    { name: 'Amazon.com', link: 'https://www.simplyhired.co.in/search?q=Amazon.com&l=&from=homepage_trending' },
  { name: 'Jpmorgan Chase', link: 'https://www.simplyhired.co.in/search?q=Jpmorgan+Chase&l=&from=homepage_trending' },
  { name: 'Oracle', link: 'https://www.simplyhired.co.in/search?q=Oracle&l=&from=homepage_trending' },
  { name: 'Honeywell', link: 'https://www.simplyhired.co.in/search?q=Honeywell&l=&from=homepage_trending' },
  { name: 'Capgemini', link: 'https://www.simplyhired.co.in/search?q=Capgemini&l=&from=homepage_trending' },
  { name: 'IBM', link: 'https://www.simplyhired.co.in/search?q=IBM&l=&from=homepage_trending' },
  { name: 'Ikya', link: 'https://www.simplyhired.co.in/search?q=Ikya&l=&from=homepage_trending' },
  { name: 'Hector & Streak Consulting', link: 'https://www.simplyhired.co.in/search?q=Hector+%26+Streak+Consulting&l=&from=homepage_trending' },
  { name: 'Live Connections', link: 'https://www.simplyhired.co.in/search?q=Live+Connections&l=&from=homepage_trending' },
  { name: 'Hewlett Packard Enterprise Company', link: 'https://www.simplyhired.co.in/search?q=Hewlett+Packard+Enterprise+Company&l=&from=homepage_trending' },
  { name: 'Nvs Consultants', link: 'https://www.simplyhired.co.in/search?q=Nvs+Consultants&l=&from=homepage_trending' },
  { name: 'Mancer Consulting Services', link: 'https://www.simplyhired.co.in/search?q=Mancer+Consulting+Services&l=&from=homepage_trending' },
  { name: 'Volantis Technologies Private', link: 'https://www.simplyhired.co.in/search?q=Volantis+Technologies+Private&l=&from=homepage_trending' },
  { name: 'Hyatt', link: 'https://www.simplyhired.co.in/search?q=Hyatt&l=&from=homepage_trending' },
  { name: 'Step Placements', link: 'https://www.simplyhired.co.in/search?q=Step+Placements&l=&from=homepage_trending' },
  { name: 'Browse All Companies', link: 'https://www.simplyhired.co.in/browse-jobs/companies' },

    ],
};

const JobAccordion = () => {
  return (
    <div style={{marginLeft:50}}>
      <Grid container spacing={3}>
        {/* Jobs Column */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom><b>Jobs</b></Typography>
          <List>
            {jobData.jobs.map((job, index) => (
              <ListItem key={index}>
                <Link href={job.link} target="_blank" rel="noopener noreferrer">
                  {job.title}
                </Link>
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Cities Column */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom><b>Citie</b></Typography>
          <List>
            {jobData.cities.map((city, index) => (
              <ListItem key={index}>
                <Link href={city.link} target="_blank" rel="noopener noreferrer">
                  {city.name}
                </Link>
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Companies Column */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom><b>Companies</b></Typography>
          <List>
            {jobData.companies.map((company, index) => (
              <ListItem key={index}>
                <Link href={company.link} target="_blank" rel="noopener noreferrer">
                  {company.name}
                </Link>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default JobAccordion;
