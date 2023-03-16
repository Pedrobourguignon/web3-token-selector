import { useTokens } from "@/hooks";
import { ISelectedCoin, IToken } from "@/types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoIosSearch, IoMdArrowDown } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import { TokensOptions } from "@/components";

interface ITokenSelector {
  isOpen: boolean;
  onClose: () => void;
  setToken: React.Dispatch<React.SetStateAction<ISelectedCoin>>;
}

export const TokenSelector: React.FC<ITokenSelector> = ({
  isOpen,
  onClose,
  setToken,
}) => {
  const perPage = 20;
  const [loadedTokens, setLoadedTokens] = useState<IToken[]>([]);
  const [lastObjectPosition, setLastObjectPosition] = useState(20);
  const { filteredTokens, listOfTokens, handleSearchToken, setFilteredTokens } =
    useTokens();

  useEffect(() => {
    setLoadedTokens(filteredTokens.slice(0, 20));
  }, [filteredTokens]);

  const handleOnClose = () => {
    setFilteredTokens(listOfTokens);
    setLoadedTokens(filteredTokens.slice(0, 20));
    onClose();
  };

  const handleOnClick = (name: string, logoURI: string) => {
    const chosedToken = {
      symbol: name,
      logo: logoURI,
    };
    setToken(chosedToken);
    handleOnClose();
  };

  const loadMoreTokens = () => {
    setLoadedTokens((prevState) =>
      prevState.concat(
        filteredTokens.slice(lastObjectPosition, lastObjectPosition + perPage)
      )
    );
    setLastObjectPosition(lastObjectPosition + perPage);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent
        bg="white"
        borderColor="black"
        borderRadius="base"
        borderWidth="0.1rem"
      >
        <ModalHeader color="black">Select a coin</ModalHeader>
        <Flex w="100%" justify="center" px="6">
          <InputGroup>
            <InputLeftElement>
              <Icon as={IoIosSearch} boxSize="5" color="gray.500" />
            </InputLeftElement>
            <Input
              color="gray.500"
              borderColor="gray.300"
              borderRadius="full"
              onChange={(event) =>
                handleSearchToken(event.target.value, listOfTokens)
              }
              _placeholder={{ color: "gray.500" }}
              placeholder="Search name "
              w="100%"
            />
          </InputGroup>
        </Flex>
        <ModalCloseButton color="gray.400" />
        <ModalBody>
          <Flex align="center" gap="2">
            <Text color="black">Token name</Text>
            <Icon boxSize="5" color="blue.400" as={IoMdArrowDown} />
          </Flex>
          <Flex
            direction="column"
            id="scrollableDiv"
            h="xs"
            overflow="auto"
            gap="2"
            sx={{
              "&::-webkit-scrollbar": {
                width: "2",
                borderRadius: "md",
                backgroundColor: "blackAlpha.50",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "blackAlpha.200",
                height: "20",
                borderRadius: "md",
              },
              px: "1",
            }}
          >
            <InfiniteScroll
              dataLength={loadedTokens.length}
              next={() => loadMoreTokens()}
              hasMore={lastObjectPosition < listOfTokens.length}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >
              {loadedTokens.map((token, index) => (
                <TokensOptions
                  key={+index}
                  token={token}
                  onClick={() =>
                    handleOnClick(token.symbol.toLowerCase(), token.logoURI)
                  }
                />
              ))}
            </InfiniteScroll>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
