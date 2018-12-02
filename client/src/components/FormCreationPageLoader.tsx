import * as React from "react";
import { RouteComponentProps } from "react-router";
import FormCreationPage from "./FormCreationPage";
import { Query, Mutation } from "react-apollo";
import {
  GET_FORM_GQL,
  SAVE_FORM_GQL,
  UPDATE_PUBLISH_STATE_GQL
} from "../queries/form";
import { Loader, Message } from "semantic-ui-react";
import { IQuestion } from "src/DataTypes";

interface IProps extends RouteComponentProps<{ id: string }> {}

class FormViewPageLoader extends React.Component<IProps> {
  public render() {
    return (
      <Query
        query={GET_FORM_GQL}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data, refetch }) => {
          return loading ? (
            <Loader />
          ) : error ? (
            <Message warning>Failed to find form</Message>
          ) : (
            <Mutation mutation={SAVE_FORM_GQL}>
              {saveForm => {
                return (
                  <Mutation mutation={UPDATE_PUBLISH_STATE_GQL}>
                    {updatePublishState => {
                      return (
                        <FormCreationPage
                          id={this.props.match.params.id}
                          initialQuestions={data.form.questions}
                          initialName={data.form.name}
                          initialPublished={data.form.published}
                          saveForm={async (
                            questions: IQuestion[],
                            formName: string
                          ) => {
                            await saveForm({
                              variables: {
                                id: this.props.match.params.id,
                                form: {
                                  name: formName,
                                  questions: questions.map(q => ({
                                    type: q.type,
                                    prompt: q.prompt,
                                    options: q.options
                                  }))
                                }
                              }
                            });
                          }}
                          updatePublishState={async (published: boolean) => {
                            await updatePublishState({
                              variables: {
                                formID: this.props.match.params.id,
                                published
                              }
                            });
                          }}
                        />
                      );
                    }}
                  </Mutation>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default FormViewPageLoader;
