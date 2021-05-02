import * as uuid from 'uuid';
import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      // The attributes of the item to be created
      userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
      goatId: uuid.v1(), // A unique uuid
      goatName: data.goatName, // Parsed from request body
      breed: data.breed, // Parsed from request body
      profileImage: data.profileImage,
      goatStatus: data.goatStatus,
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
