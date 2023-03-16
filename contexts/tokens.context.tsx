import { OneInchService } from "@/services";
import { IToken } from "@/types";
import debounce from "lodash.debounce";
import React, { createContext, useEffect, useMemo, useState } from "react";

interface ITokensContext {
  setFilteredTokens: (tokens: IToken[]) => void;
  filteredTokens: IToken[];
  handleSearchToken: (event: string, listOfTokens: IToken[]) => void;
  listOfTokens: IToken[];
}
export const TokensContext = createContext({} as ITokensContext);

export const TokensProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [listOfTokens, setListOfTokens] = useState<IToken[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<IToken[]>([]);

  const getOneInchTokens = async () => {
    try {
      const allTokens = await OneInchService.allTokensData();
      const oneInchResult: IToken[] = Object.keys(allTokens.tokens).map(
        (item) => ({
          ...allTokens.tokens[item],
        })
      );
      oneInchResult.sort((coinA, coinB) =>
        coinA.symbol >= coinB.symbol ? 1 : -1
      );
      setListOfTokens(oneInchResult);
      setFilteredTokens(oneInchResult);
      return listOfTokens;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOneInchTokens();
  }, []);

  const handleSearchToken = debounce(
    (searchValue: string, tokens: IToken[]) => {
      if (!searchValue) {
        setFilteredTokens(tokens);
        return;
      }
      const newFilter = tokens.filter((token) => {
        const rgx = new RegExp(searchValue, "gi");

        return (
          rgx.test(token.symbol) ||
          rgx.test(token.name) ||
          rgx.test(token.address)
        );
      });
      setFilteredTokens(newFilter);
    },
    250
  );

  const contextStates = useMemo(
    () => ({
      setFilteredTokens,
      filteredTokens,
      handleSearchToken,
      listOfTokens,
    }),
    [setFilteredTokens, filteredTokens, handleSearchToken, listOfTokens]
  );

  return (
    <TokensContext.Provider value={contextStates}>
      {children}
    </TokensContext.Provider>
  );
};
