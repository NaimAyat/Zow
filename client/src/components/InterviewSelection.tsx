import * as React from "react";
import * as moment from "moment";
import { Card, Header, Grid, Loader, Message } from "semantic-ui-react";
import Page from "./Page";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { GET_INTERVIEWS_GQL } from "src/queries/form";

interface IProps extends RouteComponentProps<{ token: string }> {}

interface IOpenSlot {
  start: Date;
  end: Date;
}

export default class InterviewSelection extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <Query
        query={GET_INTERVIEWS_GQL}
        variables={{ token: this.props.match.params.token }}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return <Loader />;
          }
          if (!loading && error) {
            return (
              <Message error>
                Failed to get interview slots: {error.message}
              </Message>
            );
          }
          const now = new Date();
          const graph = new Map<string, IOpenSlot[]>();

          for (const slot of data.getInterviewSlots) {
            if (slot.start > now) {
              // add slot to graph
              const date = moment(slot.start)
                .startOf("day")
                .toISOString();

              if (!graph.has(date)) {
                graph.set(date, []);
              }

              const slotList = graph.get(date)!;
              slotList.push(slot);
            }
          }

          const dates = Array.from(graph.keys())
            .sort()
            .splice(0, 12);

          return (
            <Page header="Select Interview">
              <Grid divided columns={6}>
                <Grid.Row>
                  {dates.map((date, i) => (
                    <Grid.Column key={i}>
                      <Header>{moment(date).format("MMM DD")}</Header>
                    </Grid.Column>
                  ))}
                </Grid.Row>
                <Grid.Row>
                  {dates.map((date, i) => (
                    <Grid.Column key={i}>
                      {graph
                        .get(date)!
                        .sort((a, b) => a.start.getTime() - b.start.getTime())
                        .map((slot, j) => (
                          <Card
                            as="a"
                            onClick={() => {
                              this.props.history.push("/interview-success");
                            }}
                            key={j}
                          >
                            <Card.Content>
                              {moment(slot.start).format("h:mm a")}
                              &nbsp;to&nbsp;
                              {moment(slot.end).format("h:mm a")}
                            </Card.Content>
                          </Card>
                        ))}
                    </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            </Page>
          );
        }}
      </Query>
    );
  }
}
