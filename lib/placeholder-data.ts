import { Menu } from "./types";
import { v4 as uuidv4 } from "uuid";

const menus: Menu[] = [
  {
    id: uuidv4(),
    name: "Promocje",
    url: "https://rc32141.redcart.pl/promocje",
    children: [
      {
        id: uuidv4(),
        name: "test",
        url: "https://rc32141.redcart.pl/test",
        children: [
          {
            id: uuidv4(),
            name: "test - nested",
            url: "https://rc32141.redcart.pl/nested",
            children: [
              {
                id: uuidv4(),
                name: "test77",
                url: "https://rc32141.redcart.pl/test2",
              },
              {
                id: uuidv4(),
                name: "testx",
                url: "https://rc32141.redcart.pl/test2",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Promocje2",
    url: "https://rc32141.redcart.pl/promocje2",
  },
  {
    id: uuidv4(),
    name: "Promocje3",
    url: "https://rc32141.redcart.pl/promocje2",
    children: [
      {
        id: uuidv4(),
        name: "test",
        url: "https://rc32141.redcart.pl/test",
        children: [
          {
            id: uuidv4(),
            name: "test - nested",
            url: "https://rc32141.redcart.pl/nested",
          },
        ],
      },
    ],
  },
];

export default menus;
