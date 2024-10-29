import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddRepoInput = {
  commentText?: InputMaybe<Scalars['String']['input']>;
  langIds: Array<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  statusId: Scalars['Float']['input'];
  url: Scalars['String']['input'];
};

export type Lang = {
  __typename?: 'Lang';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
  repos?: Maybe<Array<Repo>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addRepo: Repo;
  deleteRepo: Scalars['String']['output'];
};


export type MutationAddRepoArgs = {
  data: AddRepoInput;
};


export type MutationDeleteRepoArgs = {
  id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  repo: Repo;
  repos: Array<Repo>;
};


export type QueryRepoArgs = {
  id: Scalars['String']['input'];
};


export type QueryReposArgs = {
  langs?: InputMaybe<Array<Scalars['Int']['input']>>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type Repo = {
  __typename?: 'Repo';
  id: Scalars['String']['output'];
  isPrivate: Scalars['Boolean']['output'];
  langs: Array<Lang>;
  name: Scalars['String']['output'];
  status: Status;
  url: Scalars['String']['output'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
  repos?: Maybe<Array<Repo>>;
};

export type GetReposQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReposQuery = { __typename?: 'Query', repos: Array<{ __typename?: 'Repo', id: string, name: string, url: string, isPrivate: boolean, status: { __typename?: 'Status', id: number, label: string }, langs: Array<{ __typename?: 'Lang', id: number, label: string }> }> };


export const GetReposDocument = gql`
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

/**
 * __useGetReposQuery__
 *
 * To run a query within a React component, call `useGetReposQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReposQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReposQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReposQuery(baseOptions?: Apollo.QueryHookOptions<GetReposQuery, GetReposQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReposQuery, GetReposQueryVariables>(GetReposDocument, options);
      }
export function useGetReposLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReposQuery, GetReposQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReposQuery, GetReposQueryVariables>(GetReposDocument, options);
        }
export function useGetReposSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetReposQuery, GetReposQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReposQuery, GetReposQueryVariables>(GetReposDocument, options);
        }
export type GetReposQueryHookResult = ReturnType<typeof useGetReposQuery>;
export type GetReposLazyQueryHookResult = ReturnType<typeof useGetReposLazyQuery>;
export type GetReposSuspenseQueryHookResult = ReturnType<typeof useGetReposSuspenseQuery>;
export type GetReposQueryResult = Apollo.QueryResult<GetReposQuery, GetReposQueryVariables>;