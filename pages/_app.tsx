import { TokensProvider } from "@/contexts";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TokensProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </TokensProvider>
  );
}
