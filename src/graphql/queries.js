/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserAccount = /* GraphQL */ `
  query GetUserAccount {
    getUserAccount {
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
export const userAccount = /* GraphQL */ `
  query UserAccount {
    UserAccount {
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
export const getLambda = /* GraphQL */ `
  query GetLambda {
    getLambda {
      statusCode
      header
      body
      fakefield
    }
  }
`;
export const getSignedUrlForPhotoUpload = /* GraphQL */ `
  query GetSignedUrlForPhotoUpload($input: PhotoUploadInput) {
    getSignedUrlForPhotoUpload(input: $input) {
      url
      s3Key
    }
  }
`;
export const getSignedUrlForPhotoUpload2 = /* GraphQL */ `
  query GetSignedUrlForPhotoUpload2($input: PhotoUploadInput) {
    getSignedUrlForPhotoUpload2(input: $input) {
      url
      s3Key
    }
  }
`;
export const getOwnProfilePhoto = /* GraphQL */ `
  query GetOwnProfilePhoto {
    getOwnProfilePhoto {
      url
      s3Key
    }
  }
`;
export const getSignedUrlForAnimalPhotoUpload = /* GraphQL */ `
  query GetSignedUrlForAnimalPhotoUpload($input: AnimalPhotoUploadInput) {
    getSignedUrlForAnimalPhotoUpload(input: $input) {
      url
      s3Key
    }
  }
`;
export const getPetsOfLoggedInUser = /* GraphQL */ `
  query GetPetsOfLoggedInUser {
    getPetsOfLoggedInUser {
      email
      uuid
      animalType
      name
      description
      yearBorn
    }
  }
`;
export const getPetsByOwnerEmail = /* GraphQL */ `
  query GetPetsByOwnerEmail($input: EmailInput) {
    getPetsByOwnerEmail(input: $input) {
      email
      uuid
      animalType
      name
      description
      yearBorn
    }
  }
`;
