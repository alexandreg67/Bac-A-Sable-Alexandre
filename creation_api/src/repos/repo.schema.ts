// export const typeDefsRepos = `#graphql
//   type Repo {
//     id: String!
//     name: String!
//     url: String!
//     status: Status
//     langs: [Lang]
//   }

//   type Status {
//     id: String!
//     label: String!
//   }

//   type Lang {
//     id: String!
//     label: String!
//   }

//   type Query {
//     repos(langs: [String], status: String): [Repo]
//     repo(id: String!): Repo
//   }

//   type Mutation {
//     addRepo(name: String!, url: String!, statusId: String!, langIds: [String]!): Repo
//     updateRepo(id: String!, name: String, url: String, statusId: String, langIds: [String]): Repo
//     deleteRepo(id: String!): String
//   }
// `;
