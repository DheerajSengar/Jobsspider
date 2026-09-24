import { Button, Paper, Box } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import { serverURL } from "../../services/api/FetchNodeServices";
import { useState } from "react";

export default function TrendingJobs({ item = {}, index = 0, colors = "#b03a84" }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const trendingRank = item.trending || (index + 1);
  const jobTitle = item.jobtype || "Featured Job";
  const imageSrc = item.picture ? `${serverURL}/images/${item.picture}` : null;

  return (
    <Paper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      elevation={isHovered ? 4 : 0}
      style={{
        padding: "24px 20px",
        width: 340,
        height: 250,
        borderRadius: 18,
        background: isHovered
          ? `linear-gradient(135deg, #ffffff 60%, ${colors}15 100%)`
          : "#f8f9fa",
        border: `1px solid ${isHovered ? colors : "#e9ecef"}`,
        margin: 12,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        transform: isHovered ? "translateY(-4px)" : "none",
      }}
    >
      <div style={{ zIndex: 2, maxWidth: "60%" }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: "bold",
            color: isHovered ? colors : "#888",
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {`TRENDING @ #${trendingRank}`}
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#2d3436",
            lineHeight: 1.3,
            marginBottom: 8,
          }}
        >
          {jobTitle}
        </div>
        <div
          style={{
            fontSize: 13,
            color: "#636e72",
            fontWeight: 500,
          }}
        >
          {item.total_jobs ? `${item.total_jobs}+ Open Positions` : "Top Opportunity"}
        </div>
      </div>

      <div style={{ zIndex: 2 }}>
        <Button
          variant={isHovered ? "contained" : "outlined"}
          style={{
            color: isHovered ? "#ffffff" : colors,
            backgroundColor: isHovered ? colors : "transparent",
            borderColor: colors,
            textTransform: "none",
            fontSize: 15,
            fontWeight: "bold",
            borderRadius: 25,
            padding: "6px 20px",
            boxShadow: isHovered ? `0 4px 14px ${colors}40` : "none",
            transition: "all 0.3s ease",
          }}
        >
          {`View All >`}
        </Button>
      </div>

      {/* Side Image / Graphic with Graceful Fallback */}
      <Box
        style={{
          position: "absolute",
          right: -10,
          bottom: -10,
          width: 150,
          height: 170,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {imageSrc && !imgError ? (
          <img
            src={imageSrc}
            onError={() => setImgError(true)}
            alt={jobTitle}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "bottom right",
              opacity: isHovered ? 1 : 0.85,
              transition: "transform 0.3s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        ) : (
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${colors}20, ${colors}40)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
              marginRight: 20,
            }}
          >
            <WorkIcon style={{ fontSize: 44, color: colors }} />
          </div>
        )}
      </Box>
    </Paper>
  );
}
