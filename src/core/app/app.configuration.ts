/**
 * Created by ssierrao on 29/12/2016.
 */
export default class TranslateConfig {
    constructor($translateProvider: any) {
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.useLoaderCache(true);
        $translateProvider.useLoader('translationsFactory', {});
    }
}
