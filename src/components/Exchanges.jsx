import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../main";
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent.jsx";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1);
    setLoading(true);
  };

  const prevPage = () => {
    setPage(page - 1);
    setLoading(true);
  };

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?page=${page}`);

        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchExchanges();
  }, [page]);

  if (error) return <ErrorComponent message={"Error while fetching data"} />;

  return (
    <Container maxW={"container.lg"}>
      {loading ? (
        <Loader />
      ) : (
        <>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => (
              <ExchangeCard
                name={i.name}
                image={i.image}
                rank={i.trust_score_rank}
                url={i.url}
                key={i.id}
              />
            ))}
          </HStack>

          <HStack justifyContent={"center"} marginBottom={"4"}>
            {page - 1 !== 0 ? (
              <Button bgColor={"blackAlpha.900"} color={"whiteAlpha.900"} onClick={() => prevPage()}>
                {page - 1}
              </Button>
            ) : (
              <a></a>
            )}
            <Button
              bgColor={"whiteAlpha.900"}
              color={"blackAlpha.900"}
            >
              {page}
            </Button>
            <Button
              bgColor={"blackAlpha.900"}
              color={"white"}
              onClick={() => nextPage()}
            >
              {page + 1}
            </Button>
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, image, rank, url }) => {
  return (
    <a href={url} target={"blank"}>
      <VStack
        w={"52"}
        shadow={"lg"}
        
        p={"8"}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={"4"}
        css={{
          ":hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={image}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt="exchanges"
        />
        <Heading size={"md"} noOfLines={"1"}>
          {rank}
        </Heading>

        <Text noOfLines={"1"}>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
