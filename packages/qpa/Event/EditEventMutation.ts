import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { EventData, EventFragment } from "./GetEventQuery";

const mutation = gql`
  ${EventFragment}
  mutation EditEvent($input: UpdateEventInput!) {
    updateEvent(input: $input) {
      ...EventData
    }
  }
`;

interface Data {
  updateEvent: EventData;
}

interface Variables {
  input: GQL.IUpdateEventInput;
}

export default class EditEventMutation extends Mutation<Data, Variables> {
  static defaultProps = {
    mutation
  };
}
