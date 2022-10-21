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

export type Recyclable = {
  id: string | number;

  material: string;
  name: string;
  tags: string[];

  description: string;
  recyclable: boolean;
};

export type CollectionBooking = {
  id: string;

  name: string;
  email: string;
  contactNo: string;

  address: string;
  postalCode: string;
  pickupDate: string;

  image: string;
  description: string;
};
