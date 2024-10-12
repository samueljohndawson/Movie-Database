import * as React from "react";
import { Movie } from "./AppStateTypes";
import Dialog from "@mui/material/Dialog";

import { Grid } from "@mui/material";
import { ReviewForm } from "./ReviewForm";
import { NewMovieTable } from "./NewMovieTable";

export default function MoviePage() {
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | undefined>();

  return (
    <>
      <NewMovieTable setSelectedMovie={setSelectedMovie} />
      <>
        <ReviewForm selectedMovie={selectedMovie} />
      </>
      <Dialog
        open={false}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ReviewForm selectedMovie={selectedMovie} />
      </Dialog>
    </>
  );
}
