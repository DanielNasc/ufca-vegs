import { Request, Response } from "express"
import { AuthenticateAdminUseCase } from "./AuthenticateAdminUseCase";

export class AuthenticateAdminController {
  constructor(private authenticateAdminUseCase: AuthenticateAdminUseCase) { }

  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const token = await this.authenticateAdminUseCase.execute({ email, password });

    return res.json({
      token
    })
  }
}
