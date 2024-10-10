import { gql } from '@apollo/client';

export const GetAllRepos = gql`
	query GetAllRepos($langs: [Int!], $status: String) {
		repos(langs: $langs, status: $status) {
			id
			name
			url
			comments {
				createdAt
				content
			}
			langs {
				id
				label
			}
			status {
				label
			}
		}
	}
`;

export const GetRepoDetails = gql`
	query GetRepoDetails($id: String!) {
		repo(id: $id) {
			id
			name
			url
			status {
				label
			}
			langs {
				label
			}
			comments {
				id
				content
				createdAt
			}
		}
	}
`;
