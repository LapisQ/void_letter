export interface Post {
  id: string;

  title: string;

  to: string;

  from: string;

  content: string;

  mood:
    | "Love"
    | "Heartbreak"
    | "Hope"
    | "Friendship"
    | "Regret"
    | "Philosophy"
    | "Family"
    | "Dreams"
    | "Goodbye"
    | "Other";

  visibility: "Public" | "Anonymous";

  country: string;

  createdAt: string;

  likes: number;

  views: number;

  readTime: number;

  featured: boolean;
}