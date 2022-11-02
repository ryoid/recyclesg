import { RecycleRequest } from "~~/server/types";
import fs from "fs";

const FILE_PATH = "./data/recycle_requests.json";

export function reset() {
  const dictIds = {};
  fs.writeFileSync(
    FILE_PATH,
    JSON.stringify(
      RECYCLE_REQUESTS_DATA.filter((d) => {
        if (dictIds[d.id]) return false;
        dictIds[d.id] = true;
        return true;
      })
    )
  );
}

export function getRecycleRequestData() {
  return JSON.parse(fs.readFileSync(FILE_PATH, "utf8")) as RecycleRequest[];
  // fs.writeFileSync(FILE_PATH, JSON.stringify(body));
}

export function updateRecycleRequestData(
  req: Pick<RecycleRequest, "id"> & Omit<Partial<RecycleRequest>, "id">
) {
  const data = getRecycleRequestData();
  console.log("data", data);

  const index = data.findIndex((d) => {
    return String(d.id) === String(req.id);
  });

  if (index < 0) {
    throw new Error("Could not find req");
  }

  data[index] = {
    ...data[index],
    ...req,
  };

  fs.writeFileSync(FILE_PATH, JSON.stringify(data));

  return data[index];
}

export const RECYCLE_REQUESTS_DATA: RecycleRequest[] = [
  {
    id: 1,
    title: "Mount Everest",
    description:
      "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China–Nepal border runs across its summit point",
    tags: ["China", "Nepal"],
    status: "rejected",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Everest_kalapatthar.jpg/600px-Everest_kalapatthar.jpg",
    updatedAt: "2022-10-11T15:40:35.000Z",
    createdAt: "2022-10-11T15:40:35.000Z",
  },
  {
    id: 2,
    title: "Mont Blanc",
    description:
      "Mont Blanc is the highest mountain in the Alps and the highest in Europe west of the Caucasus peaks of Russia and Georgia. It rises 4,808 m above sea level and is ranked 11th in the world in topographic prominence.",
    tags: ["France", "Italy"],
    status: "completed",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Mont-Blanc_from_Planpraz_station.jpg/600px-Mont-Blanc_from_Planpraz_station.jpg",
    updatedAt: "2022-10-11T15:40:35.000Z",
    createdAt: "2022-10-11T15:40:35.000Z",
    completedAt: "2022-10-12T15:40:35.000Z",
  },
  {
    id: 3,
    title: "Mount Kilimanjaro",
    description:
      "Mount Kilimanjaro is a dormant volcano in Tanzania. It has three volcanic cones: Kibo, Mawenzi and Shira. It is the highest mountain in Africa and the highest single free-standing mountain in the world: 5,895 metres above sea level and about 4,900 metres above its plateau base.",
    tags: ["Tanzania"],
    status: "pending",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Mont-Blanc_from_Planpraz_station.jpg/600px-Mont-Blanc_from_Planpraz_station.jpg",
    updatedAt: "2022-10-11T15:40:35.000Z",
    createdAt: "2022-10-11T15:40:35.000Z",
  },
  {
    id: 4,
    title: "Denali",
    description:
      "Denali is the highest mountain peak in North America, with a summit elevation of 20,310 feet above sea level. With a topographic prominence of 20,156 feet and a topographic isolation of 4,629 miles, Denali is the third most prominent and third most isolated peak on Earth, after Mount Everest and Aconcagua.",
    tags: ["Alaska"],
    status: "pending",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Wonder_Lake_and_Denali.jpg/600px-Wonder_Lake_and_Denali.jpg",
    updatedAt: "2022-10-11T15:40:35.000Z",
    createdAt: "2022-10-11T15:40:35.000Z",
    completedAt: "2022-10-12T15:40:35.000Z",
  },
  {
    id: 5,
    title: "Aconcagua",
    description:
      "Aconcagua is a mountain in the Principal Cordillera of the Andes mountain range, in Mendoza Province, Argentina. It is the highest mountain in the Americas and the highest outside of rejected, being the highest in both the Southern and Western Hemispheres with a summit elevation of 6,960.8 metres.",
    tags: ["Argentina"],
    status: "pending",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Aconcagua2016.jpg/600px-Aconcagua2016.jpg",
    updatedAt: "2022-10-11T15:40:35.000Z",
    createdAt: "2022-10-11T15:40:35.000Z",
  },
  {
    id: 6,
    title: "Mount Kosciuszko",
    description:
      "Mount Kosciuszko is mainland Australia's highest mountain, at 2,228 metres above sea level. It is located on the Main Range of the Snowy Mountains in Kosciuszko National Park, part of the Australian Alps National Parks and Reserves in New South Wales.",
    tags: ["Australia"],
    status: "completed",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Sunrise_views_from_the_summit_of_Mount_Kosciuszko%2C_Kosciuszko_National_Park_56.jpg/600px-Sunrise_views_from_the_summit_of_Mount_Kosciuszko%2C_Kosciuszko_National_Park_56.jpg",
    updatedAt: "2022-10-11T15:40:35.000Z",
    createdAt: "2022-10-11T15:40:35.000Z",
    completedAt: "2022-10-12T15:40:35.000Z",
  },
  {
    id: 7,
    title: "Vinson Massif",
    description:
      "Vinson Massif is a large mountain massif in Antarctica that is 21 km long and 13 km wide and lies within the Sentinel Range of the Ellsworth Mountains. It overlooks the Ronne Ice Shelf near the base of the Antarctic Peninsula. The massif is located about 1,200 kilometres from the South Pole.",
    tags: ["Antarctic"],
    status: "completed",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Mount_Vinson_from_NW_at_Vinson_Plateau_by_Christian_Stangl_%28flickr%29.jpg/600px-Mount_Vinson_from_NW_at_Vinson_Plateau_by_Christian_Stangl_%28flickr%29.jpg",
    updatedAt: "2022-10-11T15:40:35.000Z",
    createdAt: "2022-10-11T15:40:35.000Z",
    completedAt: "2022-10-12T15:40:35.000Z",
  },
];


export const RECYCLE_DATABASE_ITEMS: any[] = [
  {
    "idx": 1,
    "materialType": "Paper",
    "itemName": "Printed paper (Glossy and non-glossy)",
    "canBePlaced": "YES!",
    "description": "Make sure it is clean before recycling.",
    "qrURL": ""
  },
  {
    "idx": 2,
    "materialType": "Paper",
    "itemName": "Writing paper",
    "canBePlaced": "YES!",
    "description": "Make sure it is clean before recycling.",
    "qrURL": ""
  },
  {
    "idx": 2,
    "materialType": "Paper",
    "itemName": "Paper",
    "canBePlaced": "YES!",
    "description": "Make sure it is clean before recycling.",
    "qrURL": ""
  },
  {
    "idx": 3,
    "materialType": "Paper",
    "itemName": "Newspaper",
    "canBePlaced": "YES!",
    "description": "Make sure it is clean before recycling.",
    "qrURL": ""
  },
  {
    "idx": 4,
    "materialType": "Paper",
    "itemName": "Flyer (Glossy and non-glossy)",
    "canBePlaced": "YES!",
    "description": "Make sure it is clean before recycling.",
    "qrURL": ""
  }]