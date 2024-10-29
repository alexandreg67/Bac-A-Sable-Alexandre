import { gql } from "@apollo/client";

export const GET_REPOS = gql`
  query GetRepos {
    repos {
      id
      name
      url
      isPrivate
      status {
        id
        label
      }
      langs {
        id
        label
      }
    }
  }
`;
