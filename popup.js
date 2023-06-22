
window.onload = async function() {
    const isShow = await isNeedUpdate().then(result => {
    if (result == true) {
        alert(result);
        document.getElementById('btn_download').style.display = 'block';
    }
    });

}

async function isNeedUpdate() {
    const currnetVerion = await getYoutVersion();
    const lastestVersion = await getLastestVersion();

    document.getElementById('current_version').innerText = currnetVerion;
    document.getElementById('last_version').innerText = lastestVersion;

    return compareVersion(currnetVerion, lastestVersion);
}

async function getYoutVersion() {
    const uaData = navigator.userAgentData;
    let result = await uaData.getHighEntropyValues(['uaFullVersion']);
    return result.uaFullVersion;
}

async function getLastestVersion() {
    let gitHubRelease = await fetch('https://api.github.com/repos/Hibbiki/chromium-win64/releases/latest');
    let lastesetVersion = await gitHubRelease.json();
    return convertFormat(lastesetVersion.tag_name);
}

function compareVersion(current, last) {
    var needUpate = false;
    for (var i = 0; i < 4; i++) {
        if (last.split(".")[i] > current.split(".")[i]) {
            needUpate = true;
        }
    }

    return needUpate;
}

function convertFormat(version) {
    let temp = version
    if (temp.indexOf('v') == 0) {
        temp = temp.replace('v', '');
    }
    temp = temp.split('-')[0];
    return temp;
}