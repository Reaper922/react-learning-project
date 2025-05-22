import ListItem from "./list-item";

function ListComponent() {
  const navigation = [
    {
      name: "Home",
      link: "/",
      icon: "house",
    },
    {
      name: "Contact",
      link: "/contact",
      icon: "person",
    },
    {
      name: "Shop",
      link: "/shop",
      icon: "shoppingbag",
    },
    {
      name: "Sonstiges",
      link: "/sontiges",
      icon: "anderes",
    },
  ];

  return (
    <ul>
      {navigation.map((navlink) => (
        <ListItem navlink={navlink} key={navlink.name} />
      ))}
    </ul>
  );
}

export default ListComponent;
