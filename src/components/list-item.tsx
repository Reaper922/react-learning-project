type NavigationLink = {
  name: string;
  link: string;
  icon: string;
};

type ListItemProps = {
  navlink: NavigationLink;
};

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
