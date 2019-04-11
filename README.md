# Ionic 4 + Authorization Code Flow + PKCE Demo

This demo shows how to use [Ionic AppAuth](https://github.com/wi3land/ionic-appauth) and authenticate using Okta. The majority of its code comes from [@wi3land/ionic-appauth-ng-demo](https://github.com/wi3land/ionic-appauth-ng-demo). 

**Prerequisites:** [Node 11](https://nodejs.org/) and [Ionic 4](https://ionicframework.com/). After installing Node, install Ionic's CLI:

```
npm i -g ionic
```

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example, run the following commands:

```bash
git clone -b okta git@github.com:mraible/ionic-4-oidc-demo.git
cd ionic-4-oidc-demo
npm i
```

### Create an Application in Okta

Log in to your Okta Developer account (or [sign up](https://developer.okta.com/signup/) if you don’t have an account).

From the **Applications** page, choose **Add Application**. On the Create New Application page, select **SPA**.
Give your app a memorable name, and configure it as follows:
 
* Login redirect URIs: 
  * `http://localhost:8100/implicit/callback`
  * `com.okta.dev-737523:/callback` (where `dev-737523.okta.com` is your Okta URL)
* Grant type allowed: **Authorization Code**
* Click **Done**
* Click **Edit** and add Logout redirect URIs:
  * `http://localhost:8100/implicit/logout`
  * `com.okta.dev-737523:/logout`
* Click **Save**

Copy your issuer (found under **API** > **Authorization Servers**), and client ID into `src/app/core/auth.service.ts` as follows:

```ts
private addConfig() {
  const clientId = '{yourClientId}';
  const issuer = 'https://{yourOktaDomain}/oauth2/default';
  const scopes = 'openid profile offline_access';

  if (this.platform.is('cordova')) {
    this.authConfig = {
      identity_client: clientId,
      identity_server: issuer,
      redirect_url: '{yourReversedOktaDomain}:/callback',
      scopes: scopes,
      usePkce: true,
      end_session_redirect_url: '{yourReversedOktaDomain}:/logout',
    };
  }
  ...
}
```

**NOTE:** The value of `{yourOktaDomain}` should be something like `dev-123456.okta.com`. Make sure you don't include `-admin` in the value!

After modifying this file, start the app and you should be able to authenticate with Okta.

```
ionic serve
```

## iOS

You can deploy this app to iOS Simulator using:

```shell
ionic cordova run ios -l
```

Once `platform/ios` has been generated, modify `platforms/ios/MyApp/MyApp-Info.plist` and add your reversed Okta domain.

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>com.okta.dev-737523</string>
    </array>
  </dict>
</array>
```

Then, in another terminal:

```
open platforms/ios/MyApp.xcworkspace
```

Then run the app from Xcode.

See <https://ionicframework.com/docs/building/ios> for more information.

## Android

I was unable to get this app working on Android. If you succeed, please create a PR and update this file with instructions!

## Links

This example uses the following open source libraries:

* [Ionic AppAuth](https://github.com/wi3land/ionic-appauth) 
* [Ionic](https://github.com/ionic-team/ionic)

## Help

Please post any questions as issues in this repository, or on the [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).
