# TUD AutoLogin

This is a browser script, that performs an automatic login for the following TU Dresden web services:
- [OPAL](https://bildungsportal.sachsen.de/opal)
- [jExam 5](https://jexam.inf.tu-dresden.de/)
- [selma](https://selma.tu-dresden.de)
- [Exam@TUD](https://exam.zih.tu-dresden.de)
- [HISQIS](https://qis.dez.tu-dresden.de/qisserver)
- [Mailbox@TUD](https://msx.tu-dresden.de/owa)
- [LSKOnline](https://lskonline.tu-dresden.de)
- [ShareLaTeX](https://tex.zih.tu-dresden.de)
- [Moodle](https://tud.uni-leipzig.de/moodle2/)
- and any other service with the TUD Login Page (maybe something new comes soon).

## Installation for use with an application or for manual input
1. Install [Tampermonkey](https://www.tampermonkey.net) for your browser
2. Download the [TUD-AutoLogin UserScript](https://raw.githubusercontent.com/FurTactics/TUD-AutoLogin/master/script.user.js)
3. Click the install button to complete the installation
4. Visit the [configuration page](https://tud-autologin.spyfly.xyz/configuration) after installing the script, to add your login credentials
5. (optional) You can use [2FAS Browser Extension](https://2fas.com/browser-extension/) to automate the entry, but confirmation on your phone will be required each time
6. Enjoy :partying_face:

## Installation for those who want to forever forget about the existence of login pages (nothing manual)
1. Install [Tampermonkey](https://www.tampermonkey.net) for your browser
2. Download the [TUD-AutoLogin UserScript](https://raw.githubusercontent.com/FurTactics/TUD-AutoLogin/master/script_only_for_Geeks.user.js)
3. Click the install button to complete the installation
4. Visit the [configuration page](https://tud-autologin.spyfly.xyz/configuration) after installing the script, to add your login credentials
> You need a 32-digit secret code (Geheimschlüssel), which can be found in the [2FAS](https://2fas.com/) app or by decoding the QR code.
5. Enjoy more :partying_face:

**else:** check [Known Issues](https://github.com/FurTactics/TUD-AutoLogin/tree/master?tab=readme-ov-file#known-issues-and-faq) or open a [new issue](https://github.com/FurTactics/TUD-AutoLogin/issues).
## Compatibility
This script is compatible with any browser capable of supporting [Tampermonkey](https://www.tampermonkey.net) or [Greasemonkey (Firefox only)](https://addons.mozilla.org/de/firefox/addon/greasemonkey/)

Compatible Platforms:
- Windows
- Linux
- MacOS
- Android (tested with [Firefox Nightly](https://blog.mozilla.org/addons/2020/09/29/expanded-extension-support-in-firefox-for-android-nightly/) and [Kiwi](https://kiwibrowser.com/))
- iOS/iPadOS via [Custom Shortcut](https://www.icloud.com/shortcuts/b3bef7f4836d461fb73bc3a39f9e3411) (Safari only)

## Usage
Visit your favorite TUD websites and enjoy automatic login.

On iOS/iPadOS you will have to run the Custom Shortcut via the Share Menu in Safari.

## Future Development and Issues
If you have improvement ideas or encounter issues with the script don't hesitate to open a [new issue](https://github.com/FurTactics/TUD-AutoLogin/issues). This could be a request for adding more supported services or reporting a bug.


## Known Issues and FAQ
<details>
<summary><b>No notifications</b></summary>
<p>
You don't see notifications from the configuration site after clicking the test button.
</p>
<b>Windows</b>
<p>
Try turning off do not disturb mode and allowing browser notifications.
</p>
<b>Mac OS</b>
<p>
<i>(unclear)</i> Try turning on notifications in your browser settings (<i>System Preferences > Notifications > Chrome or another Browswer</i>) 
<a href="https://i.sstatic.net/bxqUA.png">check screenshot</a>.
</p>
</details>
<details>
<summary><b>Where is my 32-digit secret code?</b></summary>
<p>The best and most secure way to find a token is to look it up in the <a href="https://2fas.com/">2FAS</a> app. Long hold the <code>TU Dresden</code> card, then <code>edit</code>. You need a 32-digit key that needs to be copied.
</p>
</details>
<details>
<summary><b>If I don't use 2FAS?</b></summary>
<p>If you do not use 2FAS, then all similar applications should have a function for viewing the secret code. If not, you can install the <a href="https://2fas.com/">2FAS</a> app and export your <code>TU Dresden</code> entry there.</p>
</details>