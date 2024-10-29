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

export const GET_REPO_DETAILS = gql`
  query GetRepoDetails($id: String!) {
    repo(id: $id) {
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
