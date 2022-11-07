FROM reactnativecommunity/react-native-android:6.0

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
# install bundler

# RUN sudo gem install bundler

# RUN sudo bundle install
# RUN bundle exec fastlane build_android
RUN cd android
# RUN ./gradlew clean
RUN gradlew assembleRelease


CMD ["bundle", "exec", "fastlane", "build_android"]