export const transformPost = (dbPost) => ({
  id: dbPost.id,
  title: dbPost.title,
  imageUrl: dbPost.image_Url,
  content: dbPost.content,
  publishedAt: dbPost.published_At,
});
