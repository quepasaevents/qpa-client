export type EventStatus = "confirmed" | "canceled"
export type EventImageType = "cover" | "thumb" | "gallery" | "poster"
declare module "*.png"
declare module "*.svg"

export enum EventPublishedState {
    PUBLISHED = "published",
    DRAFT = "draft",
}
