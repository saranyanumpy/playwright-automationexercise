class BasePage{
    constructor(page){
        this.page;
    }


async NavigationHistoryEntry(url){
    await this.page.goto(url);
}
}