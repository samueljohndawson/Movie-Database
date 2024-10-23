import { Button } from "@mui/material";

interface RefreshButtonProps {
  onClick: () => void;
}

export const RefreshButton = ({ onClick }: RefreshButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={() => {
        onClick();
      }}
    >
      {"Refresh"}
    </Button>
  );
};
