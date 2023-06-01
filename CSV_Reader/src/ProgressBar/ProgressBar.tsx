import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { HiDocumentText } from "react-icons/hi";

export function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
        backgroundColor: "white",
        borderRadius: "8px",
        height: "30px",
        padding: "10px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", border: "black" }}>
        <HiDocumentText style={{ padding: "2px" }} />
      </Box>
      <Box sx={{ width: "100%", height: "20px", paddingBottom: "10px"}}>
        <Typography style={{ fontSize: "12px", marginBottom: "2px" }}>FileName.csv</Typography>
        <LinearProgress
          style={{ height: "7px", borderRadius: "50px" }}
          variant="determinate"
          {...props}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <Typography style={{ fontSize: "12px" }} >{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
}
