import * as React from "react";
import Paper from "@mui/material/Paper";
import { Movie, MovieCompany } from "./AppStateTypes";
import { fetchMovies, fetchMovieCompanies, postNewReview } from "./requests";
import { useEffect } from "react";
import { calculateAverage } from "./helperFunctions";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import {
  Button,
  TextField,
  CircularProgress,
  Card,
  CardActions,
  CardContent,
  Typography,
  TextareaAutosize,
  Grid,
  Modal,
  Box,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { ReviewForm } from "./ReviewForm";

type Data = {
  id: number;
  title: string;
  review: number;
  movieCompany: string;
};

export default function EnhancedTable() {
  // Data state
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [movieCompanies, setMovieCompanies] = React.useState<MovieCompany[]>(
    []
  );

  // table state
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedMovie, setSelectedMovie] = React.useState<Movie>();
  const [rows, setRows] = React.useState<Data[]>([]);

  // form state
  const [newReview, setNewReview] = React.useState<string>("");
  const [submitted, setSubmitted] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState<string>();
  const [isAwaitingResponse, setIsAwaitingResponse] = React.useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const movieData = await fetchMovies();
      const companyData = await fetchMovieCompanies();
      setMovies(movieData);
      setMovieCompanies(companyData);
      setRows(createRows(movieData, companyData));
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const RefreshButton = () => {
    if (movieCompanies) {
      return (
        <Button
          variant="contained"
          onClick={() => {
            fetchData();
          }}
        >
          {"Refresh"}
        </Button>
      );
    } else {
      return <p>No movies loaded yet</p>;
    }
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 4 },
    { field: "review", headerName: "Review", type: "number", flex: 2 },
    {
      field: "movieCompany",
      headerName: "Movie Company",
      flex: 4,
    },
  ];

  const createRows = (
    movies: Movie[],
    movieCompanies: MovieCompany[]
  ): Data[] => {
    return movies.map((movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      review: calculateAverage(movie.reviews),
      movieCompany:
        movieCompanies.find(
          (company: MovieCompany) => company.id === movie.filmCompanyId
        )?.name || "Unknown",
    }));
  };

  const handleClick = (movieId: number) => {
    const mov = movies.find((movie) => movie.id === movieId);
    setSelectedMovie(mov);
    setSubmitted(false);
  };

  return isLoading ? (
    <CircularProgress />
  ) : !movies.length || !movieCompanies.length ? (
    <>
      <p>{"Unable to load movie data. Click to try again."}</p>
      <RefreshButton />
    </>
  ) : (
    <>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{ border: 0 }}
          onRowClick={(data) => {
            handleClick(data.row.id);
          }}
          disableColumnResize
        />
      </Paper>
      <>
        <Grid
          container
          spacing={0}
          direction={"column"}
          sx={{
            alignItems: "center",
          }}
        >
          <Grid item xs={3}>
            <ReviewForm selectedMovie={selectedMovie} />
          </Grid>
        </Grid>
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
