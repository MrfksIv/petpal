/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const upsertUserAccount = /* GraphQL */ `
  mutation UpsertUserAccount($input: UserAccountInput) {
    upsertUserAccount(input: $input) {
      email
      fullName
      username
      mobile
      countryCity
      fullAddress
      petpalUid
      petParentUid
      dateCreated
      dateUpdated
    }
  }
`;
export const putPets = /* GraphQL */ `
  mutation PutPets($input: [PetInput]) {
    putPets(input: $input) {
      email
      uuid
      animalType
      name
      description
      yearBorn
    }
  }
`;
