import {
  Dropdown,
  Menu,
  Image,
  DropdownDivider,
  Button,
  Message
} from "semantic-ui-react";

export const NavBar = props => (
  <Menu secondary className="navbar">
    <Menu.Item header>Project Pescadero</Menu.Item>
    {props.messageVisible && (
      <Message
        onDismiss={props.dismissMessage}
        className="map_tip"
        header="Getting Started"
        content="Click on the map to create a new issue at that location."
        floating
        color="blue"
      />
    )}
    {props.user && (
      <Dropdown
        icon={null}
        simple
        className="right"
        direction="left"
        trigger={
          (props.user.avatar && <Image avatar src={props.user.avatar} />) || (
            <Image avatar src="https://via.placeholder.com/100" />
          )
        }
      >
        <Dropdown.Menu>
          <Dropdown.Header>
            {(props.user.avatar && (
              <Image avatar src={props.user.avatar} />
            )) || <Image avatar src="https://via.placeholder.com/100" />}
            <div className="right_flex">
            <span>{props.user.firstName}</span>
            <input id="avatar" name="avatar" type="file" className="file" accept=".png,.jpg,.jpeg" onChange={props.fileChanged}></input>
            <label htmlFor="avatar" className="file">Change Avatar</label>
            
            </div>
          </Dropdown.Header>
          <DropdownDivider />
          <Button negative onClick={props.logoutClick}>
            Logout
          </Button>
        </Dropdown.Menu>
      </Dropdown>
    )}
  </Menu>
);
