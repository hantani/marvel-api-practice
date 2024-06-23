import { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const Heading = styled.h1`
  text-align: center;
  font-size: 45px;
  font-weight: 700;
  margin-bottom: 50px;
`;
const Lists = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 80px;
`;
const ImgWrapper = styled.div`
  width: 100%;
  height: 350px;
  /* position: relative; */

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px 20px 20px 20px;
  }
`;
const TextWrapper = styled.div`
  width: 100%;
  padding: 20px 15px;
  border-radius: 0 0 20px 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  transform: translateY(62px);
  transition: all 0.3s;
  h2 {
    font-size: 22px;
    font-weight: 500;
    text-decoration: none;
    color: ${(props) => props.theme.fontColor};
  }
  p {
    font-size: 22px;
    margin-top: 15px;
    text-decoration: none;
    line-height: 1.25;
  }
`;
const List = styled.li`
  border-radius: 20px;
  width: 350px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  &:hover {
    ${TextWrapper} {
      transform: translateY(0px);
    }
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.fontColor};
    position: relative;
  }
`;

function Home() {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    (async () => {
      const json = await (
        await fetch(
          "https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023"
        )
      ).json();
      setResults(json.data.results);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Heading>🔥 The Marvels 🔥</Heading>
          <Lists>
            {results?.map((result) => (
              <List key={result.id}>
                <Link to={`/character/${result.id}`}>
                  <ImgWrapper>
                    <img
                      src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
                      alt={result.name}
                    />
                  </ImgWrapper>
                  <TextWrapper>
                    <h2>{result.name}</h2>
                    {/* {result.description.length > 0 && (
                      <p>
                        {result.description.length > 100
                          ? `${result.description.slice(0, 100)}...`
                          : result.description}
                      </p>
                    )} */}
                  </TextWrapper>
                </Link>
              </List>
            ))}
          </Lists>
        </>
      )}
    </>
  );
}

export default Home;
