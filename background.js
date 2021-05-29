chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    async function getData() {
        url = "http://jiofi.local.html/st_dev.w.xml";
        res = await fetch(url)
        data = await res.text();
        s = "";
        for (i of data) {
            s += i;
        }
        return s;
    }
    async function main() {
        try {
            data = await getData()
            sendResponse(data);
        } catch (error) {
            console.log("JioFi not connected");
        }
    }
    main();
    return true;
});
