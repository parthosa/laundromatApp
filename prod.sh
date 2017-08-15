#!/bin/bash
cd ionic
ionic build android --release --prod
cd platforms/android/build/outputs/apk/
$JAVA_HOME/bin/jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../../../../../my-release-key.keystore android-release-unsigned.apk alias_name
rm androidApp.apk
zipalign -v 4 android-release-unsigned.apk androidApp.apk