import * as React from "react";
import { Movie } from "./AppStateTypes";

import { ReviewForm } from "./ReviewForm";
import { MovieTable } from "./MovieTable";
import { ReviewFormModal } from "./ReviewFormModal";
import { useWindowSize } from "react-use";

export default function MoviePage() {
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | undefined>();
  const size = useWindowSize();

  return (
    <>
      <MovieTable setSelectedMovie={setSelectedMovie} />
      {selectedMovie &&
        (size.width > 600 ? (
          <ReviewForm selectedMovie={selectedMovie} />
        ) : (
          <ReviewFormModal selectedMovie={selectedMovie} />
        ))}
    </>
  );
}
