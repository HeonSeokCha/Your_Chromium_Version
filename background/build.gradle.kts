plugins {
    kotlin("js")
}

dependencies {
    implementation(kotlin("stdlib-js"))
}

kotlin {
    js(IR) {
        binaries.executable()
        browser {
            distribution {
                directory = File("$rootDir/build/distributions/")
            }
        }
    }
}
