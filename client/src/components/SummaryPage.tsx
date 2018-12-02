import * as React from "react";
import { Button, Divider } from "semantic-ui-react";
import SummaryTable from "./SummaryTable";
import { IFilter, IResponse, IQuestion, IScore } from "../DataTypes";
import Filter from "./Filter";
import Page from "./Page";
import { Link } from "react-router-dom";

interface IProps {
  form: {
    name: string;
    responses: IResponse[];
    questions: IQuestion[];
    scores: IScore[];
  };
  id: string;
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
  }

  public componentWillReceiveProps(props: IProps) {
    // const rows = {};
    // props.form.responses.forEach(
    //   (response: IResponse) =>
    //     (rows[response.email] =
    //       rows[response.email] !== undefined
    //         ? rows[response.email]
    //         : { checked: true, status: response.status })
    // );
    // this.setState({ rows });
  }

  public getToggleChecked(index: number) {
    return () => {
      const rows = [...this.state.rows];
      rows[index].checked = !rows[index].checked;
      this.setState({ rows });
    };
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
          onClick={() => this.getCheckAll(true)}
        />
        <Button
          icon="minus square"
          content="Deselect All"
          onClick={() => this.getCheckAll(false)}
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

  public setFilters(filters: IFilter[]) {
    this.setState({ filters }, () => {
      this.setFilteredRows();
    });
  }

  public render() {
    return (
      <Page header={"Summary: " + this.props.form.name}>
        <Divider hidden />
        <Filter
          filters={this.state.filters}
          questions={this.props.form.questions}
          setFilters={this.setFilters}
        />
        <Divider hidden />
        <this.ButtonRow />
        <SummaryTable
          questions={this.props.form.questions}
          responses={this.props.form.responses}
          scores={this.props.form.scores}
          getToggleChecked={this.getToggleChecked}
          rows={this.state.rows}
          statuses={this.state.statuses}
        />
      </Page>
    );
  }
}

export default SummaryPage;
