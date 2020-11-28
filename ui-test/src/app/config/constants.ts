export class Settings {
    public static CONSTANTS = {
        API_ENDPOINT: 'http://localhost:8080/api/v1/',
        API: {
            createCategory: 'category/create',
            fetchCategory: 'category/fetch',
            createSubCategory: 'subcategory/create',
            fetchSubCategory: 'subcategory/fetch'
        },
        timeout_period: 45000,
        alert_hide_time: 5000,
        message_error: 'Please try again!'
    }
}