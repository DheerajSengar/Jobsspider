import { Button, Paper, Avatar, Box } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import { serverURL } from "../../services/api/FetchNodeServices";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function JobComponent({ item = {} }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const companyName = item.companyname || "Verified Company";
  const rawDescription = item.aboutcompany || item.description || "Food delivery and online ordering platform & top recruiter on JobsSpider.";
  const displayDescription =
    rawDescription.length > 70
      ? rawDescription.substring(0, 67) + "..."
      : rawDescription;

  const logoUrl = item.logo ? `${serverURL}/images/${item.logo}` : null;
  const initial = companyName.charAt(0).toUpperCase();

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "8px" }}>
      <Paper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        elevation={isHovered ? 4 : 0}
        style={{
          padding: "24px 20px",
          width: matches ? 310 : 340,
          height: 250,
          borderRadius: 18,
          background: isHovered ? "#ffffff" : "#f8f9fa",
          border: `1px solid ${isHovered ? "#b03a84" : "#e9ecef"}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "all 0.3s ease-in-out",
          transform: isHovered ? "translateY(-4px)" : "none",
          cursor: "pointer",
        }}
      >
        <div>
          {/* Company Logo or Fallback Avatar */}
          <Box style={{ height: 50, display: "flex", alignItems: "center", marginBottom: 16 }}>
            {logoUrl && !imgError ? (
              <img
                src={logoUrl}
                onError={() => setImgError(true)}
                alt={companyName}
                style={{
                  maxHeight: 48,
                  maxWidth: 140,
                  objectFit: "contain",
                }}
              />
            ) : (
              <Avatar
                sx={{
                  bgcolor: "#b03a84",
                  color: "#ffffff",
                  fontWeight: "bold",
                  width: 46,
                  height: 46,
                  fontSize: 20,
                  boxShadow: "0 4px 10px rgba(176, 58, 132, 0.3)",
                }}
              >
                {initial || <BusinessIcon />}
              </Avatar>
            )}
          </Box>

          {/* Company Name */}
          <div
            style={{
              fontSize: 19,
              fontWeight: "700",
              color: "#2d3436",
              marginBottom: 8,
              lineHeight: 1.3,
            }}
          >
            {companyName.length > 25
              ? companyName.substring(0, 22) + "..."
              : companyName}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 13,
              color: "#636e72",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {displayDescription}
          </div>
        </div>

        {/* Action Button */}
        <div>
          <Button
            variant={isHovered ? "contained" : "outlined"}
            style={{
              color: isHovered ? "#ffffff" : "#b03a84",
              backgroundColor: isHovered ? "#b03a84" : "transparent",
              borderColor: "#b03a84",
              textTransform: "none",
              fontSize: 15,
              fontWeight: "bold",
              borderRadius: 25,
              padding: "6px 20px",
              boxShadow: isHovered ? "0 4px 14px rgba(176, 58, 132, 0.35)" : "none",
              transition: "all 0.3s ease",
            }}
          >
            {`View Jobs >`}
          </Button>
        </div>
      </Paper>
    </div>
  );
}
