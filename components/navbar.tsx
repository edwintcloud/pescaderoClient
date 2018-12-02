import { Dropdown, Menu, Image, DropdownDivider, Button, DropdownItem } from "semantic-ui-react";

export const NavBar = props => (
  <Menu secondary className="navbar">
    <Menu.Item header>Project Pescadero</Menu.Item>
    {props.user && (
      <Dropdown icon={null} simple className="right" direction="left" trigger={(<Image avatar src={props.user.avatar} />)}>
      <Dropdown.Menu>
        <Dropdown.Header><Image avatar src={props.user.avatar} /><span>{props.user.firstName}</span></Dropdown.Header>
        <DropdownDivider />
        <Button negative>Logout</Button>
      </Dropdown.Menu>
    </Dropdown>
    )}  
  </Menu>
);
