/* eslint-disable prettier/prettier */
import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.headers;

      if (!user_id) {
        return response
          .status(400)
          .json({ error: "Please fill user_id field!" });
      }

      const allUsers = this.listAllUsersUseCase.execute({
        user_id: String(user_id),
      });

      return response.status(200).json(allUsers);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { ListAllUsersController };
