import React from "react";
import {
  Menu,
  Button,
  Card,
  Image,
  Icon
} from "semantic-ui-react";

export const Issues = props => (
  <>
  {props.user && (<>
    <div className="issues_header">
      <span className="ui huge header mx-3 mr-4">Issues</span>
      <span className="ui tiny header">{props.openIssues} Open issues. {props.resolvedIssues} Resolved.</span>
      <Menu pointing secondary>
        <Menu.Item
          name="all"
          active={props.activeNav === "all"}
          onClick={props.navOnClick}
        />
        <Menu.Item
          name="open"
          active={props.activeNav === "open"}
          onClick={props.navOnClick}
        />
        <Menu.Item
          name="resolved"
          active={props.activeNav === "resolved"}
          onClick={props.navOnClick}
        />
      </Menu>
    </div>
    <div className="issues_cards cards ui">
      {props.issues.map((issue, index) => (
        <Card fluid key={index}>
          <Card.Content>
            <Image
              floated="right"
              size="mini"
              src={issue.author.avatar}
              circular
            />
            <Card.Header>{issue.title}</Card.Header>
            <Card.Meta>by: {issue.author.firstName}</Card.Meta>
            <Card.Description>{issue.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui buttons right floated">
              <Button animated="vertical" negative>
                <Button.Content hidden>Delete</Button.Content>
                <Button.Content visible>
                  <Icon name="trash" />
                </Button.Content>
              </Button>
              <Button animated="vertical" primary>
                <Button.Content hidden>Edit</Button.Content>
                <Button.Content visible>
                  <Icon name="pencil" />
                </Button.Content>
              </Button>
              <Button positive>Resolve</Button>
            </div>
          </Card.Content>
        </Card>
      ))}
    </div>
  </>)}
    
  </>
);
