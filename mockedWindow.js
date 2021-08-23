import { userAgent } from "./mockedNavigator";

/**
 * Make sure that unexpected accesses to browser API do not create errors down the line.
 */
export const navigator = { userAgent };
