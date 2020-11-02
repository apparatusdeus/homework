import axios, {AxiosError} from 'axios'
import {LoginResponse, VisitorPageResponse, VisitorService} from './VisitorService'

const MOTORWAY_DOMAIN = 'https://motorway-challenge-api.herokuapp.com'
const VISITOR_LOGIN_ENDPOINT = `${MOTORWAY_DOMAIN}/api/login`
const VISITS_ENDPOINT = `${MOTORWAY_DOMAIN}/api/visits`

function isAxiosError(error: Error): error is AxiosError {
    return (error['isAxiosError'] === true)
}

function isServerError(code: number): boolean {
    return (code >= 500 && code <= 599)
}

export class VisitorApiService implements VisitorService {
    public async getToken(retryAttempt: number = 10): Promise<string> {
        try {
            const response = await axios.get<LoginResponse>(VISITOR_LOGIN_ENDPOINT, {
                timeout: 4000,
                params: {},
            })
            return response.data.token
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response && isServerError(error.response.status)) {
                    if (--retryAttempt > 0) {
                        return this.getToken(retryAttempt)
                    }

                }
            }
            throw error
        }
    }

    public async getPage(token: string, pageNumber: number, retryAttempt: number = 10): Promise<VisitorPageResponse> {
        try {
            const response = await axios.get<VisitorPageResponse>(VISITS_ENDPOINT, {
                timeout: 4000,
                params: {
                    page: pageNumber,
                    token: token,
                },
            })
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error)
                if (error.response && isServerError(error.response.status)) {
                    if (--retryAttempt > 0) {
                        return this.getPage(token, pageNumber, retryAttempt)
                    }

                }
            }
            throw error
        }
    }
}
