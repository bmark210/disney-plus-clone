import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import { useSelector } from "react-redux";
import db from "../firebase";
import { getFirestore, onSnapshot } from "firebase/firestore";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Home = (props) => {
  const dispatch = useDispatch();
  const [recommends, setRecommends] = useState([]);
  const [newDisneys, setNewDisneys] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    console.log("hello");
    const unsubscribe = onSnapshot(collection(db, "movies"), (snapshot) => {
      const recommendMovies = [];
      const newDisneyMovies = [];
      const originalMovies = [];
      const trendingMovies = [];

      snapshot.docs.forEach((doc) => {
        const movie = { id: doc.id, ...doc.data() };
        switch (movie.type) {
          case "recommend":
            recommendMovies.push(movie);
            break;

          case "new":
            newDisneyMovies.push(movie);
            break;

          case "original":
            originalMovies.push(movie);
            break;

          case "trending":
            trendingMovies.push(movie);
            break;
        }
      });

      setRecommends(recommendMovies);
      setNewDisneys(newDisneyMovies);
      setOriginals(originalMovies);
      setTrending(trendingMovies);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    dispatch(
      setMovies({
        recommend: recommends,
        newDisney: newDisneys,
        original: originals,
        trending: trending,
      })
    );
  }, [recommends, newDisneys, originals, trending, dispatch]);
  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
