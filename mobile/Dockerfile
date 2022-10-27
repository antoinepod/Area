FROM reactnativecommunity/react-native-android:6.0

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
# install bundler
RUN gem install bundler

RUN bundle install
CMD ["bundle", "exec", "fastlane", "build_android"]