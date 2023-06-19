plugins {
    kotlin("multiplatform")
}

kotlin {
    js(IR) {
        binaries.executable()
        browser {}
    }

    sourceSets {
        named("commonMain") {
            dependencies {

            }
        }
        named("jsMain") {
            dependencies {
                implementation(kotlin("stdlib-js"))
            }
        }
    }
}