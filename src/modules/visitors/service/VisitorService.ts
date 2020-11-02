export interface LoginResponse {
    token: string
}

export interface VisitorVisit {
    id: number
    name: string
    date: string
}

export interface VisitorPageResponse {
    data: VisitorVisit[]
    total: number
}

export interface VisitorService {
    getToken(retryAttempt?: number): Promise<string>
    getPage(token: string, pageNumber: number, retryAttempt?: number): Promise<VisitorPageResponse>
}
