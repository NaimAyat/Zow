import * as React from "react";
import {
  Button,
  ButtonProps,
  Select,
  Input,
  Menu,
  InputOnChangeData,
  Icon,
  DropdownProps
} from "semantic-ui-react";
import { IFilter, FilterType, IQuestion } from "../DataTypes";

interface IProps {
  filters: IFilter[];
  questions: IQuestion[];
  setFilters: (filters: IFilter[]) => void;
}
interface IState {
  filter: IFilter;
}

class Filter extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    const filter: IFilter = {
      prompt: this.props.questions[0].prompt,
      type: "includes",
      search: ""
    };
    this.state = { filter };
  }

  public getRemoveFilter(index: number) {
    return () => {
      const filters = [...this.props.filters];
      filters.splice(index, 1);
      this.props.setFilters(filters);
    };
  }

  public render() {
    const filterTypes: FilterType[] = [
      "includes",
      "matches",
      "greater than",
      "less than"
    ];
    const filterTypesOptions = filterTypes.map(type => ({
      key: type,
      text: type,
      value: type
    }));
    const questionOptions = this.props.questions.map(question => ({
      key: question.prompt,
      text: question.prompt,
      value: question.prompt
    }));
    return (
      <React.Fragment>
        <Menu vertical fluid>
          {this.props.filters.map((filter, index) => (
            <Menu.Item key={index}>
              <b>{filter.prompt}</b>
              {" " + filter.type + ' "' + filter.search + '"'}
              <Icon
                style={{ cursor: "pointer" }}
                name="delete"
                onClick={this.getRemoveFilter(index)}
                color="red"
              />
            </Menu.Item>
          ))}
          <Menu.Item>
            <Input
              type="text"
              placeholder="Filter..."
              action
              actionPosition="left"
              value={this.state.filter.search}
              onChange={(event: any, data: InputOnChangeData) => {
                const filter = this.state.filter;
                filter.search = data.value;
                this.setState({ filter });
              }}
            >
              <Select
                options={questionOptions}
                value={this.state.filter.prompt}
                onChange={(event: any, data: DropdownProps) => {
                  const filter = this.state.filter;
                  filter.prompt = String(data.value);
                  this.setState({ filter });
                }}
              />
              <Select
                options={filterTypesOptions}
                compact
                value={this.state.filter.type}
                onChange={(event: any, data: DropdownProps) => {
                  const filter = this.state.filter;
                  filter.type = String(data.value) as FilterType;
                  this.setState({ filter });
                }}
              />
              <input />
            </Input>
            <Button
              type="submit"
              floated="right"
              style={{ margin: "10px" }}
              onClick={(event: any, data: ButtonProps) => {
                const search = this.state.filter.search;
                const type = this.state.filter.type;
                if (
                  search === "" ||
                  ((type === "greater than" || type === "less than") &&
                    isNaN(parseInt(search, 10)))
                ) {
                  return;
                }
                const filters = this.props.filters;
                filters.push(this.state.filter);
                this.props.setFilters(filters);
                const filter: IFilter = {
                  prompt: this.props.questions[0].prompt,
                  type: "includes",
                  search: ""
                };
                this.setState({ filter });
              }}
            >
              Add Filter
            </Button>
          </Menu.Item>
        </Menu>
      </React.Fragment>
    );
  }
}

export default Filter;
