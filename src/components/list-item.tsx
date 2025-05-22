type NavigationLink = {
  name: string;
  link: string;
  icon: string;
};

// Typ für die Component Properties, die in die Component reingereicht werden sollen
type ListItemProps = {
  navlink: NavigationLink;
};

// Über destructuring wird das navlink Object aus den Properties geholt
function ListItem({ navlink }: ListItemProps) {
  return (
    <li>
      {navlink.name}
      <br />
      {navlink.icon}
      <br />
      {navlink.link}
      <br />
      <a href={navlink.link}>Click here</a>
    </li>
  );
}

export default ListItem;
