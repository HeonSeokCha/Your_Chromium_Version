chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
    switch (request.action) {
        case 'GET_NEED_UPDATE':
            (async () => {
                const currentVersion = await getYourVersion();
                const lastestVersion = await getLastestVersion(request.baseUrl);
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
            break;
    }
    return true;
});

async function getYourVersion() {
    const uaData = navigator.userAgentData;
    const result = await uaData.getHighEntropyValues(['uaFullVersion']);
    return result.uaFullVersion;
}

async function getLastestVersion(baseUrl) {
    const lastReleaseInfo = await fetch(baseUrl + '/releases/latest');
    const lastesetVersion = await lastReleaseInfo.json();
    return convertFormat(lastesetVersion.tag_name);
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