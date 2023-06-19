plugins {
    kotlin("js")
    id("org.jetbrains.compose")
}

dependencies {
    implementation(kotlin("stdlib-js"))
    implementation(compose.html.core)
    implementation(compose.runtime)
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
