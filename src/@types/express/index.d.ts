import { Admins } from "@prisma/client";

declare global {
    namespace Express {
        export interface Request {
            admin: Admins
        }
    }
}