import { Dropdown, Menu } from "semantic-ui-react";
export const NavBar = props => (
  <Menu secondary className="navbar">
    <Menu.Item header>Project Pescadero</Menu.Item>
    <Dropdown item className="right">
      <Dropdown.Menu>
        <Dropdown.Header>firsName</Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu>
);
