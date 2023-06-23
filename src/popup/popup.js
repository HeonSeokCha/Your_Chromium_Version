window.onload = async function () {
    const baseUrl = 'https://api.github.com/repos/Hibbiki/chromium-win64'
    chrome.runtime.sendMessage(
        {
            action: "GET_NEED_UPDATE",
            baseUrl: baseUrl
        }, function (response) {
            console.log(response);
            document.getElementById('current_version').innerText = response.currentVersion;
            document.getElementById('last_version').innerText = response.lastestVersion;

            if (response.isNeedUpdate == true) {
                document.getElementById('btn_download').style.display = 'block';
            } else {
                document.getElementById('txt_use_lastest_version').style.display = 'block';
            }
        });

}
