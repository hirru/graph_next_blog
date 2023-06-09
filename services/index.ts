import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query Assets {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result: any = await request(graphqlAPI!, query);

  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
      query getPostDetails() {
        posts(
            orderBy: createdAt_ASC
            last: 3
        ){
            title
            featuredImage {
                url
            }
            createdAt
            slug
        }
      }
    `;

  const result: any = await request(graphqlAPI!, query);

  return result.posts;
};

export const getSimilarPosts = async (categories: any, slug: any) => {
    const query = gql`
      query GetPostDetails($slug: String!, $categories: [String!]) {
        posts(
          where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
          last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
    const result: any = await request(graphqlAPI!, query, { slug, categories });
  
    return result.posts;
  };

export const getCategories = async () => {
  const query = gql`
      query getCategories {
        categories {
            name
            slug
        }
      }
    `;

  const result: any = await request(graphqlAPI!, query);

  return result.categories;
};

export const getPostDetails = async (slug: any) => {
    const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;
  
    const result: any = await request(graphqlAPI!, query, { slug });
  
    return result.post;
  };

  export const submitComment = async (obj: any) => {
    const result = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
    })

    return result.json();
    
  }

  export const getComments = async (slug) => {
    const query = gql`
        query getComments($slug: String!) {
          comments (where: { post: {slug: $slug}}) {
            name
            createdAt
            comment
          }
        }
      `;
  
    const result: any = await request(graphqlAPI!, query, { slug });
  
    return result.comments;
  };
