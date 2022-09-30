import { gql } from "@apollo/client";

const INFO_PERSON = gql`
  query ($page: Int, $name: String) {
    characters (page: $page, filter: { name: $name }) {
      results {
        name
        species
        gender
        image
      }
      info {
        count
        pages
      }
    }
  }
`;

export default INFO_PERSON;