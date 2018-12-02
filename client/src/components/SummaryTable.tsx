import * as React from "react";
import { Checkbox, Table } from "semantic-ui-react";
import { IQuestion, IResponse, IScore } from "../DataTypes";
import { IRow } from "./SummaryPage";

interface ISummaryTableProps {
  questions: IQuestion[];
  responses: IResponse[];
  scores: IScore[];
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
              {this.getStatusCell(index)}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default SummaryTable;
