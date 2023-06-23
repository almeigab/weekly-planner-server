import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import dayService from '../service/day';
import { UnknownError } from '../utils/errors/UnknownError';
import { BadRequestError } from '../utils/errors/BadRequestError';
import { GetDayDTO } from '../dto/day';

async function getDayHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const getDayDTO = new GetDayDTO();
    getDayDTO.date = req.query.date?.toString() || '';

    const errors = await validate(getDayDTO);
    if (errors.length) {
      next(new BadRequestError(errors));
      return;
    }

    const day = await dayService.getDay(getDayDTO, true);

    if (day == null) {
      next(new BadRequestError([]));
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
