chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case 'GET_NEED_UPDATE':
            (async () => {
                const currentVersion = await getYourVersion();
                const lastestVersion = getLastestVersion(
                    await getLastReleaseInfo(request.baseUrl)
                );
                const isNeedUpdate = compareVersion(currentVersion, lastestVersion);

                sendResponse(
                    {
                        currentVersion: currentVersion,
                        lastestVersion: lastestVersion,
                        isNeedUpdate: isNeedUpdate
                    }
                );
            })();
            break;

        case 'REQUEST_LASTEST_DOWNLOAD':
            (async () => {
                const syncInstallerInfo = getSyncInstallerInfo(
                    await getLastReleaseInfo(request.baseUrl)
                );
                sendResponse(
                    {
                        downloadUrl: syncInstallerInfo
                    }
                );
            })();
            break;
    }
    return true;
});

async function getYourVersion() {
    const uaData = navigator.userAgentData;
    const result = await uaData.getHighEntropyValues(['uaFullVersion']);
    return result.uaFullVersion;
}

async function getLastReleaseInfo(baseUrl) {
    const lastReleaseInfo = await fetch(baseUrl + '/releases/latest');
    return await lastReleaseInfo.json();
}

function getLastestVersion(lastReleaseInfo) {
    return convertFormat(lastReleaseInfo.tag_name);
}


function compareVersion(current, last) {
    let needUpate = false;
    for (var i = 0; i < 4; i++) {
        if (last.split(".")[i] > current.split(".")[i]) {
            needUpate = true;
        }
    }
    return needUpate;
}

function convertFormat(version) {
    var temp = version
    if (temp.indexOf('v') == -1) {
        temp = temp.replace('v', '');
    }
    temp = temp.split('-')[0];
    return temp;
}

function getSyncInstallerInfo(lastReleaseInfo) {
    let assestList = lastReleaseInfo.assets;
    const syncInfo = assestList.find(isSyncInstaller);
    return syncInfo.browser_download_url;
}


function isSyncInstaller(element) {
    let nameArr = element.name.split('.');
    if (nameArr[1] === 'sync' && nameArr[2] === 'exe') {
        return true;
    }
}