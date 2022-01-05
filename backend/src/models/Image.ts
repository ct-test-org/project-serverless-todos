export interface Image {
  userId: string; // partition key, so we can get all images by userId
  timestamp: string; // sort key, together these 2 uniquely identify an item, the composite key
  imageId: string;
  title: string;
  imageUrl: string;
}

// composite keys all use to perform queries, that can be used to get a subset of items all from the same data partition
