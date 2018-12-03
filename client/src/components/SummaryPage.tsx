import * as React from "react";
import { Button, Header, ButtonGroup, Grid, Label } from "semantic-ui-react";
import SummaryTable from "./SummaryTable";
import { IFilter, IResponse, IQuestion } from "../DataTypes";
import Filter from "./Filter";
import Page from "./Page";
import { Link } from "react-router-dom";
import { History } from "history";

interface IProps {
  form: {
    name: string;
    responses: IResponse[];
    questions: IQuestion[];
    published: boolean;
  };
  id: string;
  history: History;
  offerInterview(userEmail: string): void;
}

export interface IRow {
  responseIndex: number;
  checked: boolean;
}

interface IState {
  filters: IFilter[];
  statuses: string[];
  rows: IRow[];
}

class SummaryPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const rows = this.props.form.responses.map((response, index) => ({
      checked: true,
      responseIndex: index
    }));
    const statuses = this.props.form.responses.map(() => "Pending");
    this.state = { filters: [], rows, statuses };
    this.getToggleChecked = this.getToggleChecked.bind(this);
    this.setFilters = this.setFilters.bind(this);
    this.onScore = this.onScore.bind(this);
    this.onInterview = this.onInterview.bind(this);
  }

  public componentWillReceiveProps(props: IProps) {
    const rows = props.form.responses.map((response, index) => ({
      checked: this.state.rows[index] ? this.state.rows[index].checked : true,
      responseIndex: index
    }));
    const statuses = props.form.responses.map((response, index) =>
      this.state.statuses[index] ? this.state.statuses[index] : "Pending"
    );
    this.setState({ rows, statuses });
  }

  public getToggleChecked(index: number) {
    return () => {
      const rows = [...this.state.rows];
      rows[index].checked = !rows[index].checked;
      this.setState({ rows });
    };
  }

  public onScore() {
    const selectedRowIDs = this.state.rows
      .filter(row => row.checked)
      .map(({ responseIndex }) => this.props.form.responses[responseIndex].id);
    if (selectedRowIDs.length > 0) {
      this.props.history.push(
        "/score/" + this.props.id + "/" + selectedRowIDs.join(",")
      );
    }
  }

  public onInterview() {
    const selectedRowEmails = this.state.rows
      .filter(row => row.checked)
      .map(
        ({ responseIndex }) => this.props.form.responses[responseIndex].email
      );
    selectedRowEmails.forEach(email => this.props.offerInterview(email));
  }

  public setFilteredRows() {
    let rows = [...this.props.form.responses].map((response, index) => ({
      checked: true,
      responseIndex: index
    }));
    for (const filter of this.state.filters) {
      let questionIndex = -1;
      this.props.form.questions.forEach((question, index) => {
        if (question.prompt === filter.prompt) {
          questionIndex = index;
        }
      });
      if (questionIndex < 0) {
        continue;
      }
      rows = rows.filter(row => {
        const answer = this.props.form.responses[row.responseIndex].answers[
          questionIndex
        ].value.toLowerCase();
        const search = filter.search.toLowerCase();
        switch (filter.type) {
          case "includes":
            return answer.includes(search);
          case "matches":
            return answer === search;
          case "greater than":
          case "less than":
            const answerNum = parseInt(answer, 10);
            const searchNum = parseInt(search, 10);
            return !isNaN(answerNum) &&
              !isNaN(searchNum) &&
              filter.type === "greater than"
              ? answerNum > searchNum
              : answerNum < searchNum;
        }
      });
    }
    this.setState({ rows });
  }

  public getCheckAll(shouldCheck: boolean) {
    const rows = [...this.state.rows];
    for (const row of rows) {
      row.checked = shouldCheck;
    }
    this.setState({ rows });
  }

  public getChangeStatus(status: string) {
    return () => {
      const rows = [...this.state.rows];
      for (const row of rows) {
        if (row.checked) {
          if (this.state.statuses[row.responseIndex] === status) {
            this.state.statuses[row.responseIndex] = "Pending";
          } else {
            this.state.statuses[row.responseIndex] = status;
          }
        }
      }
      this.setState({ rows });
    };
  }

  public ButtonRow = () => (
    <Grid columns={2}>
      <Grid.Column width={8} verticalAlign="bottom">
        <Button icon="star" content="Score" onClick={this.onScore} />
        <Button
          icon="calendar"
          content="Interview"
          onClick={this.onInterview}
        />
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
      </Grid.Column>
      <Grid.Column width={8}>
        <Filter
          filters={this.state.filters}
          questions={this.props.form.questions}
          setFilters={this.setFilters}
        />
      </Grid.Column>
    </Grid>
  );

  public setFilters(filters: IFilter[]) {
    this.setState({ filters }, () => {
      this.setFilteredRows();
    });
  }

  public render() {
    return (
      <Page header="Summary View">
        <Header as="h1">
          {this.props.form.name ? this.props.form.name : "[Untitled Form]"}
          &nbsp;&nbsp;&nbsp;
          {this.props.form.published ? (
            <Label color="blue" content="Published" tag />
          ) : (
            <Label content="Unpublished" tag />
          )}
        </Header>

        <div>
          <Link to={"/form-creation/" + this.props.id}>
            <Button icon="file alternate outline" primary content="Edit Form" />
          </Link>
          <Link to={"/form/" + this.props.id} target="_blank">
            <Button icon="linkify" content="Form Link" />
          </Link>
        </div>
        <this.ButtonRow />
        <SummaryTable
          questions={this.props.form.questions}
          responses={this.props.form.responses}
          getToggleChecked={this.getToggleChecked}
          rows={this.state.rows}
          statuses={this.state.statuses}
        >
          <ButtonGroup compact>
            <Button
              icon="check square"
              onClick={() => this.getCheckAll(true)}
            />
            <Button
              icon="minus square"
              onClick={() => this.getCheckAll(false)}
            />
          </ButtonGroup>
        </SummaryTable>
      </Page>
    );
  }
}

export default SummaryPage;
