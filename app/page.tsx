'use client'
import EmptyList from "../components/EmptyList/EmptyList";
import MenusList from "../components/MenusList/MenusList";
import AddButton from "../components/AddButton/AddButton";
import { useMenus } from "@/context/MenusContext";
import AddForm from "@/components/AddForm/AddForm";
import { useState } from "react";

export default function Home() {
  const { menusList } = useMenus();
  const [addMenuFormVisibility, setAddMenuFormVisibility] = useState(false);

  return (
    <div className="container">
      {
        menusList.length > 0 ?
          <div className="main--content">
            <MenusList menus={menusList} />
            {addMenuFormVisibility &&
              <AddForm setAddMenuFormVisibility={setAddMenuFormVisibility} />}
            <AddButton setAddMenuFormVisibility={setAddMenuFormVisibility} />
          </div>
          :
          <>
            <EmptyList setAddMenuFormVisibility={setAddMenuFormVisibility} />
            {addMenuFormVisibility &&
              <AddForm setAddMenuFormVisibility={setAddMenuFormVisibility} />}
          </>
      }
    </div>
  );
}
