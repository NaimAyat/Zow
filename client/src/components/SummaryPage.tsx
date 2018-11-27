import * as React from "react";
import { Button } from "semantic-ui-react";
import SampleData from "../SampleData";
import SummaryTable from "./SummaryTable";
import Page from "./Page";

interface IRow {
  checked: boolean;
  status: string;
}

interface ISummaryPageState {
  rows: { [email: string]: IRow };
}

class SummaryPage extends React.Component<{}, ISummaryPageState> {
  constructor(props: any) {
    super(props);
    const rows = {};
    SampleData.responses.forEach(
      response => (rows[response.email] = { checked: true, status: "Pending" })
    );
    this.state = { rows };
    this.getToggleChecked = this.getToggleChecked.bind(this);
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
      <Page header="Summary View">
        <this.ButtonRow />
        <SummaryTable
          {...SampleData}
          getToggleChecked={this.getToggleChecked}
          rows={this.state.rows}
        />
      </Page>
    );
  }
}

export default SummaryPage;
