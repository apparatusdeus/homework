import {VisitorApiService} from './VisitorApiService'

const visitorApiService = new VisitorApiService()

test('getToken', async () => {
    const token = await visitorApiService.getToken()
    expect(token).toBeTruthy()
})

test('getPage', async() => {
    const token = await visitorApiService.getToken()
    const page = await visitorApiService.getPage(token, 1)
    console.log(page)
});
