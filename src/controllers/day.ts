import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import dayService from '../services/day';
import { UnknownError } from '../utils/errors/UnknownError';
import { BadRequestError } from '../utils/errors/BadRequestError';
import { GetDayDTO } from '../dto/day';
import { NotFoundError } from '../utils/errors/NotFoundError';

async function getDayHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const date = req.query.date?.toString() || '';
    const getDayDTO = new GetDayDTO(date);

    const errors = await validate(getDayDTO);
    if (errors.length) {
      next(new BadRequestError(errors));
      return;
    }

    const day = await dayService.getDay(getDayDTO, true);

    console.log(day?.activities[0].from);
    if (day == null) {
      next(new NotFoundError());
      return;
    }

    res.status(201).json(day);
  } catch (error: unknown) {
    next(new UnknownError(error));
  }
}

const dayController = {
  getDayHandler,
};

export default dayController;
