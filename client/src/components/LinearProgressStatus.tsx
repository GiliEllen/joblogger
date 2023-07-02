import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    // backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    backgroundColor: theme.palette.primary,
  },
}));

export enum Status {
  // 'In Progress', 'Denied', ''CV'', 'interviewing', 'hired', 'Test'
  IP = "In Progress",
  DENIED = "Denied",
  CV = "CV",
  IV = "interviewing",
  HIRED = "hired",
  TEST = "Test",
  APPLIED = "Applied"
}

interface ProgressBarProps {
  status: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ status }) => {
  const [precent, setPrecent] = useState<number>(0);
  // 'In Progress', 'Denied', ''CV'', 'interviewing', 'hired', 'Test'
  useEffect(() => {
    if (status === "") {
    } else if (status === Status.IP) {
      setPrecent(50);
    } else if (status === Status.DENIED) {
      setPrecent(0);
    } else if (status === Status.CV) {
      setPrecent(10);
    } else if (status === Status.IV) {
      setPrecent(50);
    } else if (status === Status.HIRED) {
      setPrecent(100);
    } else if (status === Status.TEST) {
      setPrecent(30);
    } else if (status === Status.APPLIED) {
      setPrecent(1);
    }
  }, [status]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <br />
      <BorderLinearProgress variant="determinate" value={precent} />
    </Box>
  );
};

export default ProgressBar;
