export type RecycleRequest = {
  id: string | number;

  title: string;
  description: string;
  image: string;
  tags: string[];

  status: "pending" | "completed" | "rejected";

  createdAt: string;
  updatedAt: string;
  completedAt?: string;
};
