
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
            chrome.downloads.download({
                url: response.downloadUrl,
                filename: document.getElementById('last_version').innerText+'.exe'
            });

            chrome.downloads.onCreated.addListener(function() {

                document.getElementById('btn_download').style.display = 'none';

                chrome.downloads.onChanged.addListener(function(changeInfo) {
                    if (changeInfo?.filename?.current != null && changeInfo?.filename?.current != '') {
                        console.log(changeInfo)
                    }

                    chrome.downloads.search({id: changeInfo.id }, function(item) {
                        console.log(item[0].state)
                        if (item[0].state == 'in_progress') {
                            document.getElementById("txt_download_state").style.display = 'block'
                        }

                        if (item[0].state == 'complete') {
                            document.getElementById("txt_download_state").innerText = 'Donwload Compelete. Check Your Download Directory.'
                        }
                    })   
                })
            })
        }
    );
}