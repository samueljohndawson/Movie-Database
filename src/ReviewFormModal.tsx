import { Button, Dialog, DialogActions } from "@mui/material";
import { ReviewForm } from "./ReviewForm";
import { Movie } from "./AppStateTypes";
import React, { useEffect } from "react";

interface ReviewFormModalProps {
  selectedMovie: Movie | undefined;
}

export const ReviewFormModal = ({ selectedMovie }: ReviewFormModalProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    setIsOpen(selectedMovie === undefined ? false : true);
  }, [selectedMovie]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <ReviewForm selectedMovie={selectedMovie} />
      <DialogActions>
        <Button onClick={() => handleClose()} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
