import {UseCase} from '../../../core/domain/UseCase'
import {VisitorPageResponse, VisitorService, VisitorVisit} from '../service/VisitorService'

const SECOND_PAGE = 2
const RECORDS_PER_PAGE = 15 // This is a presumption

const DAY_MONDAY = 1
const DAY_FRIDAY = 5

function dateIsWeekday(date: Date): boolean {
    const day = date.getDay()
    return (day >= DAY_MONDAY && day <= DAY_FRIDAY)
}

function dateIsToday(date: Date): boolean {
    const today = new Date()
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
}

/**
 * Notes:
 * The whole dataset is ordered by the name field
 * Data is not static. Visits could occur while you are fetching the API response. However, records can only be inserted and it would be always today’s visits. Visits cannot be undone.
 *
 * TASKS:
 *  - Ignore Weekend Visits - DONE
 *  - Ignore Today's Visits - DONE
 *  - Parallel API Requests - DONE
 *  - Request Pool -
 *  - API Retries - DONE (Limited to 10 attempts without backoff)
 */
export class LoadAllUseCase implements UseCase<void, void> {
    private readonly visitorService: VisitorService
    private token: string

    public constructor(visitorService: VisitorService) {
        this.visitorService = visitorService
    }

    public async getPages(from: number, to: number): Promise<VisitorVisit[]> {
        const pagePromises: Promise<VisitorVisit[]>[] = []

        let total = 0
        for (let pageNumber = from; pageNumber <= to; pageNumber++) {
            pagePromises.push(this.visitorService.getPage(this.token, pageNumber).then((response: VisitorPageResponse) => {
                if (response.total > total) {
                    total = response.total
                }
                return response.data
            }))
        }

        const pageCollection = await Promise.all(pagePromises)

        return [].concat(...pageCollection)
    }

    public async execute(): Promise<void> {
        // TODO: Token refresh?
        this.token = await this.visitorService.getToken()

        // Get initial page
        const initialPage = await this.visitorService.getPage(this.token, 1)

        let recordCount = initialPage.total
        const totalPages = recordCount / RECORDS_PER_PAGE

        const allPageData = await this.getPages(SECOND_PAGE, totalPages)

        const visitsByVisitor: { [name: string]: number } = {}
        for (const visit of allPageData) {
            const visitDate = new Date(visit.date)

            if(dateIsWeekday(visitDate) && !dateIsToday(visitDate)) {
                if (!(visit.name in visitsByVisitor)) {
                    visitsByVisitor[visit.name] = 0
                }
                visitsByVisitor[visit.name]++;
            }
        }

        console.log(visitsByVisitor)
    }
}
