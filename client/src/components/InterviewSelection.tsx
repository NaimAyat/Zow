import * as React from "react";
import * as moment from "moment";
import { Card, Header, Grid } from "semantic-ui-react";
import ZowCard from "./Card";

interface IProps {
  formID?: string;
}

interface IOpenSlot {
  start: Date;
  end: Date;
}

export default class InterviewSelection extends React.Component<IProps> {
  private openSlots: IOpenSlot[];

  constructor(props: IProps) {
    super(props);
    this.openSlots = [
      {
        start: new Date("2018-11-30T07:41:24.103Z"),
        end: new Date("2018-11-30T07:41:24.103Z")
      },
      {
        start: new Date("2018-11-30T04:20:24.103Z"),
        end: new Date("2018-11-30T04:41:24.103Z")
      },
      {
        start: new Date("2018-11-20T01:40:24.103Z"),
        end: new Date("2018-11-20T01:40:24.103Z")
      }
    ];
  }

  public render() {
    const now = new Date();
    const graph = new Map<string, IOpenSlot[]>();

    for (const slot of this.openSlots) {
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
      <ZowCard>
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
                    <Card as="a" onClick={() => alert(slot.start)} key={j}>
                      <Card.Content>
                        {moment(slot.start).format("h:mm")}
                        &nbsp;to&nbsp;
                        {moment(slot.end).format("h:mm")}
                      </Card.Content>
                    </Card>
                  ))}
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </ZowCard>
    );
  }
}
