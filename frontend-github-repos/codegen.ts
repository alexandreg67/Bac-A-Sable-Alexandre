import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "src/**/*.ts",
  generates: {
    "src/generated/graphql-type.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        scalars: {
          DateTimeISO: "string",
        },
      },
    },
  },
};

export default config;
