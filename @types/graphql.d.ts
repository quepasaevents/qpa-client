// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    event: ICalendarEvent | null;
    events: Array<ICalendarEvent | null> | null;
    me: IUser | null;
    occurrence: IEventOccurrence | null;
    occurrences: Array<IEventOccurrence | null> | null;
  }

  interface IEventOnQueryArguments {
    id: string;
  }

  interface IEventsOnQueryArguments {
    filter: IEventsQueryFilter;
  }

  interface IOccurrenceOnQueryArguments {
    id: string;
  }

  interface IOccurrencesOnQueryArguments {
    filter: IOccurrencesQueryFilter;
  }

  interface ICalendarEvent {
    __typename: 'CalendarEvent';
    id: string;
    info: IEventInformation | null;
    infos: Array<IEventInformation | null>;
    location: ILocation;
    meta: IEventMeta | null;
    occurrences: Array<IEventOccurrence | null> | null;
    owner: IUser;
    status: any;
    time: IEventTime;
  }

  interface IInfoOnCalendarEventArguments {
    lang: string;
  }

  interface IEventInformation {
    __typename: 'EventInformation';
    description: string | null;
    language: string;
    title: string;
  }

  interface ILocation {
    __typename: 'Location';
    address: string | null;
    name: string | null;
  }

  interface IEventMeta {
    __typename: 'EventMeta';
    tags: Array<string | null>;
  }

  interface IEventOccurrence {
    __typename: 'EventOccurrence';
    end: string;
    event: ICalendarEvent;
    id: string;
    start: string;
  }

  interface IUser {
    __typename: 'User';
    email: string;
    events: Array<ICalendarEvent | null>;
    id: string;
    name: string;
    roles: Array<IUserRole> | null;
    username: string | null;
  }

  interface IUserRole {
    __typename: 'UserRole';
    type: any;
    user: IUser;
  }

  interface IEventTime {
    __typename: 'EventTime';
    end: any | null;
    exceptions: string | null;
    recurrence: string | null;
    start: any | null;
    timeZone: any | null;
  }

  interface IEventsQueryFilter {
    categories?: Array<any | null> | null;
    from?: any | null;
    limit?: number | null;
    owner?: string | null;
    to?: any | null;
  }

  interface IOccurrencesQueryFilter {
    categories?: Array<any | null> | null;
    from?: any | null;
    limit?: number | null;
    timeZone?: any | null;
    to?: any | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    createEvent: ICalendarEvent | null;
    grantRole: IUser;
    requestInvite: boolean;
    revokeRole: IUser;
    signin: IUserSession;
    signup: Array<IError | null> | null;
    updateEvent: ICalendarEvent | null;
  }

  interface ICreateEventOnMutationArguments {
    input: ICreateEventInput;
  }

  interface IGrantRoleOnMutationArguments {
    input: IGrantRoleInput;
  }

  interface IRequestInviteOnMutationArguments {
    input: IRequestInviteInput;
  }

  interface IRevokeRoleOnMutationArguments {
    input: IGrantRoleInput;
  }

  interface ISigninOnMutationArguments {
    input: ISigninInput;
  }

  interface ISignupOnMutationArguments {
    input: ISignupInput;
  }

  interface IUpdateEventOnMutationArguments {
    input: IUpdateEventInput;
  }

  interface ICreateEventInput {
    infos: Array<IEventInformationInput | null>;
    location: IEventLocationInput;
    meta: IEventMetaInput;
    status: string;
    time: IEventTimeInput;
  }

  interface IEventInformationInput {
    description?: string | null;
    language: string;
    title: string;
  }

  interface IEventLocationInput {
    address?: string | null;
    name?: string | null;
  }

  interface IEventMetaInput {
    tags: Array<string | null>;
  }

  interface IEventTimeInput {
    end: any;
    exceptions?: string | null;
    recurrence?: string | null;
    start: any;
    timeZone: any;
  }

  interface IGrantRoleInput {
    roleType: any;
    userId: string;
  }

  interface IRequestInviteInput {
    email: string;
  }

  interface ISigninInput {
    hash: string;
  }

  interface IUserSession {
    __typename: 'UserSession';
    ctime: any;
    hash: string;
    isValid: boolean;
    user: IUser;
  }

  interface ISignupInput {
    email: string;
    name: string;
    username: string;
  }

  interface IError {
    __typename: 'Error';
    message: string;
    path: string;
  }

  interface IUpdateEventInput {
    id: string;
    infos?: Array<IEventInformationInput> | null;
    location?: IEventLocationInput | null;
    meta?: IEventMetaInput | null;
    status?: string | null;
    time?: IEventTimeInput | null;
  }

  interface IRevokeRoleInput {
    roleType: any;
    userId: string;
  }
}

// tslint:enable
