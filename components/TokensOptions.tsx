import { IToken } from "@/types";
import { Flex, Button, Img, Text } from "@chakra-ui/react";

interface ITokenOption {
  token: IToken;
  onClick: () => void;
}

export const TokensOptions: React.FC<ITokenOption> = ({ onClick, token }) => {
  return (
    <Flex>
      <Button
        w="100%"
        id={token.address}
        value={token.symbol}
        onClick={onClick}
        bg="white"
        borderRadius="base"
      >
        <Flex align="center" gap="2" w="100%">
          <Img src={token.logoURI} w="6" h="6" />
          <Text color="black"> {token.symbol}</Text>
        </Flex>
      </Button>
    </Flex>
  );
};
