import {VisitorPageResponse, VisitorService} from '../service/VisitorService'
import {LoadAllUseCase} from './LoadAllUseCase'

let initialCalls = 2;
class VisitorMockService implements VisitorService {
    public async getToken(retryAttempt?: number): Promise<string> {
        return '123456'
    }

    public async getPage(token: string, pageNumber: number, retryAttempt?: number): Promise<VisitorPageResponse> {
        if(initialCalls > 0) {
            --initialCalls;
            return {
                total: 150,
                data: [
                    { id: 134, name: 'Visitor #0', date: '2020-10-27T12:25:11+00:00' },
                    { id: 88, name: 'Visitor #1', date: '2020-10-22T11:07:17+00:00' },
                    { id: 135, name: 'Visitor #11', date: '2020-10-21T00:13:18+00:00' },
                    { id: 30, name: 'Visitor #12', date: '2020-10-22T05:02:40+00:00' },
                    { id: 21, name: 'Visitor #13', date: '2020-10-20T07:01:17+00:00' },
                    { id: 1, name: 'Visitor #13', date: '2020-10-28T10:20:21+00:00' },
                    { id: 29, name: 'Visitor #14', date: '2020-10-29T06:40:05+00:00' },
                    { id: 23, name: 'Visitor #14', date: '2020-10-23T04:59:42+00:00' },
                    { id: 80, name: 'Visitor #15', date: '2020-10-28T22:56:26+00:00' },
                    { id: 6, name: 'Visitor #15', date: '2020-10-18T23:33:10+00:00' },
                    { id: 115, name: 'Visitor #16', date: '2020-10-18T13:53:05+00:00' },
                    { id: 93, name: 'Visitor #16', date: '2020-10-21T06:47:53+00:00' },
                    { id: 74, name: 'Visitor #16', date: '2020-10-26T20:17:06+00:00' },
                    { id: 24, name: 'Visitor #16', date: '2020-10-24T17:06:38+00:00' },
                    { id: 79, name: 'Visitor #17', date: '2020-10-20T22:10:42+00:00' }
                ]
            }
        }

        return {
            total: 200,
            data: [
                { id: 134, name: 'Visitor #0', date: '2020-10-27T12:25:11+00:00' },
                { id: 88, name: 'Visitor #1', date: '2020-10-22T11:07:17+00:00' },
                { id: 135, name: 'Visitor #11', date: '2020-10-21T00:13:18+00:00' },
                { id: 30, name: 'Visitor #12', date: '2020-10-22T05:02:40+00:00' },
                { id: 21, name: 'Visitor #13', date: '2020-10-20T07:01:17+00:00' },
                { id: 1, name: 'Visitor #13', date: '2020-10-28T10:20:21+00:00' },
                { id: 29, name: 'Visitor #14', date: '2020-10-29T06:40:05+00:00' },
                { id: 23, name: 'Visitor #14', date: '2020-10-23T04:59:42+00:00' },
                { id: 80, name: 'Visitor #15', date: '2020-10-28T22:56:26+00:00' },
                { id: 6, name: 'Visitor #15', date: '2020-10-18T23:33:10+00:00' },
                { id: 115, name: 'Visitor #16', date: '2020-10-18T13:53:05+00:00' },
                { id: 93, name: 'Visitor #16', date: '2020-10-21T06:47:53+00:00' },
                { id: 74, name: 'Visitor #16', date: '2020-10-26T20:17:06+00:00' },
                { id: 24, name: 'Visitor #16', date: '2020-10-24T17:06:38+00:00' },
                { id: 79, name: 'Visitor #17', date: '2020-10-20T22:10:42+00:00' }
            ]
        }
    }
}

const useCase = new LoadAllUseCase(new VisitorMockService());

test('execute', async () => {
    await useCase.execute()
});
