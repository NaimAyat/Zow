import * as React from "react";
import { Button, Divider } from "semantic-ui-react";
import SummaryTable from "./SummaryTable";
import Page from "./Page";
import { Link } from "react-router-dom";
import { IResponse } from "src/DataTypes";

interface IRow {
  checked: boolean;
  status: string;
}

interface IProps {
  form: any;
  id: string;
}

interface ISummaryPageState {
  rows: { [email: string]: IRow };
}

class SummaryPage extends React.Component<IProps, ISummaryPageState> {
  constructor(props: IProps) {
    super(props);
    const rows = {};
    props.form.responses.forEach(
      (response: IResponse) =>
        (rows[response.email] = { checked: true, status: response.status })
    );
    this.state = { rows };
    this.getToggleChecked = this.getToggleChecked.bind(this);
  }

  public componentWillReceiveProps(props: IProps) {
    const rows = {};
    props.form.responses.forEach(
      (response: IResponse) =>
        (rows[response.email] =
          rows[response.email] !== undefined
            ? rows[response.email]
            : { checked: true, status: response.status })
    );
    this.setState({ rows });
  }

  public getToggleChecked(email: string) {
    return () => {
      const rows = { ...this.state.rows };
      rows[email].checked = !rows[email].checked;
      this.setState({ rows });
    };
  }

  public getCheckAll(shouldCheck: boolean) {
    return () => {
      const rows = { ...this.state.rows };
      Object.keys(rows).forEach(email => (rows[email].checked = shouldCheck));
      this.setState({ rows });
    };
  }

  public getChangeStatus(status: string) {
    return () => {
      const rows = { ...this.state.rows };
      Object.keys(rows).forEach(email => {
        if (rows[email].checked) {
          if (rows[email].status === status) {
            rows[email].status = "Pending";
          } else {
            rows[email].status = status;
          }
        }
      });
      this.setState({ rows });
    };
  }

  public ButtonRow = () => (
    <React.Fragment>
      <Link to={"/form-creation/" + this.props.id}>
        <Button primary>Edit Form</Button>
      </Link>
      <Link to={"/form/" + this.props.id} target="_blank">
        <Button>Form Link</Button>
      </Link>
      <Divider />
      <div style={{ float: "left", margin: "10px" }}>
        <Button
          icon="check square"
          content="Select All"
          onClick={this.getCheckAll(true)}
        />
        <Button
          icon="minus square"
          content="Deselect All"
          onClick={this.getCheckAll(false)}
        />
      </div>
      <div style={{ float: "right", margin: "10px" }}>
        <Button icon="mail" content="Email" />
        <Button icon="star" content="Score" />
        <Button icon="calendar" content="Interview" />
        <Button
          icon="check"
          content="Approve"
          color="green"
          onClick={this.getChangeStatus("Approved")}
        />
        <Button
          icon="x"
          content="Reject"
          color="red"
          onClick={this.getChangeStatus("Rejected")}
        />
      </div>
    </React.Fragment>
  );

  public render() {
    return (
      <Page header={"Summary: " + this.props.form.name}>
        <this.ButtonRow />
        <SummaryTable
          {...this.props.form}
          getToggleChecked={this.getToggleChecked}
          rows={this.state.rows}
        />
      </Page>
    );
  }
}

export default SummaryPage;
