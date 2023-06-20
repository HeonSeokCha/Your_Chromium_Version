
window.onload = function() {
    getLastestVersion().then(a => {
        alert(convertFormat(a));
    });

   compareVersion().then(a => {

   });
}

async function getVersion() {
    const uaData = navigator.userAgentData;
    let result = await uaData.getHighEntropyValues(["uaFullVersion"]);
    return result.uaFullVersion;
}

async function compareVersion(version) {
    version.split(".")
    for (var i = 0; i < 4; i++) {

    }
}

function convertFormat(version) {
    let temp = version
    if (temp.indexOf(0) == 'v') {
        temp.replace('v', '')
    }

    return getVersion
}

async function getLastestVersion() {
    let gitHubRelease = await fetch('https://api.github.com/repos/Hibbiki/chromium-win64/releases/latest');
    let lastesetVersion = await gitHubRelease.json();
    return lastesetVersion.tag_name
}