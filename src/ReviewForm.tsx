import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import React, { useEffect } from "react";
import { Movie } from "./AppStateTypes";
import { postNewReview } from "./requests";

interface ReviewFormProps {
  selectedMovie: Movie | undefined;
}

export const ReviewForm = ({ selectedMovie }: ReviewFormProps) => {
  const [isAwaitingResponse, setIsAwaitingResponse] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [newReview, setNewReview] = React.useState<string>("");
  const [responseMessage, setResponseMessage] = React.useState<string>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsAwaitingResponse(true);
    event.preventDefault();
    if (selectedMovie && newReview) {
      postNewReview(selectedMovie.id, newReview).then((res) => {
        setResponseMessage(res.message);
        setSubmitted(true);
      });
      setNewReview("");
    }
    setIsAwaitingResponse(false);
  };

  useEffect(() => {
    setSubmitted(false);
  }, [selectedMovie]);
  return (
    <Paper sx={{ mt: 5 }}>
      {selectedMovie && !submitted && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Submit new review
            </Typography>
            <Typography variant="h5" component="div">
              {selectedMovie.title}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Max 100 characters
            </Typography>
            <TextField
              fullWidth
              value={newReview}
              type="textarea"
              multiline
              label="Review"
              variant="outlined"
              inputProps={{ maxLength: 100 }}
              required
              onChange={(e) => setNewReview(e.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </CardActions>
        </form>
      )}
      {isAwaitingResponse ? (
        <CircularProgress />
      ) : (
        submitted && (
          <CardContent>
            <Typography variant="h5" component="div">
              {responseMessage}
            </Typography>
          </CardContent>
        )
      )}
    </Paper>
  );
};
