import { Menu } from "@/lib/types";
import EmptyList from "./components/EmptyList/EmptyList";
import MenusList from "./components/MenusList/MenusList";

const menusList: Menu[] = [
  {
    name: 'Promocje',
    url: 'https://rc32141.redcart.pl/promocje',
  },
  {
    name: 'Promocje2',
    url: 'https://rc32141.redcart.pl/promocje2',
  },
];

export default function Home() {
  return (
    <div className="container">
      {
        menusList.length > 0 ?
          <div className="main--content">
            <MenusList menus={menusList} />
          </div>
          :
          <EmptyList />
      }
    </div>
  );
}
