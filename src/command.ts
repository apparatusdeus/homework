// Execute via the command line

import {VisitorApiService} from './modules/visitors/service/VisitorApiService'
import {LoadAllUseCase} from './modules/visitors/useCases/LoadAllUseCase'

(async () => {
    const visitorApiService = new VisitorApiService()

    const useCase = new LoadAllUseCase(visitorApiService);
    await useCase.execute();
})()
