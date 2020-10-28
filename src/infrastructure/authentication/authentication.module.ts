import {Module} from "@nestjs/common";
import {Token} from "./token";

@Module({
    imports: [Token],
    exports: [Token]
})
export class AuthenticationModule {}