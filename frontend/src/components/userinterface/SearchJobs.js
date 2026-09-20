import { Divider } from "@mui/material";
import { useState } from "react";
import { serverURL } from "../../services/api/FetchNodeServices";
import SearchBarComponent from "./SearchBarComponent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchBarMob from "./SearchBarMob";

export default function SearchJobs() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: 40,
        paddingBottom: matches ? 30 : 60,
        background:
          "linear-gradient(135deg, rgba(253, 254, 250, 0.9) 0%, rgba(199, 253, 134, 0.45) 100%)",
      }}
    >
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: matches ? "0 16px" : "0 40px" }}>
        <div
          style={{
            fontSize: matches ? 14 : 16,
            fontWeight: "800",
            letterSpacing: 1.5,
            color: "#b42f6b",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          INDIAâ€™S #1 JOB PLATFORM
        </div>

        <div
          style={{
            fontSize: matches ? 32 : 54,
            fontWeight: "800",
            color: "#1e293b",
            lineHeight: 1.15,
            marginBottom: 12,
            maxWidth: matches ? "100%" : "60%",
          }}
        >
          Your job search ends here
        </div>

        <div
          style={{
            fontSize: matches ? 15 : 22,
            color: "#475569",
            fontWeight: 500,
            marginBottom: 36,
          }}
        >
          Discover 50 lakh+ career opportunities
        </div>

        <div style={{ position: "relative", zIndex: 5, marginBottom: 20 }}>
          {matches ? <SearchBarMob /> : <SearchBarComponent />}
        </div>
      </div>

      {/* Hero Candidate Image bounded inside section */}
      {!imgError && (
        <img
          src={`${serverURL}/images/main_girl.png`}
          onError={() => setImgError(true)}
          alt="JobsSpider Candidate"
          style={{
            position: "absolute",
            right: matches ? -40 : 40,
            bottom: 0,
            maxHeight: matches ? "220px" : "360px",
            maxWidth: matches ? "50%" : "38%",
            objectFit: "contain",
            zIndex: 1,
            pointerEvents: "none",
            opacity: matches ? 0.35 : 0.95,
          }}
        />
      )}

      {!matches && <Divider style={{ marginTop: 40, opacity: 0.5 }} />}
    </div>
  );
}

