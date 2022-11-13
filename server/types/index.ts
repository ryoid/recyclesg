export type RecycleRequest = {
  id: string | number;

  title: string;
  description: string;
  image: string;
  email?: string;
  tags: string[];

  status: "pending" | "completed" | "rejected";

  email: string;

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

export type Annotation = {
  locations: any[];
  properties: any[];
  mid: string;
  locale: string;
  description: string;
  score: number;
  confidence: number;
  topicality: number;
  boundingPoly: null;
};

const CollectionBooking = {
  id: "1",
  name: "Ryan",
  email: "ryanjconceicao@gmail.com",
  contactNo: "12345678",

  address: "123D Pasir Ris Drive 4",
  postalCode: "123456",

  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Aconcagua2016.jpg/600px-Aconcagua2016.jpg",
  pickupDate: "2022-12-12T13:43:34.077Z",
};
