url = "http://jiofi.local.html/st_dev.w.xml";
function addToUI(data) {
    document.getElementById("battery").innerText = data;
}
chrome.runtime.sendMessage("foo", function (response) {
    // TODO : use dom parser or json conver 
    batteryRegex = new RegExp("<batt_per>(.*)</batt_per>", "g");
    batteryPercentage = batteryRegex.exec(response)[1];

    statusReg = new RegExp("<batt_st>(.*)</batt_st>", "g");
    status = statusReg.exec(response)[1];
    isCharging = Number(status) > 800;

    batteryPercentage = Number(batteryPercentage);

    if (batteryPercentage > 20) {
        addToUI("🔋 " + batteryPercentage);
    } else {
        addToUI("🔴 " + batteryPercentage);
        document.querySelector("body").classList.add("isLow");
        document.querySelector("body").classList.remove("isCharging");
    }
    if (isCharging) {
        document.querySelector("body").classList.remove("isLow");
        document.querySelector("body").classList.add("isCharging");
    }
});
