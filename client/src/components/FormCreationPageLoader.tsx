import * as React from "react";
import { RouteComponentProps } from "react-router";
import FormCreationPage from "./FormCreationPage";
import { Query, Mutation } from "react-apollo";
import { GET_FORM_GQL, SAVE_FORM_GQL } from "src/queries/form";
import { Loader } from "semantic-ui-react";
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
          ) : (
            <Mutation mutation={SAVE_FORM_GQL}>
              {saveForm => {
                return (
                  <FormCreationPage
                    initialQuestions={data.form.questions}
                    initialName={data.form.name}
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
                  />
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
