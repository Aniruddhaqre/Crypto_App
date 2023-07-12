import {
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../main";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent.jsx";
import { Link } from "react-router-dom";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message={"failed to fetching Coins"} />;

  return (
    <Container maxW={"container.lg"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} alignItems={"center"} justifyContent={"space-evenly"}>
            {coins.map((c) => (
              <CoinCard
                id={c.id}
                image={c.image}
                name={c.name}
                symbol={c.symbol}
                price={c.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack w={"full"} justifyContent={"center"} marginBottom={"4"}>
            {page - 1 !== 0 ? (
              <Button
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(page - 1)}
              >
                {page - 1}
              </Button>
            ) : (
              <a></a>
            )}
            <Button bgColor={"whiteAlpha.400"} color={"blackAlpha.900"}>
              {page}
            </Button>
            <Button
              bgColor={"blackAlpha.900"}
              color={"white"}
              onClick={() => changePage(page + 1)}
            >
              {page + 1}
            </Button>
          </HStack>
        </>
      )}
    </Container>
  );
};

const CoinCard = ({ id, image, name, symbol, price, currencySymbol = "₹" }) => {
  return (
    <Link to={`/coin/${id}`}>
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
        <Image src={image} w={"10"} h={"10"} objectFit={"contain"} />
        <Heading size={"md"} noOfLines={"1"}>
          {symbol}
        </Heading>

        <Text noOfLines={"1"}>{name}</Text>
        <Text noOfLines={"1"}>
          {price ? `${currencySymbol}${price}` : `NA`}
        </Text>
      </VStack>
    </Link>
  );
};

export default Coins;
