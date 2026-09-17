import TrendingJobs from "./TrendingJobs";
import { Paper } from "@mui/material";

export default function TrendingJobsComponent({ items = [], colors = [] }) {
  const defaultColors = ['#e67e22', '#ffeaa7', '#fd79a8', '#74b9ff', '#2ecc71'];
  const palette = (colors && colors.length > 0) ? colors : defaultColors;

  const showTrendingJobs = () => {
    return items.map((item, i) => {
      return (
        <TrendingJobs
          key={item.jobtype || i}
          index={i}
          item={item}
          colors={palette[i % palette.length]}
        />
      );
    });
  };

  return (
    <div
      style={{
        margin: "20px 10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        maxWidth: 1400,
      }}
    >
      <Paper
        elevation={0}
        style={{
          padding: "30px 24px",
          width: 340,
          height: 250,
          borderRadius: 18,
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          color: "#ffffff",
          margin: 12,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: "0 10px 25px rgba(15, 23, 42, 0.25)",
        }}
      >
        <div
          style={{
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: 2,
            color: "#fd79a8",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          EXPLORE CATEGORIES
        </div>
        <div style={{ fontWeight: 800, fontSize: 30, lineHeight: 1.25 }}>
          Trending Jobs on JobsSpider
        </div>
        <div style={{ fontSize: 14, color: "#94a3b8", marginTop: 12 }}>
          Handpicked roles in high-demand fields across top Indian companies.
        </div>
      </Paper>
      {showTrendingJobs()}
    </div>
  );
}