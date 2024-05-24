import {Injectable} from '@nestjs/common';
import {IConfigService} from "./config.interface";
import {DotenvParseOutput, config} from "dotenv";

@Injectable()
export class ConfigService implements IConfigService{
    private readonly config : DotenvParseOutput;
    constructor() {
        const {error, parsed} = config()

        if (error) {
            throw new Error('Не найден файл .env')
        }
        if (!parsed) {
            throw new Error('Пустой файл .env')
        }
        this.config = parsed
    }
    get(key : string) : string {
        const res = this.config[key]
        console.log(res)
        if (!res) {
            throw new Error('Нет такого ключа')
        }
        return res
    }
}