import { TokenSelector } from "@/components";
import { ISelectedCoin } from "@/types";
import { Flex, Button, useDisclosure, Img, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedToken, setSelectedToken] = useState<ISelectedCoin>(
    {} as ISelectedCoin
  );
  console.log(selectedToken);
  return (
    <Flex align="center" justify="center" h="100vh">
      <TokenSelector
        isOpen={isOpen}
        onClose={onClose}
        setToken={setSelectedToken}
      />
      <Flex direction="column" justify="center" gap="8">
        <Flex direction="column" gap="2">
          <Text>Select a Token</Text>
          <Button onClick={onOpen}>Open Token Selector</Button>
        </Flex>
        {selectedToken.symbol ? (
          <Flex direction="column">
            <Text>Chosed Token</Text>
            <Flex
              gap="4"
              bg="whiteAlpha.400"
              align="center"
              px="2"
              py="2"
              borderRadius="base"
            >
              <Img src={selectedToken.logo} boxSize="6" />
              <Text color="black">{selectedToken.symbol}</Text>
            </Flex>
          </Flex>
        ) : (
          <Text>You haven't chosen a token yet</Text>
        )}
      </Flex>
    </Flex>
  );
}
