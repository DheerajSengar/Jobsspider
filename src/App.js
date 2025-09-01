import LoginPage from "./admin/login/LoginPage";
import DashboardAdmin from "./admin/login/DashboardAdmin";
import CompanyVerification from "./admin/companies/CompanyVerification";
import HomePage from "./userinterface/HomePage";
import SearchBarMob2 from "./userinterface/components/SearchBarMob2";
import MainShowFilterJobsComponent from "./userinterface/filterpage/MainShowFilterJobsComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowJobsCards from "./userinterface/filterpage/ShowJobsCards"
import Email from "./userinterface/userlogin/Email"
import ReadyNextPage from "./userinterface/userlogin/ReadyNextPage"
import EmailVerify from "./userinterface/userlogin/EmailVerify"
import EmailAddressConfirmed from "./userinterface/userlogin/EmailAddressConfirmed"
import Mobile from "./userinterface/userlogin/Mobile"
import Mobileotp from "./userinterface/userlogin/Mobileotp"
import WelcomeBack from "./userinterface/userlogin/WelcomeBack"
import JobSeeker from "./userinterface/userlogin/JobSeeker"
import Password  from "./userinterface/userlogin/Password"
function App() {
  return (
    <div style={{ width: "100%" }}>
      <Router>
        <Routes>
          <Route element={<LoginPage />} path="/loginpage" />
          <Route
            element={<CompanyVerification />}
            path="/companyverification"
          />
          <Route element={<DashboardAdmin />} path="/dashboardadmin/*" />
          <Route element={<HomePage />} path="/" />
          <Route element={<ShowJobsCards />} path="/showjobscards" />
          <Route element={<SearchBarMob2 />} path="/searchbarmob2" />
          <Route element={<MainShowFilterJobsComponent />} path="/searchjobs" />
      
          <Route element={<ReadyNextPage />} path="/readynextpage" />
          <Route element={<WelcomeBack />} path="/welcomeback" />
          <Route element={<JobSeeker />} path="/jobSeeker" />
          <Route element={<Mobile />} path="/mobile" />
          <Route element={<Mobileotp />} path="/mobileotp" />
          <Route element={<Email />} path="/email" />
          <Route element={<Password />} path="/password" />
          <Route element={<EmailVerify />} path="/emailverify" />
          <Route element={<EmailAddressConfirmed />} path="/emailaddressconfirmed" />

          


        </Routes>
      </Router>
    </div>
  );
}

export default App;
