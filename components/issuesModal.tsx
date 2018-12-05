import {
  Button,
  Icon,
  Modal,
  Header,
  Form
} from "semantic-ui-react";

export const IssuesModal = props => (
  <Modal open={props.open} className="issues_modal">
    <Header icon="pencil" content={props.title} />
    <Modal.Content>
      <Form>
        <Form.Input
          fluid
          label="Title"
          placeholder="Issue title"
          name="title"
          value={props.issueTitleValue}
          onChange={props.issueTitleValueChange}
          error={props.issueTitleValueError}
        />
        <Form.TextArea
          label="Description"
          placeholder="Issue description..."
          value={props.issueDescValue}
          name="description"
          onChange={props.issueDescValueChange}
          error={props.issueDescValueError}
        />
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button
        color="red"
        onClick={props.cancelClick}
      >
        <Icon name="remove" /> Cancel
      </Button>
      <Button
        color="green"
        disabled={
          props.issueDescValueError ||
          props.issueTitleValueError ||
          props.issueTitleValue === "" ||
          props.issueDescValue === ""
        }
        onClick={props.submitClick}
      >
        <Icon name="checkmark" /> Save
      </Button>
    </Modal.Actions>
  </Modal>
);
