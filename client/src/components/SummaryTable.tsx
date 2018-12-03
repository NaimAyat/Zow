import * as React from "react";
import { Checkbox, Table, Rating } from "semantic-ui-react";
import { IQuestion, IResponse } from "../DataTypes";
import { IRow } from "./SummaryPage";

interface ISummaryTableProps {
  questions: IQuestion[];
  responses: IResponse[];
  getToggleChecked: any;
  rows: IRow[];
  statuses: string[];
}

class SummaryTable extends React.Component<ISummaryTableProps> {
  public getStatusCell(index: number) {
    switch (this.props.statuses[index]) {
      case "Pending":
        return <Table.Cell warning content="Pending" />;
      case "Approved":
        return <Table.Cell positive content="Approved" />;
      case "Rejected":
        return <Table.Cell negative content="Rejected" />;
      default:
        return <Table.Cell content="No Status" />;
    }
  }
  public getScoreCell(index: number) {
    const response = this.props.responses[index];
    const score = this.getScore(response);
    if (isNaN(score)) {
      return <Table.Cell content="No Scores" key={index} />;
    } else {
      return (
        <Table.Cell key={index}>
          <Rating defaultRating={score} maxRating={5} disabled />
        </Table.Cell>
      );
    }
  }
  public getScore(response: IResponse): number {
    if (!response.scoring) {
      return NaN;
    }
    let total = 0;
    let count = 0;
    for (const score of response.scoring) {
      total += score.score;
      count += 1;
    }
    return total / count;
  }

  public render() {
    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing>
              {this.props.children}
            </Table.HeaderCell>
            {this.props.questions.map(question => (
              <Table.HeaderCell content={question.prompt} />
            ))}
            <Table.HeaderCell>Average Score</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.rows.map((row, index) => (
            <Table.Row selectable>
              <Table.Cell textAlign="center" verticalAlign="middle">
                <Checkbox
                  checked={this.props.rows[index].checked}
                  onChange={this.props.getToggleChecked(index)}
                />
              </Table.Cell>
              {this.props.responses[row.responseIndex].answers.map(answer => (
                <Table.Cell content={answer.value} />
              ))}
              {this.getScoreCell(index)}
              {this.getStatusCell(index)}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default SummaryTable;
