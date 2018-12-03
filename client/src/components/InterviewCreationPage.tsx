import * as React from "react";
import * as moment from "moment";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Input,
  Label,
  InputOnChangeData
} from "semantic-ui-react";
import { ISlot } from "../DataTypes";
import Page from "./Page";
import { Mutation } from "react-apollo";
import { ADD_INTERVIEW_SLOT } from "../queries/form";
import { RouteComponentProps } from "react-router";

function InterviewHeader(props: { date: Date }) {
  return <Header>{props.date.toDateString()}</Header>;
}

function InterviewSlot(props: { slot: ISlot; onRemoveSlot: () => void }) {
  return (
    <Card>
      <Card.Description>
        <div style={{ textAlign: "right" }}>
          <Icon
            style={{ cursor: "pointer" }}
            name="delete"
            onClick={props.onRemoveSlot}
            color="red"
          />
        </div>
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          {moment(props.slot.start).format("h:mm A")}
          &nbsp;to&nbsp;
          {moment(props.slot.end).format("h:mm A")}
        </div>
      </Card.Description>
    </Card>
  );
}

function DefaultInterviewSlot(props: {
  slot: ISlot;
  onChange: any;
  onCreateSlot: () => void;
}) {
  return (
    <Card>
      <Card.Content textAlign="center">
        <Input
          placeholder={moment(props.slot.start).format("H:mm A")}
          type="time"
          onChange={props.onChange(true)}
          style={{ maxWidth: "100%" }}
        />
        <Label content="to" style={{ margin: "5px" }} />
        <Input
          placeholder={moment(props.slot.end).format("h:mm A")}
          type="time"
          onChange={props.onChange(false)}
          style={{ maxWidth: "100%" }}
        />
      </Card.Content>
      <Button primary content="Create" onClick={props.onCreateSlot} />
    </Card>
  );
}

interface IState {
  // slot that will autofill slot creation input
  defaultSlots: ISlot[];
  // previously created slots
  slots: ISlot[];
}

interface IProps extends RouteComponentProps<{ id: string }> {}

export default class InterviewCreationPage extends React.Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);
    const now = new Date();
    const defaultSlots = [];
    // set default slots to the next 7 days at 9am
    for (let i = 0; i < 6; i++) {
      const start = new Date();
      start.setDate(now.getDate() + i);
      start.setHours(9);
      start.setMinutes(0);
      const end = new Date();
      end.setDate(now.getDate() + i);
      end.setHours(10);
      end.setMinutes(0);
      defaultSlots.push({ start, end });
    }
    this.state = {
      defaultSlots,
      slots: []
    };
    this.getOnRemoveSlot = this.getOnRemoveSlot.bind(this);
    this.getOnCreateSlot = this.getOnCreateSlot.bind(this);
    this.getOnDefaultSlotChange = this.getOnDefaultSlotChange.bind(this);
  }

  public getOnDefaultSlotChange(index: number, date: Date) {
    return (start: boolean) => {
      return (
        event: React.ChangeEvent<HTMLInputElement>,
        data: InputOnChangeData
      ) => {
        const [hourMaybe, minMaybe] = data.value.split(":");
        const hour = parseInt(hourMaybe, 10);
        const min = parseInt(minMaybe, 10);
        if (hour != null && min != null) {
          const defaultSlots = [...this.state.defaultSlots];
          const newDate = new Date();
          newDate.setDate(defaultSlots[index].start.getDate());
          newDate.setHours(hour);
          newDate.setMinutes(min);
          if (start) {
            defaultSlots[index].start = newDate;
          } else {
            defaultSlots[index].end = newDate;
          }
          this.setState({ defaultSlots });
        }
      };
    };
  }

  public getOnCreateSlot(
    index: number,
    saveSlot: (start: number, end: number) => Promise<void>
  ) {
    return () => {
      const slots = [...this.state.slots];
      const newSlot = { ...this.state.defaultSlots[index] };
      slots.push(newSlot);
      saveSlot(newSlot.start.getTime(), newSlot.end.getTime());
      this.setState({ slots });
    };
  }

  public getOnRemoveSlot(removeSlot: ISlot) {
    return () => {
      const slots = [...this.state.slots];
      let index: number;
      for (let i = 0; i < slots.length; i++) {
        const slot = slots[i];
        if (
          removeSlot.start.getTime() === slot.start.getTime() &&
          removeSlot.end.getTime() === slot.end.getTime()
        ) {
          index = i;
          break;
        }
      }
      slots.splice(index!, 1);
      this.setState({ slots });
    };
  }

  public render() {
    const defaultSlots = this.state.defaultSlots;
    const slots: ISlot[][] = new Array(defaultSlots.length);
    for (let i = 0; i < defaultSlots.length; i++) {
      slots[i] = [];
      for (const slot of this.state.slots) {
        if (slot.start.getDay() === defaultSlots[i].start.getDay()) {
          slots[i].push(slot);
        }
      }
      slots[i].sort((a, b) => a.start.getTime() - b.start.getTime());
    }
    return (
      <Mutation mutation={ADD_INTERVIEW_SLOT}>
        {addSlot => {
          return (
            <Page header="Interview Creation">
              <Grid columns={6} textAlign="center">
                <Grid.Row>
                  {defaultSlots.map((slot, i) => (
                    <Grid.Column key={i}>
                      <InterviewHeader date={slot.start} />
                    </Grid.Column>
                  ))}
                </Grid.Row>
                <Grid.Row>
                  {slots.map((slotList, i) => (
                    <Grid.Column key={i}>
                      {slotList.map((slot, j) => (
                        <InterviewSlot
                          key={j}
                          slot={slot}
                          onRemoveSlot={this.getOnRemoveSlot(slot)}
                        />
                      ))}
                      <DefaultInterviewSlot
                        key={i}
                        slot={defaultSlots[i]}
                        onCreateSlot={this.getOnCreateSlot(
                          i,
                          async (start, end) => {
                            addSlot({
                              variables: {
                                formID: this.props.match.params.id,
                                startTime: start,
                                endTime: end
                              }
                            });
                          }
                        )}
                        onChange={this.getOnDefaultSlotChange(
                          i,
                          defaultSlots[i].start
                        )}
                      />
                    </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            </Page>
          );
        }}
      </Mutation>
    );
  }
}
