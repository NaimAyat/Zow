import * as React from "react";
import { Checkbox, Table } from "semantic-ui-react";
import { IQuestion, IResponse, IScore } from "../DataTypes";

interface ISummaryTableProps {
  questions: IQuestion[];
  responses: IResponse[];
  scores: IScore[];
  getToggleChecked: any;
  rows: any;
}

class SummaryTable extends React.Component<ISummaryTableProps> {
  public getStatusCell(email: string) {
    switch (this.props.rows[email].status) {
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
            <Table.HeaderCell />
            {this.props.questions.map(question => (
              <Table.HeaderCell content={question.prompt} />
            ))}
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.responses.map(response => (
            <Table.Row selectable>
              <Table.Cell textAlign="center" verticalAlign="middle">
                <Checkbox
                  checked={this.props.rows[response.email].checked}
                  onChange={this.props.getToggleChecked(response.email)}
                />
              </Table.Cell>
              {response.answers.map(answer => (
                <Table.Cell content={answer.value} />
              ))}
              {this.getStatusCell(response.email)}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default SummaryTable;
