import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import AutobloggerApi from "../api";
import AuthorCard from "./AuthorCard";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Loading from "../common/Loading";
import Hero from "../common/Hero";

/** Authors list
 * Should render list of Authors
 * Big cards of each author
 *
 * Clicking a card shows an author detail page
 * Detail page shows a list of their posts
 *
 */

const AuthorsList = () => {
  const [authors, setAuthors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getAuthors() {
    let res = await AutobloggerApi.getAuthors();
    setAuthors(res);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getAuthors();
  }, []);

  if (isLoading) return <Loading />;
  return (
    // Hero header component
    <>
      <Hero headline="meet the authors" size={'md'}/>

      <Container>
        <Grid container spacing={2}>
          {!isLoading &&
            authors.map(
              ({ username, firstName, lastName, authorBio, imageUrl }) => (
                <Grid key={username}>
                  <AuthorCard
                    firstName={firstName}
                    lastName={lastName}
                    username={username}
                    authorBio={authorBio}
                    imageUrl={imageUrl}
                  />
                </Grid>
              )
            )}
        </Grid>
      </Container>
    </>
  );
};

export default AuthorsList;
