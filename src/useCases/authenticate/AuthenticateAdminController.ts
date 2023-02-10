import { Request, Response } from "express"
import { AuthenticateAdminUseCase } from "./AuthenticateAdminUseCase";

export class AuthenticateAdminController {
  constructor(private authenticateAdminUseCase: AuthenticateAdminUseCase) { }

  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const { token, name } = await this.authenticateAdminUseCase.execute({ email, password });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    })

    return res.json({
      name
    })
  }
}
