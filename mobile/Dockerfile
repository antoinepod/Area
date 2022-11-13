FROM reactnativecommunity/react-native-android:2.1
# set locale to utf8 for fastlane
#Build the apk file

WORKDIR /app

COPY . .

RUN yarn install

RUN cd android && ./gradlew assembleRelease
