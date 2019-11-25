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
    tags: Array<IEventTag | null> | null;
    user: IUser | null;
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

  interface IUserOnQueryArguments {
    id: string;
  }

  interface ICalendarEvent {
    __typename: 'CalendarEvent';
    id: string;
    images: IEventImages | null;
    info: IEventInformation | null;
    infos: Array<IEventInformation | null>;
    location: ILocation;
    occurrences: Array<IEventOccurrence | null> | null;
    owner: IUser;
    status: any;
    tags: Array<IEventTag | null> | null;
    time: IEventTime;
  }

  interface IInfoOnCalendarEventArguments {
    lang: string;
  }

  interface IEventImages {
    __typename: 'EventImages';
    cover: IEventImage | null;
    gallery: Array<IEventImage> | null;
    poster: IEventImage | null;
    thumb: IEventImage | null;
  }

  interface IEventImage {
    __typename: 'EventImage';
    url: string;
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

  interface IEventTag {
    __typename: 'EventTag';
    id: string;
    name: string;
    translation: IEventTagTranslation | null;
    translations: Array<IEventTagTranslation>;
  }

  interface ITranslationOnEventTagArguments {
    language: string;
  }

  interface IEventTagTranslation {
    __typename: 'EventTagTranslation';
    id: string;
    language: string;
    text: string;
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
    addEventGalleryImages: ICalendarEvent | null;
    createEvent: ICalendarEvent | null;
    createEventTag: IEventTag | null;
    deleteEvent: IUser;
    deleteEventTag: Array<IEventTag | null> | null;
    grantRole: IUser;
    removeEventGalleryImages: ICalendarEvent | null;
    requestInvite: boolean;
    revokeRole: IUser;
    setEventImage: ICalendarEvent | null;
    signin: IUserSession;
    signup: Array<IError | null> | null;
    unsetEventImage: ICalendarEvent | null;
    updateEvent: ICalendarEvent | null;
    updateEventTag: IEventTag | null;
  }

  interface IAddEventGalleryImagesOnMutationArguments {
    input: IEventImagesUploadInput;
  }

  interface ICreateEventOnMutationArguments {
    input: ICreateEventInput;
  }

  interface ICreateEventTagOnMutationArguments {
    input: ICreateEventTagInput;
  }

  interface IDeleteEventOnMutationArguments {
    id: string;
  }

  interface IDeleteEventTagOnMutationArguments {
    input: IDeleteEventTagInput;
  }

  interface IGrantRoleOnMutationArguments {
    input: IGrantRoleInput;
  }

  interface IRemoveEventGalleryImagesOnMutationArguments {
    input: IEventGalleryImagesInput;
  }

  interface IRequestInviteOnMutationArguments {
    input: IRequestInviteInput;
  }

  interface IRevokeRoleOnMutationArguments {
    input: IGrantRoleInput;
  }

  interface ISetEventImageOnMutationArguments {
    input: IEventImageUploadInput;
  }

  interface ISigninOnMutationArguments {
    input: ISigninInput;
  }

  interface ISignupOnMutationArguments {
    input: ISignupInput;
  }

  interface IUnsetEventImageOnMutationArguments {
    id: IUnsetEventImageInput;
  }

  interface IUpdateEventOnMutationArguments {
    input: IUpdateEventInput;
  }

  interface IUpdateEventTagOnMutationArguments {
    input: IUpdateEventTagInput;
  }

  interface IEventImagesUploadInput {
    files: Array<any>;
    id: string;
  }

  interface ICreateEventInput {
    infos: Array<IEventInformationInput | null>;
    location: IEventLocationInput;
    status: string;
    tagNames: Array<string>;
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

  interface IEventTimeInput {
    end: any;
    exceptions?: string | null;
    recurrence?: string | null;
    start: any;
    timeZone: any;
  }

  interface ICreateEventTagInput {
    name: string;
    translations: Array<ICreateModifyEventTagTranslationInput>;
  }

  interface ICreateModifyEventTagTranslationInput {
    language: string;
    text: string;
  }

  interface IDeleteEventTagInput {
    id: string;
  }

  interface IGrantRoleInput {
    roleType: any;
    userId: string;
  }

  interface IEventGalleryImagesInput {
    eventId: string;
    imageIds: Array<string>;
  }

  interface IRequestInviteInput {
    email: string;
  }

  interface IEventImageUploadInput {
    eventId: string;
    file: any;
    imageType?: any | null;
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

  interface IUnsetEventImageInput {
    eventId: string;
    imageType?: any | null;
  }

  interface IUpdateEventInput {
    id: string;
    infos?: Array<IEventInformationInput> | null;
    location?: IEventLocationInput | null;
    status?: string | null;
    tagNames: Array<string>;
    time?: IEventTimeInput | null;
  }

  interface IUpdateEventTagInput {
    id: string;
    name: string;
    translations: Array<ICreateModifyEventTagTranslationInput>;
  }

  const enum CacheControlScope {
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC'
  }

  interface IRevokeRoleInput {
    roleType: any;
    userId: string;
  }
}

// tslint:enable
