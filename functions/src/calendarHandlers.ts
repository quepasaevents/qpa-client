import {Request, Response} from "express";
import Calendar from './calendar';

const calendar = new Calendar()

export const events = async (req: Request, res: Response) => {
  calendar.listEvents()
  return true
}