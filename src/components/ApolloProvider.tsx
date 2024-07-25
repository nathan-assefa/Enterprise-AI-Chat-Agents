"use client";

import { ApolloProvider } from "@apollo/client";
import React from "react";
import client from "../../graphql/apollo-client";

type ApolloProviderContainerType = {
  children: React.ReactNode;
};

const ApolloProviderContainer: React.FC<ApolloProviderContainerType> = ({
  children,
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderContainer;
