import axios from "axios";
import { profile } from "@/config/profile";

const HASHNODE_GQL_ENDPOINT = "https://gql.hashnode.com";

export interface HashnodePost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  coverImage: {
    url: string;
  } | null;
  publishedAt: string;
  readTimeInMinutes: number;
  views: number;
  reactionCount: number;
  responseCount: number;
  content?: {
    markdown: string;
    html: string;
  };
}

export const getHashnodePosts = async (): Promise<HashnodePost[]> => {
  const query = `
    query Publication($host: String!) {
      publication(host: $host) {
        posts(first: 20) {
          edges {
            node {
              id
              title
              brief
              slug
              coverImage {
                url
              }
              publishedAt
              readTimeInMinutes
              views
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(HASHNODE_GQL_ENDPOINT, {
      query,
      variables: {
        host: (profile as any).hashnodeHost || "pankajkry.hashnode.dev",
      },
    });

    return response.data.data.publication.posts.edges.map(
      (edge: { node: HashnodePost }) => edge.node
    );
  } catch (error) {
    console.error("Error fetching Hashnode posts:", error);
    return [];
  }
};

export const getHashnodePost = async (slug: string): Promise<HashnodePost | null> => {
  const query = `
    query Post($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          id
          title
          brief
          slug
          content {
            markdown
            html
          }
          coverImage {
            url
          }
          publishedAt
          readTimeInMinutes
          views
          reactionCount
          responseCount
        }
      }
    }
  `;

  try {
    const response = await axios.post(HASHNODE_GQL_ENDPOINT, {
      query,
      variables: {
        host: (profile as any).hashnodeHost || "pankajkry.hashnode.dev",
        slug,
      },
    });

    return response.data.data.publication.post;
  } catch (error) {
    console.error("Error fetching Hashnode post:", error);
    return null;
  }
};
