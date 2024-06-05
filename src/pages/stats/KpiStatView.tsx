import { Box, CircularProgress, Typography } from "@mui/material";
import type { KpiStat } from "./stat.types";

export const KpiStatView = ({ stat }: { stat: KpiStat }) => {
  const isPercent = stat.options?.isPercentage ?? false;
  const valuePercent = isPercent ? +stat.data : 100;
  const color = stat.options?.color;
  const textValue = isPercent ? `${stat.data}%` : stat.data;

  return (
    <div className="w-full flex justify-center">
      <Box className="bg-white w-48 h-48 rounded flex justify-center items-center self-center">
        <div className="flex-col justify-evenly">
          <Box className="relative inline-flex">
            <CircularProgress
              className="absolute text-[#e5e7eb]"
              size="100px"
              value={100}
              variant="determinate"
            />
            <CircularProgress
              size="100px"
              sx={{ color }}
              value={valuePercent}
              variant="determinate"
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography className="text-slate-950">{textValue}</Typography>
            </Box>
          </Box>
          <Typography className="text-center">{stat.label}</Typography>
        </div>
      </Box>
    </div>
  );
};
