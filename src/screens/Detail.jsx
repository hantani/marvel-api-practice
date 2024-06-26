import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  min-height: calc(100vh - 100px);
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;
const BackBtn = styled.button`
  color: ${(props) => props.theme.fontColor};
  font-size: 28px;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  outline: none;
  border: 1px solid ${(props) => props.theme.fontColor};
  border-radius: 4px;
`;
const ImgWrapper = styled.div`
  text-align: center;

  img {
    width: 250px;
    height: 250px;
    border-radius: 20px;
    object-fit: cover;
  }
`;
const TextWrapper = styled.div`
  padding-top: 40px;

  h2 {
    font-size: 26px;
    text-align: center;
    font-weight: 500;
    color: ${(props) => props.theme.fontColor};
  }

  .modified {
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
    color: ${(props) => props.theme.fontColor};
  }

  .description {
    margin-top: 20px;
    font-size: 18px;
    color: ${(props) => props.theme.fontColor};
    line-height: 1.25;
  }
`;
const LinksWrapper = styled.div`
  padding-top: 40px;

  ul {
    li {
      margin-top: 15px;
      text-align: center;
      a {
        text-decoration: none;
        font-size: 18px;
        color: ${(props) => props.theme.linkColor};
      }
    }
  }
`;

function Detail() {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const json = await (
        await fetch(
          `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`
        )
      ).json();
      console.log(json.data.results[0]);
      setResult(json.data.results[0]);
      setLoading(false);
    })();
  }, []);

  const onBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Wrapper>
          <BackBtn onClick={onBackClick}>🔙</BackBtn>
          <ImgWrapper>
            <img
              src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
              alt={result.name}
            />
          </ImgWrapper>
          <TextWrapper>
            <h2>{result.name}</h2>
            <p className="modified">{result.modified.slice(0, 10)}</p>
            {result.description.length > 0 && (
              <p className="description">{result.description}</p>
            )}
          </TextWrapper>
          <LinksWrapper>
            <ul>
              {result.urls.map((url) => (
                <li key={url.type}>
                  <Link to={url.url} target="_blank">
                    Go To {url.type} ➡️
                  </Link>
                </li>
              ))}
            </ul>
          </LinksWrapper>
        </Wrapper>
      )}
    </>
  );
}

export default Detail;
