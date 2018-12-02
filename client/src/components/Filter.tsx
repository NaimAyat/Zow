import * as React from "react";
import { Button, Select, Input, Menu } from "semantic-ui-react";
import { IFilter, FilterType, IQuestion } from "../DataTypes";

interface IProps {
  filters: IFilter[];
  questions: IQuestion[];
  // setFilters: (filters: IFilter[]) => void;
}

class Filter extends React.Component<IProps> {
  public render() {
    const filterTypes: FilterType[] = [
      "greater than",
      "less than",
      "includes",
      "matches"
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
        <Menu vertical fluid style={{ maxWidth: "50%" }}>
          {this.props.filters.map(filter => (
            <Menu.Item>
              {filter.prompt + " " + filter.type + " " + filter.search}
            </Menu.Item>
          ))}
          <Menu.Item>
            <Input
              type="text"
              placeholder="Filter..."
              action
              actionPosition="left"
            >
              <Select
                options={questionOptions}
                defaultValue={questionOptions[0].value}
              />
              <Select
                options={filterTypesOptions}
                compact
                defaultValue={filterTypesOptions[0].value}
                // onChange={this.handleDropdownChange}
              />
              <input />
            </Input>
            <Button type="submit" floated="right" style={{ margin: "10px" }}>
              Add Filter
            </Button>
          </Menu.Item>
        </Menu>
      </React.Fragment>
    );
  }
}

export default Filter;
