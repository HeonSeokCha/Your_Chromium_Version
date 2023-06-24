
const baseUrl = 'https://api.github.com/repos/Hibbiki/chromium-win64';

window.onload = async function () {
    chrome.runtime.sendMessage(
        {
            action: "GET_NEED_UPDATE",
            baseUrl: baseUrl
        }, function (response) {
            document.getElementById('current_version').innerText = response.currentVersion;
            document.getElementById('last_version').innerText = response.lastestVersion;

            if (response.isNeedUpdate == true) {
                document.getElementById('btn_download').style.display = 'block';
            } else {
                document.getElementById('txt_use_lastest_version').style.display = 'block';
            }
        }
    );
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn_download').addEventListener('click', async function () {
        await sendRequestDonwload()
    });
});

async function sendRequestDonwload() {
    chrome.runtime.sendMessage(
        {
            action: "REQUEST_LASTEST_DOWNLOAD",
            baseUrl: baseUrl
        }, function (response) {
            window.open(response.downloadUrl);
        }
    );
}
